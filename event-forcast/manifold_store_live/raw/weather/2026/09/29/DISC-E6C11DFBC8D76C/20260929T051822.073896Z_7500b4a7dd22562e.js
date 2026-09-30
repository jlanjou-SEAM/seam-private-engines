/**
 * @file
 * Reorders skip links for 508 compliance in Drupal.
 */

(function (Drupal) {
  Drupal.behaviors.skipLinkReorder = {
    attach: function (context, settings) {
      const observer = new MutationObserver((mutationsList, observer) => {
        const mainSkipLink = document.getElementById('main-content-skip-link');
        const gsaLink = document.querySelector('.usa-skipnav');

        if (mainSkipLink && gsaLink) {
          const parent = gsaLink.parentNode;

          if (mainSkipLink.nextElementSibling !== gsaLink) {
            parent.insertBefore(mainSkipLink, gsaLink);
          }

          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  };
})(Drupal);