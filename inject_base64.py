import base64
import os

image_path = r'C:\Users\milan\.gemini\antigravity\brain\f0e4bf58-369c-44d9-a777-0987cb75b062\gta_washington_map_1772830135116.png'
html_path = r'c:\Data Engineering\70milan.github.io\index.html'

try:
    with open(image_path, 'rb') as f:
        img_b64 = base64.b64encode(f.read()).decode('utf-8')
        data_uri = f'data:image/png;base64,{img_b64}'

    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    new_html = html.replace('images/gta_map.png', data_uri)

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_html)

    print('SUCCESS: Base64 image injected into index.html')
except Exception as e:
    print(f'ERROR: {str(e)}')
