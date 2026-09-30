(function ($, Drupal) {
  Drupal.behaviors.img_title = {
    attach: function(context) {

      const images = document.getElementsByTagName('img')

      // Set img attr title if empty
      for (image of images) {
        if (image.alt && !image.title) {
          image.setAttribute("title", image.alt)
        }
      }

      // Open active tab from url
      var url = window.location.href;
      var hashIndex = url.indexOf("#");
      // Make sure hash exists in url
      if (hashIndex != -1) {
        var activeTab = url.substring(hashIndex + 1);
        // If hash exists in url, deactivate default tab and set hash as active.
        if (activeTab) {
          $(".nav-link").removeClass("active");
          $("#" + activeTab).addClass("active");
          $('a[href="#'+ activeTab +'"]').tab('show');
        }
      }
    }
  }
})(jQuery, Drupal)

function weatherLocation(){
  var location = document.getElementById("recent-weather-search").value;
  window.location.href = window.location.href + 'access/past-weather/' + location
}
