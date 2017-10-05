/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/itcase_sphinx_theme/itcase/static/js/__build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./itcase_sphinx_theme/itcase/static/js/main.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals Cookies */



__webpack_require__("./node_modules/expose-loader/index.js?Cookies!./itcase_sphinx_theme/itcase/static/js/vendor/js.cookie.js");

const leftHeight = $('.page__left').height();
const rightHeight = $('.page__right').height();

__webpack_require__("./itcase_sphinx_theme/itcase/static/js/vendor/jquery.fancybox.js");
__webpack_require__("./itcase_sphinx_theme/itcase/static/js/vendor/enscroll.js");
__webpack_require__("./itcase_sphinx_theme/itcase/static/js/openImage.js");

const menu = $('.menu');
const menuSwitch = $('.menu-switch');
const menuMobileSwitch = $('.menu-mobile-nav');

const pageLeft = $('.page__left');
const pageRight = $('.page__right');

function getTreeState() {
  const menuState = Cookies.get('menu-state');
  if (menuState === 'collapse') {
    collapseTree();
  } else if (menuState === 'expand') {
    expandTree();
  }
  pageLeft.css({ visibility: 'visible' });
  pageRight.css({ visibility: 'visible' });
}

function collapseTree() {
  menu.animate({
    width: '30px'
  });
  $('.page__right-inner').animate({
    'padding-left': '40px'
  });
  menu.css({
    height: menu.height()
  });
  menu.data('state', 'collapse');
  menu.addClass('menu_state_collapse');
  pageLeft.addClass('page__left_state_collapse');
  pageRight.addClass('page__right_state_expand');
  document.cookie = 'menu-state=collapse;path=/';
}

function expandTree() {
  menu.animate({
    width: '300px'
  });
  $('.page__right-inner').animate({
    'padding-left': '320px'
  });
  menu.data('state', 'expand');
  menu.removeClass('menu_state_collapse');
  pageLeft.removeClass('page__left_state_collapse');
  pageRight.removeClass('page__right_state_expand');
  document.cookie = 'menu-state=expande;path=/';
}

function switchMenu() {
  if (menu.data('state') === 'collapse') {
    expandTree();
    menu.data('state', 'expand');
  } else if (menu.data('state') === 'expand') {
    collapseTree();
    menu.data('state', 'collapse');
  }
}

$(menuSwitch).on('click', () => {
  switchMenu();
});

function setMenuHeight() {
  let padding = 55;
  if ($(window).width() < 768) {
    padding = 0;
  }
  if ($('.menu').height() >= $(window).height() - padding) {
    $('.menu').css({ height: $(window).height() - padding });
    $('.menu-inner').css({ height: $('.menu').height() });
  } else {
    $('.menu').css({ height: 'auto' });
    $('.menu-inner').css({ height: 'auto' });
  }
}

function setMenuPosition() {
  if (rightHeight > leftHeight) {
    const menuHeight = $('.menu').height();
    const wrapperPosition = $('.page').offset().top;
    let menuPosition = $('.menu').offset().top + menuHeight;
    let screenPosition = $(window).scrollTop() + menuHeight;
    let footerPosition = $('.footer').offset().top;

    // console.log('menuHeight' + menuHeight)
    // console.log('menuPosition' + $('.menu').offset().top)
    // console.log('wrapperPosition' + wrapperPosition)

    if (menuPosition >= footerPosition && screenPosition >= footerPosition) {
      // Touch Footer
      // console.log('Touch Footer')
      $('.menu').css({
        position: 'absolute',
        top: footerPosition - (menuHeight + 25)
      });
    } else {
      // Sticky
      // console.log('Sticky')
      $('.menu').css({
        position: 'fixed',
        top: 0
      });
      if ($('.menu').offset().top <= wrapperPosition) {
        $('.menu').css({
          position: 'relative',
          top: 0
        });
      }
    }
  }
}

if (window.STICKY_MENU === true) {
  $('.menu-inner').enscroll({
    showOnHover: true,
    verticalTrackClass: 'menu-track',
    verticalHandleClass: 'menu-handle'
  });
  setMenuHeight();
  $(window).bind('stickyMenu', () => {
    $(window).scroll(() => {
      setMenuPosition();
    });
  }).trigger('stickyMenu');
}

$(window).resize(() => {
  setMenuHeight();
});

setMenuPosition();
getTreeState();

/***/ }),

/***/ "./itcase_sphinx_theme/itcase/static/js/openImage.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$('.internal.image-reference').fancybox().on('click', event => {
  event.preventDefault();
});

/***/ }),

