// IIFE to ensure safe usage of $
(function($) {
  
  var doc = $(document);

  /* Faking Menu Functionality -- This allows for clicks to set the "active" state of other menu items */

  $(".main-nav > li > a ").click(function(e) {
     e.preventDefault();
     $(".main-nav > li").removeClass("active");
     $(this).parent().addClass("active");
  });
  
  /* Probably going to need some "click to open" functionality on these (as per live site) */
  


  /* Accordions */
  
  // Assumes standard accordian HTML structure
  // All panels closed by default
  $(".accordion").accordion();
  
  // API for opening particular panel (no logic)
  // $(".accordion").accordion("ac5");
  
  // Example custom event 
  // pattern = class-open or class-close
  doc.on("ac2-open", function(event, el) {
    
    // console.log("This panel opened: " + el);
    
  });
  
  
  /* Tabs */
  
  $(".tabs, .pillbox").tabs();
  
  
  /* Spinners */
  
  $("#spinner-test").submit(function(e) {
    
    e.preventDefault();
    
    $.spinner({
      text: $("#test-spinner-text").val(),
      action: "show"
    });

    // Probably actually after some Ajax saving or something
    setTimeout(function() {
      $.spinner({
        action: "hide"
      });
    }, 2000);
    
  });


})(jQuery);