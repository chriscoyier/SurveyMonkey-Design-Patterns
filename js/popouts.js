(function ($){
    $(document).on("mouseenter",".q",function(){
        var $elem = $(this);
        $elem.data("isHovered",true);
        setTimeout(function(){
            if($elem.data("isHovered")){
                $elem.addClass("open");
            }
        },750);
    }).on("mouseleave",".q",function(){
        var $elem = $(this);
        $elem.data("isHovered",false);
        setTimeout(function(){
           if(!$elem.data("isHovered")){
               $elem.removeClass("open");
           }
        },750); 
    });
})(jQuery);
