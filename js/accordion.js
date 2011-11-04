(function($) {
  
  $.fn.accordion = function(options) {
    
    var doc = $(document),
        el, panelToClose, panelToOpen, clickedPanel, parentAccordion, anyPanelsOpen;
    
    return this.each(function(i, el) {
      
      el = $(this);
      
      if (el.hasClass("single")) {
      
        el.delegate("h3", "click", function(e) {
          e.preventDefault();
          el = $(this);
          
          clickedPanel = el.closest(".key");
          parentAccordion = el.closest(".accordion");
          
          if (clickedPanel.hasClass("open")) {
            
            clickedPanel.removeClass("open");
            doc.trigger(el.data("panel") + "-close", this);
            
          } else {
            
            anyPanelsOpen = parentAccordion.find(".open");
            
            // There is an open panel
            if (anyPanelsOpen.length) {
              
              anyPanelsOpen.removeClass("open");
              doc.trigger(el.data("panel") + "-close", this);
              
            }
            
            clickedPanel.addClass("open");
            doc.trigger(el.data("panel") + "-open", this);
            
          }
          
        });
        
     } else if (el.hasClass("multiple")) {
     
        el.delegate("h3", "click", function(e) {
          e.preventDefault();
          el = $(this);
          
          clickedPanel = el.closest(".key").toggleClass("open");  
          
          if (clickedPanel.hasClass("open")) {
            doc.trigger(el.data("panel") + "-open", this);
          } else {
            doc.trigger(el.data("panel") + "-close", this);
          }
          
        });
        
      }
              
    });
  
  } // END accordion plugin
  
})(jQuery);