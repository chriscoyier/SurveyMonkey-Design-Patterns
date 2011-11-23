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
  
  doc.on("click", "a[data-menu]:not(.disabled)", function(e) {
    
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

	doc.on("click", ".state-change a", function(e) {
		
		e.preventDefault();
		
		var el = $(this);
		
		var closestID = el.closest(".button-menu").attr("id");
		
		var relatedButton = $("[data-menu='" + closestID + "']");
		
		relatedButton.html(el.text() + "<span></span>"); // span == arrow
		
		// Custom event
		doc.trigger(el.attr("id") + "-open", el);
		
	});
  
})(jQuery);