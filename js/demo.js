// IIFE to ensure safe usage of $
(function($) {
  
  var doc = $(document);

  /* Faking Menu Functionality */

  $(".main-nav > li > a ").click(function(e) {
     e.preventDefault();
     $(".main-nav > li").removeClass("active");
     $(this).parent().addClass("active");
  });


  /* Accordions */
  
  // Assumes standard accordian HTML structure
  // All panels closed by default
  $(".accordion").accordion();
  
  // API for opening particular panel (no logic)
  // $(".accordion").accordion("ac5");
    
  doc.on("ac2-open", function(event, el) {
    
    // Example of custom open event.
    // class-open or class-close
    
    console.log("This panel opened: " + el);
    
  });

})(jQuery);