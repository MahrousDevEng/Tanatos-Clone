let isScroll = false;

// Prevent Body Scrolling
function stopScrolling() {
  if (!isScroll) {
    $("body").css({ height: "100vh", overflow: "hidden" });
    isScroll = !isScroll;
  } else {
    $("body").css({ height: "", overflow: "" });
    isScroll = !isScroll;
  }
}

// Lose Popup Focus
function loseFocus(parentEl, closeEl, el) {
  $(parentEl).on("click", function () {
    $(closeEl).click();
  });
  $(el).on("click", function (e) {
    e.stopPropagation();
  });
}

$(function () {
  // Trigger Popup
  $(".popup-button").on("click", function () {
    stopScrolling();
    if ($(this).hasClass("navbar-toggler")) {
      $(".navbar-toggler").toggleClass($(this).data("toggle"));
    }
    $($(this).data("target")).slideToggle(300);
  });

  // Close Buttons
  $(".close").on("click", function () {
    stopScrolling();
    $($(this).data("target")).slideUp(300);
  });

  // Lose focus
  $(".popup").each(function () {
    loseFocus(this, $(this).data("close"), $(this).children(".popup-child"));
  });

  // Scroll To Element
  $(".down").on("click", function () {
    $("html").animate(
      {
        scrollTop: $($(this).data("target")).offset().top + 1,
      },
      300
    );
  });

  // Next Function
  function nextSlide(nextEl) {
    $(nextEl).each(function () {
      if (!$(this).is(":last-child")) {
        $(this).fadeOut(300, function () {
          $(this)
            .removeClass("active")
            .next(".slide")
            .fadeIn(300)
            .addClass("active");
        });
      } else {
        $(this).fadeOut(300, function () {
          $(this).removeClass("active");
          $(".slider .slider-info .slide").eq(0).fadeIn(300).addClass("active");
        });
      }
    });
  }

  // Previous Function
  function prevSlide(prevEl) {
    $(prevEl).each(function () {
      if (!$(this).is(":first-child")) {
        $(this).fadeOut(300, function () {
          $(this)
            .removeClass("active")
            .prev(".slide")
            .fadeIn(300)
            .addClass("active");
        });
      } else {
        $(this).fadeOut(300, function () {
          $(this).removeClass("active");
          $(".slider .slider-info .slide")
            .eq(-1)
            .fadeIn(300)
            .addClass("active");
        });
      }
    });
  }

  // Testimonial Slider Autorun
  (function autoRunSlider() {
    const sliderInterval = setInterval(function () {
      nextSlide(".slider .slider-info .slide.active");
    }, 3000);

    // Next / Previous Buttons
    $(".slider .slider-arrows img").each(function () {
      $(this).on("click", function () {
        clearInterval(sliderInterval);
        if ($(this).hasClass("next")) {
          nextSlide(".slider .slider-info .slide.active");
        }
        if ($(this).hasClass("prev")) {
          prevSlide(".slider .slider-info .slide.active");
        }
        setTimeout(autoRunSlider(), 5000);
      });
    });
  })();

  // Set Team Images
  const imgLst = [
      "images/img-member-01.jpg",
      "images/img-member-02.jpg",
      "images/img-member-03.jpg",
      "images/img-member-04.jpg",
    ],
    teamMembersImages = $(".our-team .team-slider .image");

  for (let i = 0; i < imgLst.length; i += 1) {
    teamMembersImages.eq(i).css({
      backgroundImage: `url(${imgLst[i]})`,
    });
  }
});
