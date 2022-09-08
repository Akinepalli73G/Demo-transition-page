//On document ready
var $parallaxImage = $(".parallax-image");
var $hasAnimation = $('[data-animation]');

$(document).ready(function () {
  var lastScrollTop = 0;
  $parallaxImage.each(function (index) {
    var imgURL = $(this).data("image");
    $(this).css("background-image", "url('" + imgURL + "')");
  });

  //readying content if on scroll user reloads
  animation($hasAnimation);
  parallaxImageBlurNWhite($parallaxImage);
  changeTransparency($(".text"));

  //on scroll events
  $(window).scroll(function () {
    var scroll = $(this).scrollTop();
    if (scroll > lastScrollTop) {
      // downscroll code
    } else {
      // upscroll code
    }
    lastScrollTop = scroll;

    animation($hasAnimation);
    parallaxImageBlurNWhite($parallaxImage);
    changeTransparency($(".text"));

    $(".stopMidway").each(function (index) {
      //if stops midway div is halfway to the screen add class stop it and fix it
      if (percentageSeen($(this)) >= 50) {
        $(this).addClass("stopIt");

        //if zoom image div is quarter way to the screen, blur the text of stops midway div
        $(this).siblings(".zoom-image").attr("percen", percentageSeen($(this).siblings(".zoom-image")));
        if (percentageSeen($(this).siblings(".zoom-image")) >= 25) {
          var blurCalc = percentageSeen($(this)) / 10;
          var blurVal = 'blur(' + blurCalc + 'px)';
          $(this).css('filter', blurVal);
        }
        else {
          $(this).css('filter', "blur(0)");
        }

        //zoom image code
        nowZoomIt($(this).siblings(".zoom-image"));
      }
      else {
        $(this).removeClass("stopIt");
      }
    });
  });

  //tabs
  // Show the first tab and hide the rest
  $('#tabs-nav li:first-child').addClass('active');
  $('.tab-content').hide();
  $('.tab-content:first').show();

  // Click function
  $('#tabs-nav li').click(function () {
    $('#tabs-nav li').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').hide();

    var activeTab = $(this).find('a').attr('href');
    $(activeTab).fadeIn();
    return false;
  });

  $('#tabs-nav a').on('click', function () {
    var imageURL = $(this).data("src");
    $(this).parents(".zoom-image").css("background-image", "url(" + imageURL + ")");
  });
});

//fadeInFromBottom animation
function animation(element) {
  var whichAnimation = element.data("animation");
  console.log(whichAnimation);
  element.each(function (index) {
    $(this).attr("data-scroll", percentageSeen($(this)));
    if (percentageSeen($(this)) > 40) {
      $(this).addClass("loaded");
    }

    if (percentageSeen($(this)) == 0 || percentageSeen($(this)) == 100 || percentageSeen($(this)) < 40) {
      $(this).removeClass("loaded");
    }
  });
}

//now zoom it
function nowZoomIt(element) {
  var width = percentageSeen(element) * 2;
  var min_width = element.data("width-min-value") - 1;
  var max_width = element.data("width-max-value") + 1;

  var diff = max_width - min_width;

  var zoom = element.data("zoom");
  if (zoom == "scaleUp") {
    if (width < 101) {
      element.css("width", "" + width + "%")
      if (width > 97 && width <= 100) {
        if (element.find(".tabs")) {
          element.find(".tabs").addClass("show");
        }
      }
      else {
        if (element.find(".tabs")) {
          element.find(".tabs").removeClass("show");
        }
      }
    }
  }
  else if (zoom == "scaleDown") {
    if (percentageSeen(element) > 15) {
      var widthToSet = 100 - percentageSeen(element);
      var isSquare = element.children(".zoom-cover").data("squared");
      var heightToSet;
      if (widthToSet < max_width) {
        element.css("width", "" + widthToSet + "%");
        heightToSet = element.width();
        if (isSquare)
          element.css("height", "" + heightToSet + "px");
      }
    }
  }
}

//function for changing opacity for texts
function changeTransparency(element) {
  element.each(function (index) {
    if (percentageSeen($(this)) > 30 && percentageSeen($(this)) < 65) {
      $(this).css("opacity", 1);
    }
    else {
      $(this).css("opacity", 0.3);
    }
  });
}

//function parallax image blur and turn to white on parallax end
function parallaxImageBlurNWhite(element) {
  element.each(function (index) {
    var parallaxHeight = $(this).parent(".parallax").height();
    var blurCalc = ((scroll / parallaxHeight) * 10);
    var blurVal = 'blur(' + blurCalc + 'px)';

    $(this).attr("data-some", percentageSeen($(this)));

    $(this).css('filter', blurVal);
    $parallaxEnd = $(this).siblings(".parallax-content").find(".parallax-end");
    if ($parallaxEnd.length) {
      if (percentageSeen($parallaxEnd) > 0) {
        var trasnparentCalc = 1 - (percentageSeen($parallaxEnd) / 100);
        $(this).css("opacity", trasnparentCalc);
      }
      else {
        $(this).css("opacity", 1);
      }
    }
  });
}

//calculate how much % the div is visible
function percentageSeen(element) {
  var viewportHeight = $(window).height(),
    scrollTop = $(window).scrollTop(),
    elementOffsetTop = element.offset().top,
    elementHeight = element.height();


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
