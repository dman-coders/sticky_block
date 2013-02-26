(function ($) {

/**
 * Provide the summary information for the block settings vertical tabs.
 * When the setting is changed, the summary in the side of the tab is updated.
 */
Drupal.behaviors.stickyBlockSettingsSummary = {
  attach: function (context) {
    $('fieldset#edit-sticky-block', context).drupalSetSummary(function (context) {
      if (!$('input[name="sticky"]', context).attr('checked')) {
        return Drupal.t('Not sticky');
      }
      else {
        return Drupal.t('Sticky on page');
      }
    });
  }
};

})(jQuery);
