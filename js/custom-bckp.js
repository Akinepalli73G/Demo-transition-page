//On document ready
var $parallaxEnd = $('.parallax-end');
var $parallaxImage = $(".parallax-image");

$(document).ready(function () {
  var imgURL = $parallaxImage.data("image");
  $parallaxImage.css("background-image", "url('" + imgURL + "')");
});

function percentageSeen() {
  var viewportHeight = $(window).height(),
    scrollTop = $(window).scrollTop(),
    elementOffsetTop = $parallaxEnd.offset().top,
    elementHeight = $parallaxEnd.height();


  if (elementOffsetTop > (scrollTop + viewportHeight)) {
    return 0;
  } else if ((elementOffsetTop + elementHeight) < scrollTop) {
    return 100;
  } else {
    var distance = (scrollTop + viewportHeight) - elementOffsetTop;
    var percentage = distance / ((viewportHeight + elementHeight) / 100);
    percentage = Math.round(percentage);
    return percentage;
  }
}

$(window).scroll(function () {
  var scroll = $(window).scrollTop(), prallaxHeight = $('.parallax').height(), windowsHeight = $(window).height();

  var blurCalc = ((scroll / prallaxHeight) * 10);
  var blurVal = 'blur(' + blurCalc + 'px)';

  $parallaxImage.css('filter', blurVal);

  if (percentageSeen() > 0) {
    // console.log(percentageSeen());
    var trasnparentCalc = 1 - (percentageSeen() / 100);
    console.log(trasnparentCalc);
    $parallaxImage.css("opacity", trasnparentCalc);
  }

  $(".text").each(function (index) {
    element = $(this).get(0);
    var rect = element.getBoundingClientRect();
    var y = rect.y;

    var halfwinY = windowsHeight / 2;

    $(this).attr("data-y", y);
    $(this).attr("data-halfwinY", halfwinY);


    if (y >= 0) {
      var opacityCalc = halfwinY - y;
      // opacityCalc = opacityCalc >= 0.3 ? opacityCalc / 100 : 0.3;
      opacityCalc = opacityCalc < 0 ? (-opacityCalc) : opacityCalc;
      $(this).css("opacity", opacityCalc / 100);
    }
    else {
      var opacityCalc = halfwinY - (-y);
      // opacityCalc = opacityCalc >= 0.3 ? opacityCalc / 100 : 0.3;
      opacityCalc = opacityCalc < 0 ? (-opacityCalc) : opacityCalc;
      $(this).css("opacity", opacityCalc / 100);
    }
  });

  if (scroll) {

  }
});