/***/ "./itcase_sphinx_theme/itcase/static/js/vendor/enscroll.js":
/***/ (function(module, exports) {

/*global jQuery:false*/

/**
 * enscroll.js - jQuery plugin to add custom scrollbars to HTML block elements
 * Copyright (C) 2012 Jason T. Stoudt
 * Released under the MIT license
 * http://enscrollplugin.com/license.html
 **/

;(function ($, win, doc, undefined) {

	var defaultSettings = {
		verticalScrolling: true,
		horizontalScrolling: false,
		verticalScrollerSide: 'right',
		showOnHover: false,
		scrollIncrement: 20,
		minScrollbarLength: 40,
		pollChanges: true,
		drawCorner: true,
		drawScrollButtons: false,
		clickTrackToScroll: true,
		easingDuration: 500,
		propagateWheelEvent: true,
		verticalTrackClass: 'vertical-track',
		horizontalTrackClass: 'horizontal-track',
		horizontalHandleClass: 'horizontal-handle',
		verticalHandleClass: 'vertical-handle',
		scrollUpButtonClass: 'scroll-up-btn',
		scrollDownButtonClass: 'scroll-down-btn',
		scrollLeftButtonClass: 'scroll-left-btn',
		scrollRightButtonClass: 'scroll-right-btn',
		cornerClass: 'scrollbar-corner',
		zIndex: 1,
		addPaddingToPane: true,
		horizontalHandleHTML: '<div class="left"></div><div class="right"></div>',
		verticalHandleHTML: '<div class="top"></div><div class="bottom"></div>'
	},
	    preventDefault = function (event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}

		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},


	// normalize requestAnimationFrame function and polyfill if needed
	reqAnimFrame = win.requestAnimationFrame || win.mozRequestAnimationFrame || win.webkitRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame || function (f) {
		setTimeout(f, 17);
	},
	    getComputedValue = function (elem, property) {
		var w = $(elem).css(property),
		    matches = /^-?\d+/.exec(w);
		return matches ? +matches[0] : 0;
	},
	    testScrollHeight = function (nodeName) {
		var styles = {
			width: '5px',
			height: '1px',
			overflow: 'hidden',
			padding: '8px 0',
			visibility: 'hidden',
			whiteSpace: 'pre-line',
			font: '10px/1 serif'
		},
		    pane = document.createElement(nodeName),
		    textNode = document.createTextNode('a\na'),
		    result,
		    attr;

		for (attr in styles) {
			pane.style[attr] = styles[attr];
		}

		pane.appendChild(textNode);
		document.body.appendChild(pane);

		result = pane.scrollHeight < 28;

		document.body.removeChild(pane);

		return result;
	},
	    PI_OVER_2 = 0.5 * Math.PI,
	    TEN_LOG2 = 10 * Math.log(2),
	    easeOutSin = function (c, d, t) {
		var b = PI_OVER_2 / d,
		    a = c * b;

		return Math.round(a * Math.cos(b * t));
	},
	    easeOutExpo = function (c, d, t) {
		return Math.round(c * TEN_LOG2 * Math.pow(2, -10 * t / d + 1) / d);
	},
	    timeFromPosition = function (b, c, d, x) {
		return 2 * d / Math.PI * Math.asin((x - b) / c);
	},
	    showScrollbars = function (scheduleHide) {
		var data = $(this).data('enscroll'),
		    that = this,
		    settings = data.settings,
		    hideScrollbars = function () {
			var data = $(this).data('enscroll'),
			    settings = data.settings;

			if (data && settings.showOnHover) {
				if (settings.verticalScrolling && $(data.verticalTrackWrapper).is(':visible')) {
					$(data.verticalTrackWrapper).stop().fadeTo(275, 0);
				}

				if (settings.horizontalScrolling && $(data.horizontalTrackWrapper).is(':visible')) {
					$(data.horizontalTrackWrapper).stop().fadeTo(275, 0);
				}
				data._fadeTimer = null;
			}
		};

		if (data && settings.showOnHover) {
			if (data._fadeTimer) {
				clearTimeout(data._fadeTimer);
			} else {
				if (settings.verticalScrolling && $(data.verticalTrackWrapper).is(':visible')) {
					$(data.verticalTrackWrapper).stop().fadeTo(275, 1);
				}

				if (settings.horizontalScrolling && $(data.horizontalTrackWrapper).is(':visible')) {
					$(data.horizontalTrackWrapper).stop().fadeTo(275, 1);
				}
			}

			if (scheduleHide !== false) {
				data._fadeTimer = setTimeout(function () {
					hideScrollbars.call(that);
				}, 1750);
			}
		}
	},
	    scrollVertical = function (pane, dy) {
		var $pane = $(pane),
		    data = $pane.data('enscroll'),
		    y0 = $pane.scrollTop();

		if (data && data.settings.verticalScrolling) {
			$pane.scrollTop(y0 + dy);
			if (data.settings.showOnHover) {
				showScrollbars.call(pane);
			}
		}
	},
	    scrollHorizontal = function (pane, dx) {
		var $pane = $(pane),
		    data = $pane.data('enscroll'),
		    x0 = $pane.scrollLeft();
		if (data && data.settings.horizontalScrolling) {
			$pane.scrollLeft(x0 + dx);
			if (data.settings.showOnHover) {
				showScrollbars.call(pane);
			}
		}
	},
	    startVerticalDrag = function (event) {
		// only handle events for left mouse button dragging
		if (event.which !== 1) {
			return;
		}

		var pane = event.data.pane,
		    $pane = $(pane),
		    data = $pane.data('enscroll'),
		    dragging = true,
		    $track,
		    handle,
		    handleY,
		    oldHandleY,
		    mouseYOffset,
		    trackYOffset,
		    bodyCursor,
		    trackDiff,
		    paneDiff,
		    moveHandle = function () {
			if (!dragging) {
				return;
			}

			if (handleY !== oldHandleY) {
				if (!data._scrollingY) {
					data._scrollingY = true;
					data._startY = $pane.scrollTop();
					reqAnimFrame(function () {
						scrollAnimate($pane);
					});
				}

				handle.style.top = handleY + 'px';

				data._endY = handleY * paneDiff / trackDiff;
				oldHandleY = handleY;
			}

			reqAnimFrame(moveHandle);

			if (data.settings.showOnHover) {
				showScrollbars.call(pane);
			}
		},
		    moveDrag = function (event) {
			if (dragging) {
				handleY = event.clientY - trackYOffset - mouseYOffset;
				handleY = Math.min(handleY < 0 ? 0 : handleY, trackDiff);
			}
			return false;
		},
		    endDrag = function () {
			dragging = false;

			doc.body.style.cursor = bodyCursor;
			this.style.cursor = '';
			$track.removeClass('dragging');

			$(doc.body).off('mousemove.enscroll.vertical').off('mouseup.enscroll.vertical');

			$(doc).off('mouseout.enscroll.vertical');

			$pane.on('scroll.enscroll.pane', function (event) {
				paneScrolled.call(this, event);
			});

			return false;
		};

		$track = $(data.verticalTrackWrapper).find('.enscroll-track');
		handle = $track.children().first()[0];
		handleY = parseInt(handle.style.top, 10);
		paneDiff = pane.scrollHeight - (data._scrollHeightNoPadding ? $(pane).height() : $(pane).innerHeight());

		mouseYOffset = event.clientY - $(handle).offset().top;
		trackDiff = $track.height() - $(handle).outerHeight();
		trackYOffset = $track.offset().top;

		$pane.off('scroll.enscroll.pane');

		$(doc.body).on({
			'mousemove.enscroll.vertical': moveDrag,
			'mouseup.enscroll.vertical': function (event) {
				endDrag.call(handle, event);
			}
		});

		$(doc).on('mouseout.enscroll.vertical', function (event) {
			if (event.target.nodeName && event.target.nodeName.toUpperCase() === 'HTML') {
				endDrag.call(handle, event);
			}
		});

		if (!$track.hasClass('dragging')) {
			$track.addClass('dragging');
			bodyCursor = $(doc.body).css('cursor');
			this.style.cursor = doc.body.style.cursor = 'ns-resize';
		}

		reqAnimFrame(moveHandle);

		return false;
	},
	    startHorizontalDrag = function (event) {
		// dragging the scrollbar handle only works with left mouse button
		if (event.which !== 1) {
			return;
		}

		var pane = event.data.pane,
		    $pane = $(pane),
		    data = $(pane).data('enscroll'),
		    dragging = true,
		    $track,
		    handle,
		    handleX,
		    oldHandleX,
		    paneDiff,
		    mouseXOffset,
		    trackXOffset,
		    bodyCursor,
		    trackDiff,
		    moveHandle = function () {
			if (!dragging) {
				return;
			}

			if (handleX !== oldHandleX) {
				if (!data._scrollingX) {
					data._scrollingX = true;
					data._startX = $pane.scrollLeft();
					reqAnimFrame(function () {
						scrollAnimate($pane);
					});
				}

				handle.style.left = handleX + 'px';

				data._endX = handleX * paneDiff / trackDiff;
				oldHandleX = handleX;
			}

			reqAnimFrame(moveHandle);

			if (data.settings.showOnHover) {
				showScrollbars.call(pane);
			}
		},
		    moveDrag = function (event) {
			if (dragging) {
				handleX = event.clientX - trackXOffset - mouseXOffset;
				handleX = Math.min(handleX < 0 ? 0 : handleX, trackDiff);
			}
			return false;
		},
		    endDrag = function () {
			dragging = false;

			$track.removeClass('dragging');

			doc.body.style.cursor = bodyCursor;
			this.style.cursor = '';
			$track.removeClass('dragging');

			$(doc.body).off('mousemove.enscroll.horizontal').off('mouseup.enscroll.horizontal');

			$(doc).off('mouseout.enscroll.horizontal');

			$pane.on('scroll.enscroll.pane', function (event) {
				paneScrolled.call(this, event);
			});

			return false;
		};

		$track = $(data.horizontalTrackWrapper).find('.enscroll-track');
		handle = $track.children().first()[0];
		handleX = parseInt(handle.style.left, 10);
		paneDiff = pane.scrollWidth - $(pane).innerWidth();
		mouseXOffset = event.clientX - $(handle).offset().left;
		trackDiff = $track.width() - $(handle).outerWidth();
		trackXOffset = $track.offset().left;

		$pane.off('scroll.enscroll.pane');

		$(doc.body).on({
			'mousemove.enscroll.horizontal': moveDrag,
			'mouseup.enscroll.horizontal': function (event) {
				endDrag.call(handle, event);
			}
		});

		$(doc).on('mouseout.enscroll.horizontal', function (event) {
			if (event.target.nodeName && event.target.nodeName.toUpperCase() === 'HTML') {
				endDrag.call(handle, event);
			}
		});

		if (!$track.hasClass('dragging')) {
			$track.addClass('dragging');
			bodyCursor = $('body').css('cursor');
			this.style.cursor = doc.body.style.cursor = 'ew-resize';
		}

		reqAnimFrame(moveHandle);

		return false;
	},
	    scrollAnimate = function ($pane) {
		var data = $pane.data('enscroll'),
		    d = data._duration,
		    c,
		    curPos,
		    t;

		if (data._scrollingX === true) {
			c = data._endX - data._startX;
			if (c === 0) {
				data._scrollingX = false;
			} else {
				curPos = $pane.scrollLeft();
				t = timeFromPosition(data._startX, c, d, curPos);
				if (c > 0) {
					if (curPos >= data._endX || curPos < data._startX) {
						data._scrollingX = false;
					} else {
						scrollHorizontal($pane, Math.max(1, easeOutSin(c, d, t)));
						reqAnimFrame(function () {
							scrollAnimate($pane);
						});
					}
				} else {
					if (curPos <= data._endX || curPos > data._startX) {
						data._scrollingX = false;
					} else {
						scrollHorizontal($pane, Math.min(-1, easeOutSin(c, d, t)));
						reqAnimFrame(function () {
							scrollAnimate($pane);
						});
					}
				}
			}
		}

		if (data._scrollingY === true) {
			c = data._endY - data._startY;
			if (c === 0) {
				data._scrollingY = false;
			} else {
				curPos = $pane.scrollTop();
				t = timeFromPosition(data._startY, c, d, curPos);
				if (c > 0) {
					if (curPos >= data._endY || curPos < data._startY) {
						data._scrollingY = false;
					} else {
						scrollVertical($pane, Math.max(1, easeOutSin(c, d, t)));
						reqAnimFrame(function () {
							scrollAnimate($pane);
						});
					}
				} else {
					if (curPos <= data._endY || curPos > data._startY) {
						data._scrollingY = false;
					} else {
						scrollVertical($pane, Math.min(-1, easeOutSin(c, d, t)));
						reqAnimFrame(function () {
							scrollAnimate($pane);
						});
					}
				}
			}
		}
	},
	    scrollAnimateHorizontal = function ($pane, delta) {
		var data = $pane.data('enscroll'),
		    curPos = $pane.scrollLeft(),
		    scrollMax = $pane[0].scrollWidth - $pane.innerWidth();

		if (!data.settings.horizontalScrolling || data._scrollingY) {
			return false;
		}

		if (!data._scrollingX) {
			data._scrollingX = true;
			data._startX = curPos;
			data._endX = data._startX;
			reqAnimFrame(function () {
				scrollAnimate($pane);
			});
		}

		data._endX = delta > 0 ? Math.min(curPos + delta, scrollMax) : Math.max(0, curPos + delta);

		return delta < 0 && curPos > 0 || delta > 0 && curPos < scrollMax;
	},
	    scrollAnimateVertical = function ($pane, delta) {
		var data = $pane.data('enscroll'),
		    curPos = $pane.scrollTop(),
		    scrollMax = $pane[0].scrollHeight - (data._scrollHeightNoPadding ? $pane.height() : $pane.innerHeight());

		if (!data.settings.verticalScrolling || data._scrollingX) {
			return false;
		}

		if (!data._scrollingY) {
			data._scrollingY = true;
			data._startY = curPos;
			data._endY = data._startY;
			reqAnimFrame(function () {
				scrollAnimate($pane);
			});
		}

		data._endY = delta > 0 ? Math.min(curPos + delta, scrollMax) : Math.max(0, curPos + delta);

		return delta < 0 && curPos > 0 || delta > 0 && curPos < scrollMax;
	},
	    mouseScroll = function (event) {
		var $pane = $(this),
		    data = $pane.data('enscroll'),
		    scrollIncrement = data.settings.scrollIncrement,
		    deltaX = 'deltaX' in event ? -event.deltaX : 'wheelDeltaX' in event ? event.wheelDeltaX : 0,
		    deltaY = 'deltaY' in event ? -event.deltaY : 'wheelDeltaY' in event ? event.wheelDeltaY : 'wheelDelta' in event ? event.wheelDelta : 0,
		    delta;

		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			delta = (deltaX > 0 ? -scrollIncrement : scrollIncrement) << 2;
			if (scrollAnimateHorizontal($pane, delta) || !data.settings.propagateWheelEvent) {
				preventDefault(event);
			}
		} else {
			delta = (deltaY > 0 ? -scrollIncrement : scrollIncrement) << 2;
			if (scrollAnimateVertical($pane, delta) || !data.settings.propagateWheelEvent) {
				preventDefault(event);
			}
		}
	},
	    paneScrolled = function () {
		var $this = $(this),
		    data = $this.data('enscroll'),
		    handle,
		    track,
		    pct;

		if (data) {
			if (data.settings.verticalScrolling) {
				track = $(data.verticalTrackWrapper).find('.enscroll-track')[0];
				handle = track.firstChild;
				pct = $this.scrollTop() / (this.scrollHeight - (data._scrollHeightNoPadding ? $this.height() : $this.innerHeight()));
				pct = isNaN(pct) ? 0 : pct;

				handle.style.top = pct * ($(track).height() - $(handle).outerHeight()) + 'px';
			}

			if (data.settings.horizontalScrolling) {
				track = $(data.horizontalTrackWrapper).find('.enscroll-track')[0];
				handle = track.firstChild;
				pct = $this.scrollLeft() / (this.scrollWidth - $this.innerWidth());
				pct = isNaN(pct) ? 0 : pct;

				handle.style.left = pct * ($(track).width() - $(handle).innerWidth()) + 'px';
			}
		}
	},
	    keyHandler = function (event) {
		var $this = $(this),
		    data = $this.data('enscroll'),
		    scrollIncrement;

		// dont' have key events if this element is a user-input element
		if (/(input)|(select)|(textarea)/i.test(this.nodeName)) {
			return;
		}

		// don't handle events that have just bubbled up
		if (event.target === this && data) {
			scrollIncrement = data.settings.scrollIncrement;

			switch (event.keyCode) {
				case 32: // space
				case 34:
					// page down
					scrollAnimateVertical($this, $this.height());
					return false;
				case 33:
					// page up
					scrollAnimateVertical($this, -$this.height());
					return false;
				case 35:
					// end
					scrollAnimateVertical($this, this.scrollHeight);
					return false;
				case 36:
					// home
					scrollAnimateVertical($this, -this.scrollHeight);
					return false;
				case 37:
					// left
					scrollAnimateHorizontal($this, -scrollIncrement);
					return false;
				case 38:
					// up
					scrollAnimateVertical($this, -scrollIncrement);
					return false;
				case 39:
					// right
					scrollAnimateHorizontal($this, scrollIncrement);
					return false;
				case 40:
					// down
					scrollAnimateVertical($this, scrollIncrement);
					return false;
			}

			return true;
		}
	},
	    dragHandler = function () {
		var pane = this,
		    settings = $(pane).data('enscroll').settings,
		    dragging = true,
		    deltaX = 0,
		    deltaY = 0,
		    paneTop = $(pane).offset().top,
		    paneBottom = paneTop + $(pane).outerHeight(),
		    paneLeft = $(pane).offset().left,
		    paneRight = paneLeft + $(pane).outerWidth(),
		    dragMove = function (event) {
			var x = event.pageX,
			    y = event.pageY;

			deltaX = x < paneLeft ? x - paneLeft : x > paneRight ? x - paneRight : 0;

			deltaY = y < paneTop ? y - paneTop : y > paneBottom ? y - paneBottom : 0;
		},
		    dragPoll = function () {
			if (settings.horizontalScrolling && deltaX) {
				scrollHorizontal(pane, parseInt(deltaX / 4, 10));
			}
			if (settings.verticalScrolling && deltaY) {
				scrollVertical(pane, parseInt(deltaY / 4, 10));
			}
			if (dragging) {
				reqAnimFrame(dragPoll);
			}
		},
		    dragEnd = function () {
			dragging = false;
			$(doc).off('mousemove.enscroll.pane').off('mouseup.enscroll.pane');
		};

		reqAnimFrame(dragPoll);

		$(doc).on({
			'mousemove.enscroll.pane': dragMove,
			'mouseup.enscroll.pane': dragEnd
		});
	},
	    touchStart = function (event) {
		var touchX,
		    touchY,
		    touchAxis,
		    touchX0,
		    touchY0,
		    touchStarted,
		    touchDelta,
		    pane = this,
		    touchMove = function (event) {
			touchX = event.touches[0].clientX;
			touchY = event.touches[0].clientY;

			if (!touchAxis) {
				touchAxis = touchY === touchY0 && touchX === touchX0 ? undefined : Math.abs(touchY0 - touchY) > Math.abs(touchX0 - touchX) ? 'y' : 'x';
			}

			preventDefault(event);
		},
		    touchPoll = function () {
			if (!touchStarted) {
				return;
			}

			if (touchAxis === 'y') {
				scrollVertical(pane, touchY0 - touchY);
				touchDelta = touchY0 - touchY;
				touchY0 = touchY;
			} else if (touchAxis === 'x') {
				scrollHorizontal(pane, touchX0 - touchX);
				touchDelta = touchX0 - touchX;
				touchX0 = touchX;
			}

			reqAnimFrame(touchPoll);
		},
		    touchEnd = function () {
			var t = 0,
			    d = Math.abs(touchDelta * 1.5);

			this.removeEventListener('touchmove', touchMove, false);
			this.removeEventListener('touchend', touchEnd, false);
			touchStarted = false;

			reqAnimFrame(function touchFinish() {
				var dx;

				if (t === d || touchStarted) {
					return;
				}

				dx = easeOutExpo(touchDelta, d, t);

				if (!isNaN(dx) && dx !== 0) {
					t += 1;
					if (touchAxis === 'y') {
						scrollVertical(pane, dx);
					} else {
						scrollHorizontal(pane, dx);
					}

					reqAnimFrame(touchFinish);
				}
			});
		};

		if (event.touches.length === 1) {
			touchX0 = event.touches[0].clientX;
			touchY0 = event.touches[0].clientY;
			touchStarted = true;
			this.addEventListener('touchmove', touchMove, false);
			this.addEventListener('touchend', touchEnd, false);
			reqAnimFrame(touchPoll);
		}
	},
	    api = {
		reposition: function () {
			return this.each(function () {
				var $this = $(this),
				    data = $this.data('enscroll'),
				    positionElem = function (elem, x, y) {
					elem.style.left = x + 'px';
					elem.style.top = y + 'px';
				},
				    corner,
				    trackWrapper,
				    offset;

				if (data) {
					offset = $this.position();
					corner = data.corner;
					if (data.settings.verticalScrolling) {
						trackWrapper = data.verticalTrackWrapper;
						positionElem(trackWrapper, data.settings.verticalScrollerSide === 'right' ? offset.left + $this.outerWidth() - $(trackWrapper).width() - getComputedValue(this, 'border-right-width') : offset.left + getComputedValue(this, 'border-left-width'), offset.top + getComputedValue(this, 'border-top-width'));
					}

					if (data.settings.horizontalScrolling) {
						trackWrapper = data.horizontalTrackWrapper;
						positionElem(trackWrapper, offset.left + getComputedValue(this, 'border-left-width'), offset.top + $this.outerHeight() - $(trackWrapper).height() - getComputedValue(this, 'border-bottom-width'));
					}

					if (corner) {
						positionElem(corner, offset.left + $this.outerWidth() - $(corner).outerWidth() - getComputedValue(this, 'border-right-width'), offset.top + $this.outerHeight() - $(corner).outerHeight() - getComputedValue(this, 'border-bottom-width'));
					}
				}
			});
		},

		resize: function () {
			return this.each(function () {
				var $this = $(this),
				    data = $this.data('enscroll'),
				    settings,
				    paneHeight,
				    paneWidth,
				    trackWrapper,
				    pct,
				    track,
				    trackWidth,
				    trackHeight,
				    $scrollUpBtn,
				    $scrollDownBtn,
				    $scrollLeftBtn,
				    $scrollRightBtn,
				    handle,
				    handleWidth,
				    handleHeight,
				    prybar;

				if (!data) {
					return true;
				}

				settings = data.settings;

				if ($this.is(':visible')) {
					if (settings.verticalScrolling) {
						trackWrapper = data.verticalTrackWrapper;
						paneHeight = $this.innerHeight();
						pct = paneHeight / this.scrollHeight;
						track = $(trackWrapper).find('.enscroll-track')[0];
						$scrollUpBtn = $(trackWrapper).find('.' + settings.scrollUpButtonClass);
						$scrollDownBtn = $(trackWrapper).find('.' + settings.scrollDownButtonClass);

						trackHeight = settings.horizontalScrolling ? paneHeight - $(data.horizontalTrackWrapper).find('.enscroll-track').outerHeight() : paneHeight;
						trackHeight -= $(track).outerHeight() - $(track).height() + $scrollUpBtn.outerHeight() + $scrollDownBtn.outerHeight();

						handle = track.firstChild;
						handleHeight = Math.max(pct * trackHeight, settings.minScrollbarLength);
						handleHeight -= $(handle).outerHeight() - $(handle).height();

						// hide the track first -- this causes less reflows and
						// fixes an IE8 bug that prevents background images
						// from being redrawn
						trackWrapper.style.display = 'none';
						track.style.height = trackHeight + 'px';
						handle.style.height = handleHeight + 'px';
						if (pct < 1) {
							pct = $this.scrollTop() / (this.scrollHeight - $this.height());
							handle.style.top = pct * (trackHeight - handleHeight) + 'px';
							trackWrapper.style.display = 'block';
						}
					}

					if (settings.horizontalScrolling) {
						trackWrapper = data.horizontalTrackWrapper;
						paneWidth = $this.innerWidth();
						pct = paneWidth / this.scrollWidth;
						track = $(trackWrapper).find('.enscroll-track')[0];
						$scrollLeftBtn = $(trackWrapper).find('.' + settings.scrollLeftButtonClass);
						$scrollRightBtn = $(trackWrapper).find('.' + settings.scrollRightButtonClass);

						trackWidth = settings.verticalScrolling ? paneWidth - $(data.verticalTrackWrapper).find('.enscroll-track').outerWidth() : paneWidth;
						trackWidth -= $(track).outerWidth() - $(track).width() + $scrollLeftBtn.outerWidth() + $scrollRightBtn.outerWidth();

						handle = track.firstChild;
						handleWidth = Math.max(pct * trackWidth, settings.minScrollbarLength);
						handleWidth -= $(handle).outerWidth() - $(handle).width();

						// see comment above
						trackWrapper.style.display = 'none';
						track.style.width = trackWidth + 'px';
						handle.style.width = handleWidth + 'px';
						if (pct < 1) {
							pct = $this.scrollLeft() / (this.scrollWidth - $this.width());
							handle.style.left = pct * (trackWidth - handleWidth) + 'px';
							trackWrapper.style.display = 'block';
						}

						if (data._prybar) {
							prybar = data._prybar;
							this.removeChild(prybar);
							if (settings.verticalScrolling) {
								prybar.style.width = this.scrollWidth + $(data.verticalTrackWrapper).find('.enscroll-track').outerWidth() + 'px';
								this.appendChild(prybar);
							}
						}
					}
					if (data.corner) {
						data.corner.style.display = data.verticalTrackWrapper && data.horizontalTrackWrapper && $(data.verticalTrackWrapper).is(':visible') && $(data.horizontalTrackWrapper).is(':visible') ? '' : 'none';
					}
				} else {
					if (settings.verticalScrolling) {
						data.verticalTrackWrapper.style.display = 'none';
					}
					if (settings.horizontalScrolling) {
						data.horizontalTrackWrapper.style.display = 'none';
					}
					if (data.corner) {
						data.corner.style.display = 'none';
					}
				}
			});
		},

		startPolling: function () {
			return this.each(function () {
				var data = $(this).data('enscroll'),
				    pane = this,
				    $pane = $(pane),
				    paneWidth = -1,
				    paneHeight = -1,
				    paneScrollWidth = -1,
				    paneScrollHeight = -1,
				    paneOffset,
				    paneChangeListener = function () {
					if (data.settings.pollChanges) {
						var sw = pane.scrollWidth,
						    sh = pane.scrollHeight,
						    pw = $pane.width(),
						    ph = $pane.height(),
						    offset = $pane.offset();

						if (data.settings.verticalScrolling && (ph !== paneHeight || sh !== paneScrollHeight) || data.settings.horizontalScrolling && (pw !== paneWidth || sw !== paneScrollWidth)) {
							paneScrollWidth = sw;
							paneScrollHeight = sh;

							api.resize.call($pane);
						}

						if (paneOffset.left !== offset.left || paneOffset.top !== offset.top || pw !== paneWidth || ph !== paneHeight) {

							paneOffset = offset;
							paneWidth = pw;
							paneHeight = ph;

							api.reposition.call($pane);
						}

						setTimeout(paneChangeListener, 350);
					}
				};

				if (data) {
					data.settings.pollChanges = true;
					paneScrollHeight = pane.scrollHeight;
					paneScrollWidth = pane.scrollWidth;
					paneOffset = $pane.offset();
					paneChangeListener();
				}
			});
		},

		stopPolling: function () {
			return this.each(function () {
				var data = $(this).data('enscroll');
				if (data) {
					data.settings.pollChanges = false;
				}
			});
		},

		destroy: function () {
			return this.each(function () {
				var $this = $(this),
				    data = $this.data('enscroll'),
				    trackWrapper,
				    mouseScrollHandler;
				if (data) {

					api.stopPolling.call($this);

					mouseScrollHandler = data._mouseScrollHandler;

					if (data.settings.verticalScrolling) {
						trackWrapper = data.verticalTrackWrapper;

						$(trackWrapper).remove();
						trackWrapper = null;
					}

					if (data.settings.horizontalScrolling) {
						trackWrapper = data.horizontalTrackWrapper;

						$(trackWrapper).remove();
						trackWrapper = null;
					}

					// clear the fade timer to prevent an error being thrown
					// when the plugin object is destroyed while the fading
					// scrollbar is visible - shoutout to gpurves
					if (data._fadeTimer) {
						clearTimeout(data._fadeTimer);
					}

					if (data.corner) {
						$(data.corner).remove();
					}

					if (data._prybar && data._prybar.parentNode && data._prybar.parentNode === this) {
						$(data._prybar).remove();
					}

					this.setAttribute('style', data._style || '');

					if (!data._hadTabIndex) {
						$this.removeAttr('tabindex');
					}

					$this.off('scroll.enscroll.pane').off('keydown.enscroll.pane').off('mouseenter.enscroll.pane').off('mousedown.enscroll.pane').data('enscroll', null);

					if (this.removeEventListener) {
						this.removeEventListener('wheel', mouseScrollHandler, false);
						this.removeEventListener('mousewheel', mouseScrollHandler, false);
						this.removeEventListener('touchstart', touchStart, false);
					} else if (this.detachEvent) {
						this.detachEvent('onmousewheel', mouseScrollHandler);
					}

					$(win).off('resize.enscroll.window');
				}
			});
		}
	};

	$.fn.enscroll = function (opts) {

		var settings;
		// handle API method calls
		if (api[opts]) {
			return api[opts].call(this);
		}
		// otherwise, initialize the enscroll element

		// use default settings, and overwrite defaults with options passed in
		settings = $.extend({}, defaultSettings, opts);

		return this.each(function () {

			// don't apply this plugin when both scrolling settings are false
			if (!settings.verticalScrolling && !settings.horizontalScrolling) {
				return;
			}

			var $this = $(this),
			    pane = this,
			    oldStyle = $this.attr('style'),
			    hadTabIndex = true,
			    horizontalTrackWrapper,
			    verticalTrackWrapper,
			    horizontalTrack,
			    verticalTrack,
			    horizontalHandle,
			    verticalHandle,
			    verticalUpButton,
			    verticalDownButton,
			    horizontalLeftButton,
			    horizontalRightButton,
			    trackHeight,
			    trackWidth,
			    corner,
			    outline,
			    tabindex,
			    outlineWidth,
			    prybar,
			    paddingSide,
			    trackWrapperCSS = {
				'position': 'absolute',
				'z-index': settings.zIndex,
				'margin': 0,
				'padding': 0
			},


			// closures to bind events to handlers
			mouseScrollHandler = function (event) {
				mouseScroll.call(pane, event);
			},
			    addHandleHTML = function (handle, html) {
				if (typeof html === 'string') {
					$(handle).html(html);
				} else {
					handle.appendChild(html);
				}
			};

			// if we want vertical scrolling, create and initialize
			// the horizontal scrollbar and its components
			if (settings.verticalScrolling) {
				verticalTrackWrapper = doc.createElement('div');
				verticalTrack = doc.createElement('div');
				verticalHandle = doc.createElement('a');

				$(verticalTrack).css('position', 'relative').addClass('enscroll-track').addClass(settings.verticalTrackClass).appendTo(verticalTrackWrapper);

				if (settings.drawScrollButtons) {
					verticalUpButton = doc.createElement('a');
					verticalDownButton = doc.createElement('a');

					$(verticalUpButton).css({
						'display': 'block',
						'text-decoration': 'none'
					}).attr('href', '').html('&nbsp;').addClass(settings.scrollUpButtonClass).on('click', function () {
						scrollVertical(pane, -settings.scrollIncrement);
						return false;
					}).insertBefore(verticalTrack);

					$(verticalDownButton).css({
						'display': 'block',
						'text-decoration': 'none'
					}).attr('href', '').html('&nbsp;').on('click', function () {
						scrollVertical(pane, settings.scrollIncrement);
						return false;
					}).addClass(settings.scrollDownButtonClass).appendTo(verticalTrackWrapper);
				}

				if (settings.clickTrackToScroll) {
					$(verticalTrack).on('click', function (event) {
						if (event.target === this) {
							scrollAnimateVertical($this, event.pageY > $(verticalHandle).offset().top ? $this.height() : -$this.height());
						}
					});
				}

				$(verticalHandle).css({
					'position': 'absolute',
					'z-index': 1
				}).attr('href', '').addClass(settings.verticalHandleClass).mousedown({ pane: this }, startVerticalDrag).click(function () {
					return false;
				}).appendTo(verticalTrack);

				addHandleHTML(verticalHandle, settings.verticalHandleHTML);

				$(verticalTrackWrapper).css(trackWrapperCSS).insertAfter(this);

				if (settings.showOnHover) {
					$(verticalTrackWrapper).css('opacity', 0).on('mouseover.enscroll.vertical', function () {
						showScrollbars.call(pane, false);
					}).on('mouseout.enscroll.vertical', function () {
						showScrollbars.call(pane);
					});
				}

				trackWidth = $(verticalTrack).outerWidth();

				// move the content in the pane over to make room for
				// the vertical scrollbar
				if (settings.addPaddingToPane) {
					if (settings.verticalScrollerSide === 'right') {
						paddingSide = {
							'padding-right': getComputedValue(this, 'padding-right') + trackWidth + 'px'
						};
					} else {
						paddingSide = {
							'padding-left': getComputedValue(this, 'padding-left') + trackWidth + 'px'
						};
					}

					$this.css($.extend({
						'width': $this.width() - trackWidth + 'px'
					}, paddingSide));
				}

				try {

					outlineWidth = parseInt($this.css('outline-width'), 10);

					if ((outlineWidth === 0 || isNaN(outlineWidth)) && $this.css('outline-style') === 'none') {
						$this.css('outline', 'none');
					}
				} catch (ex) {
					$this.css('outline', 'none');
				}
			}

			// if we want horizontal scrolling, create the elements for and
			// initialize the horizontal track and handle
			if (settings.horizontalScrolling) {
				horizontalTrackWrapper = doc.createElement('div');
				horizontalTrack = doc.createElement('div');
				horizontalHandle = doc.createElement('a');

				$(horizontalTrack).css({
					'position': 'relative',
					'z-index': 1
				}).addClass('enscroll-track').addClass(settings.horizontalTrackClass).appendTo(horizontalTrackWrapper);

				if (settings.drawScrollButtons) {
					horizontalLeftButton = doc.createElement('a');
					horizontalRightButton = doc.createElement('a');

					$(horizontalLeftButton).css('display', 'block').attr('href', '').on('click', function () {
						scrollHorizontal(pane, -settings.scrollIncrement);
						return false;
					}).addClass(settings.scrollLeftButtonClass).insertBefore(horizontalTrack);

					$(horizontalRightButton).css('display', 'block').attr('href', '').on('click', function () {
						scrollHorizontal(pane, settings.scrollIncrement);
						return false;
					}).addClass(settings.scrollRightButtonClass).appendTo(horizontalTrackWrapper);
				}

				if (settings.clickTrackToScroll) {
					$(horizontalTrack).on('click', function (event) {
						if (event.target === this) {
							scrollAnimateHorizontal($this, event.pageX > $(horizontalHandle).offset().left ? $this.width() : -$this.width());
						}
					});
				}

				$(horizontalHandle).css({
					'position': 'absolute',
					'z-index': 1
				}).attr('href', '').addClass(settings.horizontalHandleClass).click(function () {
					return false;
				}).mousedown({ pane: this }, startHorizontalDrag).appendTo(horizontalTrack);

				addHandleHTML(horizontalHandle, settings.horizontalHandleHTML);

				$(horizontalTrackWrapper).css(trackWrapperCSS).insertAfter(this);

				if (settings.showOnHover) {
					$(horizontalTrackWrapper).css('opacity', 0).on('mouseover.enscroll.horizontal', function () {
						showScrollbars.call(pane, false);
					}).on('mouseout.enscroll.horizontal', function () {
						showScrollbars.call(pane);
					});
				}

				trackHeight = $(horizontalTrack).outerHeight();

				if (settings.addPaddingToPane) {
					$this.css({
						'height': $this.height() - trackHeight + 'px',
						'padding-bottom': parseInt($this.css('padding-bottom'), 10) + trackHeight + 'px'
					});
				}

				// we need to add an element to the pane in order to
				// stretch to the scrollWidth of the pane so the content
				// scrolls horizontally beyond the vertical scrollbar
				prybar = document.createElement('div');
				$(prybar).css({
					'width': '1px',
					'height': '1px',
					'visibility': 'hidden',
					'padding': 0,
					'margin': '-1px'
				}).appendTo(this);
			}

			if (settings.verticalScrolling && settings.horizontalScrolling && settings.drawCorner) {
				corner = doc.createElement('div');
				$(corner).addClass(settings.cornerClass).css(trackWrapperCSS).insertAfter(this);
			}

			// add a tabindex attribute to the pane if it doesn't already have one
			// if the element does not have a tabindex in IE6, undefined is returned,
			// all other browsers return an empty string
			tabindex = $this.attr('tabindex');
			if (!tabindex) {
				$this.attr('tabindex', 0);
				hadTabIndex = false;
			}

			// if the outline style is not specified in IE6/7/8, null is returned
			// all other browsers return an empty string
			try {
				outline = $this.css('outline');
				if (!outline || outline.length < 1) {
					$this.css('outline', 'none');
				}
			} catch (ex) {
				$this.css('outline', 'none');
			}

			// register an handler that listens for the pane to scroll, and
			// sync the scrollbars' positions
			$this.on({
				'scroll.enscroll.pane': function (event) {
					paneScrolled.call(this, event);
				},
				'keydown.enscroll.pane': keyHandler,
				'mousedown.enscroll.pane': dragHandler
			}).css('overflow', 'hidden')
			// store the data we need for handling events and destruction
			.data('enscroll', {
				settings: settings,
				horizontalTrackWrapper: horizontalTrackWrapper,
				verticalTrackWrapper: verticalTrackWrapper,
				corner: corner,
				_prybar: prybar,
				_mouseScrollHandler: mouseScrollHandler,
				_hadTabIndex: hadTabIndex,
				_style: oldStyle,
				_scrollingX: false,
				_scrollingY: false,
				_startX: 0,
				_startY: 0,
				_endX: 0,
				_endY: 0,
				_duration: parseInt(settings.easingDuration / 16.66666, 10),
				_scrollHeightNoPadding: testScrollHeight(this.nodeName)
			});

			// reposition the scrollbars if the window is resized
			$(win).on('resize.enscroll.window', function () {
				api.reposition.call($this);
			});

			// if showOnHover is set, attach the hover listeners
			if (settings.showOnHover) {
				$this.on('mouseenter.enscroll.pane', function () {
					showScrollbars.call(this);
				});
			}

			// listen for mouse wheel and touch events and scroll appropriately
			if (this.addEventListener) {
				if ('onwheel' in this || 'WheelEvent' in win && navigator.userAgent.toLowerCase().indexOf('msie') >= 0) {
					this.addEventListener('wheel', mouseScrollHandler, false);
				} else if ('onmousewheel' in this) {
					this.addEventListener('mousewheel', mouseScrollHandler, false);
				}

				this.addEventListener('touchstart', touchStart, false);
			} else if (this.attachEvent) {
				// oldie love
				this.attachEvent('onmousewheel', mouseScrollHandler);
			}

			// start polling for changes in dimension and position
			if (settings.pollChanges) {
				api.startPolling.call($this);
			}

			api.resize.call($this);
			api.reposition.call($this);
		});
	};
})(jQuery, window, document);

