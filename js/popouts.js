(function($) {

  /* Requires hoverIntent plugin */
  /* Not working super well */
  
  var config = {    
       over: openPopup,   
       timeout: 750,    
       out: closePopup  
  },
  allQs = $('.q');

  function openPopup(el) {
    allQs.removeClass("open");
    $(el.currentTarget).addClass("open");
  };

  function closePopup(el) {
    $(el.currentTarget).removeClass("open");
  };

  allQs.hoverIntent(config);

})(jQuery);