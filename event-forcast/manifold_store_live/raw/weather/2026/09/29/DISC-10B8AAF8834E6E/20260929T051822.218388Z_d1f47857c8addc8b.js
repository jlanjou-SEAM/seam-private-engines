/**
 * @file
 * Javascript functionality for Pullquote's administration UI.
 */

(function ($, window) {

  'use strict';

  Drupal.behaviors.pullquote = {
    attach: function() {
      if (window.location.pathname != "/admin/config/content/pullquote-style") {
        return
      }

      // dynamically create stylesheet link
      let newCss = document.createElement('link');
      newCss.rel = 'stylesheet';
      newCss.id = 'pullquote-sheet';
      newCss.type = 'text/css';
      // set default CSS to user-supplied stylesheet or pre-selected stylesheet
      newCss.href = $("input[id='edit-pullquote-css-source-path']").is(':checked')
        ? '/' + $('#edit-pullquote-css-path').val()
        : '/' + $('#edit-pullquote-css-selection').val();
      document.head.appendChild(newCss);

      // change stylesheet based on `Pullquote Style` dropdown
      $('#edit-pullquote-css-selection').change(function() {
        if ($('#edit-pullquote-css-selection').val()) {
          $('link#pullquote-sheet').attr('href', '/' + $('#edit-pullquote-css-selection').val());
        }
      });

      // use default stylesheet when 'Pullquote module supplied styles' selected
      $('#edit-pullquote-css-source-selection').click(function() {
        if ($('#edit-pullquote-css-selection').val()) {
          $('link#pullquote-sheet').attr('href', '/' + $('#edit-pullquote-css-selection').val());
        }
      });

      // display styles from user-supplied stylesheet
      $('#edit-pullquote-css-source-path').click(function() {
        if ($('#edit-pullquote-css-path').val()) {
          $('link#pullquote-sheet').attr('href', '/' + $('#edit-pullquote-css-path').val());
        }
      });

    }
  };
})(jQuery, window);
