(function($) {
  
  var doc = $(document), relatedMenu, el,
      allMenus = $(".button-menu"),
      allButtons = $("a[data-menu]");
      
  function closeEverything() {
    allMenus.css({
      left: -9999,
      top: -9999
    }).removeClass("open");
    allButtons.removeClass("open");
  }
  
  doc.on("click", "a[data-menu]", function(e) {
    
    e.preventDefault();
    
    el = $(this)
    
    // It's already open, close it.
    if (el.hasClass("open")) {
      
      closeEverything();
    
    // It's not open yet, open it.
    } else {
      
      closeEverything();
      
      el.addClass("open");

      relatedMenu = $("#" + el.data("menu"));
      buttonPosition = el.position();

      relatedMenu.css({

        left: buttonPosition.left,
        top: buttonPosition.top + el.outerHeight()

      }).addClass("open");
      
    }
            
  });
  
  doc.on("mouseleave", ".button-menu", function() {
    closeEverything();
  });
  
})(jQuery);