(function ($) {
///////////////

/**
 * @file
 * Attached the 'fixed' behavior to blocks.
 * 
 * Basic algorithm code originally from BoingBoing. Code mostly rewritten.
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
  $('.sticky-block').each( function(index) {
    var block = $(this);
    // Find the placeholder that should be directly before the target block
    var pinpoint_y = $('.sticky-block-pinpoint', block.parent()).offset().top;
    // The location of the pinpoint 
    // (a placeholder inserted just above the target that moves with the normal flow) 
    // is the key.
    // When THAT is onscreen, use normal flow.
    // If it scrolls off, then switch to fixed behavior.
    
    if (pinpoint_y-10 < scrolled) {
      // If the pinpoint is offscreen, we should switch to position:fixed.
      // Switching to fixed may sometimes affect layout width unexpectedly, 
      // so there's a fix for that here too.
      if (!block.hasClass('fixed')) {
        block.addClass('fixed')
          .width(block.width())
          .css({'position':'fixed', 'top':'10px', 'overflow':'hidden'})
      }
    } 
    else { 
      // Unpin it if the pinpoint becomes visible on the screen. Restore normal flow.
      if (block.hasClass('fixed')) {
        block.removeClass('fixed')
          .css({'position':'inherit', 'overflow':'inherit'})
      }
    }
  })
}

///////////
})(jQuery);

