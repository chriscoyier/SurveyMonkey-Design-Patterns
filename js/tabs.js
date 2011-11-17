(function($) {
  
  var doc = $(document), el;
  
  $.tabs = function(el, options) {
    
    var base = this;
    
    base.el = el;
    base.$el = $(el);
    
    base.$el.data("tabs", base);
    
    base.init = function() {
     
      base.$el.on("click", "nav a", function(e) {
                
        e.preventDefault();
        
        el = $(this);
 
        if ( (el.closest(".tabs").hasClass("onoff")) && (el.hasClass("active") ) ) {
          base.closeSisterTabs(this);
        } else {
          base.closeSisterTabs(this);
          base.openTab(el);
        }        
        
      });
      
    }; // END init
    
 
    base.openTab = function(el) {

      el.addClass("active");
      
      var relatedPanel = $(el.attr("href"));
      relatedPanel.addClass("open");
            
      // Custom event
      doc.trigger(el.attr("href") + "-open");
      
    };
    
    base.closeAll = function() {
      
    };
    
    base.closeSisterTabs = function(theTab) {
      
      $(theTab).closest("nav").find(".active").each(function() {
        
        // scope el to just here, as next function uses it
        var el = $(this);
        el.removeClass("active");
        
        var relatedPanel = $(el.attr("href"));
        relatedPanel.removeClass("open");
                
        // Custom event
        doc.trigger(el.attr("href") + "-close");
        
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