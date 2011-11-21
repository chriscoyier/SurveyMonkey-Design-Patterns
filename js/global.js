(function($) {
  
  var doc = $(document);
  
  // Can't count on this unfortunately
  doc.on("click", ".disabled", function(event) {
    event.preventDefault();
  });
  
})(jQuery);