(function($) {

  // revealContent //

  var withinViewport = (function() {

    'use strict';

    // Cutting the mustard
    // http://webfieldmanual.com/guides/cutting-the-mustard.html

    if (window.requestAnimationFrame && document.documentElement.classList) {

      // Passes the test so add enhanced class to HTML tag
      document.documentElement.classList.add('enhanced');

      // Throttle
      // https://underscorejs.org/#throttle
      var throttle = function(func, wait, options) {
        var _ = {
          now: Date.now || function() {
            return new Date().getTime();
          }
        };
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) {
          options = {};
        }
        var later = function() {
          previous = options.leading === false ? 0 : _.now();
          timeout = null;
          result = func.apply(context, args);
          if (!timeout) {
            context = args = null;
          }
        };
        return function() {
          var now = _.now();
          if (!previous && options.leading === false) {
            previous = now;
          }
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          if (remaining <= 0 || remaining > wait) {
            if (timeout) {
              clearTimeout(timeout);
              timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) {
              context = args = null;
            }
          } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
          }
          return result;
        };
      };

      // requestAnimationFrame
      // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
      var _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

      // Global class for revealing element
      var revealer = document.querySelectorAll('.revealer');

      // Get the viewport (window) dimensions
      var getViewportSize = function() {
        return {
          width: window.document.documentElement.clientWidth,
          height: window.document.documentElement.clientHeight
        };
      };

      // Get the current scoll position
      var getCurrentScroll = function() {
        return {
          x: window.pageXOffset,
          y: window.pageYOffset
        };
      };

      // Get element dimensions and position
      var getElemInfo = function(elem) {
        var offsetTop = 0;
        var offsetLeft = 0;
        var offsetHeight = elem.offsetHeight;
        var offsetWidth = elem.offsetWidth;

        do {
          if (!isNaN(elem.offsetTop)) {
            offsetTop += elem.offsetTop;
          }
          if (!isNaN(elem.offsetLeft)) {
            offsetLeft += elem.offsetLeft;
          }
        } while ((elem = elem.offsetParent) !== null);

        return {
          top: offsetTop,
          left: offsetLeft,
          height: offsetHeight,
          width: offsetWidth
        };
      };

      // Check visibility of the element in the viewport
      var checkVisibility = function(elem) {
        var viewportSize = getViewportSize();
        var currentScroll = getCurrentScroll();
        var elemInfo = getElemInfo(elem);
        var spaceOffset = 0.2;
        var elemHeight = elemInfo.height;
        var elemWidth = elemInfo.width;
        var elemTop = elemInfo.top;
        var elemLeft = elemInfo.left;
        var elemBottom = elemTop + elemHeight;
        var elemRight = elemLeft + elemWidth;

        var checkBoundaries = function() {
          // Defining the element boundaries and extra space offset
          var top = elemTop + elemHeight * spaceOffset;
          var left = elemLeft + elemWidth * spaceOffset;
          var bottom = elemBottom - elemHeight * spaceOffset;
          var right = elemRight - elemWidth * spaceOffset;

          // Defining the window boundaries and window offset
          var wTop = currentScroll.y + 0;
          var wLeft = currentScroll.x + 0;
          var wBottom = currentScroll.y - 0 + viewportSize.height;
          var wRight = currentScroll.x - 0 + viewportSize.width;

          // Check if the element is within boundary
          return (top < wBottom) && (bottom > wTop) && (left > wLeft) && (right < wRight);
        };

        return checkBoundaries();
      };

      // Run a loop with checkVisibility() and add / remove classes to the elements
      var toggleElement = function() {
        for (var i = 0; i < revealer.length; i++) {
          if (checkVisibility(revealer[i])) {
            revealer[i].classList.add('revealed');
          }
        }
      };

      // Throttle events and requestAnimationFrame
      var scrollHandler = throttle(function() {
        _requestAnimationFrame(toggleElement);
      }, 300);

      var resizeHandler = throttle(function() {
        _requestAnimationFrame(toggleElement);

      }, 300);

      scrollHandler();

      // Listening for events
      if (window.addEventListener) {
        addEventListener('scroll', scrollHandler, false);
        addEventListener('resize', resizeHandler, false);
      } else if (window.attachEvent) {
        window.attachEvent('onscroll', scrollHandler);
        window.attachEvent('onresize', resizeHandler);
      } else {
        window.onscroll = scrollHandler;
        window.onresize = resizeHandler;
      }

    }


    return withinViewport;

  }());



(function($) {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}());



/*!
* Start Bootstrap - Scrolling Nav v5.0.3 (https://startbootstrap.com/template/scrolling-nav)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Scroll class to header for styling
$(window).scroll(function() {
   if ($(this).scrollTop() > 150){
      $('header').addClass("small");
   } else {
      $('header').removeClass("small");
   }
});



// smooth Scrolling// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });


})(jQuery);

//# sourceMappingURL=scripts.js.map