/***/ }),

/***/ "./itcase_sphinx_theme/itcase/static/js/vendor/jquery.fancybox.js":
/***/ (function(module, exports) {

// ==================================================
// fancyBox v3.1.25
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2017 fancyApps
//
// ==================================================
;(function (window, document, $, undefined) {
    'use strict';

    // If there's no jQuery, fancyBox can't work
    // =========================================

    if (!$) {
        return;
    }

    // Check if fancyBox is already initialized
    // ========================================

    if ($.fn.fancybox) {

        $.error('fancyBox already initialized');

        return;
    }

    // Private default settings
    // ========================

    var defaults = {

        // Enable infinite gallery navigation
        loop: false,

        // Space around image, ignored if zoomed-in or viewport smaller than 800px
        margin: [44, 0],

        // Horizontal space between slides
        gutter: 50,

        // Enable keyboard navigation
        keyboard: true,

        // Should display navigation arrows at the screen edges
        arrows: true,

        // Should display infobar (counter and arrows at the top)
        infobar: false,

        // Should display toolbar (buttons at the top)
        toolbar: true,

        // What buttons should appear in the top right corner.
        // Buttons will be created using templates from `btnTpl` option
        // and they will be placed into toolbar (class="fancybox-toolbar"` element)
        buttons: ['slideShow', 'fullScreen', 'thumbs', 'close'],

        // Detect "idle" time in seconds
        idleTime: 4,

        // Should display buttons at top right corner of the content
        // If 'auto' - they will be created for content having type 'html', 'inline' or 'ajax'
        // Use template from `btnTpl.smallBtn` for customization
        smallBtn: 'auto',

        // Disable right-click and use simple image protection for images
        protect: false,

        // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
        modal: false,

        image: {

            // Wait for images to load before displaying
            // Requires predefined image dimensions
            // If 'auto' - will zoom in thumbnail if 'width' and 'height' attributes are found
            preload: "auto"

        },

        ajax: {

            // Object containing settings for ajax request
            settings: {

                // This helps to indicate that request comes from the modal
                // Feel free to change naming
                data: {
                    fancybox: true
                }
            }

        },

        iframe: {

            // Iframe template
            tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',

            // Preload iframe before displaying it
            // This allows to calculate iframe content width and height
            // (note: Due to "Same Origin Policy", you can't get cross domain data).
            preload: true,

            // Custom CSS styling for iframe wrapping element
            // You can use this to set custom iframe dimensions
            css: {},

            // Iframe tag attributes
            attr: {
                scrolling: 'auto'
            }

        },

        // Open/close animation type
        // Possible values:
        //   false            - disable
        //   "zoom"           - zoom images from/to thumbnail
        //   "fade"
        //   "zoom-in-out"
        //
        animationEffect: "zoom",

        // Duration in ms for open/close animation
        animationDuration: 366,

        // Should image change opacity while zooming
        // If opacity is 'auto', then opacity will be changed if image and thumbnail have different aspect ratios
        zoomOpacity: 'auto',

        // Transition effect between slides
        //
        // Possible values:
        //   false            - disable
        //   "fade'
        //   "slide'
        //   "circular'
        //   "tube'
        //   "zoom-in-out'
        //   "rotate'
        //
        transitionEffect: "fade",

        // Duration in ms for transition animation
        transitionDuration: 366,

        // Custom CSS class for slide element
        slideClass: '',

        // Custom CSS class for layout
        baseClass: '',

        // Base template for layout
        baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' + '<div class="fancybox-bg"></div>' + '<div class="fancybox-inner">' + '<div class="fancybox-infobar">' + '<button data-fancybox-prev title="{{PREV}}" class="fancybox-button fancybox-button--left"></button>' + '<div class="fancybox-infobar__body">' + '<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>' + '</div>' + '<button data-fancybox-next title="{{NEXT}}" class="fancybox-button fancybox-button--right"></button>' + '</div>' + '<div class="fancybox-toolbar">' + '{{BUTTONS}}' + '</div>' + '<div class="fancybox-navigation">' + '<button data-fancybox-prev title="{{PREV}}" class="fancybox-arrow fancybox-arrow--left" />' + '<button data-fancybox-next title="{{NEXT}}" class="fancybox-arrow fancybox-arrow--right" />' + '</div>' + '<div class="fancybox-stage"></div>' + '<div class="fancybox-caption-wrap">' + '<div class="fancybox-caption"></div>' + '</div>' + '</div>' + '</div>',

        // Loading indicator template
        spinnerTpl: '<div class="fancybox-loading"></div>',

        // Error message template
        errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>',

        btnTpl: {
            slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"></button>',
            fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"></button>',
            thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"></button>',
            close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',

            // This small close button will be appended to your html/inline/ajax content by default,
            // if "smallBtn" option is not set to false
            smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>'
        },

        // Container is injected into this element
        parentEl: 'body',

        // Focus handling
        // ==============

        // Try to focus on the first focusable element after opening
        autoFocus: true,

        // Put focus back to active element after closing
        backFocus: true,

        // Do not let user to focus on element outside modal content
        trapFocus: true,

        // Module specific options
        // =======================

        fullScreen: {
            autoStart: false
        },

        touch: {
            vertical: true, // Allow to drag content vertically
            momentum: true // Continue movement after releasing mouse/touch when panning
        },

        // Hash value when initializing manually,
        // set `false` to disable hash change
        hash: null,

        // Customize or add new media types
        // Example:
        /*
        media : {
            youtube : {
                params : {
                    autoplay : 0
                }
            }
        }
        */
        media: {},

        slideShow: {
            autoStart: false,
            speed: 4000
        },

        thumbs: {
            autoStart: false, // Display thumbnails on opening
            hideOnClose: true // Hide thumbnail grid when closing animation starts
        },

        // Callbacks
        //==========

        // See Documentation/API/Events for more information
        // Example:
        /*
            afterShow: function( instance, current ) {
                 console.info( 'Clicked element:' );
                 console.info( current.opts.$orig );
            }
        */

        onInit: $.noop, // When instance has been initialized

        beforeLoad: $.noop, // Before the content of a slide is being loaded
        afterLoad: $.noop, // When the content of a slide is done loading

        beforeShow: $.noop, // Before open animation starts
        afterShow: $.noop, // When content is done loading and animating

        beforeClose: $.noop, // Before the instance attempts to close. Return false to cancel the close.
        afterClose: $.noop, // After instance has been closed

        onActivate: $.noop, // When instance is brought to front
        onDeactivate: $.noop, // When other instance has been activated


        // Interaction
        // ===========

        // Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
        // each option can be string or method that returns value.
        //
        // Possible values:
        //   "close"           - close instance
        //   "next"            - move to next gallery item
        //   "nextOrClose"     - move to next gallery item or close if gallery has only one item
        //   "toggleControls"  - show/hide controls
        //   "zoom"            - zoom image (if loaded)
        //   false             - do nothing

        // Clicked on the content
        clickContent: function (current, event) {
            return current.type === 'image' ? 'zoom' : false;
        },

        // Clicked on the slide
        clickSlide: 'close',

        // Clicked on the background (backdrop) element
        clickOutside: 'close',

        // Same as previous two, but for double click
        dblclickContent: false,
        dblclickSlide: false,
        dblclickOutside: false,

        // Custom options when mobile device is detected
        // =============================================

        mobile: {
            clickContent: function (current, event) {
                return current.type === 'image' ? 'toggleControls' : false;
            },
            clickSlide: function (current, event) {
                return current.type === 'image' ? 'toggleControls' : "close";
            },
            dblclickContent: function (current, event) {
                return current.type === 'image' ? 'zoom' : false;
            },
            dblclickSlide: function (current, event) {
                return current.type === 'image' ? 'zoom' : false;
            }
        },

        // Internationalization
        // ============

        lang: 'en',
        i18n: {
            'en': {
                CLOSE: 'Close',
                NEXT: 'Next',
                PREV: 'Previous',
                ERROR: 'The requested content cannot be loaded. <br/> Please try again later.',
                PLAY_START: 'Start slideshow',
                PLAY_STOP: 'Pause slideshow',
                FULL_SCREEN: 'Full screen',
                THUMBS: 'Thumbnails'
            },
            'de': {
                CLOSE: 'Schliessen',
                NEXT: 'Weiter',
                PREV: 'Zurück',
                ERROR: 'Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.',
                PLAY_START: 'Diaschau starten',
                PLAY_STOP: 'Diaschau beenden',
                FULL_SCREEN: 'Vollbild',
                THUMBS: 'Vorschaubilder'
            }
        }

    };

    // Few useful variables and methods
    // ================================

    var $W = $(window);
    var $D = $(document);

    var called = 0;

    // Check if an object is a jQuery object and not a native JavaScript object
    // ========================================================================

    var isQuery = function (obj) {
        return obj && obj.hasOwnProperty && obj instanceof $;
    };

    // Handle multiple browsers for "requestAnimationFrame" and "cancelAnimationFrame"
    // ===============================================================================

    var requestAFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
        // if all else fails, use setTimeout
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    }();

    // Detect the supported transition-end event property name
    // =======================================================

    var transitionEnd = function () {
        var t,
            el = document.createElement("fakeelement");

        var transitions = {
            "transition": "transitionend",
            "OTransition": "oTransitionEnd",
            "MozTransition": "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
        };

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }();

    // Force redraw on an element.
    // This helps in cases where the browser doesn't redraw an updated element properly.
    // =================================================================================

    var forceRedraw = function ($el) {
        return $el && $el.length && $el[0].offsetHeight;
    };

    // Class definition
    // ================

    var FancyBox = function (content, opts, index) {
        var self = this;

        self.opts = $.extend(true, { index: index }, defaults, opts || {});

        // Exclude buttons option from deep merging
        if (opts && $.isArray(opts.buttons)) {
            self.opts.buttons = opts.buttons;
        }

        self.id = self.opts.id || ++called;
        self.group = [];

        self.currIndex = parseInt(self.opts.index, 10) || 0;
        self.prevIndex = null;

        self.prevPos = null;
        self.currPos = 0;

        self.firstRun = null;

        // Create group elements from original item collection
        self.createGroup(content);

        if (!self.group.length) {
            return;
        }

        // Save last active element and current scroll position
        self.$lastFocus = $(document.activeElement).blur();

        // Collection of gallery objects
        self.slides = {};

        self.init(content);
    };

    $.extend(FancyBox.prototype, {

        // Create DOM structure
        // ====================

        init: function () {
            var self = this;

            var testWidth, $container, buttonStr;

            var firstItemOpts = self.group[self.currIndex].opts;

            self.scrollTop = $D.scrollTop();
            self.scrollLeft = $D.scrollLeft();

            // Hide scrollbars
            // ===============

            if (!$.fancybox.getInstance() && !$.fancybox.isMobile && $('body').css('overflow') !== 'hidden') {
                testWidth = $('body').width();

                $('html').addClass('fancybox-enabled');

                // Compare body width after applying "overflow: hidden"
                testWidth = $('body').width() - testWidth;

                // If width has changed - compensate missing scrollbars by adding right margin
                if (testWidth > 1) {
                    $('head').append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar, .fancybox-enabled body { margin-right: ' + testWidth + 'px; }</style>');
                }
            }

            // Build html markup and set references
            // ====================================

            // Build html code for buttons and insert into main template
            buttonStr = '';

            $.each(firstItemOpts.buttons, function (index, value) {
                buttonStr += firstItemOpts.btnTpl[value] || '';
            });

            // Create markup from base template, it will be initially hidden to
            // avoid unnecessary work like painting while initializing is not complete
            $container = $(self.translate(self, firstItemOpts.baseTpl.replace('\{\{BUTTONS\}\}', buttonStr))).addClass('fancybox-is-hidden').attr('id', 'fancybox-container-' + self.id).addClass(firstItemOpts.baseClass).data('FancyBox', self).prependTo(firstItemOpts.parentEl);

            // Create object holding references to jQuery wrapped nodes
            self.$refs = {
                container: $container
            };

            ['bg', 'inner', 'infobar', 'toolbar', 'stage', 'caption'].forEach(function (item) {
                self.$refs[item] = $container.find('.fancybox-' + item);
            });

            // Check for redundant elements
            if (!firstItemOpts.arrows || self.group.length < 2) {
                $container.find('.fancybox-navigation').remove();
            }

            if (!firstItemOpts.infobar) {
                self.$refs.infobar.remove();
            }

            if (!firstItemOpts.toolbar) {
                self.$refs.toolbar.remove();
            }

            self.trigger('onInit');

            // Bring to front and enable events
            self.activate();

            // Build slides, load and reveal content
            self.jumpTo(self.currIndex);
        },

        // Simple i18n support - replaces object keys found in template
        // with corresponding values
        // ============================================================

        translate: function (obj, str) {
            var arr = obj.opts.i18n[obj.opts.lang];

            return str.replace(/\{\{(\w+)\}\}/g, function (match, n) {
                var value = arr[n];

                if (value === undefined) {
                    return match;
                }

                return value;
            });
        },

        // Create array of gally item objects
        // Check if each object has valid type and content
        // ===============================================

        createGroup: function (content) {
            var self = this;
            var items = $.makeArray(content);

            $.each(items, function (i, item) {
                var obj = {},
                    opts = {},
                    data = [],
                    $item,
                    type,
                    src,
                    srcParts;

                // Step 1 - Make sure we have an object
                // ====================================

                if ($.isPlainObject(item)) {

                    // We probably have manual usage here, something like
                    // $.fancybox.open( [ { src : "image.jpg", type : "image" } ] )

                    obj = item;
                    opts = item.opts || item;
                } else if ($.type(item) === 'object' && $(item).length) {

                    // Here we propbably have jQuery collection returned by some selector

                    $item = $(item);
                    data = $item.data();

                    opts = 'options' in data ? data.options : {};
                    opts = $.type(opts) === 'object' ? opts : {};

                    obj.src = 'src' in data ? data.src : opts.src || $item.attr('href');

                    ['width', 'height', 'thumb', 'type', 'filter'].forEach(function (item) {
                        if (item in data) {
                            opts[item] = data[item];
                        }
                    });

                    if ('srcset' in data) {
                        opts.image = { srcset: data.srcset };
                    }

                    opts.$orig = $item;

                    if (!obj.type && !obj.src) {
                        obj.type = 'inline';
                        obj.src = item;
                    }
                } else {

                    // Assume we have a simple html code, for example:
                    // $.fancybox.open( '<div><h1>Hi!</h1></div>' );

                    obj = {
                        type: 'html',
                        src: item + ''
                    };
                }

                // Each gallery object has full collection of options
                obj.opts = $.extend(true, {}, self.opts, opts);

                if ($.fancybox.isMobile) {
                    obj.opts = $.extend(true, {}, obj.opts, obj.opts.mobile);
                }

                // Step 2 - Make sure we have content type, if not - try to guess
                // ==============================================================

                type = obj.type || obj.opts.type;
                src = obj.src || '';

                if (!type && src) {
                    if (src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)) {
                        type = 'image';
                    } else if (src.match(/\.(pdf)((\?|#).*)?$/i)) {
                        type = 'pdf';
                    } else if (src.charAt(0) === '#') {
                        type = 'inline';
                    }
                }

                obj.type = type;

                // Step 3 - Some adjustments
                // =========================

                obj.index = self.group.length;

                // Check if $orig and $thumb objects exist
                if (obj.opts.$orig && !obj.opts.$orig.length) {
                    delete obj.opts.$orig;
                }

                if (!obj.opts.$thumb && obj.opts.$orig) {
                    obj.opts.$thumb = obj.opts.$orig.find('img:first');
                }

                if (obj.opts.$thumb && !obj.opts.$thumb.length) {
                    delete obj.opts.$thumb;
                }

                // Caption is a "special" option, it can be passed as a method
                if ($.type(obj.opts.caption) === 'function') {
                    obj.opts.caption = obj.opts.caption.apply(item, [self, obj]);
                } else if ('caption' in data) {
                    obj.opts.caption = data.caption;
                }

                // Make sure we have caption as a string
                obj.opts.caption = obj.opts.caption === undefined ? '' : obj.opts.caption + '';

                // Check if url contains "filter" used to filter the content
                // Example: "ajax.html #something"
                if (type === 'ajax') {
                    srcParts = src.split(/\s+/, 2);

                    if (srcParts.length > 1) {
                        obj.src = srcParts.shift();

                        obj.opts.filter = srcParts.shift();
                    }
                }

                if (obj.opts.smallBtn == 'auto') {

                    if ($.inArray(type, ['html', 'inline', 'ajax']) > -1) {
                        obj.opts.toolbar = false;
                        obj.opts.smallBtn = true;
                    } else {
                        obj.opts.smallBtn = false;
                    }
                }

                // If the type is "pdf", then simply load file into iframe
                if (type === 'pdf') {
                    obj.type = 'iframe';

                    obj.opts.iframe.preload = false;
                }

                // Hide all buttons and disable interactivity for modal items
                if (obj.opts.modal) {

                    obj.opts = $.extend(true, obj.opts, {
                        // Remove buttons
                        infobar: 0,
                        toolbar: 0,

                        smallBtn: 0,

                        // Disable keyboard navigation
                        keyboard: 0,

                        // Disable some modules
                        slideShow: 0,
                        fullScreen: 0,
                        thumbs: 0,
                        touch: 0,

                        // Disable click event handlers
                        clickContent: false,
                        clickSlide: false,
                        clickOutside: false,
                        dblclickContent: false,
                        dblclickSlide: false,
                        dblclickOutside: false
                    });
                }

                // Step 4 - Add processed object to group
                // ======================================

                self.group.push(obj);
            });
        },

        // Attach an event handler functions for:
        //   - navigation buttons
        //   - browser scrolling, resizing;
        //   - focusing
        //   - keyboard
        //   - detect idle
        // ======================================

        addEvents: function () {
            var self = this;

            self.removeEvents();

            // Make navigation elements clickable
            self.$refs.container.on('click.fb-close', '[data-fancybox-close]', function (e) {
                e.stopPropagation();
                e.preventDefault();

                self.close(e);
            }).on('click.fb-prev touchend.fb-prev', '[data-fancybox-prev]', function (e) {
                e.stopPropagation();
                e.preventDefault();

                self.previous();
            }).on('click.fb-next touchend.fb-next', '[data-fancybox-next]', function (e) {
                e.stopPropagation();
                e.preventDefault();

                self.next();
            });

            // Handle page scrolling and browser resizing
            $W.on('orientationchange.fb resize.fb', function (e) {

                if (e && e.originalEvent && e.originalEvent.type === "resize") {

                    requestAFrame(function () {
                        self.update();
                    });
                } else {

                    self.$refs.stage.hide();

                    setTimeout(function () {
                        self.$refs.stage.show();

                        self.update();
                    }, 500);
                }
            });

            // Trap keyboard focus inside of the modal, so the user does not accidentally tab outside of the modal
            // (a.k.a. "escaping the modal")
            $D.on('focusin.fb', function (e) {
                var instance = $.fancybox ? $.fancybox.getInstance() : null;

                if (instance.isClosing || !instance.current || !instance.current.opts.trapFocus || $(e.target).hasClass('fancybox-container') || $(e.target).is(document)) {
                    return;
                }

                if (instance && $(e.target).css('position') !== 'fixed' && !instance.$refs.container.has(e.target).length) {
                    e.stopPropagation();

                    instance.focus();

                    // Sometimes page gets scrolled, set it back
                    $W.scrollTop(self.scrollTop).scrollLeft(self.scrollLeft);
                }
            });

            // Enable keyboard navigation
            $D.on('keydown.fb', function (e) {
                var current = self.current,
                    keycode = e.keyCode || e.which;

                if (!current || !current.opts.keyboard) {
                    return;
                }

                if ($(e.target).is('input') || $(e.target).is('textarea')) {
                    return;
                }

                // Backspace and Esc keys
                if (keycode === 8 || keycode === 27) {
                    e.preventDefault();

                    self.close(e);

                    return;
                }

                // Left arrow and Up arrow
                if (keycode === 37 || keycode === 38) {
                    e.preventDefault();

                    self.previous();

                    return;
                }

                // Righ arrow and Down arrow
                if (keycode === 39 || keycode === 40) {
                    e.preventDefault();

                    self.next();

                    return;
                }

                self.trigger('afterKeydown', e, keycode);
            });

            // Hide controls after some inactivity period
            if (self.group[self.currIndex].opts.idleTime) {
                self.idleSecondsCounter = 0;

                $D.on('mousemove.fb-idle mouseenter.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle', function () {
                    self.idleSecondsCounter = 0;

                    if (self.isIdle) {
                        self.showControls();
                    }

                    self.isIdle = false;
                });

                self.idleInterval = window.setInterval(function () {

                    self.idleSecondsCounter++;

                    if (self.idleSecondsCounter >= self.group[self.currIndex].opts.idleTime) {
                        self.isIdle = true;
                        self.idleSecondsCounter = 0;

                        self.hideControls();
                    }
                }, 1000);
            }
        },

        // Remove events added by the core
        // ===============================

        removeEvents: function () {
            var self = this;

            $W.off('orientationchange.fb resize.fb');
            $D.off('focusin.fb keydown.fb .fb-idle');

            this.$refs.container.off('.fb-close .fb-prev .fb-next');

            if (self.idleInterval) {
                window.clearInterval(self.idleInterval);

                self.idleInterval = null;
            }
        },

        // Change to previous gallery item
        // ===============================

        previous: function (duration) {
            return this.jumpTo(this.currPos - 1, duration);
        },

        // Change to next gallery item
        // ===========================

        next: function (duration) {
            return this.jumpTo(this.currPos + 1, duration);
        },

        // Switch to selected gallery item
        // ===============================

        jumpTo: function (pos, duration, slide) {
            var self = this,
                firstRun,
                loop,
                current,
                previous,
                canvasWidth,
                currentPos,
                transitionProps;

            var groupLen = self.group.length;

            if (self.isSliding || self.isClosing || self.isAnimating && self.firstRun) {
                return;
            }

            pos = parseInt(pos, 10);
            loop = self.current ? self.current.opts.loop : self.opts.loop;

            if (!loop && (pos < 0 || pos >= groupLen)) {
                return false;
            }

            firstRun = self.firstRun = self.firstRun === null;

            if (groupLen < 2 && !firstRun && !!self.isSliding) {
                return;
            }

            previous = self.current;

            self.prevIndex = self.currIndex;
            self.prevPos = self.currPos;

            // Create slides
            current = self.createSlide(pos);

            if (groupLen > 1) {
                if (loop || current.index > 0) {
                    self.createSlide(pos - 1);
                }

                if (loop || current.index < groupLen - 1) {
                    self.createSlide(pos + 1);
                }
            }

            self.current = current;
            self.currIndex = current.index;
            self.currPos = current.pos;

            self.trigger('beforeShow', firstRun);

            self.updateControls();

            currentPos = $.fancybox.getTranslate(current.$slide);

            current.isMoved = (currentPos.left !== 0 || currentPos.top !== 0) && !current.$slide.hasClass('fancybox-animated');
            current.forcedDuration = undefined;

            if ($.isNumeric(duration)) {
                current.forcedDuration = duration;
            } else {
                duration = current.opts[firstRun ? 'animationDuration' : 'transitionDuration'];
            }

            duration = parseInt(duration, 10);

            // Fresh start - reveal container, current slide and start loading content
            if (firstRun) {

                if (current.opts.animationEffect && duration) {
                    self.$refs.container.css('transition-duration', duration + 'ms');
                }

                self.$refs.container.removeClass('fancybox-is-hidden');

                forceRedraw(self.$refs.container);

                self.$refs.container.addClass('fancybox-is-open');

                // Make first slide visible (to display loading icon, if needed)
                current.$slide.addClass('fancybox-slide--current');

                self.loadSlide(current);

                self.preload();

                return;
            }

            // Clean up
            $.each(self.slides, function (index, slide) {
                $.fancybox.stop(slide.$slide);
            });

            // Make current that slide is visible even if content is still loading
            current.$slide.removeClass('fancybox-slide--next fancybox-slide--previous').addClass('fancybox-slide--current');

            // If slides have been dragged, animate them to correct position
            if (current.isMoved) {
                canvasWidth = Math.round(current.$slide.width());

                $.each(self.slides, function (index, slide) {
                    var pos = slide.pos - current.pos;

                    $.fancybox.animate(slide.$slide, {
                        top: 0,
                        left: pos * canvasWidth + pos * slide.opts.gutter
                    }, duration, function () {

                        slide.$slide.removeAttr('style').removeClass('fancybox-slide--next fancybox-slide--previous');

                        if (slide.pos === self.currPos) {
                            current.isMoved = false;

                            self.complete();
                        }
                    });
                });
            } else {
                self.$refs.stage.children().removeAttr('style');
            }

            // Start transition that reveals current content
            // or wait when it will be loaded

            if (current.isLoaded) {
                self.revealContent(current);
            } else {
                self.loadSlide(current);
            }

            self.preload();

            if (previous.pos === current.pos) {
                return;
            }

            // Handle previous slide
            // =====================

            transitionProps = 'fancybox-slide--' + (previous.pos > current.pos ? 'next' : 'previous');

            previous.$slide.removeClass('fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous');

            previous.isComplete = false;

            if (!duration || !current.isMoved && !current.opts.transitionEffect) {
                return;
            }

            if (current.isMoved) {
                previous.$slide.addClass(transitionProps);
            } else {

                transitionProps = 'fancybox-animated ' + transitionProps + ' fancybox-fx-' + current.opts.transitionEffect;

                $.fancybox.animate(previous.$slide, transitionProps, duration, function () {
                    previous.$slide.removeClass(transitionProps).removeAttr('style');
                });
            }
        },

        // Create new "slide" element
        // These are gallery items  that are actually added to DOM
        // =======================================================

        createSlide: function (pos) {

            var self = this;
            var $slide;
            var index;

            index = pos % self.group.length;
            index = index < 0 ? self.group.length + index : index;

            if (!self.slides[pos] && self.group[index]) {
                $slide = $('<div class="fancybox-slide"></div>').appendTo(self.$refs.stage);

                self.slides[pos] = $.extend(true, {}, self.group[index], {
                    pos: pos,
                    $slide: $slide,
                    isLoaded: false
                });

                self.updateSlide(self.slides[pos]);
            }

            return self.slides[pos];
        },

        // Scale image to the actual size of the image
        // ===========================================

        scaleToActual: function (x, y, duration) {

            var self = this;

            var current = self.current;
            var $what = current.$content;

            var imgPos, posX, posY, scaleX, scaleY;

            var canvasWidth = parseInt(current.$slide.width(), 10);
            var canvasHeight = parseInt(current.$slide.height(), 10);

            var newImgWidth = current.width;
            var newImgHeight = current.height;

            if (!(current.type == 'image' && !current.hasError) || !$what || self.isAnimating) {
                return;
            }

            $.fancybox.stop($what);

            self.isAnimating = true;

            x = x === undefined ? canvasWidth * 0.5 : x;
            y = y === undefined ? canvasHeight * 0.5 : y;

            imgPos = $.fancybox.getTranslate($what);

            scaleX = newImgWidth / imgPos.width;
            scaleY = newImgHeight / imgPos.height;

            // Get center position for original image
            posX = canvasWidth * 0.5 - newImgWidth * 0.5;
            posY = canvasHeight * 0.5 - newImgHeight * 0.5;

            // Make sure image does not move away from edges
            if (newImgWidth > canvasWidth) {
                posX = imgPos.left * scaleX - (x * scaleX - x);

                if (posX > 0) {
                    posX = 0;
                }

                if (posX < canvasWidth - newImgWidth) {
                    posX = canvasWidth - newImgWidth;
                }
            }

            if (newImgHeight > canvasHeight) {
                posY = imgPos.top * scaleY - (y * scaleY - y);

                if (posY > 0) {
                    posY = 0;
                }

                if (posY < canvasHeight - newImgHeight) {
                    posY = canvasHeight - newImgHeight;
                }
            }

            self.updateCursor(newImgWidth, newImgHeight);

            $.fancybox.animate($what, {
                top: posY,
                left: posX,
                scaleX: scaleX,
                scaleY: scaleY
            }, duration || 330, function () {
                self.isAnimating = false;
            });

            // Stop slideshow
            if (self.SlideShow && self.SlideShow.isActive) {
                self.SlideShow.stop();
            }
        },

        // Scale image to fit inside parent element
        // ========================================

        scaleToFit: function (duration) {

            var self = this;

            var current = self.current;
            var $what = current.$content;
            var end;

            if (!(current.type == 'image' && !current.hasError) || !$what || self.isAnimating) {
                return;
            }

            $.fancybox.stop($what);

            self.isAnimating = true;

            end = self.getFitPos(current);

            self.updateCursor(end.width, end.height);

            $.fancybox.animate($what, {
                top: end.top,
                left: end.left,
                scaleX: end.width / $what.width(),
                scaleY: end.height / $what.height()
            }, duration || 330, function () {
                self.isAnimating = false;
            });
        },

        // Calculate image size to fit inside viewport
        // ===========================================

        getFitPos: function (slide) {
            var self = this;
            var $what = slide.$content;

            var imgWidth = slide.width;
            var imgHeight = slide.height;

            var margin = slide.opts.margin;

            var canvasWidth, canvasHeight, minRatio, width, height;

            if (!$what || !$what.length || !imgWidth && !imgHeight) {
                return false;
            }

            // Convert "margin to CSS style: [ top, right, bottom, left ]
            if ($.type(margin) === "number") {
                margin = [margin, margin];
            }

            if (margin.length == 2) {
                margin = [margin[0], margin[1], margin[0], margin[1]];
            }

            if ($W.width() < 800) {
                margin = [0, 0, 0, 0];
            }

            // We can not use $slide width here, because it can have different diemensions while in transiton
            canvasWidth = parseInt(self.$refs.stage.width(), 10) - (margin[1] + margin[3]);
            canvasHeight = parseInt(self.$refs.stage.height(), 10) - (margin[0] + margin[2]);

            minRatio = Math.min(1, canvasWidth / imgWidth, canvasHeight / imgHeight);

            width = Math.floor(minRatio * imgWidth);
            height = Math.floor(minRatio * imgHeight);

            // Use floor rounding to make sure it really fits
            return {
                top: Math.floor((canvasHeight - height) * 0.5) + margin[0],
                left: Math.floor((canvasWidth - width) * 0.5) + margin[3],
                width: width,
                height: height
            };
        },

        // Update position and content of all slides
        // =========================================

        update: function () {

            var self = this;

            $.each(self.slides, function (key, slide) {
                self.updateSlide(slide);
            });
        },

        // Update slide position and scale content to fit
        // ==============================================

        updateSlide: function (slide) {

            var self = this;
            var $what = slide.$content;

            if ($what && (slide.width || slide.height)) {
                $.fancybox.stop($what);

                $.fancybox.setTranslate($what, self.getFitPos(slide));

                if (slide.pos === self.currPos) {
                    self.updateCursor();
                }
            }

            slide.$slide.trigger('refresh');

            self.trigger('onUpdate', slide);
        },

        // Update cursor style depending if content can be zoomed
        // ======================================================

        updateCursor: function (nextWidth, nextHeight) {

            var self = this;
            var isScaledDown;

            var $container = self.$refs.container.removeClass('fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut');

            if (!self.current || self.isClosing) {
                return;
            }

            if (self.isZoomable()) {

                $container.addClass('fancybox-is-zoomable');

                if (nextWidth !== undefined && nextHeight !== undefined) {
                    isScaledDown = nextWidth < self.current.width && nextHeight < self.current.height;
                } else {
                    isScaledDown = self.isScaledDown();
                }

                if (isScaledDown) {

                    // If image is scaled down, then, obviously, it can be zoomed to full size
                    $container.addClass('fancybox-can-zoomIn');
                } else {

                    if (self.current.opts.touch) {

                        // If image size ir largen than available available and touch module is not disable,
                        // then user can do panning
                        $container.addClass('fancybox-can-drag');
                    } else {
                        $container.addClass('fancybox-can-zoomOut');
                    }
                }
            } else if (self.current.opts.touch) {
                $container.addClass('fancybox-can-drag');
            }
        },

        // Check if current slide is zoomable
        // ==================================

        isZoomable: function () {

            var self = this;

            var current = self.current;
            var fitPos;

            if (!current || self.isClosing) {
                return;
            }

            // Assume that slide is zoomable if
            //   - image is loaded successfuly
            //   - click action is "zoom"
            //   - actual size of the image is smaller than available area
            if (current.type === 'image' && current.isLoaded && !current.hasError && (current.opts.clickContent === 'zoom' || $.isFunction(current.opts.clickContent) && current.opts.clickContent(current) === "zoom")) {

                fitPos = self.getFitPos(current);

                if (current.width > fitPos.width || current.height > fitPos.height) {
                    return true;
                }
            }

            return false;
        },

        // Check if current image dimensions are smaller than actual
        // =========================================================

        isScaledDown: function () {

            var self = this;

            var current = self.current;
            var $what = current.$content;

            var rez = false;

            if ($what) {
                rez = $.fancybox.getTranslate($what);
                rez = rez.width < current.width || rez.height < current.height;
            }

            return rez;
        },

        // Check if image dimensions exceed parent element
        // ===============================================

        canPan: function () {

            var self = this;

            var current = self.current;
            var $what = current.$content;

            var rez = false;

            if ($what) {
                rez = self.getFitPos(current);
                rez = Math.abs($what.width() - rez.width) > 1 || Math.abs($what.height() - rez.height) > 1;
            }

            return rez;
        },

        // Load content into the slide
        // ===========================

        loadSlide: function (slide) {

            var self = this,
                type,
                $slide;
            var ajaxLoad;

            if (slide.isLoading) {
                return;
            }

            if (slide.isLoaded) {
                return;
            }

            slide.isLoading = true;

            self.trigger('beforeLoad', slide);

            type = slide.type;
            $slide = slide.$slide;

            $slide.off('refresh').trigger('onReset').addClass('fancybox-slide--' + (type || 'unknown')).addClass(slide.opts.slideClass);

            // Create content depending on the type

            switch (type) {

                case 'image':

                    self.setImage(slide);

                    break;

                case 'iframe':

                    self.setIframe(slide);

                    break;

                case 'html':

                    self.setContent(slide, slide.src || slide.content);

                    break;

                case 'inline':

                    if ($(slide.src).length) {
                        self.setContent(slide, $(slide.src));
                    } else {
                        self.setError(slide);
                    }

                    break;

                case 'ajax':

                    self.showLoading(slide);

                    ajaxLoad = $.ajax($.extend({}, slide.opts.ajax.settings, {
                        url: slide.src,
                        success: function (data, textStatus) {

                            if (textStatus === 'success') {
                                self.setContent(slide, data);
                            }
                        },
                        error: function (jqXHR, textStatus) {

                            if (jqXHR && textStatus !== 'abort') {
                                self.setError(slide);
                            }
                        }
                    }));

                    $slide.one('onReset', function () {
                        ajaxLoad.abort();
                    });

                    break;

                default:

                    self.setError(slide);

                    break;

            }

            return true;
        },

        // Use thumbnail image, if possible
        // ================================

        setImage: function (slide) {

            var self = this;
            var srcset = slide.opts.image.srcset;

            var found, temp, pxRatio, windowWidth;

            // If we have "srcset", then we need to find matching "src" value.
            // This is necessary, because when you set an src attribute, the browser will preload the image
            // before any javascript or even CSS is applied.
            if (srcset) {
                pxRatio = window.devicePixelRatio || 1;
                windowWidth = window.innerWidth * pxRatio;

                temp = srcset.split(',').map(function (el) {
                    var ret = {};

                    el.trim().split(/\s+/).forEach(function (el, i) {
                        var value = parseInt(el.substring(0, el.length - 1), 10);

                        if (i === 0) {
                            return ret.url = el;
                        }

                        if (value) {
                            ret.value = value;
                            ret.postfix = el[el.length - 1];
                        }
                    });

                    return ret;
                });

                // Sort by value
                temp.sort(function (a, b) {
                    return a.value - b.value;
                });

                // Ok, now we have an array of all srcset values
                for (var j = 0; j < temp.length; j++) {
                    var el = temp[j];

                    if (el.postfix === 'w' && el.value >= windowWidth || el.postfix === 'x' && el.value >= pxRatio) {
                        found = el;
                        break;
                    }
                }

                // If not found, take the last one
                if (!found && temp.length) {
                    found = temp[temp.length - 1];
                }

                if (found) {
                    slide.src = found.url;

                    // If we have default width/height values, we can calculate height for matching source
                    if (slide.width && slide.height && found.postfix == 'w') {
                        slide.height = slide.width / slide.height * found.value;
                        slide.width = found.value;
                    }
                }
            }

            // This will be wrapper containing both ghost and actual image
            slide.$content = $('<div class="fancybox-image-wrap"></div>').addClass('fancybox-is-hidden').appendTo(slide.$slide);

            // If we have a thumbnail, we can display it while actual image is loading
            // Users will not stare at black screen and actual image will appear gradually
            if (slide.opts.preload !== false && slide.opts.width && slide.opts.height && (slide.opts.thumb || slide.opts.$thumb)) {

                slide.width = slide.opts.width;
                slide.height = slide.opts.height;

                slide.$ghost = $('<img />').one('error', function () {

                    $(this).remove();

                    slide.$ghost = null;

                    self.setBigImage(slide);
                }).one('load', function () {

                    self.afterLoad(slide);

                    self.setBigImage(slide);
                }).addClass('fancybox-image').appendTo(slide.$content).attr('src', slide.opts.thumb || slide.opts.$thumb.attr('src'));
            } else {

                self.setBigImage(slide);
            }
        },

        // Create full-size image
        // ======================

        setBigImage: function (slide) {
            var self = this;
            var $img = $('<img />');

            slide.$image = $img.one('error', function () {

                self.setError(slide);
            }).one('load', function () {

                // Clear timeout that checks if loading icon needs to be displayed
                clearTimeout(slide.timouts);

                slide.timouts = null;

                if (self.isClosing) {
                    return;
                }

                slide.width = this.naturalWidth;
                slide.height = this.naturalHeight;

                if (slide.opts.image.srcset) {
                    $img.attr('sizes', '100vw').attr('srcset', slide.opts.image.srcset);
                }

                self.hideLoading(slide);

                if (slide.$ghost) {

                    slide.timouts = setTimeout(function () {
                        slide.timouts = null;

                        slide.$ghost.hide();
                    }, Math.min(300, Math.max(1000, slide.height / 1600)));
                } else {
                    self.afterLoad(slide);
                }
            }).addClass('fancybox-image').attr('src', slide.src).appendTo(slide.$content);

            if ($img[0].complete) {
                $img.trigger('load');
            } else if ($img[0].error) {
                $img.trigger('error');
            } else {

                slide.timouts = setTimeout(function () {
                    if (!$img[0].complete && !slide.hasError) {
                        self.showLoading(slide);
                    }
                }, 100);
            }
        },

        // Create iframe wrapper, iframe and bindings
        // ==========================================

        setIframe: function (slide) {
            var self = this,
                opts = slide.opts.iframe,
                $slide = slide.$slide,
                $iframe;

            slide.$content = $('<div class="fancybox-content' + (opts.preload ? ' fancybox-is-hidden' : '') + '"></div>').css(opts.css).appendTo($slide);

            $iframe = $(opts.tpl.replace(/\{rnd\}/g, new Date().getTime())).attr(opts.attr).appendTo(slide.$content);

            if (opts.preload) {

                self.showLoading(slide);

                // Unfortunately, it is not always possible to determine if iframe is successfully loaded
                // (due to browser security policy)

                $iframe.on('load.fb error.fb', function (e) {
                    this.isReady = 1;

                    slide.$slide.trigger('refresh');

                    self.afterLoad(slide);
                });

                // Recalculate iframe content size
                // ===============================

                $slide.on('refresh.fb', function () {
                    var $wrap = slide.$content,
                        $contents,
                        $body,
                        scrollWidth,
                        frameWidth,
                        frameHeight;

                    if ($iframe[0].isReady !== 1) {
                        return;
                    }

                    // Check if content is accessible,
                    // it will fail if frame is not with the same origin

                    try {
                        $contents = $iframe.contents();
                        $body = $contents.find('body');
                    } catch (ignore) {}

                    // Calculate dimensions for the wrapper
                    if ($body && $body.length && !(opts.css.width !== undefined && opts.css.height !== undefined)) {

                        scrollWidth = $iframe[0].contentWindow.document.documentElement.scrollWidth;

                        frameWidth = Math.ceil($body.outerWidth(true) + ($wrap.width() - scrollWidth));
                        frameHeight = Math.ceil($body.outerHeight(true));

                        // Resize wrapper to fit iframe content
                        $wrap.css({
                            'width': opts.css.width === undefined ? frameWidth + ($wrap.outerWidth() - $wrap.innerWidth()) : opts.css.width,
                            'height': opts.css.height === undefined ? frameHeight + ($wrap.outerHeight() - $wrap.innerHeight()) : opts.css.height
                        });
                    }

                    $wrap.removeClass('fancybox-is-hidden');
                });
            } else {

                this.afterLoad(slide);
            }

            $iframe.attr('src', slide.src);

            if (slide.opts.smallBtn === true) {
                slide.$content.prepend(self.translate(slide, slide.opts.btnTpl.smallBtn));
            }

            // Remove iframe if closing or changing gallery item
            $slide.one('onReset', function () {

                // This helps IE not to throw errors when closing
                try {

                    $(this).find('iframe').hide().attr('src', '//about:blank');
                } catch (ignore) {}

                $(this).empty();

                slide.isLoaded = false;
            });
        },

        // Wrap and append content to the slide
        // ======================================

        setContent: function (slide, content) {

            var self = this;

            if (self.isClosing) {
                return;
            }

            self.hideLoading(slide);

            slide.$slide.empty();

            if (isQuery(content) && content.parent().length) {

                // If content is a jQuery object, then it will be moved to the slide.
                // The placeholder is created so we will know where to put it back.
                // If user is navigating gallery fast, then the content might be already inside fancyBox
                // =====================================================================================

                // Make sure content is not already moved to fancyBox
                content.parent('.fancybox-slide--inline').trigger('onReset');

                // Create temporary element marking original place of the content
                slide.$placeholder = $('<div></div>').hide().insertAfter(content);

                // Make sure content is visible
                content.css('display', 'inline-block');
            } else if (!slide.hasError) {

                // If content is just a plain text, try to convert it to html
                if ($.type(content) === 'string') {
                    content = $('<div>').append($.trim(content)).contents();

                    // If we have text node, then add wrapping element to make vertical alignment work
                    if (content[0].nodeType === 3) {
                        content = $('<div>').html(content);
                    }
                }

                // If "filter" option is provided, then filter content
                if (slide.opts.filter) {
                    content = $('<div>').html(content).find(slide.opts.filter);
                }
            }

            slide.$slide.one('onReset', function () {

                // Put content back
                if (slide.$placeholder) {
                    slide.$placeholder.after(content.hide()).remove();

                    slide.$placeholder = null;
                }

                // Remove custom close button
                if (slide.$smallBtn) {
                    slide.$smallBtn.remove();

                    slide.$smallBtn = null;
                }

                // Remove content and mark slide as not loaded
                if (!slide.hasError) {
                    $(this).empty();

                    slide.isLoaded = false;
                }
            });

            slide.$content = $(content).appendTo(slide.$slide);

            if (slide.opts.smallBtn && !slide.$smallBtn) {
                slide.$smallBtn = $(self.translate(slide, slide.opts.btnTpl.smallBtn)).appendTo(slide.$content.filter('div').first());
            }

            this.afterLoad(slide);
        },

        // Display error message
        // =====================

        setError: function (slide) {

            slide.hasError = true;

            slide.$slide.removeClass('fancybox-slide--' + slide.type);

            this.setContent(slide, this.translate(slide, slide.opts.errorTpl));
        },

        // Show loading icon inside the slide
        // ==================================

        showLoading: function (slide) {

            var self = this;

            slide = slide || self.current;

            if (slide && !slide.$spinner) {
                slide.$spinner = $(self.opts.spinnerTpl).appendTo(slide.$slide);
            }
        },

        // Remove loading icon from the slide
        // ==================================

        hideLoading: function (slide) {

            var self = this;

            slide = slide || self.current;

            if (slide && slide.$spinner) {
                slide.$spinner.remove();

                delete slide.$spinner;
            }
        },

        // Adjustments after slide content has been loaded
        // ===============================================

        afterLoad: function (slide) {

            var self = this;

            if (self.isClosing) {
                return;
            }

            slide.isLoading = false;
            slide.isLoaded = true;

            self.trigger('afterLoad', slide);

            self.hideLoading(slide);

            if (slide.opts.protect && slide.$content && !slide.hasError) {

                // Disable right click
                slide.$content.on('contextmenu.fb', function (e) {
                    if (e.button == 2) {
                        e.preventDefault();
                    }

                    return true;
                });

                // Add fake element on top of the image
                // This makes a bit harder for user to select image
                if (slide.type === 'image') {
                    $('<div class="fancybox-spaceball"></div>').appendTo(slide.$content);
                }
            }

            self.revealContent(slide);
        },

        // Make content visible
        // This method is called right after content has been loaded or
        // user navigates gallery and transition should start
        // ============================================================

        revealContent: function (slide) {

            var self = this;
            var $slide = slide.$slide;

            var effect,
                effectClassName,
                duration,
                opacity,
                end,
                start = false;

            effect = slide.opts[self.firstRun ? 'animationEffect' : 'transitionEffect'];
            duration = slide.opts[self.firstRun ? 'animationDuration' : 'transitionDuration'];

            duration = parseInt(slide.forcedDuration === undefined ? duration : slide.forcedDuration, 10);

            if (slide.isMoved || slide.pos !== self.currPos || !duration) {
                effect = false;
            }

            // Check if can zoom
            if (effect === 'zoom' && !(slide.pos === self.currPos && duration && slide.type === 'image' && !slide.hasError && (start = self.getThumbPos(slide)))) {
                effect = 'fade';
            }

            // Zoom animation
            // ==============

            if (effect === 'zoom') {
                end = self.getFitPos(slide);

                end.scaleX = end.width / start.width;
                end.scaleY = end.height / start.height;

                delete end.width;
                delete end.height;

                // Check if we need to animate opacity
                opacity = slide.opts.zoomOpacity;

                if (opacity == 'auto') {
                    opacity = Math.abs(slide.width / slide.height - start.width / start.height) > 0.1;
                }

                if (opacity) {
                    start.opacity = 0.1;
                    end.opacity = 1;
                }

                // Draw image at start position
                $.fancybox.setTranslate(slide.$content.removeClass('fancybox-is-hidden'), start);

                forceRedraw(slide.$content);

                // Start animation
                $.fancybox.animate(slide.$content, end, duration, function () {
                    self.complete();
                });

                return;
            }

            self.updateSlide(slide);

            // Simply show content
            // ===================

            if (!effect) {
                forceRedraw($slide);

                slide.$content.removeClass('fancybox-is-hidden');

                if (slide.pos === self.currPos) {
                    self.complete();
                }

                return;
            }

            $.fancybox.stop($slide);

            effectClassName = 'fancybox-animated fancybox-slide--' + (slide.pos > self.prevPos ? 'next' : 'previous') + ' fancybox-fx-' + effect;

            $slide.removeAttr('style').removeClass('fancybox-slide--current fancybox-slide--next fancybox-slide--previous').addClass(effectClassName);

            slide.$content.removeClass('fancybox-is-hidden');

            //Force reflow for CSS3 transitions
            forceRedraw($slide);

            $.fancybox.animate($slide, 'fancybox-slide--current', duration, function (e) {
                $slide.removeClass(effectClassName).removeAttr('style');

                if (slide.pos === self.currPos) {
                    self.complete();
                }
            }, true);
        },

        // Check if we can and have to zoom from thumbnail
        //================================================

        getThumbPos: function (slide) {

            var self = this;
            var rez = false;

            // Check if element is inside the viewport by at least 1 pixel
            var isElementVisible = function ($el) {
                var element = $el[0];

                var elementRect = element.getBoundingClientRect();
                var parentRects = [];

                var visibleInAllParents;

                while (element.parentElement !== null) {
                    if ($(element.parentElement).css('overflow') === 'hidden' || $(element.parentElement).css('overflow') === 'auto') {
                        parentRects.push(element.parentElement.getBoundingClientRect());
                    }

                    element = element.parentElement;
                }

                visibleInAllParents = parentRects.every(function (parentRect) {
                    var visiblePixelX = Math.min(elementRect.right, parentRect.right) - Math.max(elementRect.left, parentRect.left);
                    var visiblePixelY = Math.min(elementRect.bottom, parentRect.bottom) - Math.max(elementRect.top, parentRect.top);

                    return visiblePixelX > 0 && visiblePixelY > 0;
                });

                return visibleInAllParents && elementRect.bottom > 0 && elementRect.right > 0 && elementRect.left < $(window).width() && elementRect.top < $(window).height();
            };

            var $thumb = slide.opts.$thumb;
            var thumbPos = $thumb ? $thumb.offset() : 0;
            var slidePos;

            if (thumbPos && $thumb[0].ownerDocument === document && isElementVisible($thumb)) {
                slidePos = self.$refs.stage.offset();

                rez = {
                    top: thumbPos.top - slidePos.top + parseFloat($thumb.css("border-top-width") || 0),
                    left: thumbPos.left - slidePos.left + parseFloat($thumb.css("border-left-width") || 0),
                    width: $thumb.width(),
                    height: $thumb.height(),
                    scaleX: 1,
                    scaleY: 1
                };
            }

            return rez;
        },

        // Final adjustments after current gallery item is moved to position
        // and it`s content is loaded
        // ==================================================================

        complete: function () {

            var self = this;

            var current = self.current;
            var slides = {};

            if (current.isMoved || !current.isLoaded || current.isComplete) {
                return;
            }

            current.isComplete = true;

            current.$slide.siblings().trigger('onReset');

            // Trigger any CSS3 transiton inside the slide
            forceRedraw(current.$slide);

            current.$slide.addClass('fancybox-slide--complete');

            // Remove unnecessary slides
            $.each(self.slides, function (key, slide) {
                if (slide.pos >= self.currPos - 1 && slide.pos <= self.currPos + 1) {
                    slides[slide.pos] = slide;
                } else if (slide) {

                    $.fancybox.stop(slide.$slide);

                    slide.$slide.unbind().remove();
                }
            });

            self.slides = slides;

            self.updateCursor();

            self.trigger('afterShow');

            // Try to focus on the first focusable element
            if ($(document.activeElement).is('[disabled]') || current.opts.autoFocus && !(current.type == 'image' || current.type === 'iframe')) {
                self.focus();
            }
        },

        // Preload next and previous slides
        // ================================

        preload: function () {
            var self = this;
            var next, prev;

            if (self.group.length < 2) {
                return;
            }

            next = self.slides[self.currPos + 1];
            prev = self.slides[self.currPos - 1];

            if (next && next.type === 'image') {
                self.loadSlide(next);
            }

            if (prev && prev.type === 'image') {
                self.loadSlide(prev);
            }
        },

        // Try to find and focus on the first focusable element
        // ====================================================

        focus: function () {
            var current = this.current;
            var $el;

            if (this.isClosing) {
                return;
            }

            // Skip for images and iframes
            $el = current && current.isComplete ? current.$slide.find('button,:input,[tabindex],a').filter(':not([disabled]):visible:first') : null;
            $el = $el && $el.length ? $el : this.$refs.container;

            $el.focus();
        },

        // Activates current instance - brings container to the front and enables keyboard,
        // notifies other instances about deactivating
        // =================================================================================

        activate: function () {
            var self = this;

            // Deactivate all instances
            $('.fancybox-container').each(function () {
                var instance = $(this).data('FancyBox');

                // Skip self and closing instances
                if (instance && instance.uid !== self.uid && !instance.isClosing) {
                    instance.trigger('onDeactivate');
                }
            });

            if (self.current) {
                if (self.$refs.container.index() > 0) {
                    self.$refs.container.prependTo(document.body);
                }

                self.updateControls();
            }

            self.trigger('onActivate');

            self.addEvents();
        },

        // Start closing procedure
        // This will start "zoom-out" animation if needed and clean everything up afterwards
        // =================================================================================

        close: function (e, d) {

            var self = this;
            var current = self.current;

            var effect, duration;
            var $what, opacity, start, end;

            var done = function () {
                self.cleanUp(e);
            };

            if (self.isClosing) {
                return false;
            }

            self.isClosing = true;

            // If beforeClose callback prevents closing, make sure content is centered
            if (self.trigger('beforeClose', e) === false) {
                self.isClosing = false;

                requestAFrame(function () {
                    self.update();
                });

                return false;
            }

            // Remove all events
            // If there are multiple instances, they will be set again by "activate" method
            self.removeEvents();

            if (current.timouts) {
                clearTimeout(current.timouts);
            }

            $what = current.$content;
            effect = current.opts.animationEffect;
            duration = $.isNumeric(d) ? d : effect ? current.opts.animationDuration : 0;

            // Remove other slides
            current.$slide.off(transitionEnd).removeClass('fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated');

            current.$slide.siblings().trigger('onReset').remove();

            // Trigger animations
            if (duration) {
                self.$refs.container.removeClass('fancybox-is-open').addClass('fancybox-is-closing');
            }

            // Clean up
            self.hideLoading(current);

            self.hideControls();

            self.updateCursor();

            // Check if possible to zoom-out
            if (effect === 'zoom' && !(e !== true && $what && duration && current.type === 'image' && !current.hasError && (end = self.getThumbPos(current)))) {
                effect = 'fade';
            }

            if (effect === 'zoom') {
                $.fancybox.stop($what);

                start = $.fancybox.getTranslate($what);

                start.width = start.width * start.scaleX;
                start.height = start.height * start.scaleY;

                // Check if we need to animate opacity
                opacity = current.opts.zoomOpacity;

                if (opacity == 'auto') {
                    opacity = Math.abs(current.width / current.height - end.width / end.height) > 0.1;
                }

                if (opacity) {
                    end.opacity = 0;
                }

                start.scaleX = start.width / end.width;
                start.scaleY = start.height / end.height;

                start.width = end.width;
                start.height = end.height;

                $.fancybox.setTranslate(current.$content, start);

                $.fancybox.animate(current.$content, end, duration, done);

                return true;
            }

            if (effect && duration) {

                // If skip animation
                if (e === true) {
                    setTimeout(done, duration);
                } else {
                    $.fancybox.animate(current.$slide.removeClass('fancybox-slide--current'), 'fancybox-animated fancybox-slide--previous fancybox-fx-' + effect, duration, done);
                }
            } else {
                done();
            }

            return true;
        },

        // Final adjustments after removing the instance
        // =============================================

        cleanUp: function (e) {
            var self = this,
                instance;

            self.current.$slide.trigger('onReset');

            self.$refs.container.empty().remove();

            self.trigger('afterClose', e);

            // Place back focus
            if (self.$lastFocus && !!self.current.opts.backFocus) {
                self.$lastFocus.focus();
            }

            self.current = null;

            // Check if there are other instances
            instance = $.fancybox.getInstance();

            if (instance) {
                instance.activate();
            } else {

                $W.scrollTop(self.scrollTop).scrollLeft(self.scrollLeft);

                $('html').removeClass('fancybox-enabled');

                $('#fancybox-style-noscroll').remove();
            }
        },

        // Call callback and trigger an event
        // ==================================

        trigger: function (name, slide) {
            var args = Array.prototype.slice.call(arguments, 1),
                self = this,
                obj = slide && slide.opts ? slide : self.current,
                rez;

            if (obj) {
                args.unshift(obj);
            } else {
                obj = self;
            }

            args.unshift(self);

            if ($.isFunction(obj.opts[name])) {
                rez = obj.opts[name].apply(obj, args);
            }

            if (rez === false) {
                return rez;
            }

            if (name === 'afterClose') {
                $D.trigger(name + '.fb', args);
            } else {
                self.$refs.container.trigger(name + '.fb', args);
            }
        },

        // Update infobar values, navigation button states and reveal caption
        // ==================================================================

        updateControls: function (force) {

            var self = this;

            var current = self.current;
            var index = current.index;
            var opts = current.opts;
            var caption = opts.caption;
            var $caption = self.$refs.caption;

            // Recalculate content dimensions
            current.$slide.trigger('refresh');

            self.$caption = caption && caption.length ? $caption.html(caption) : null;

            if (!self.isHiddenControls) {
                self.showControls();
            }

            // Update info and navigation elements
            $('[data-fancybox-count]').html(self.group.length);
            $('[data-fancybox-index]').html(index + 1);

            $('[data-fancybox-prev]').prop('disabled', !opts.loop && index <= 0);
            $('[data-fancybox-next]').prop('disabled', !opts.loop && index >= self.group.length - 1);
        },

        // Hide toolbar and caption
        // ========================

        hideControls: function () {

            this.isHiddenControls = true;

            this.$refs.container.removeClass('fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav');
        },

        showControls: function () {

            var self = this;
            var opts = self.current ? self.current.opts : self.opts;
            var $container = self.$refs.container;

            self.isHiddenControls = false;
            self.idleSecondsCounter = 0;

            $container.toggleClass('fancybox-show-toolbar', !!(opts.toolbar && opts.buttons)).toggleClass('fancybox-show-infobar', !!(opts.infobar && self.group.length > 1)).toggleClass('fancybox-show-nav', !!(opts.arrows && self.group.length > 1)).toggleClass('fancybox-is-modal', !!opts.modal);

            if (self.$caption) {
                $container.addClass('fancybox-show-caption ');
            } else {
                $container.removeClass('fancybox-show-caption');
            }
        },

        // Toggle toolbar and caption
        // ==========================

        toggleControls: function () {

            if (this.isHiddenControls) {
                this.showControls();
            } else {
                this.hideControls();
            }
        }

    });

    $.fancybox = {

        version: "3.1.25",
        defaults: defaults,

        // Get current instance and execute a command.
        //
        // Examples of usage:
        //
        //   $instance = $.fancybox.getInstance();
        //   $.fancybox.getInstance().jumpTo( 1 );
        //   $.fancybox.getInstance( 'jumpTo', 1 );
        //   $.fancybox.getInstance( function() {
        //       console.info( this.currIndex );
        //   });
        // ======================================================

        getInstance: function (command) {
            var instance = $('.fancybox-container:not(".fancybox-is-closing"):first').data('FancyBox');
            var args = Array.prototype.slice.call(arguments, 1);

            if (instance instanceof FancyBox) {

                if ($.type(command) === 'string') {
                    instance[command].apply(instance, args);
                } else if ($.type(command) === 'function') {
                    command.apply(instance, args);
                }

                return instance;
            }

            return false;
        },

        // Create new instance
        // ===================

        open: function (items, opts, index) {
            return new FancyBox(items, opts, index);
        },

        // Close current or all instances
        // ==============================

        close: function (all) {
            var instance = this.getInstance();

            if (instance) {
                instance.close();

                // Try to find and close next instance

                if (all === true) {
                    this.close();
                }
            }
        },

        // Close instances and unbind all events
        // ==============================

        destroy: function () {

            this.close(true);

            $D.off('click.fb-start');
        },

        // Try to detect mobile devices
        // ============================

        isMobile: document.createTouch !== undefined && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),

        // Detect if 'translate3d' support is available
        // ============================================

        use3d: function () {
            var div = document.createElement('div');

            return window.getComputedStyle && window.getComputedStyle(div).getPropertyValue('transform') && !(document.documentMode && document.documentMode < 11);
        }(),

        // Helper function to get current visual state of an element
        // returns array[ top, left, horizontal-scale, vertical-scale, opacity ]
        // =====================================================================

        getTranslate: function ($el) {
            var matrix;

            if (!$el || !$el.length) {
                return false;
            }

            matrix = $el.eq(0).css('transform');

            if (matrix && matrix.indexOf('matrix') !== -1) {
                matrix = matrix.split('(')[1];
                matrix = matrix.split(')')[0];
                matrix = matrix.split(',');
            } else {
                matrix = [];
            }

            if (matrix.length) {

                // If IE
                if (matrix.length > 10) {
                    matrix = [matrix[13], matrix[12], matrix[0], matrix[5]];
                } else {
                    matrix = [matrix[5], matrix[4], matrix[0], matrix[3]];
                }

                matrix = matrix.map(parseFloat);
            } else {
                matrix = [0, 0, 1, 1];

                var transRegex = /\.*translate\((.*)px,(.*)px\)/i;
                var transRez = transRegex.exec($el.eq(0).attr('style'));

                if (transRez) {
                    matrix[0] = parseFloat(transRez[2]);
                    matrix[1] = parseFloat(transRez[1]);
                }
            }

            return {
                top: matrix[0],
                left: matrix[1],
                scaleX: matrix[2],
                scaleY: matrix[3],
                opacity: parseFloat($el.css('opacity')),
                width: $el.width(),
                height: $el.height()
            };
        },

        // Shortcut for setting "translate3d" properties for element
        // Can set be used to set opacity, too
        // ========================================================

        setTranslate: function ($el, props) {
            var str = '';
            var css = {};

            if (!$el || !props) {
                return;
            }

            if (props.left !== undefined || props.top !== undefined) {
                str = (props.left === undefined ? $el.position().left : props.left) + 'px, ' + (props.top === undefined ? $el.position().top : props.top) + 'px';

                if (this.use3d) {
                    str = 'translate3d(' + str + ', 0px)';
                } else {
                    str = 'translate(' + str + ')';
                }
            }

            if (props.scaleX !== undefined && props.scaleY !== undefined) {
                str = (str.length ? str + ' ' : '') + 'scale(' + props.scaleX + ', ' + props.scaleY + ')';
            }

            if (str.length) {
                css.transform = str;
            }

            if (props.opacity !== undefined) {
                css.opacity = props.opacity;
            }

            if (props.width !== undefined) {
                css.width = props.width;
            }

            if (props.height !== undefined) {
                css.height = props.height;
            }

            return $el.css(css);
        },

        // Simple CSS transition handler
        // =============================

        animate: function ($el, to, duration, callback, leaveAnimationName) {
            var event = transitionEnd || 'transitionend';

            if ($.isFunction(duration)) {
                callback = duration;
                duration = null;
            }

            if (!$.isPlainObject(to)) {
                $el.removeAttr('style');
            }

            $el.on(event, function (e) {

                // Skip events from child elements and z-index change
                if (e && e.originalEvent && (!$el.is(e.originalEvent.target) || e.originalEvent.propertyName == 'z-index')) {
                    return;
                }

                $el.off(event);

                if ($.isPlainObject(to)) {

                    if (to.scaleX !== undefined && to.scaleY !== undefined) {
                        $el.css('transition-duration', '0ms');

                        to.width = Math.round($el.width() * to.scaleX);
                        to.height = Math.round($el.height() * to.scaleY);

                        to.scaleX = 1;
                        to.scaleY = 1;

                        $.fancybox.setTranslate($el, to);
                    }
                } else if (leaveAnimationName !== true) {
                    $el.removeClass(to);
                }

                if ($.isFunction(callback)) {
                    callback(e);
                }
            });

            if ($.isNumeric(duration)) {
                $el.css('transition-duration', duration + 'ms');
            }

            if ($.isPlainObject(to)) {
                $.fancybox.setTranslate($el, to);
            } else {
                $el.addClass(to);
            }

            $el.data("timer", setTimeout(function () {
                $el.trigger('transitionend');
            }, duration + 16));
        },

        stop: function ($el) {
            clearTimeout($el.data("timer"));

            $el.off(transitionEnd);
        }

    };

    // Default click handler for "fancyboxed" links
    // ============================================

    function _run(e) {
        var target = e.currentTarget,
            opts = e.data ? e.data.options : {},
            items = opts.selector ? $(opts.selector) : e.data ? e.data.items : [],
            value = $(target).attr('data-fancybox') || '',
            index = 0,
            active = $.fancybox.getInstance();

        e.preventDefault();
        e.stopPropagation();

        // Avoid opening multiple times
        if (active && active.current.opts.$orig.is(target)) {
            return;
        }

        // Get all related items and find index for clicked one
        if (value) {
            items = items.length ? items.filter('[data-fancybox="' + value + '"]') : $('[data-fancybox="' + value + '"]');
            index = items.index(target);

            // Sometimes current item can not be found
            // (for example, when slider clones items)
            if (index < 0) {
                index = 0;
            }
        } else {
            items = [target];
        }

        $.fancybox.open(items, opts, index);
    }

    // Create a jQuery plugin
    // ======================

    $.fn.fancybox = function (options) {
        var selector;

        options = options || {};
        selector = options.selector || false;

        if (selector) {

            $('body').off('click.fb-start', selector).on('click.fb-start', selector, {
                options: options
            }, _run);
        } else {

            this.off('click.fb-start').on('click.fb-start', {
                items: this,
                options: options
            }, _run);
        }

        return this;
    };

    // Self initializing plugin
    // ========================

    $D.on('click.fb-start', '[data-fancybox]', _run);
})(window, document, window.jQuery || jQuery);

// ==========================================================================
//
// Media
// Adds additional media type support
//
// ==========================================================================
;(function ($) {

    'use strict';

    // Formats matching url to final form

    var format = function (url, rez, params) {
        if (!url) {
            return;
        }

        params = params || '';

        if ($.type(params) === "object") {
            params = $.param(params, true);
        }

        $.each(rez, function (key, value) {
            url = url.replace('$' + key, value || '');
        });

        if (params.length) {
            url += (url.indexOf('?') > 0 ? '&' : '?') + params;
        }

        return url;
    };

    // Object containing properties for each media type

    var defaults = {
        youtube: {
            matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
            params: {
                autoplay: 1,
                autohide: 1,
                fs: 1,
                rel: 0,
                hd: 1,
                wmode: 'transparent',
                enablejsapi: 1,
                html5: 1
            },
            paramPlace: 8,
            type: 'iframe',
            url: '//www.youtube.com/embed/$4',
            thumb: '//img.youtube.com/vi/$4/hqdefault.jpg'
        },

        vimeo: {
            matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
            params: {
                autoplay: 1,
                hd: 1,
                show_title: 1,
                show_byline: 1,
                show_portrait: 0,
                fullscreen: 1,
                api: 1
            },
            paramPlace: 3,
            type: 'iframe',
            url: '//player.vimeo.com/video/$2'
        },

        metacafe: {
            matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/,
            type: 'iframe',
            url: '//www.metacafe.com/embed/$1/?ap=1'
        },

        dailymotion: {
            matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
            params: {
                additionalInfos: 0,
                autoStart: 1
            },
            type: 'iframe',
            url: '//www.dailymotion.com/embed/video/$1'
        },

        vine: {
            matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/,
            type: 'iframe',
            url: '//vine.co/v/$1/embed/simple'
        },

        instagram: {
            matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type: 'image',
            url: '//$1/p/$2/media/?size=l'
        },

        // Examples:
        // http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
        // https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
        // https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
        gmap_place: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
            type: 'iframe',
            url: function (rez) {
                return '//maps.google.' + rez[2] + '/?ll=' + (rez[9] ? rez[9] + '&z=' + Math.floor(rez[10]) + (rez[12] ? rez[12].replace(/^\//, "&") : '') : rez[12]) + '&output=' + (rez[12] && rez[12].indexOf('layer=c') > 0 ? 'svembed' : 'embed');
            }
        },

        // Examples:
        // https://www.google.com/maps/search/Empire+State+Building/
        // https://www.google.com/maps/search/?api=1&query=centurylink+field
        // https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
        gmap_search: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
            type: 'iframe',
            url: function (rez) {
                return '//maps.google.' + rez[2] + '/maps?q=' + rez[5].replace('query=', 'q=').replace('api=1', '') + '&output=embed';
            }
        }
    };

    $(document).on('onInit.fb', function (e, instance) {

        $.each(instance.group, function (i, item) {

            var url = item.src || '',
                type = false,
                media,
                thumb,
                rez,
                params,
                urlParams,
                o,
                provider;

            // Skip items that already have content type
            if (item.type) {
                return;
            }

            media = $.extend(true, {}, defaults, item.opts.media);

            // Look for any matching media type
            $.each(media, function (n, el) {
                rez = url.match(el.matcher);
                o = {};
                provider = n;

                if (!rez) {
                    return;
                }

                type = el.type;

                if (el.paramPlace && rez[el.paramPlace]) {
                    urlParams = rez[el.paramPlace];

                    if (urlParams[0] == '?') {
                        urlParams = urlParams.substring(1);
                    }

                    urlParams = urlParams.split('&');

                    for (var m = 0; m < urlParams.length; ++m) {
                        var p = urlParams[m].split('=', 2);

                        if (p.length == 2) {
                            o[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
                        }
                    }
                }

                params = $.extend(true, {}, el.params, item.opts[n], o);

                url = $.type(el.url) === "function" ? el.url.call(this, rez, params, item) : format(el.url, rez, params);
                thumb = $.type(el.thumb) === "function" ? el.thumb.call(this, rez, params, item) : format(el.thumb, rez);

                if (provider === 'vimeo') {
                    url = url.replace('&%23', '#');
                }

                return false;
            });

            // If it is found, then change content type and update the url

            if (type) {
                item.src = url;
                item.type = type;

                if (!item.opts.thumb && !(item.opts.$thumb && item.opts.$thumb.length)) {
                    item.opts.thumb = thumb;
                }

                if (type === 'iframe') {
                    $.extend(true, item.opts, {
                        iframe: {
                            preload: false,
                            attr: {
                                scrolling: "no"
                            }
                        }
                    });

                    item.contentProvider = provider;

                    item.opts.slideClass += ' fancybox-slide--' + (provider == 'gmap_place' || provider == 'gmap_search' ? 'map' : 'video');
                }
            } else {

                // If no content type is found, then set it to `image` as fallback
                item.type = 'image';
            }
        });
    });
})(window.jQuery);

// ==========================================================================
//
// Guestures
// Adds touch guestures, handles click and tap events
//
// ==========================================================================
;(function (window, document, $) {
    'use strict';

    var requestAFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
        // if all else fails, use setTimeout
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    }();

    var cancelAFrame = function () {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
            window.clearTimeout(id);
        };
    }();

    var pointers = function (e) {
        var result = [];

        e = e.originalEvent || e || window.e;
        e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];

        for (var key in e) {

            if (e[key].pageX) {
                result.push({ x: e[key].pageX, y: e[key].pageY });
            } else if (e[key].clientX) {
                result.push({ x: e[key].clientX, y: e[key].clientY });
            }
        }

        return result;
    };

    var distance = function (point2, point1, what) {
        if (!point1 || !point2) {
            return 0;
        }

        if (what === 'x') {
            return point2.x - point1.x;
        } else if (what === 'y') {
            return point2.y - point1.y;
        }

        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    };

    var isClickable = function ($el) {

        if ($el.is('a,button,input,select,textarea') || $.isFunction($el.get(0).onclick) || $el.data('selectable')) {
            return true;
        }

        // Check for attributes like data-fancybox-next or data-fancybox-close
        for (var i = 0, atts = $el[0].attributes, n = atts.length; i < n; i++) {
            if (atts[i].nodeName.substr(0, 14) === 'data-fancybox-') {
                return true;
            }
        }

        return false;
    };

    var hasScrollbars = function (el) {
        var overflowY = window.getComputedStyle(el)['overflow-y'];
        var overflowX = window.getComputedStyle(el)['overflow-x'];

        var vertical = (overflowY === 'scroll' || overflowY === 'auto') && el.scrollHeight > el.clientHeight;
        var horizontal = (overflowX === 'scroll' || overflowX === 'auto') && el.scrollWidth > el.clientWidth;

        return vertical || horizontal;
    };

    var isScrollable = function ($el) {
        var rez = false;

        while (true) {
            rez = hasScrollbars($el.get(0));

            if (rez) {
                break;
            }

            $el = $el.parent();

            if (!$el.length || $el.hasClass('fancybox-stage') || $el.is('body')) {
                break;
            }
        }

        return rez;
    };

    var Guestures = function (instance) {
        var self = this;

        self.instance = instance;

        self.$bg = instance.$refs.bg;
        self.$stage = instance.$refs.stage;
        self.$container = instance.$refs.container;

        self.destroy();

        self.$container.on('touchstart.fb.touch mousedown.fb.touch', $.proxy(self, 'ontouchstart'));
    };

    Guestures.prototype.destroy = function () {
        this.$container.off('.fb.touch');
    };

    Guestures.prototype.ontouchstart = function (e) {
        var self = this;

        var $target = $(e.target);
        var instance = self.instance;
        var current = instance.current;
        var $content = current.$content;

        var isTouchDevice = e.type == 'touchstart';

        // Do not respond to both events
        if (isTouchDevice) {
            self.$container.off('mousedown.fb.touch');
        }

        // Ignore clicks while zooming or closing
        if (!current || self.instance.isAnimating || self.instance.isClosing) {
            e.stopPropagation();
            e.preventDefault();

            return;
        }

        // Ignore right click
        if (e.originalEvent && e.originalEvent.button == 2) {
            return;
        }

        // Ignore taping on links, buttons, input elements
        if (!$target.length || isClickable($target) || isClickable($target.parent())) {
            return;
        }

        // Ignore clicks on the scrollbar
        if (e.originalEvent.clientX > $target[0].clientWidth + $target.offset().left) {
            return;
        }

        self.startPoints = pointers(e);

        // Prevent zooming if already swiping
        if (!self.startPoints || self.startPoints.length > 1 && instance.isSliding) {
            return;
        }

        self.$target = $target;
        self.$content = $content;
        self.canTap = true;

        $(document).off('.fb.touch');

        $(document).on(isTouchDevice ? 'touchend.fb.touch touchcancel.fb.touch' : 'mouseup.fb.touch mouseleave.fb.touch', $.proxy(self, "ontouchend"));
        $(document).on(isTouchDevice ? 'touchmove.fb.touch' : 'mousemove.fb.touch', $.proxy(self, "ontouchmove"));

        if (!(instance.current.opts.touch || instance.canPan()) || !($target.is(self.$stage) || self.$stage.find($target).length)) {

            // Prevent ghosting
            if ($target.is('img')) {
                e.preventDefault();
            }

            return;
        }

        e.stopPropagation();

        if (!($.fancybox.isMobile && (isScrollable(self.$target) || isScrollable(self.$target.parent())))) {
            e.preventDefault();
        }

        self.canvasWidth = Math.round(current.$slide[0].clientWidth);
        self.canvasHeight = Math.round(current.$slide[0].clientHeight);

        self.startTime = new Date().getTime();
        self.distanceX = self.distanceY = self.distance = 0;

        self.isPanning = false;
        self.isSwiping = false;
        self.isZooming = false;

        self.sliderStartPos = self.sliderLastPos || { top: 0, left: 0 };
        self.contentStartPos = $.fancybox.getTranslate(self.$content);
        self.contentLastPos = null;

        if (self.startPoints.length === 1 && !self.isZooming) {
            self.canTap = !instance.isSliding;

            if (current.type === 'image' && (self.contentStartPos.width > self.canvasWidth + 1 || self.contentStartPos.height > self.canvasHeight + 1)) {

                $.fancybox.stop(self.$content);

                self.$content.css('transition-duration', '0ms');

                self.isPanning = true;
            } else {

                self.isSwiping = true;
            }

            self.$container.addClass('fancybox-controls--isGrabbing');
        }

        if (self.startPoints.length === 2 && !instance.isAnimating && !current.hasError && current.type === 'image' && (current.isLoaded || current.$ghost)) {
            self.isZooming = true;

            self.isSwiping = false;
            self.isPanning = false;

            $.fancybox.stop(self.$content);

            self.$content.css('transition-duration', '0ms');

            self.centerPointStartX = (self.startPoints[0].x + self.startPoints[1].x) * 0.5 - $(window).scrollLeft();
            self.centerPointStartY = (self.startPoints[0].y + self.startPoints[1].y) * 0.5 - $(window).scrollTop();

            self.percentageOfImageAtPinchPointX = (self.centerPointStartX - self.contentStartPos.left) / self.contentStartPos.width;
            self.percentageOfImageAtPinchPointY = (self.centerPointStartY - self.contentStartPos.top) / self.contentStartPos.height;

            self.startDistanceBetweenFingers = distance(self.startPoints[0], self.startPoints[1]);
        }
    };

    Guestures.prototype.ontouchmove = function (e) {

        var self = this;

        self.newPoints = pointers(e);

        if ($.fancybox.isMobile && (isScrollable(self.$target) || isScrollable(self.$target.parent()))) {
            e.stopPropagation();

            self.canTap = false;

            return;
        }

        if (!(self.instance.current.opts.touch || self.instance.canPan()) || !self.newPoints || !self.newPoints.length) {
            return;
        }

        self.distanceX = distance(self.newPoints[0], self.startPoints[0], 'x');
        self.distanceY = distance(self.newPoints[0], self.startPoints[0], 'y');

        self.distance = distance(self.newPoints[0], self.startPoints[0]);

        // Skip false ontouchmove events (Chrome)
        if (self.distance > 0) {

            if (!(self.$target.is(self.$stage) || self.$stage.find(self.$target).length)) {
                return;
            }

            e.stopPropagation();
            e.preventDefault();

            if (self.isSwiping) {
                self.onSwipe();
            } else if (self.isPanning) {
                self.onPan();
            } else if (self.isZooming) {
                self.onZoom();
            }
        }
    };

    Guestures.prototype.onSwipe = function () {

        var self = this;

        var swiping = self.isSwiping;
        var left = self.sliderStartPos.left || 0;
        var angle;

        if (swiping === true) {

            if (Math.abs(self.distance) > 10) {

                self.canTap = false;

                if (self.instance.group.length < 2 && self.instance.opts.touch.vertical) {
                    self.isSwiping = 'y';
                } else if (self.instance.isSliding || self.instance.opts.touch.vertical === false || self.instance.opts.touch.vertical === 'auto' && $(window).width() > 800) {
                    self.isSwiping = 'x';
                } else {
                    angle = Math.abs(Math.atan2(self.distanceY, self.distanceX) * 180 / Math.PI);

                    self.isSwiping = angle > 45 && angle < 135 ? 'y' : 'x';
                }

                self.instance.isSliding = self.isSwiping;

                // Reset points to avoid jumping, because we dropped first swipes to calculate the angle
                self.startPoints = self.newPoints;

                $.each(self.instance.slides, function (index, slide) {
                    $.fancybox.stop(slide.$slide);

                    slide.$slide.css('transition-duration', '0ms');

                    slide.inTransition = false;

                    if (slide.pos === self.instance.current.pos) {
                        self.sliderStartPos.left = $.fancybox.getTranslate(slide.$slide).left;
                    }
                });

                //self.instance.current.isMoved = true;

                // Stop slideshow
                if (self.instance.SlideShow && self.instance.SlideShow.isActive) {
                    self.instance.SlideShow.stop();
                }
            }
        } else {

            if (swiping == 'x') {

                // Sticky edges
                if (self.distanceX > 0 && (self.instance.group.length < 2 || self.instance.current.index === 0 && !self.instance.current.opts.loop)) {
                    left = left + Math.pow(self.distanceX, 0.8);
                } else if (self.distanceX < 0 && (self.instance.group.length < 2 || self.instance.current.index === self.instance.group.length - 1 && !self.instance.current.opts.loop)) {
                    left = left - Math.pow(-self.distanceX, 0.8);
                } else {
                    left = left + self.distanceX;
                }
            }

            self.sliderLastPos = {
                top: swiping == 'x' ? 0 : self.sliderStartPos.top + self.distanceY,
                left: left
            };

            if (self.requestId) {
                cancelAFrame(self.requestId);

                self.requestId = null;
            }

            self.requestId = requestAFrame(function () {

                if (self.sliderLastPos) {
                    $.each(self.instance.slides, function (index, slide) {
                        var pos = slide.pos - self.instance.currPos;

                        $.fancybox.setTranslate(slide.$slide, {
                            top: self.sliderLastPos.top,
                            left: self.sliderLastPos.left + pos * self.canvasWidth + pos * slide.opts.gutter
                        });
                    });

                    self.$container.addClass('fancybox-is-sliding');
                }
            });
        }
    };

    Guestures.prototype.onPan = function () {

        var self = this;

        var newOffsetX, newOffsetY, newPos;

        self.canTap = false;

        if (self.contentStartPos.width > self.canvasWidth) {
            newOffsetX = self.contentStartPos.left + self.distanceX;
        } else {
            newOffsetX = self.contentStartPos.left;
        }

        newOffsetY = self.contentStartPos.top + self.distanceY;

        newPos = self.limitMovement(newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height);

        newPos.scaleX = self.contentStartPos.scaleX;
        newPos.scaleY = self.contentStartPos.scaleY;

        self.contentLastPos = newPos;

        if (self.requestId) {
            cancelAFrame(self.requestId);

            self.requestId = null;
        }

        self.requestId = requestAFrame(function () {
            $.fancybox.setTranslate(self.$content, self.contentLastPos);
        });
    };

    // Make panning sticky to the edges
    Guestures.prototype.limitMovement = function (newOffsetX, newOffsetY, newWidth, newHeight) {

        var self = this;

        var minTranslateX, minTranslateY, maxTranslateX, maxTranslateY;

        var canvasWidth = self.canvasWidth;
        var canvasHeight = self.canvasHeight;

        var currentOffsetX = self.contentStartPos.left;
        var currentOffsetY = self.contentStartPos.top;

        var distanceX = self.distanceX;
        var distanceY = self.distanceY;

        // Slow down proportionally to traveled distance

        minTranslateX = Math.max(0, canvasWidth * 0.5 - newWidth * 0.5);
        minTranslateY = Math.max(0, canvasHeight * 0.5 - newHeight * 0.5);

        maxTranslateX = Math.min(canvasWidth - newWidth, canvasWidth * 0.5 - newWidth * 0.5);
        maxTranslateY = Math.min(canvasHeight - newHeight, canvasHeight * 0.5 - newHeight * 0.5);

        if (newWidth > canvasWidth) {

            //   ->
            if (distanceX > 0 && newOffsetX > minTranslateX) {
                newOffsetX = minTranslateX - 1 + Math.pow(-minTranslateX + currentOffsetX + distanceX, 0.8) || 0;
            }

            //    <-
            if (distanceX < 0 && newOffsetX < maxTranslateX) {
                newOffsetX = maxTranslateX + 1 - Math.pow(maxTranslateX - currentOffsetX - distanceX, 0.8) || 0;
            }
        }

        if (newHeight > canvasHeight) {

            //   \/
            if (distanceY > 0 && newOffsetY > minTranslateY) {
                newOffsetY = minTranslateY - 1 + Math.pow(-minTranslateY + currentOffsetY + distanceY, 0.8) || 0;
            }

            //   /\
            if (distanceY < 0 && newOffsetY < maxTranslateY) {
                newOffsetY = maxTranslateY + 1 - Math.pow(maxTranslateY - currentOffsetY - distanceY, 0.8) || 0;
            }
        }

        return {
            top: newOffsetY,
            left: newOffsetX
        };
    };

    Guestures.prototype.limitPosition = function (newOffsetX, newOffsetY, newWidth, newHeight) {

        var self = this;

        var canvasWidth = self.canvasWidth;
        var canvasHeight = self.canvasHeight;

        if (newWidth > canvasWidth) {
            newOffsetX = newOffsetX > 0 ? 0 : newOffsetX;
            newOffsetX = newOffsetX < canvasWidth - newWidth ? canvasWidth - newWidth : newOffsetX;
        } else {

            // Center horizontally
            newOffsetX = Math.max(0, canvasWidth / 2 - newWidth / 2);
        }

        if (newHeight > canvasHeight) {
            newOffsetY = newOffsetY > 0 ? 0 : newOffsetY;
            newOffsetY = newOffsetY < canvasHeight - newHeight ? canvasHeight - newHeight : newOffsetY;
        } else {

            // Center vertically
            newOffsetY = Math.max(0, canvasHeight / 2 - newHeight / 2);
        }

        return {
            top: newOffsetY,
            left: newOffsetX
        };
    };

    Guestures.prototype.onZoom = function () {

        var self = this;

        // Calculate current distance between points to get pinch ratio and new width and height

        var currentWidth = self.contentStartPos.width;
        var currentHeight = self.contentStartPos.height;

        var currentOffsetX = self.contentStartPos.left;
        var currentOffsetY = self.contentStartPos.top;

        var endDistanceBetweenFingers = distance(self.newPoints[0], self.newPoints[1]);

        var pinchRatio = endDistanceBetweenFingers / self.startDistanceBetweenFingers;

        var newWidth = Math.floor(currentWidth * pinchRatio);
        var newHeight = Math.floor(currentHeight * pinchRatio);

        // This is the translation due to pinch-zooming
        var translateFromZoomingX = (currentWidth - newWidth) * self.percentageOfImageAtPinchPointX;
        var translateFromZoomingY = (currentHeight - newHeight) * self.percentageOfImageAtPinchPointY;

        //Point between the two touches

        var centerPointEndX = (self.newPoints[0].x + self.newPoints[1].x) / 2 - $(window).scrollLeft();
        var centerPointEndY = (self.newPoints[0].y + self.newPoints[1].y) / 2 - $(window).scrollTop();

        // And this is the translation due to translation of the centerpoint
        // between the two fingers

        var translateFromTranslatingX = centerPointEndX - self.centerPointStartX;
        var translateFromTranslatingY = centerPointEndY - self.centerPointStartY;

        // The new offset is the old/current one plus the total translation

        var newOffsetX = currentOffsetX + (translateFromZoomingX + translateFromTranslatingX);
        var newOffsetY = currentOffsetY + (translateFromZoomingY + translateFromTranslatingY);

        var newPos = {
            top: newOffsetY,
            left: newOffsetX,
            scaleX: self.contentStartPos.scaleX * pinchRatio,
            scaleY: self.contentStartPos.scaleY * pinchRatio
        };

        self.canTap = false;

        self.newWidth = newWidth;
        self.newHeight = newHeight;

        self.contentLastPos = newPos;

        if (self.requestId) {
            cancelAFrame(self.requestId);

            self.requestId = null;
        }

        self.requestId = requestAFrame(function () {
            $.fancybox.setTranslate(self.$content, self.contentLastPos);
        });
    };

    Guestures.prototype.ontouchend = function (e) {

        var self = this;
        var dMs = Math.max(new Date().getTime() - self.startTime, 1);

        var swiping = self.isSwiping;
        var panning = self.isPanning;
        var zooming = self.isZooming;

        self.endPoints = pointers(e);

        self.$container.removeClass('fancybox-controls--isGrabbing');

        $(document).off('.fb.touch');

        if (self.requestId) {
            cancelAFrame(self.requestId);

            self.requestId = null;
        }

        self.isSwiping = false;
        self.isPanning = false;
        self.isZooming = false;

        if (self.canTap) {
            return self.onTap(e);
        }

        self.speed = 366;

        // Speed in px/ms
        self.velocityX = self.distanceX / dMs * 0.5;
        self.velocityY = self.distanceY / dMs * 0.5;

        self.speedX = Math.max(self.speed * 0.5, Math.min(self.speed * 1.5, 1 / Math.abs(self.velocityX) * self.speed));

        if (panning) {
            self.endPanning();
        } else if (zooming) {
            self.endZooming();
        } else {
            self.endSwiping(swiping);
        }

        return;
    };

    Guestures.prototype.endSwiping = function (swiping) {

        var self = this;
        var ret = false;

        self.instance.isSliding = false;
        self.sliderLastPos = null;

        // Close if swiped vertically / navigate if horizontally
        if (swiping == 'y' && Math.abs(self.distanceY) > 50) {

            // Continue vertical movement
            $.fancybox.animate(self.instance.current.$slide, {
                top: self.sliderStartPos.top + self.distanceY + self.velocityY * 150,
                opacity: 0
            }, 150);

            ret = self.instance.close(true, 300);
        } else if (swiping == 'x' && self.distanceX > 50 && self.instance.group.length > 1) {
            ret = self.instance.previous(self.speedX);
        } else if (swiping == 'x' && self.distanceX < -50 && self.instance.group.length > 1) {
            ret = self.instance.next(self.speedX);
        }

        if (ret === false && (swiping == 'x' || swiping == 'y')) {
            self.instance.jumpTo(self.instance.current.index, 150);
        }

        self.$container.removeClass('fancybox-is-sliding');
    };

    // Limit panning from edges
    // ========================

    Guestures.prototype.endPanning = function () {

        var self = this;
        var newOffsetX, newOffsetY, newPos;

        if (!self.contentLastPos) {
            return;
        }

        if (self.instance.current.opts.touch.momentum === false) {
            newOffsetX = self.contentLastPos.left;
            newOffsetY = self.contentLastPos.top;
        } else {

            // Continue movement
            newOffsetX = self.contentLastPos.left + self.velocityX * self.speed;
            newOffsetY = self.contentLastPos.top + self.velocityY * self.speed;
        }

        newPos = self.limitPosition(newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height);

        newPos.width = self.contentStartPos.width;
        newPos.height = self.contentStartPos.height;

        $.fancybox.animate(self.$content, newPos, 330);
    };

    Guestures.prototype.endZooming = function () {

        var self = this;

        var current = self.instance.current;

        var newOffsetX, newOffsetY, newPos, reset;

        var newWidth = self.newWidth;
        var newHeight = self.newHeight;

        if (!self.contentLastPos) {
            return;
        }

        newOffsetX = self.contentLastPos.left;
        newOffsetY = self.contentLastPos.top;

        reset = {
            top: newOffsetY,
            left: newOffsetX,
            width: newWidth,
            height: newHeight,
            scaleX: 1,
            scaleY: 1
        };

        // Reset scalex/scaleY values; this helps for perfomance and does not break animation
        $.fancybox.setTranslate(self.$content, reset);

        if (newWidth < self.canvasWidth && newHeight < self.canvasHeight) {
            self.instance.scaleToFit(150);
        } else if (newWidth > current.width || newHeight > current.height) {
            self.instance.scaleToActual(self.centerPointStartX, self.centerPointStartY, 150);
        } else {

            newPos = self.limitPosition(newOffsetX, newOffsetY, newWidth, newHeight);

            // Switch from scale() to width/height or animation will not work correctly
            $.fancybox.setTranslate(self.content, $.fancybox.getTranslate(self.$content));

            $.fancybox.animate(self.$content, newPos, 150);
        }
    };

    Guestures.prototype.onTap = function (e) {
        var self = this;
        var $target = $(e.target);

        var instance = self.instance;
        var current = instance.current;

        var endPoints = e && pointers(e) || self.startPoints;

        var tapX = endPoints[0] ? endPoints[0].x - self.$stage.offset().left : 0;
        var tapY = endPoints[0] ? endPoints[0].y - self.$stage.offset().top : 0;

        var where;

        var process = function (prefix) {

            var action = current.opts[prefix];

            if ($.isFunction(action)) {
                action = action.apply(instance, [current, e]);
            }

            if (!action) {
                return;
            }

            switch (action) {

                case "close":

                    instance.close(self.startEvent);

                    break;

                case "toggleControls":

                    instance.toggleControls(true);

                    break;

                case "next":

                    instance.next();

                    break;

                case "nextOrClose":

                    if (instance.group.length > 1) {
                        instance.next();
                    } else {
                        instance.close(self.startEvent);
                    }

                    break;

                case "zoom":

                    if (current.type == 'image' && (current.isLoaded || current.$ghost)) {

                        if (instance.canPan()) {
                            instance.scaleToFit();
                        } else if (instance.isScaledDown()) {
                            instance.scaleToActual(tapX, tapY);
                        } else if (instance.group.length < 2) {
                            instance.close(self.startEvent);
                        }
                    }

                    break;
            }
        };

        // Ignore right click
        if (e.originalEvent && e.originalEvent.button == 2) {
            return;
        }

        // Skip if current slide is not in the center
        if (instance.isSliding) {
            return;
        }

        // Skip if clicked on the scrollbar
        if (tapX > $target[0].clientWidth + $target.offset().left) {
            return;
        }

        // Check where is clicked
        if ($target.is('.fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container')) {
            where = 'Outside';
        } else if ($target.is('.fancybox-slide')) {
            where = 'Slide';
        } else if (instance.current.$content && instance.current.$content.has(e.target).length) {
            where = 'Content';
        } else {
            return;
        }

        // Check if this is a double tap
        if (self.tapped) {

            // Stop previously created single tap
            clearTimeout(self.tapped);
            self.tapped = null;

            // Skip if distance between taps is too big
            if (Math.abs(tapX - self.tapX) > 50 || Math.abs(tapY - self.tapY) > 50 || instance.isSliding) {
                return this;
            }

            // OK, now we assume that this is a double-tap
            process('dblclick' + where);
        } else {

            // Single tap will be processed if user has not clicked second time within 300ms
            // or there is no need to wait for double-tap
            self.tapX = tapX;
            self.tapY = tapY;

            if (current.opts['dblclick' + where] && current.opts['dblclick' + where] !== current.opts['click' + where]) {
                self.tapped = setTimeout(function () {
                    self.tapped = null;

                    process('click' + where);
                }, 300);
            } else {
                process('click' + where);
            }
        }

        return this;
    };

    $(document).on('onActivate.fb', function (e, instance) {
        if (instance && !instance.Guestures) {
            instance.Guestures = new Guestures(instance);
        }
    });

    $(document).on('beforeClose.fb', function (e, instance) {
        if (instance && instance.Guestures) {
            instance.Guestures.destroy();
        }
    });
})(window, document, window.jQuery);

// ==========================================================================
//
// SlideShow
// Enables slideshow functionality
//
// Example of usage:
// $.fancybox.getInstance().SlideShow.start()
//
// ==========================================================================
;(function (document, $) {
    'use strict';

    var SlideShow = function (instance) {
        this.instance = instance;
        this.init();
    };

    $.extend(SlideShow.prototype, {
        timer: null,
        isActive: false,
        $button: null,
        speed: 3000,

        init: function () {
            var self = this;

            self.$button = self.instance.$refs.toolbar.find('[data-fancybox-play]').on('click', function () {
                self.toggle();
            });

            if (self.instance.group.length < 2 || !self.instance.group[self.instance.currIndex].opts.slideShow) {
                self.$button.hide();
            }
        },

        set: function () {
            var self = this;

            // Check if reached last element
            if (self.instance && self.instance.current && (self.instance.current.opts.loop || self.instance.currIndex < self.instance.group.length - 1)) {
                self.timer = setTimeout(function () {
                    self.instance.next();
                }, self.instance.current.opts.slideShow.speed || self.speed);
            } else {
                self.stop();
                self.instance.idleSecondsCounter = 0;
                self.instance.showControls();
            }
        },

        clear: function () {
            var self = this;

            clearTimeout(self.timer);

            self.timer = null;
        },

        start: function () {
            var self = this;
            var current = self.instance.current;

            if (self.instance && current && (current.opts.loop || current.index < self.instance.group.length - 1)) {

                self.isActive = true;

                self.$button.attr('title', current.opts.i18n[current.opts.lang].PLAY_STOP).addClass('fancybox-button--pause');

                if (current.isComplete) {
                    self.set();
                }
            }
        },

        stop: function () {
            var self = this;
            var current = self.instance.current;

            self.clear();

            self.$button.attr('title', current.opts.i18n[current.opts.lang].PLAY_START).removeClass('fancybox-button--pause');

            self.isActive = false;
        },

        toggle: function () {
            var self = this;

            if (self.isActive) {
                self.stop();
            } else {
                self.start();
            }
        }

    });

    $(document).on({
        'onInit.fb': function (e, instance) {
            if (instance && !instance.SlideShow) {
                instance.SlideShow = new SlideShow(instance);
            }
        },

        'beforeShow.fb': function (e, instance, current, firstRun) {
            var SlideShow = instance && instance.SlideShow;

            if (firstRun) {

                if (SlideShow && current.opts.slideShow.autoStart) {
                    SlideShow.start();
                }
            } else if (SlideShow && SlideShow.isActive) {
                SlideShow.clear();
            }
        },

        'afterShow.fb': function (e, instance, current) {
            var SlideShow = instance && instance.SlideShow;

            if (SlideShow && SlideShow.isActive) {
                SlideShow.set();
            }
        },

        'afterKeydown.fb': function (e, instance, current, keypress, keycode) {
            var SlideShow = instance && instance.SlideShow;

            // "P" or Spacebar
            if (SlideShow && current.opts.slideShow && (keycode === 80 || keycode === 32) && !$(document.activeElement).is('button,a,input')) {
                keypress.preventDefault();

                SlideShow.toggle();
            }
        },

        'beforeClose.fb onDeactivate.fb': function (e, instance) {
            var SlideShow = instance && instance.SlideShow;

            if (SlideShow) {
                SlideShow.stop();
            }
        }
    });

    // Page Visibility API to pause slideshow when window is not active
    $(document).on("visibilitychange", function () {
        var instance = $.fancybox.getInstance();
        var SlideShow = instance && instance.SlideShow;

        if (SlideShow && SlideShow.isActive) {
            if (document.hidden) {
                SlideShow.clear();
            } else {
                SlideShow.set();
            }
        }
    });
})(document, window.jQuery);

// ==========================================================================
//
// FullScreen
// Adds fullscreen functionality
//
// ==========================================================================
;(function (document, $) {
    'use strict';

    // Collection of methods supported by user browser

    var fn = function () {

        var fnMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
        // new WebKit
        ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
        // old WebKit (Safari 5.1)
        ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];

        var val;
        var ret = {};
        var i, j;

        for (i = 0; i < fnMap.length; i++) {
            val = fnMap[i];

            if (val && val[1] in document) {
                for (j = 0; j < val.length; j++) {
                    ret[fnMap[0][j]] = val[j];
                }

                return ret;
            }
        }

        return false;
    }();

    // If browser does not have Full Screen API, then simply unset default button template and stop
    if (!fn) {

        if ($ && $.fancybox) {
            $.fancybox.defaults.btnTpl.fullScreen = false;
        }

        return;
    }

    var FullScreen = {

        request: function (elem) {

            elem = elem || document.documentElement;

            elem[fn.requestFullscreen](elem.ALLOW_KEYBOARD_INPUT);
        },
        exit: function () {

            document[fn.exitFullscreen]();
        },
        toggle: function (elem) {

            elem = elem || document.documentElement;

            if (this.isFullscreen()) {
                this.exit();
            } else {
                this.request(elem);
            }
        },
        isFullscreen: function () {

            return Boolean(document[fn.fullscreenElement]);
        },
        enabled: function () {

            return Boolean(document[fn.fullscreenEnabled]);
        }
    };

    $(document).on({
        'onInit.fb': function (e, instance) {
            var $container;

            var $button = instance.$refs.toolbar.find('[data-fancybox-fullscreen]');

            if (instance && !instance.FullScreen && instance.group[instance.currIndex].opts.fullScreen) {
                $container = instance.$refs.container;

                $container.on('click.fb-fullscreen', '[data-fancybox-fullscreen]', function (e) {

                    e.stopPropagation();
                    e.preventDefault();

                    FullScreen.toggle($container[0]);
                });

                if (instance.opts.fullScreen && instance.opts.fullScreen.autoStart === true) {
                    FullScreen.request($container[0]);
                }

                // Expose API
                instance.FullScreen = FullScreen;
            } else {
                $button.hide();
            }
        },

        'afterKeydown.fb': function (e, instance, current, keypress, keycode) {

            // "P" or Spacebar
            if (instance && instance.FullScreen && keycode === 70) {
                keypress.preventDefault();

                instance.FullScreen.toggle(instance.$refs.container[0]);
            }
        },

        'beforeClose.fb': function (instance) {
            if (instance && instance.FullScreen) {
                FullScreen.exit();
            }
        }
    });

    $(document).on(fn.fullscreenchange, function () {
        var instance = $.fancybox.getInstance();

        // If image is zooming, then force to stop and reposition properly
        if (instance.current && instance.current.type === 'image' && instance.isAnimating) {
            instance.current.$content.css('transition', 'none');

            instance.isAnimating = false;

            instance.update(true, true, 0);
        }

        instance.trigger('onFullscreenChange', FullScreen.isFullscreen());
    });
})(document, window.jQuery);

