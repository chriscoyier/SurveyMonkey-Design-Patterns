(function($) {
  
  var speed = 200;
  
  jQuery.fn.animateAuto = function(prop, speed, callback) {

      var elem, height, width;

      return this.each(function(i, el) {
        
          el = jQuery(el), elem = el.clone().css({
            "height":"auto",
            "width":"auto"})
            .appendTo(el.parent()); // weird? didn't work when appending to body
                      
          height = elem.outerHeight(),
          width  = elem.outerWidth();
          elem.remove();
          
          if (prop === "height")
              el.animate({"height": height}, speed, callback);
          else if (prop === "width")
              el.animate({"width": width}, speed, callback);  
          else if (prop === "both")
              el.animate({"width": width,"height": height}, speed, callback);
      });  
      
  }
  
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
            
            base.closePanel(clickedPanel);
            
          } else {
            
            anyPanelsOpen = parentAccordion.find(".open");
            
            // There is an open panel
            if (anyPanelsOpen.length) {
              base.closePanel(anyPanelsOpen);
            };
            
            base.openPanel(clickedPanel);
                        
          };
          
        });
        
     } else if (el.hasClass("multiple")) {
     
        el.delegate("h3", "click", function(e) {
          e.preventDefault();
          el = $(this);
          
          clickedPanel = el.closest(".key"); 
          
          if (clickedPanel.hasClass("open")) {
            base.closePanel(clickedPanel);
          } else {
            base.openPanel(clickedPanel);
          };
          
        });
        
      }; // END type of accordion logic
      
    }; // END init
    
    
    // Functions for opening and closing panels don't have any logic
    // they just do what they are told.
    
    // If you need the open/close to behave like the type of slider it is
    // (e.g. "single" or "multiple") may be better to trigger click on the h3 element
    
    base.openPanel = function(el) {
			
			// API Usage
			if (typeof(el) == 'string') { el = $("#" + el); }
      
      el
        .find("> section")
          .height(0)
          .end()
        .addClass("open");

      if (el.closest(".accordion").hasClass("static")) {

        el
          .find("> section")
          .animate({"height": 410}, speed);

      } else {

        el
          .find("> section")
          .animateAuto("height", speed, function() {
            
            // After animating open
            el.find("> section").removeAttr("style");
            
          });

      }

      doc.trigger(el.attr('id') + "-open", el);
      
    };
    
    base.closePanel = function(el) {
            
      el
        .find("> section")
        .animate({"height": 0}, speed, function(){
            el.removeClass("open")
        });
      
      doc.trigger(el.attr('id') + "-close", el);
      
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
