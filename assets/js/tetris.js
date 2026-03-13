/**
 * Tech Skills – Glass pill tiles that stagger-fade in when About opens.
 */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var techTetrisRoot = document.getElementById('tech-tetris');
        var techCategories = [
            { label: 'Cloud & Data', items: [
                { display: 'Azure Data Factory', icon: 'devicon-azure-plain colored' },
                { display: 'AWS',                icon: 'devicon-amazonwebservices-original colored' },
                { display: 'Databricks',         icon: 'devicon-databricks-plain colored' },
                { display: 'Apache Spark',       icon: 'devicon-apachespark-plain colored' },
                { display: 'MS SQL',             icon: 'devicon-microsoftsqlserver-plain colored' },
                { display: 'PostgreSQL',         icon: 'devicon-postgresql-plain colored' },
            ]},
            { label: 'BI & Reporting', items: [
                { display: 'Power BI',           icon: 'devicon-powerbi-plain colored' },
                { display: 'SSRS',               icon: 'fa fa-table' },
                { display: 'SSIS',               icon: 'fa fa-random' },
            ]},
            { label: 'Languages', items: [
                { display: 'Python',             icon: 'devicon-python-plain colored',              full: 'Python (pandas, pyspark, matplotlib, etc.)' },
                { display: 'SQL',                icon: 'fa fa-database' },
                { display: 'JavaScript',         icon: 'devicon-javascript-plain colored' },
                { display: 'HTML',               icon: 'devicon-html5-plain colored' },
                { display: 'CSS',                icon: 'devicon-css3-plain colored' },
            ]},
            { label: 'Backend & APIs', items: [
                { display: 'FastAPI',            icon: 'devicon-fastapi-plain colored' },
                { display: 'React',              icon: 'devicon-react-original colored' },
                { display: 'Electron',           icon: 'devicon-electron-original colored' },
                { display: 'RESTful APIs',       icon: 'fa fa-plug' },
                { display: 'OAuth',              icon: 'fa fa-lock' },
            ]},
            { label: 'DevOps & Orchestration', items: [
                { display: 'Git',                icon: 'devicon-git-plain colored' },
                { display: 'Jenkins',            icon: 'devicon-jenkins-plain colored' },
                { display: 'Airflow',            icon: 'devicon-apacheairflow-plain colored' },
                { display: 'Dagster',            icon: 'fa fa-cogs' },
                { display: 'Uvicorn',            icon: 'fa fa-server' },
                { display: 'Jira',               icon: 'devicon-jira-plain colored' },
                { display: 'ActiveBatch',        icon: 'fa fa-calendar-check-o',                    full: 'ActiveBatch (Job Scheduler)' },
            ]},
            { label: 'AI / LLM', items: [
                { display: 'OpenAI API',         icon: 'devicon-openai-plain colored' },
                { display: 'GPT-4 / GPT-5',      icon: 'devicon-openai-plain colored',              full: 'GPT-4+, GPT-5+ (OpenAI)' },
                { display: 'Claude Sonnet',      icon: 'fa fa-comment-o',                           full: 'Claude Sonnet (Anthropic)' },
                { display: 'Whisper STT',        icon: 'fa fa-microphone',                          full: 'Whisper (Speech-to-Text)' },
            ]},
        ];

        // Flatten for animation delay counting
        var techItems = [];
        techCategories.forEach(function (cat) {
            cat.items.forEach(function (item) { techItems.push(item); });
        });

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

            var globalIdx = 0;
            techCategories.forEach(function (cat) {
                // Category label
                var label = document.createElement('div');
                label.className = 'tech-category-label';
                label.textContent = cat.label;
                techTetrisRoot.appendChild(label);

                cat.items.forEach(function (item) {
                    var tile = document.createElement('div');
                    tile.className = 'tech-tile';
                    tile.setAttribute('tabindex', '0');
                    tile.setAttribute('aria-label', item.full || item.display);
                    tile.style.setProperty('--drop-delay', (globalIdx * 35) + 'ms');

                    var iconEl = document.createElement('i');
                    iconEl.className = item.icon;
                    iconEl.setAttribute('aria-hidden', 'true');

                    var labelEl = document.createElement('span');
                    labelEl.textContent = item.display;

                    tile.appendChild(iconEl);
                    tile.appendChild(labelEl);
                    techTetrisRoot.appendChild(tile);
                    globalIdx++;
                });
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
