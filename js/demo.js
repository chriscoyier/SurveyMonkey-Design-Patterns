// IIFE to ensure safe usage of $
(function($) {

  /* Faking Menu Functionality */

  $(".main-nav > li > a ").click(function(e) {
     e.preventDefault();
     $(".main-nav > li").removeClass("active");
     $(this).parent().addClass("active");
  });



  /* Faking Help Popout Functionality */
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