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
  
  $(".accordion").accordion();
  
  doc.on("ac2-open", function(event, el) {
    alert("ac2 was opened");
  });
  
  doc.on("ac2-close", function(event, el) {
    alert("closed" + el);
  });

})(jQuery);