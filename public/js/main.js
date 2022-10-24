(function ($) {
  "user strict";

  $(document).ready(function () {
    // counter Up
    if (document.querySelector(".counter") !== null) {
      $(".counter").counterUp({
        delay: 10,
        time: 2000,
      });
    }

    // Countdown
    $("[data-countdown]").each(function () {
      var $this = $(this),
        finalDate = $(this).data("countdown");
      $this.countdown(finalDate, function (event) {
        $this.html(
          event.strftime(
            "<h6> %D </h6> <h6> %H </h6> <h6> %M </h6> <h6> %S </h6>"
          )
        );
      });
    });
  });
})(jQuery);
