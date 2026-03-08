/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Fix: Flexbox min-height bug on IE.
	if (browser.name == 'ie') {

		var flexboxFixTimeoutId;

		$window.on('resize.flexbox-fix', function () {

			clearTimeout(flexboxFixTimeoutId);

			flexboxFixTimeoutId = setTimeout(function () {

				if ($wrapper.prop('scrollHeight') > $window.height())
					$wrapper.css('height', 'auto');
				else
					$wrapper.css('height', '100vh');

			}, 250);

		}).triggerHandler('resize.flexbox-fix');

	}

	// Nav.
	var $nav = $header.children('nav'),
		$nav_li = $nav.find('li');

	// Add "middle" alignment classes if we're dealing with an even number of items.
	if ($nav_li.length % 2 == 0) {

		$nav.addClass('use-middle');
		$nav_li.eq(($nav_li.length / 2)).addClass('is-middle');

	}

	// Main.
	var delay = 325,
		locked = false;

	// Methods.
	$main._show = function (id, initial) {

		var $article = $main_articles.filter('#' + id);

		// No such article? Bail.
		if ($article.length == 0)
			return;

		// Handle lock.

		// Already locked? Speed through "show" steps w/o delays.
		if (locked || (typeof initial != 'undefined' && initial === true)) {

			// Mark as switching.
			$body.addClass('is-switching');

			// Mark as visible.
			$body.addClass('is-article-visible');

			// Deactivate all articles (just in case one's already active).
			$main_articles.removeClass('active');

			// Hide header, footer.
			$header.hide();
			$footer.hide();

			// Show main, article.
			$main.show();
			$article.show();

			// Activate article.
			$article.addClass('active');

			// Unlock.
			locked = false;

			// Unmark as switching.
			setTimeout(function () {
				$body.removeClass('is-switching');
			}, (initial ? 1000 : 0));

			return;

		}

		// Lock.
		locked = true;

		// Article already visible? Just swap articles.
		if ($body.hasClass('is-article-visible')) {

			// Deactivate current article.
			var $currentArticle = $main_articles.filter('.active');

			$currentArticle.removeClass('active');

			// Show article.
			setTimeout(function () {

				// Hide current article.
				$currentArticle.hide();

				// Show article.
				$article.show();

				// Activate article.
				setTimeout(function () {

					$article.addClass('active');

					// Window stuff.
					$window
						.scrollTop(0)
						.triggerHandler('resize.flexbox-fix');

					// Unlock.
					setTimeout(function () {
						locked = false;
					}, delay);

				}, 25);

			}, delay);

		}

		// Otherwise, handle as normal.
		else {

			// Mark as visible.
			$body
				.addClass('is-article-visible');

			// Show article.
			setTimeout(function () {

				// Hide header, footer.
				$header.hide();
				$footer.hide();

				// Show main, article.
				$main.show();
				$article.show();

				// Activate article.
				setTimeout(function () {

					$article.addClass('active');

					// Window stuff.
					$window
						.scrollTop(0)
						.triggerHandler('resize.flexbox-fix');

					// Unlock.
					setTimeout(function () {
						locked = false;
					}, delay);

				}, 25);

			}, delay);

		}

	};

	$main._hide = function (addState) {

		var $article = $main_articles.filter('.active');

		// Article not visible? Bail.
		if (!$body.hasClass('is-article-visible'))
			return;

		// Add state?
		if (typeof addState != 'undefined'
			&& addState === true)
			history.pushState(null, null, '#');

		// Handle lock.

		// Already locked? Speed through "hide" steps w/o delays.
		if (locked) {

			// Mark as switching.
			$body.addClass('is-switching');

			// Deactivate article.
			$article.removeClass('active');

			// Hide article, main.
			$article.hide();
			$main.hide();

			// Show footer, header.
			$footer.show();
			$header.show();

			// Unmark as visible.
			$body.removeClass('is-article-visible');

			// Unlock.
			locked = false;

			// Unmark as switching.
			$body.removeClass('is-switching');

			// Window stuff.
			$window
				.scrollTop(0)
				.triggerHandler('resize.flexbox-fix');

			return;

		}

		// Lock.
		locked = true;

		// Deactivate article.
		$article.removeClass('active');

		// Hide article.
		setTimeout(function () {

			// Hide article, main.
			$article.hide();
			$main.hide();

			// Show footer, header.
			$footer.show();
			$header.show();

			// Unmark as visible.
			setTimeout(function () {

				$body.removeClass('is-article-visible');

				// Window stuff.
				$window
					.scrollTop(0)
					.triggerHandler('resize.flexbox-fix');

				// Unlock.
				setTimeout(function () {
					locked = false;
				}, delay);

			}, 25);

		}, delay);


	};

	// Articles.
	$main_articles.each(function () {

		var $this = $(this);

		// Close.
		$('<div class="close">Close</div>')
			.appendTo($this)
			.on('click', function () {
				location.hash = '';
			});

		// Prevent clicks from inside article from bubbling.
		$this.on('click', function (event) {
			event.stopPropagation();
		});

	});

	// Events.
	$body.on('click', function (event) {

		// Article visible? Hide.
		if ($body.hasClass('is-article-visible'))
			$main._hide(true);

	});

	$window.on('keyup', function (event) {

		switch (event.keyCode) {

			case 27:

				// Article visible? Hide.
				if ($body.hasClass('is-article-visible'))
					$main._hide(true);

				break;

			default:
				break;

		}

	});

	$window.on('hashchange', function (event) {

		// Empty hash?
		if (location.hash == ''
			|| location.hash == '#') {

			// Prevent default.
			event.preventDefault();
			event.stopPropagation();

			// Hide.
			$main._hide();

		}

		// Otherwise, check for a matching article.
		else if ($main_articles.filter(location.hash).length > 0) {

			// Prevent default.
			event.preventDefault();
			event.stopPropagation();

			// Show article.
			$main._show(location.hash.substr(1));

		}

	});

	// Scroll restoration.
	// This prevents the page from scrolling back to the top on a hashchange.
	if ('scrollRestoration' in history)
		history.scrollRestoration = 'manual';
	else {

		var oldScrollPos = 0,
			scrollPos = 0,
			$htmlbody = $('html,body');

		$window
			.on('scroll', function () {

				oldScrollPos = scrollPos;
				scrollPos = $htmlbody.scrollTop();

			})
			.on('hashchange', function () {
				$window.scrollTop(oldScrollPos);
			});

	}

	// Initialize.

	// Hide main, articles.
	$main.hide();
	$main_articles.hide();

	// Initial article.
	if (location.hash != ''
		&& location.hash != '#')
		$window.on('load', function () {
			$main._show(location.hash.substr(1), true);
		});


	// Portfolio Refactor: Event Handlers
	window.toggleReadMore = function (descId, btn) {
		const desc = document.getElementById(descId);
		if (desc.classList.contains('expanded')) {
			desc.classList.remove('expanded');
			btn.innerHTML = '<i class="fa fa-chevron-down"></i>';
		} else {
			desc.classList.add('expanded');
			btn.innerHTML = '<i class="fa fa-chevron-up"></i>';
		}
	};

	window.cycleDeck = function (deck, direction = 1) {
		const cards = Array.from(deck.querySelectorAll('.image.main'));
		if (cards.length <= 1) return;

		let currentIndex = cards.findIndex(c => c.classList.contains('active'));
		if (currentIndex === -1) currentIndex = 0;

		let nextIndex = (currentIndex + direction) % cards.length;
		if (nextIndex < 0) nextIndex = cards.length - 1;

		const behindIndex = (nextIndex + 1) % cards.length;

		cards.forEach(c => c.classList.remove('active', 'behind'));

		cards[nextIndex].classList.add('active');
		if (cards.length > 1) {
			cards[behindIndex].classList.add('behind');
		}
	};

	window.scrollToProject = function (id) {
		if (id === 'project-1') {
			const workEl = document.getElementById('work');
			if (workEl) {
				workEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
			return;
		}
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	$(function () {
		// Initialize image decks
		$('.image-deck').each(function () {
			const $deck = $(this);
			const cards = $deck.find('.image.main');
			if (cards.length > 0) {
				$(cards[0]).addClass('active');
				if (cards.length > 1) {
					$(cards[1]).addClass('behind');
				}
			}

			// Swipe handling
			let touchstartX = 0;
			let touchendX = 0;

			this.addEventListener('touchstart', e => {
				touchstartX = e.changedTouches[0].screenX;
			}, { passive: true });

			this.addEventListener('touchend', e => {
				touchendX = e.changedTouches[0].screenX;
				if (touchendX < touchstartX - 50) window.cycleDeck(this, 1);
				if (touchendX > touchstartX + 50) window.cycleDeck(this, -1);
			}, { passive: true });
		});

		// Mobile Navigator Intersection Observer
		if (window.innerWidth <= 736) {
			const observerOptions = {
				root: null,
				rootMargin: '-20% 0px -60% 0px',
				threshold: 0
			};

			const observer = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						document.querySelectorAll('.mobile-nav-dot').forEach(dot => {
							dot.classList.remove('active');
							if (dot.getAttribute('data-target') === entry.target.id) {
								dot.classList.add('active');
							}
						});
					}
				});
			}, observerOptions);

			document.querySelectorAll('.project-section-header').forEach(header => {
				observer.observe(header);
			});
		}

		// Click handlers for refactored elements
		$('.read-more-btn').on('click', function () {
			const targetId = $(this).data('target');
			window.toggleReadMore(targetId, this);
		});

		$('.deck-nav.prev').on('click', function (e) {
			e.stopPropagation();
			window.cycleDeck(this.parentElement, -1);
		});

		$('.deck-nav.next').on('click', function (e) {
			e.stopPropagation();
			window.cycleDeck(this.parentElement, 1);
		});

		$('.mobile-nav-dot').on('click', function (e) {
			e.stopPropagation();
			const targetId = $(this).data('target');
			window.scrollToProject(targetId);
		});
	});

})(jQuery);
