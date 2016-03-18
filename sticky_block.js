(function ($) {
///////////////

/**
 * @file
 * Attached the 'fixed' behavior to blocks.
 * 
 * Basic algorithm code originally inspired by BoingBoing. Code entirely rewritten.
 * Extended to support multiple different floats on the same page.
 * 
 * @usage Add the class '.sticky-block' to an element you wish to always remain onscreen.
 * 
 * @author dman
 */

Drupal.behaviors.sticky_block = {
  attach: function (context, settings) {

    if ($('.sticky-block').length > 0) {
      // .sticky-block is the div we pin. May start anywhere on the page
      // Could have used an ID, but adding classes is easier in the template.

      // Insert a placeholder marker just above our target element.
      // This is used for positioning reference.
      $('.sticky-block').before($('<div class="sticky-block-pinpoint"></div>'));
      $('.sticky-block').after($('<div class="sticky-block-pinpoint2"></div>'));
      
      // Whenever the page is scrolled, let's see if we should pin the sidebar.
      $(window).scroll(function() {
        toggle_sticky_block();
      });
      $(window).resize(function(){
        toggle_sticky_block();
      });
    }
  }
} // End startup
  
/**
 * Recalculate if the sticky-block needs to be positioned
 */
function toggle_sticky_block(){
  var scrolled = $(document).scrollTop();
  var winheight = $(window).height();
  var baseline = scrolled + winheight;
  
  $('.sticky-block').each( function(index) {
    var block = $(this);
    // Find the placeholder that should be directly before the target block
    var pinpoint = $('.sticky-block-pinpoint', block.parent());
    var pinpoint_y = parseInt(pinpoint.offset().top);
    // The location of the pinpoint 
    // (a placeholder inserted just above the target that moves with the normal flow) 
    // is the key.
    // When THAT is onscreen, use normal flow.
    // If it scrolls off, then switch to fixed behavior.
    
    var pinpoint2 = $('.sticky-block-pinpoint2', block.parent());
    var pinpoint2_y = parseInt(pinpoint2.offset().top);
    // Pinpoint2 is a spaceholder that reserves space at the bottom of the element.
    
  if (pinpoint_y-10 < scrolled) {
      // If the pinpoint is offscreen, we should switch to position:fixed.
      // Switching to fixed may sometimes affect layout width unexpectedly, 
      // so there's a fix for that here too.
      if (!block.hasClass('fixed')) {
        // In some themes removing the content of the sidebar block makes its
        // column collapse. Leave a sliver of the pinpoint behind to hold
        // the borders out.
        pinpoint.width(block.width()).height(1);

        block.addClass('fixed')
          .width(block.width())
          .css({'position':'fixed', 'top':'10px', 'overflow':'hidden'})

          // .css({'z-index':'700'})
          // z-index can be added to show over the Drupal7 toolbar.
          // However, it then may conflict with the overlay.
          // It is only in effect when position:fixed, so there may be flicker.
          // Generally, too much bother.
      }
    } 
    else if ((scrolled+winheight) < (pinpoint2_y)) {
      // Then the block is starting to go off the screen at the BOTTOM.
      //console.log("comparing baseline "+ (scrolled+winheight)  +" with the boxes bottom " + (pinpoint_y + block.height() +parseInt(block.css('margin-bottom')) +parseInt(block.css('padding-bottom')) ) + " or the top of the item below it " + pinpoint2_y );
      
      // Lock some space under the block to avoid jitters 
      if (pinpoint2.css('position') != 'absolute') {
        pinpoint2.css({'position':'absolute', 'top':pinpoint2.position().top});
      }
      
      // Fix the block to the bottom
      if (!block.hasClass('fixed')) {
        block.addClass('fixed')
          .width(block.width())
          .css({'position':'fixed', 'bottom':'0px', 'overflow':'hidden'})
      }
    }
    else { 
      // Unpin it if the pinpoint becomes visible on the screen. Restore normal flow.
      if (block.hasClass('fixed')) {
        block.removeClass('fixed')
          .css({'position':'inherit', 'overflow':'visible', 'bottom':'auto', 'top':'auto'})
        // Unpinning this placeholder however seems to confuse things.
        //pinpoint2.css({'position':'relative'});
      }
    }
  })
}

///////////
})(jQuery);

