(function ($){
    $.fn.popout = function(options){
       
       var settings = $.extend({},{
          enterDelay:750,
          leaveDelay:750
       },options);
    
       return this.each(function(){
           
           var $elem = $(this);
           var isHovered = true;

           $elem.hover(function(){
               isHovered = true;
               setTimeout(function(){
                   if(isHovered){
                       $elem.addClass("open");
                   }
               },settings.enterDelay);
           },function(){
               isHovered = false;
               setTimeout(function(){
                   if(!isHovered){
                       $elem.removeClass("open");
                   }
               },settings.leaveDelay);   
           });
       });
    }

})(jQuery);

$('.q').popout();