// ==========================================================================
//
// Thumbs
// Displays thumbnails in a grid
//
// ==========================================================================
;(function (document, $) {
    'use strict';

    var FancyThumbs = function (instance) {
        this.instance = instance;
        this.init();
    };

    $.extend(FancyThumbs.prototype, {

        $button: null,
        $grid: null,
        $list: null,
        isVisible: false,

        init: function () {
            var self = this;

            var first = self.instance.group[0],
                second = self.instance.group[1];

            self.$button = self.instance.$refs.toolbar.find('[data-fancybox-thumbs]');

            if (self.instance.group.length > 1 && self.instance.group[self.instance.currIndex].opts.thumbs && (first.type == 'image' || first.opts.thumb || first.opts.$thumb) && (second.type == 'image' || second.opts.thumb || second.opts.$thumb)) {

                self.$button.on('click', function () {
                    self.toggle();
                });

                self.isActive = true;
            } else {
                self.$button.hide();

                self.isActive = false;
            }
        },

        create: function () {
            var instance = this.instance,
                list,
                src;

            this.$grid = $('<div class="fancybox-thumbs"></div>').appendTo(instance.$refs.container);

            list = '<ul>';

            $.each(instance.group, function (i, item) {

                src = item.opts.thumb || (item.opts.$thumb ? item.opts.$thumb.attr('src') : null);

                if (!src && item.type === 'image') {
                    src = item.src;
                }

                if (src && src.length) {
                    list += '<li data-index="' + i + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + src + '" /></li>';
                }
            });

            list += '</ul>';

            this.$list = $(list).appendTo(this.$grid).on('click', 'li', function () {
                instance.jumpTo($(this).data('index'));
            });

            this.$list.find('img').hide().one('load', function () {

                var $parent = $(this).parent().removeClass('fancybox-thumbs-loading'),
                    thumbWidth = $parent.outerWidth(),
                    thumbHeight = $parent.outerHeight(),
                    width,
                    height,
                    widthRatio,
                    heightRatio;

                width = this.naturalWidth || this.width;
                height = this.naturalHeight || this.height;

                //Calculate thumbnail width/height and center it

                widthRatio = width / thumbWidth;
                heightRatio = height / thumbHeight;

                if (widthRatio >= 1 && heightRatio >= 1) {
                    if (widthRatio > heightRatio) {
                        width = width / heightRatio;
                        height = thumbHeight;
                    } else {
                        width = thumbWidth;
                        height = height / widthRatio;
                    }
                }

                $(this).css({
                    width: Math.floor(width),
                    height: Math.floor(height),
                    'margin-top': Math.min(0, Math.floor(thumbHeight * 0.3 - height * 0.3)),
                    'margin-left': Math.min(0, Math.floor(thumbWidth * 0.5 - width * 0.5))
                }).show();
            }).each(function () {
                this.src = $(this).data('src');
            });
        },

        focus: function () {

            if (this.instance.current) {
                this.$list.children().removeClass('fancybox-thumbs-active').filter('[data-index="' + this.instance.current.index + '"]').addClass('fancybox-thumbs-active').focus();
            }
        },

        close: function () {
            this.$grid.hide();
        },

        update: function () {

            this.instance.$refs.container.toggleClass('fancybox-show-thumbs', this.isVisible);

            if (this.isVisible) {

                if (!this.$grid) {
                    this.create();
                }

                this.instance.trigger('onThumbsShow');

                this.focus();
            } else if (this.$grid) {
                this.instance.trigger('onThumbsHide');
            }

            // Update content position
            this.instance.update();
        },

        hide: function () {
            this.isVisible = false;
            this.update();
        },

        show: function () {
            this.isVisible = true;
            this.update();
        },

        toggle: function () {
            this.isVisible = !this.isVisible;
            this.update();
        }

    });

    $(document).on({

        'onInit.fb': function (e, instance) {
            if (instance && !instance.Thumbs) {
                instance.Thumbs = new FancyThumbs(instance);
            }
        },

        'beforeShow.fb': function (e, instance, item, firstRun) {
            var Thumbs = instance && instance.Thumbs;

            if (!Thumbs || !Thumbs.isActive) {
                return;
            }

            if (item.modal) {
                Thumbs.$button.hide();

                Thumbs.hide();

                return;
            }

            if (firstRun && instance.opts.thumbs.autoStart === true) {
                Thumbs.show();
            }

            if (Thumbs.isVisible) {
                Thumbs.focus();
            }
        },

        'afterKeydown.fb': function (e, instance, current, keypress, keycode) {
            var Thumbs = instance && instance.Thumbs;

            // "G"
            if (Thumbs && Thumbs.isActive && keycode === 71) {
                keypress.preventDefault();

                Thumbs.toggle();
            }
        },

        'beforeClose.fb': function (e, instance) {
            var Thumbs = instance && instance.Thumbs;

            if (Thumbs && Thumbs.isVisible && instance.opts.thumbs.hideOnClose !== false) {
                Thumbs.close();
            }
        }

    });
})(document, window.jQuery);

