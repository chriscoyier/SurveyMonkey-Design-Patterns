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
      
      var menuLeftPos = buttonPosition.left;
      // One pixel shift for this type
      if (el.hasClass("btn-only-arrow")) { menuLeftPos--; }
      
      var menuTopPos = buttonPosition.top + el.outerHeight();

      relatedMenu.css({

        left: menuLeftPos,
        top: menuTopPos

      }).addClass("open");
      
    }
            
  });
  
  doc.on("mouseleave", ".button-menu", function() {
    closeEverything();
  });
  
})(jQuery);