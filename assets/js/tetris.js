/**
 * Tech Tetris – Neon skill tiles that fall from the top like Tetris blocks
 * and pack tightly at the bottom every time the About section opens.
 */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        // Force motion even if OS prefers-reduced-motion
        document.documentElement.classList.add('force-motion');

        var techTetrisRoot = document.getElementById('tech-tetris');
        var techItems = [
            'Power BI', 'SSRS', 'SSIS',
            'SQL', 'Python (pandas, pyspark, matplotlib, etc.)', 'JavaScript', 'CSS', 'HTML',
            'MS SQL', 'PostgreSQL',
            'Apache Spark',
            'FastAPI', 'React', 'Electron', 'RESTful APIs', 'OAuth',
            'Azure Data Factory', 'AWS', 'Databricks',
            'GIT', 'Jenkins', 'Dagster', 'Uvicorn', 'Airflow', 'Jira', 'ActiveBatch', 'OpenAI/Claude API', 'GPT-4+,5+', 'Claude Sonnet', 'Whisper (Speech-to-Text)'
        ];

        function shuffleArray(arr) {
            for (var i = arr.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            return arr;
        }

        function getShapeClass(label) {
            var len = label.length;
            var rand = Math.random();
            // Assign Tetris-like rectangular shapes. High probability for 1x1 on short words to act as gap-fillers.
            if (len <= 4) {
                if (rand < 0.6) return 'shape-1x1'; // 60% chance for a perfect 1x1 pebble
                if (rand < 0.85) return 'shape-2x1';
                return 'shape-1x2';
            }
            if (len <= 8) {
                if (rand < 0.4) return 'shape-2x1';
                if (rand < 0.7) return 'shape-2x2';
                if (rand < 0.9) return 'shape-3x1';
                return 'shape-1x3'; // vertical bar
            }
            if (len <= 14) {
                if (rand < 0.4) return 'shape-2x2';
                if (rand < 0.7) return 'shape-3x1';
                if (rand < 0.9) return 'shape-3x2';
                return 'shape-2x3'; // tall vertical
            }
            if (len <= 22) {
                if (rand < 0.4) return 'shape-3x2';
                if (rand < 0.7) return 'shape-4x1';
                return 'shape-4x2';
            }
            // longest text (e.g. Python string)
            if (rand < 0.5) return 'shape-4x2';
            return 'shape-3x3'; // chunky square, packs better than 6x2 planks
        }

        function buildTechTiles() {
            if (!techTetrisRoot) return;
            techTetrisRoot.innerHTML = '';
            techTetrisRoot.classList.remove('drop-in');

            var items = shuffleArray(techItems.slice());
            items.forEach(function (label, idx) {
                var tile = document.createElement('div');
                var shape = getShapeClass(label);
                tile.className = 'tech-tile ' + shape;
                tile.setAttribute('tabindex', '0');
                tile.setAttribute('role', 'button');
                tile.setAttribute('aria-label', label);
                // Significantly increased stagger delay for a much slower effect
                tile.style.setProperty('--drop-delay', (idx * 150) + 'ms');
                tile.style.setProperty('--hue', ((idx * 33) % 360).toString());
                tile.textContent = label;
                techTetrisRoot.appendChild(tile);
            });
        }

        function playTechDrop() {
            if (!techTetrisRoot) return;
            var labelEl = document.getElementById('tech-tetris-label');
            if (labelEl) labelEl.classList.remove('show');

            // Remove drop-in to reset, force reflow, then add it back
            techTetrisRoot.classList.remove('drop-in');
            void techTetrisRoot.offsetWidth; // force reflow
            // Use nested rAF to ensure the browser has painted the reset state
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    techTetrisRoot.classList.add('drop-in');

                    // Show label after all nested tiles have dropped
                    if (labelEl) {
                        var totalTime = (techItems.length * 150) + 1500;
                        setTimeout(function () {
                            labelEl.classList.add('show');
                        }, totalTime);
                    }
                });
            });
        }

        function whenAboutActive(cb) {
            var about = document.getElementById('about');
            if (!about) return;
            var start = performance.now();

            function tick() {
                if (about.classList.contains('active') && about.offsetParent !== null) {
                    cb();
                    return;
                }
                if (performance.now() - start > 2500) return;
                requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        }

        // Initial build
        buildTechTiles();
        if (location.hash === '#about') {
            whenAboutActive(playTechDrop);
        }

        // Re-build & re-drop every time About is opened
        window.addEventListener('hashchange', function () {
            if (location.hash === '#about') {
                buildTechTiles();
                whenAboutActive(playTechDrop);
            }
        });

        // Also listen for direct clicks on the About nav link
        var aboutLink = document.querySelector('a[href="#about"]');
        if (aboutLink) {
            aboutLink.addEventListener('click', function () {
                // Small delay to let buildTechTiles run on hashchange first
                setTimeout(function () {
                    if (location.hash === '#about') {
                        buildTechTiles();
                        whenAboutActive(playTechDrop);
                    }
                }, 50);
            });
        }
    });
})();
