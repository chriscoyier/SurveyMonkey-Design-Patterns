(function($) {
  
  var doc = $(document), el,
      spinner = $("#spinner"),
      spinnerText = "Doing stuff ...",
      hiddenTopPosition = -100,
      shownTopPosition = 20,
      moveDownSpeed = 400;
        
  $.spinner = function(options) {
    
    if (options.text && (typeof options.text == 'string')) {
      spinnerText = options.text;
    }
          
    // Spinner doesn't exist, make it
    if (!spinner.length) {
      
      $("<div />", {
        id: "spinner",
        html: "<img src='images/spinner_30_onGreen.gif'><span>" + spinnerText + "</span>",
        css: {
          top: hiddenTopPosition,
          right: 20
        }
      }).appendTo("body");
      
      // Re-set pointer now that it exists.
      spinner = $("#spinner");
      
    }
    
    spinner.html("<img src='images/spinner_30_onGreen.gif'><span>" + spinnerText + "</span>");
    
    if (options.action == 'show') {
      spinner.animate({
        top: shownTopPosition
      }, moveDownSpeed);
    }
    
    if (options.action == 'hide') {
      spinner.animate({
        top: hiddenTopPosition
      }, moveDownSpeed);
    }
    
    // Should there be custom events?
                
  }; // END spinner plugin
  
})(jQuery);