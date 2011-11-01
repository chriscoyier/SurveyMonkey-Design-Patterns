var doc = $(document);

doc.delegate(".accordion.multiple h3", "click", function(e) {
  e.preventDefault();
  $(this).closest(".key").toggleClass("open");
});

doc.delegate(".accordion.single h3", "click", function(e) {
  e.preventDefault();
  $(".accordion.single .key").removeClass("open");
  $(this).closest(".key").addClass("open");
});