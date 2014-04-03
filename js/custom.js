(function ($) {

  /**
   * Functionality for Spotlight block show more/less link
   */
  Drupal.behaviors.spotlight_seemore = {
    attach: function () {
      $(window).bind('load ready resize', function () {
        // Check if spotlight exists.
        var $spotlight = $('.pane-bundle-spotlight, .pane-bundle-house-ads');
        if ($spotlight.length) {
          // If the line height of the body text changes, adjust this.
          var visibleHeight = 19 * 4;
          $spotlight.find('.pane-content > div').once('showmore-link').append('<p class="show-more"><span>Show More</span></p>');
          // Add behavior for every .show-more link.
          $spotlight.find('.show-more').once('showmore', function () {
            var $this = $(this),
              $spotlightContent = $this.siblings('.field-name-field-body'),
              contentHeight = $spotlightContent.find('p').height();
            // Remove .show-more if the body is less than the defined max height.
            $spotlightContent.css('height',visibleHeight);
            if (contentHeight <= visibleHeight) {
              $this.remove();
            }
            else {
              $this.click(function () {
                var $this = $(this), text, height;
                // Expand description to its real height.
                if (!$this.hasClass('active')) {
                  text = Drupal.t('Show Less');
                  height = contentHeight;
                }
                // Collapse description to defined max height.
                else {
                  text = Drupal.t('Show More');
                  height = visibleHeight;
                }
                //$spotlightContent.removeAttr('style')
                $spotlightContent.animate({'height' : height}, 300);
                $this
                  .toggleClass('active')
                  .html('<span>' + text + '</span>');
              });
            }
          });
        }
      });
    }
  };

  /**
   * Add accordion functionality for both
   * fieldable panel pane and WYSIWYG.
   */
  Drupal.behaviors.accordion = {
    attach: function () {

      // Define accordion title.
      var acctitle = $('.acc-title');
      if ( acctitle.length > 0 ) {
        acctitle.each(function () {
          var $this = $(this);
          if (!$this.hasClass('header-processed')) {
            $this.addClass('header-processed');
            // Find body container next to accordion title.
            var next = $this.next('.acc-body');
            // If there is more than 1 body an element after title
            // wrap them all into accordion-body-wrap class
            // by calling touchNeighbour recursive function.
            var found_body = false;
            var acc_body_elements;
            if ( next.length > 0 ) {
              next.wrapAll('<div class="accordion-body-wrap" />');
              touchNeighbour(next, 'acc-body');
              found_body = true;
            }
            else {
              // make one last attempt to find acc-body elements
              // lists may have an acc-body elements as li items
              next = $this.next();
              if (next.prop('tagName') == 'UL') {
                var ul_element = next;
                acc_body_elements = next.children('.acc-body');
                if (acc_body_elements.length > 0) {
                  ul_element.wrapAll('<div class="accordion-body-wrap" />');
                  touchNeighbour(ul_element, 'acc-body');
                  found_body = true;
                }
              }
              else if (next.prop('tagName') == 'TABLE') {
                var table_element = next;
                acc_body_elements = next.find('.acc-body');
                if (acc_body_elements.length > 0) {
                  table_element.wrapAll('<div class="accordion-body-wrap" />');
                  touchNeighbour(table_element, 'acc-body');
                  found_body = true;
                }
              }
            }
            if (found_body === false) {
              // If the title has body after it - remove styling.
              $this.removeClass('acc-title');
            }
          }
        });
      }

      if ( $('.acc-title').length > 0 ) {
        // Find accordion titles.
        var accordionHead = $('.acc-title');
        accordionHead.each(function () {
          // Add functionality on each accordion header.
          var currentHead = $(this);
          if (!currentHead.hasClass('processed')) {
            // Add +/- icon on header.
            currentHead.addClass('processed')
              .click(function () {
                var $this = $(this);
                if ($this.parents('.entity').length > 0) {
                  // If it's a fpp toggle body field.
                  $this.toggleClass('opened').parents('.entity').find('.accordion-body-wrap').slideToggle(250);
                }
                else {
                  // If it's inside WYSIWYG toggle body wrapper.
                  $this.toggleClass('opened').next('.accordion-body-wrap').slideToggle(250);
                }
            });
          }
        });
      }

      /**
       * A recursive function that checks elements next touchNeighbourr,
       * and if it has className or ClassName2 from arguments,
       * insert the it after checked element and repeat function.
       */
      function touchNeighbour(e, className, className2) {
        var next = e.parent().next();
        if ( next.hasClass(className) || next.hasClass(className2) ) {
          next.insertAfter(e);
          touchNeighbour(next, className, className2);
        }
        else {
          return false;
        }
      }
    }
  };

  /**
   * Check for social field fpp, if it exists, check the source.
   * If the source is twitter, grab the values from fields and
   * transmit them to gsb_tweetfeed function.
   */
  Drupal.behaviors.social_feed = {
    attach: function () {
      var socialWrapper = $('.pane-bundle-social-feed');
      if (socialWrapper.length > 0 && !socialWrapper.hasClass('processed')) {
        var _source = socialWrapper.find('.field-name-field-feed-source').text();
        if ( _source.toLowerCase() == 'twitter') {
          // Get tweets number and search query.
          var _length = socialWrapper.find('.field-name-field-social-display-num').text(),
            _search = socialWrapper.find('.field-name-field-twitter-search').text();

          // Initialize twitterfeed.js function.
          gsb_tweetfeed.init({
            search: _search,
            numTweets: _length,
            appendTo: '.pane-bundle-social-feed'
          });
        }
      }
    }
  };

  /**
   * Move quicklinks to top of page in mobile landscape context.
   * Move search to top of page in mobile landscape context.
   */
  Drupal.behaviors.mainmenu_mobile = {
    attach: function () {
      if (Modernizr.mq('(max-width: 568px)')) {
        $('#google-appliance-block-form').insertBefore($('#nav-touch-wrapper'));
        $('#quicklinks').insertBefore($('#top-content'));
        $('#block-gsb-public-custom-blocks-gpcb-enews-signup').insertBefore($('#block-menu-menu-footer-1'));
        $('.gsb-landing-events .inner-sidebar-wrapper').insertBefore($('#main'));
        $('.page-events .inner-sidebar-wrapper .pane-bundle-links').insertAfter($('.page-events .inner-sidebar-wrapper .pane-views-exp-gsb-event-panel-pane-2 .pane-content'));
      }
      if (Modernizr.mq('(max-width: 999px)')) {
        $('.banner-title').insertAfter($('#sidebar .sidebar'));
      }
    }
  };

  /**
   * Add classes to admission events table
   * Set class to active fitered column
   * Add class to table
   */

  Drupal.behaviors.setClassToActiveFiltered = {
    attach: function () {
      $('.view-admission-events table thead a').has('img').addClass('currentFilter');
      $('.view-admission-events table').addClass('responsive');
    }
  };

  /**
   * Input type number alternative for spinner
   */
  Drupal.behaviors.spinner = {
    attach: function () {
      // detect IE 10
      if (Function('/*@cc_on return document.documentMode===10@*/')()) {
        var isIE10 = true;
      }
      // detect IE 9
      if (Function('/*@cc_on return document.documentMode===9@*/')()) {
        var isIE9 = true;
      }
      if (!Modernizr.inputtypes.number || isIE10 || isIE9) {
        var $form_number = $('.form-number');
        $form_number.wrap('<span class="fake-input-wrapper" />')
        .after('<div class="arrows-wrapper"><button class="up" data-dir ="up" /><button class="down" data-dir ="down" /></div>');

        $('.fake-input-wrapper').each(function () {
          var numberInput = $(this).find('.form-number').attr('autocomplete','off'),
                min = parseInt(numberInput.attr('min')),
                max = parseInt(numberInput.attr('max')),
                step = parseInt(numberInput.attr('step'));

          $(this).find('button').click(function (e) {
            e.preventDefault();
            $(this).parent().prev().trigger('focus');
            var direction = $(this).data('dir'),
            val =  parseInt(numberInput.val());
            if (!val) {
              numberInput.val(min);
            }
            else if (val > max) {
              numberInput.val(max);
            }
            else {
              var mod = (val-min) % step;
              // increase or decrease depending on the button
              if (mod === 0) {
                ( direction === 'up' ) ?  val += step: val -= step;
              }
              else {
                ( direction === 'up' ) ?  val += step-mod: val -= mod;
              }
              if (val >=min && val < max ) {
                numberInput.val(val);
              }
            }
          });
        });
        $form_number.keydown(function (e) {
          if (e.which === 38) {
            $(this).next().find('.up').trigger('click');
          }
          if (e.which === 40) {
            $(this).next().find('.down').trigger('click');
          }
        });
      }
    }
  };

  /**
   * Changes the anchor element for the Views back to top link.
   */
  Drupal.behaviors.goTopLink = {
    attach: function () {
      if ($('#header-wrapper').length) {
        $('.go-to-top-link').find('a').attr('href','#header-wrapper');
      }
    }
  };

  /**
   * Custom Styling for selectbox.
   */
  Drupal.behaviors.gsb_theme = {
    attach: function () {
      $('#block-system-main').find('select').selectbox({
        animationSpeed: 'fast',
        replaceInvisible: true
      });
    }
  };

}(jQuery));
