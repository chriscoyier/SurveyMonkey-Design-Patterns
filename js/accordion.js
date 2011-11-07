(function($) {
  
  var doc = $(document),
      el, panelToClose, panelToOpen, clickedPanel, 
      parentAccordion, anyPanelsOpen;
  
  $.accordion = function(el, options) {
    
    var base = this;
    
    base.el = el;
    base.$el = $(el);
    
    base.$el.data("accordion", base);
    
    base.init = function() {
      
      var el = base.$el;
      
      if (el.hasClass("single")) {
      
        el.delegate("h3", "click", function(e) {
          e.preventDefault();
          el = $(this);
          
          clickedPanel = el.closest(".key");
          parentAccordion = el.closest(".accordion");
          
          if (clickedPanel.hasClass("open")) {
            
            base.closePanel(el.data("panel"));
            
          } else {
            
            anyPanelsOpen = parentAccordion.find(".open");
            
            // There is an open panel
            if (anyPanelsOpen.length) {
              base.closePanel(anyPanelsOpen.find("> h3").data("panel"));
            };
            
            base.openPanel(el.data("panel"));
                        
          };
          
        });
        
     } else if (el.hasClass("multiple")) {
     
        el.delegate("h3", "click", function(e) {
          e.preventDefault();
          el = $(this);
          
          clickedPanel = el.closest(".key"); 
          
          if (clickedPanel.hasClass("open")) {
            base.closePanel(el.data("panel"));
          } else {
            base.openPanel(el.data("panel"));
          };
          
        });
        
      }; // END type of accordion logic
      
    }; // END init
    
    
    // Functions for opening and closing panels don't have any logic
    // they just do what they are told.
    
    // If you need the open/close to behave like the type of slider it is
    // (e.g. "single" or "multiple") may be better to trigger click on the h3 element
    
    base.openPanel = function(panelClass) {
      
      el = $("[data-panel=" + panelClass + "]");
            
      el.closest(".key").addClass("open");
      doc.trigger(panelClass + "-open", el);
      
    };
    
    base.closePanel = function(panelClass) {
      
      el = $("[data-panel=" + panelClass + "]");
            
      el.closest(".key").removeClass("open");
      doc.trigger(panelClass + "-close", el);
      
    };
    
    base.init();
    
  }; // END $.accordion
  
  $.fn.accordion = function(options) {
    
    return this.each(function(i, el) {

      var anyAccordion = $(this).data('accordion');
      
      if (typeof(options) == "string") {
        anyAccordion.openPanel(options);
      }
      
      if (!anyAccordion) {
      		(new $.accordion(this, options));
      } else {
        // Accordion already set up
      };
              
    });
  
  }; // END accordion plugin
  
})(jQuery);