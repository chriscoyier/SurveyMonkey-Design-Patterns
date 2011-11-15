(function($) {
  
  var doc = $(document), relatedMenu, el;
  
  doc.on("click", "a[data-menu]", function(e) {
    
    e.preventDefault();
    
    el = $(this).toggleClass("open");
    
    relatedMenu = $("#" + el.data("menu"));
    buttonPosition = el.position();
    
    if (relatedMenu.hasClass("open")) {
      
      relatedMenu.css({
        
        left: -9999,
        top: -9999
        
      });
      
    } else {
      
      relatedMenu.css({
        
        left: buttonPosition.left,
        top: buttonPosition.top + el.outerHeight()
        
      });
      
    }
    
    relatedMenu.toggleClass("open");
    
  });
  
})(jQuery);