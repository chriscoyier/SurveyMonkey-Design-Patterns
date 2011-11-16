(function($) {
  
  var doc = $(document), el;
  
  $.tabs = function(el, options) {
    
    var base = this;
    
    base.el = el;
    base.$el = $(el);
    
    base.$el.data("tabs", base);
    
    base.init = function() {
     
      base.$el.on("click", "a", function(e) {
                
        e.preventDefault();
        
        base.closeSisterTabs(this);
        base.openTab($(this).attr("class"));
        
      });
      
    }; // END init
    
 
    base.openTab = function(tabClass) {

      $("." + tabClass).addClass("active");
      
      // Custom event
      doc.trigger(tabClass + "-open");
      
    };
    
    base.closeSisterTabs = function(theTab) {
      
      $(theTab).closest("nav").find("a").each(function() {
        
        el = $(this);
        el.removeClass("active");
        
        // Custom event
        doc.trigger(el.attr("close") + "-close");
        
      })
      
    };
    
    base.init();
    
  }; // END $.accordion
  
  $.fn.tabs = function(options) {
    
    return this.each(function(i, el) {

      var anyTab = $(this).data('tab');
      
      if (typeof(options) == "string") {
        anyTab.openTab(options);
      }
      
      if (!anyTab) {
      		(new $.tabs(this, options));
      } else {
        // Tabs already set up
      };
              
    });
  
  }; // END tab plugin
  
})(jQuery);