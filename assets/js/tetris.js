/**
 * Tech Skills – Glass pill tiles that stagger-fade in when About opens.
 */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var techTetrisRoot = document.getElementById('tech-tetris');
        var techItems = [
            // BI & Reporting
            { display: 'Power BI',           icon: 'devicon-powerbi-plain colored' },
            { display: 'SSRS',               icon: 'fa fa-table' },
            { display: 'SSIS',               icon: 'fa fa-random' },
            // Languages
            { display: 'SQL',                icon: 'fa fa-database' },
            { display: 'Python',             icon: 'devicon-python-plain colored',              full: 'Python (pandas, pyspark, matplotlib, etc.)' },
            { display: 'JavaScript',         icon: 'devicon-javascript-plain colored' },
            { display: 'CSS',                icon: 'devicon-css3-plain colored' },
            { display: 'HTML',               icon: 'devicon-html5-plain colored' },
            // Databases
            { display: 'MS SQL',             icon: 'devicon-microsoftsqlserver-plain colored' },
            { display: 'PostgreSQL',         icon: 'devicon-postgresql-plain colored' },
            // Big Data
            { display: 'Apache Spark',       icon: 'devicon-apachespark-plain colored' },
            // Backend & APIs
            { display: 'FastAPI',            icon: 'devicon-fastapi-plain colored' },
            { display: 'React',              icon: 'devicon-react-original colored' },
            { display: 'Electron',           icon: 'devicon-electron-original colored' },
            { display: 'RESTful APIs',       icon: 'fa fa-plug' },
            { display: 'OAuth',              icon: 'fa fa-lock' },
            // Cloud
            { display: 'Azure Data Factory', icon: 'devicon-azure-plain colored' },
            { display: 'AWS',                icon: 'devicon-amazonwebservices-original colored' },
            { display: 'Databricks',         icon: 'devicon-databricks-plain colored' },
            // DevOps & Orchestration
            { display: 'Git',                icon: 'devicon-git-plain colored' },
            { display: 'Jenkins',            icon: 'devicon-jenkins-plain colored' },
            { display: 'Dagster',            icon: 'fa fa-cogs' },
            { display: 'Uvicorn',            icon: 'fa fa-server' },
            { display: 'Airflow',            icon: 'devicon-apacheairflow-plain colored' },
            { display: 'Jira',               icon: 'devicon-jira-plain colored' },
            { display: 'ActiveBatch',        icon: 'fa fa-clock-o' },
            // AI / LLM
            { display: 'OpenAI / Claude API',icon: 'fa fa-robot' },
            { display: 'GPT-4+, 5+',         icon: 'fa fa-robot' },
            { display: 'Claude Sonnet',      icon: 'fa fa-robot' },
            { display: 'Whisper STT',        icon: 'fa fa-microphone',                          full: 'Whisper (Speech-to-Text)' },
        ];

        // --- Mobile nav: only visible when #work is the active article ---
        function updateMobileNav() {
            var nav = document.querySelector('.mobile-nav');
            if (!nav) return;
            if (location.hash === '#work') {
                nav.classList.add('visible');
            } else {
                nav.classList.remove('visible');
            }
        }
        updateMobileNav();
        window.addEventListener('hashchange', updateMobileNav);

        // --- Skill pill tiles ---
        function buildTechTiles() {
            if (!techTetrisRoot) return;
            techTetrisRoot.innerHTML = '';
            techTetrisRoot.classList.remove('drop-in');

            techItems.forEach(function (item, idx) {
                var tile = document.createElement('div');
                tile.className = 'tech-tile';
                tile.setAttribute('tabindex', '0');
                tile.setAttribute('aria-label', item.full || item.display);
                tile.style.setProperty('--drop-delay', (idx * 35) + 'ms');

                var iconEl = document.createElement('i');
                iconEl.className = item.icon;
                iconEl.setAttribute('aria-hidden', 'true');

                var labelEl = document.createElement('span');
                labelEl.textContent = item.display;

                tile.appendChild(iconEl);
                tile.appendChild(labelEl);
                techTetrisRoot.appendChild(tile);
            });
        }

        function playTechFade() {
            if (!techTetrisRoot) return;
            var labelEl = document.getElementById('tech-tetris-label');
            if (labelEl) labelEl.classList.remove('show');

            techTetrisRoot.classList.remove('drop-in');
            void techTetrisRoot.offsetWidth; // force reflow
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    techTetrisRoot.classList.add('drop-in');

                    if (labelEl) {
                        var totalTime = (techItems.length * 35) + 500;
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

        buildTechTiles();
        if (location.hash === '#about') {
            whenAboutActive(playTechFade);
        }

        window.addEventListener('hashchange', function () {
            if (location.hash === '#about') {
                buildTechTiles();
                whenAboutActive(playTechFade);
            }
        });

        var aboutLink = document.querySelector('a[href="#about"]');
        if (aboutLink) {
            aboutLink.addEventListener('click', function () {
                setTimeout(function () {
                    if (location.hash === '#about') {
                        buildTechTiles();
                        whenAboutActive(playTechFade);
                    }
                }, 50);
            });
        }
    });
})();