// ==========================================================================
//
// Hash
// Enables linking to each modal
//
// ==========================================================================
;(function (document, window, $) {
    'use strict';

    // Simple $.escapeSelector polyfill (for jQuery prior v3)

    if (!$.escapeSelector) {
        $.escapeSelector = function (sel) {
            var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
            var fcssescape = function (ch, asCodePoint) {
                if (asCodePoint) {
                    // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                    if (ch === "\0") {
                        return "\uFFFD";
                    }

                    // Control characters and (dependent upon position) numbers get escaped as code points
                    return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
                }

                // Other potentially-special ASCII characters get backslash-escaped
                return "\\" + ch;
            };

            return (sel + "").replace(rcssescape, fcssescape);
        };
    }

    // Create new history entry only once
    var shouldCreateHistory = true;

    // Variable containing last hash value set by fancyBox
    // It will be used to determine if fancyBox needs to close after hash change is detected
    var currentHash = null;

    // Throttling the history change
    var timerID = null;

    // Get info about gallery name and current index from url
    function parseUrl() {
        var hash = window.location.hash.substr(1);
        var rez = hash.split('-');
        var index = rez.length > 1 && /^\+?\d+$/.test(rez[rez.length - 1]) ? parseInt(rez.pop(-1), 10) || 1 : 1;
        var gallery = rez.join('-');

        // Index is starting from 1
        if (index < 1) {
            index = 1;
        }

        return {
            hash: hash,
            index: index,
            gallery: gallery
        };
    }

    // Trigger click evnt on links to open new fancyBox instance
    function triggerFromUrl(url) {
        var $el;

        if (url.gallery !== '') {

            // If we can find element matching 'data-fancybox' atribute, then trigger click event for that ..
            $el = $("[data-fancybox='" + $.escapeSelector(url.gallery) + "']").eq(url.index - 1);

            if (!$el.length) {
                // .. if not, try finding element by ID
                $el = $("#" + $.escapeSelector(url.gallery) + "");
            }

            if ($el.length) {
                shouldCreateHistory = false;

                $el.trigger('click');
            }
        }
    }

    // Get gallery name from current instance
    function getGalleryID(instance) {
        var opts;

        if (!instance) {
            return false;
        }

        opts = instance.current ? instance.current.opts : instance.opts;

        return opts.hash || (opts.$orig ? opts.$orig.data('fancybox') : '');
    }

    // Star when DOM becomes ready
    $(function () {

        // Small delay is used to allow other scripts to process "dom ready" event
        setTimeout(function () {

            // Check if this module is not disabled
            if ($.fancybox.defaults.hash === false) {
                return;
            }

            // Update hash when opening/closing fancyBox
            $(document).on({
                'onInit.fb': function (e, instance) {
                    var url, gallery;

                    if (instance.group[instance.currIndex].opts.hash === false) {
                        return;
                    }

                    url = parseUrl();
                    gallery = getGalleryID(instance);

                    // Make sure gallery start index matches index from hash
                    if (gallery && url.gallery && gallery == url.gallery) {
                        instance.currIndex = url.index - 1;
                    }
                },

                'beforeShow.fb': function (e, instance, current) {
                    var gallery;

                    if (!current || current.opts.hash === false) {
                        return;
                    }

                    gallery = getGalleryID(instance);

                    // Update window hash
                    if (gallery && gallery !== '') {

                        if (window.location.hash.indexOf(gallery) < 0) {
                            instance.opts.origHash = window.location.hash;
                        }

                        currentHash = gallery + (instance.group.length > 1 ? '-' + (current.index + 1) : '');

                        if ('replaceState' in window.history) {
                            if (timerID) {
                                clearTimeout(timerID);
                            }

                            timerID = setTimeout(function () {
                                window.history[shouldCreateHistory ? 'pushState' : 'replaceState']({}, document.title, window.location.pathname + window.location.search + '#' + currentHash);

                                timerID = null;

                                shouldCreateHistory = false;
                            }, 300);
                        } else {
                            window.location.hash = currentHash;
                        }
                    }
                },

                'beforeClose.fb': function (e, instance, current) {
                    var gallery, origHash;

                    if (timerID) {
                        clearTimeout(timerID);
                    }

                    if (current.opts.hash === false) {
                        return;
                    }

                    gallery = getGalleryID(instance);
                    origHash = instance && instance.opts.origHash ? instance.opts.origHash : '';

                    // Remove hash from location bar
                    if (gallery && gallery !== '') {

                        if ('replaceState' in history) {
                            window.history.replaceState({}, document.title, window.location.pathname + window.location.search + origHash);
                        } else {
                            window.location.hash = origHash;

                            // Keep original scroll position
                            $(window).scrollTop(instance.scrollTop).scrollLeft(instance.scrollLeft);
                        }
                    }

                    currentHash = null;
                }
            });

            // Check if need to close after url has changed
            $(window).on('hashchange.fb', function () {
                var url = parseUrl();

                if ($.fancybox.getInstance()) {
                    if (currentHash && currentHash !== url.gallery + '-' + url.index && !(url.index === 1 && currentHash == url.gallery)) {
                        currentHash = null;

                        $.fancybox.close();
                    }
                } else if (url.gallery !== '') {
                    triggerFromUrl(url);
                }
            });

            // Check current hash and trigger click event on matching element to start fancyBox, if needed
            triggerFromUrl(parseUrl());
        }, 50);
    });
})(document, window, window.jQuery);

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./itcase_sphinx_theme/itcase/static/js/vendor/js.cookie.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
})(function () {
	function extend() {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[i];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init(converter) {
		function api(key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return document.cookie = key + '=' + value + stringifiedAttributes;
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
});

/***/ }),

/***/ "./node_modules/expose-loader/index.js?Cookies!./itcase_sphinx_theme/itcase/static/js/vendor/js.cookie.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["Cookies"] = __webpack_require__("./node_modules/babel-loader/lib/index.js!./itcase_sphinx_theme/itcase/static/js/vendor/js.cookie.js");
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./itcase_sphinx_theme/itcase/static/js/main.js");


/***/ })

/******/ });
//# sourceMappingURL=__main.js.map