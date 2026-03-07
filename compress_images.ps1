Add-Type -AssemblyName System.Drawing

$ImagesDir = "c:\Data Engineering\70milan.github.io\images"
$MaxDim = 1920
$Quality = 80

# Get large files > 1MB
$files = Get-ChildItem -Path $ImagesDir -Include *.png,*.jpg,*.jpeg -Recurse | Where-Object { $_.Length -gt 1MB }

# Prepare JPEG encoder
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $Quality)
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

foreach ($file in $files) {
    Write-Host "Optimizing $($file.Name) ($([math]::Round($file.Length/1MB, 2)) MB)..."
    
    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        
        $width = $img.Width
        $height = $img.Height
        $resized = $false
        
        if ($width -gt $MaxDim) {
            $ratio = $MaxDim / $width
            $width = $MaxDim
            $height = [math]::Round($height * $ratio)
            $resized = $true
        }
        
        # Always create a new bitmap to drop alpha channels or resize nicely
        $bmp = New-Object System.Drawing.Bitmap($width, $height)
        $graph = [System.Drawing.Graphics]::FromImage($bmp)
        
        # Fill background with white in case of transparent PNG
        $graph.Clear([System.Drawing.Color]::White)
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.DrawImage($img, 0, 0, $width, $height)
        $graph.Dispose()
        $img.Dispose()
        
        # Save as a brand new JPG
        $newName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name) + "_opt.jpg"
        $newPath = Join-Path $file.DirectoryName $newName
        
        $bmp.Save($newPath, $jpegCodec, $encParams)
        $bmp.Dispose()
        
        $newSize = (Get-Item $newPath).Length
        Write-Host "  -> Converted to $newName ($([math]::Round($newSize/1MB, 2)) MB)"
    } catch {
        Write-Host "  -> Error processing $($file.Name): $_"
    }
}
