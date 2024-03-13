$(".brand__slider").slick({
  dots: false, // Boolean
  arrows: true,

  slidesToShow: 5, // Number
  slidesToScroll: 2, // Number
  infinite: true, // Boolean
  autoplay: true, // Boolean
  autoplaySpeed: 1500, // Number
  centerMode: true,
  // lazyLoad: "ondemand",
  //   centerMode: true, // Boolen
  centerPadding: "0px", // String
  responsive: [
    {
      breakpoint: 975,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2, // Number
        infinite: true, // Boolean
        autoplay: true, // Boolean
        autoplaySpeed: 1500, // Number
        centerMode: true,
        // lazyLoad: "ondemand",
        //   centerMode: true, // Boolen
        centerPadding: "0px", // String
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2, // Number
        infinite: true, // Boolean
        autoplay: true, // Boolean
        autoplaySpeed: 1500, // Number
        centerMode: true,
        // lazyLoad: "ondemand",
        //   centerMode: true, // Boolen
        centerPadding: "0px", // String
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 2, // Number
        infinite: true, // Boolean
        autoplay: true, // Boolean
        autoplaySpeed: 1500, // Number
        centerMode: true,
        // lazyLoad: "ondemand",
        //   centerMode: true, // Boolen
        centerPadding: "0px", // String
      },
    },
  ],
});

$(".brand__slider__about-us").slick({
  dots: false, // Boolean
  arrows: true,

  slidesToShow: 6, // Number
  slidesToScroll: 2, // Number
  infinite: true, // Boolean
  autoplay: true, // Boolean
  autoplaySpeed: 1500, // Number
  centerMode: true,
  // lazyLoad: "ondemand",
  //   centerMode: true, // Boolen
  centerPadding: "0px", // String
  responsive: [
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 5,
        infinite: true, // Boolean
      },
    },
    {
      breakpoint: 1070,
      settings: {
        slidesToShow: 4,
        infinite: true, // Boolean
      },
    },
    {
      breakpoint: 975,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2, // Number
        infinite: true, // Boolean
        autoplay: true, // Boolean
        autoplaySpeed: 1500, // Number
        centerMode: true,
        // lazyLoad: "ondemand",
        //   centerMode: true, // Boolen
        centerPadding: "0px", // String
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2, // Number
        infinite: true, // Boolean
        autoplay: true, // Boolean
        autoplaySpeed: 1500, // Number
        centerMode: true,
        // lazyLoad: "ondemand",
        //   centerMode: true, // Boolen
        centerPadding: "0px", // String
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 2, // Number
        infinite: true, // Boolean
        autoplay: true, // Boolean
        autoplaySpeed: 1500, // Number
        centerMode: true,
        // lazyLoad: "ondemand",
        //   centerMode: true, // Boolen
        centerPadding: "0px", // String
      },
    },
  ],
});

$(".caategories__courses-slider").slick({
  dots: false, // Boolean
  // arrows: true,

  slidesToShow: 4, // Number
  slidesToScroll: 1, // Number
  infinite: true, // Boolean

  // centerMode: false,
  centerMode: true,

  centerPadding: "0px", // String
  responsive: [
    {
      breakpoint: 1070,
      settings: {
        slidesToShow: 3,
        infinite: true, // Boolean
      },
    },
    {
      breakpoint: 978,
      settings: {
        slidesToShow: 2,
        infinite: true, // Boolean
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        infinite: true, // Boolean
        arrows: false,
      },
    },
  ],
});

// teachers slider

$(".teachers__information-boxes").slick({
  dots: true, // Boolean
  // arrows: false,
  // asNavFor: ".slider-for",
  focusOnSelect: true,
  slidesToShow: 4, // Number
  // slidesToScroll: 4, // Number
  infinite: true, // Boolean

  centerMode: false,

  centerPadding: "0px", // String
  responsive: [
    {
      breakpoint: 1070,
      settings: {
        slidesToShow: 3,
        infinite: true, // Boolean
        dots: true,

      },
    },
    {
      breakpoint: 978,
      settings: {
        slidesToShow: 2,
        infinite: true, // Boolean
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        infinite: true, // Boolean
        arrows: false,
        dots: true,

      },
    },
  ],
});
function aricleSliderHome() {
  $(".home-page .blogs__boxes").slick({
    dots: true, // Boolean
    // arrows: false,
    // asNavFor: ".slider-for",
    slidesToShow: 3, // Number
    slidesToScroll: 1, // Number
    infinite: false, // Boolean

    centerMode: false,

    centerPadding: "0px", // String
    responsive: [
      {
        breakpoint: 1070,
        settings: {
          slidesToShow: 3,
          infinite: true, // Boolean
        },
      },
      {
        breakpoint: 978,
        settings: {
          slidesToShow: 2,
          dots: true,
          focusOnSelect: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,

          slidesToShow: 1,
          infinite: true, // Boolean
          arrows: false,
        },
      },
    ],
  });
}
function aricleSliderSearch() {
  $(".searchs .blogs__boxes").slick({
    dots: true, // Boolean
    // arrows: false,
    // asNavFor: ".slider-for",
    slidesToShow: 3, // Number
    slidesToScroll: 1, // Number
    infinite: false, // Boolean

    centerMode: false,

    centerPadding: "0px", // String
    responsive: [
      {
        breakpoint: 1070,
        settings: {
          slidesToShow: 3,
          infinite: true, // Boolean
        },
      },
      {
        breakpoint: 978,
        settings: {
          slidesToShow: 2,
          dots: true,
          focusOnSelect: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,

          slidesToShow: 1,
          infinite: true, // Boolean
          arrows: false,
        },
      },
    ],
  });
}

$(".comments__boxes").slick({
  dots: true, // Boolean
  arrows: false,
  // asNavFor: ".slider-for",
  slidesToShow: 2, // Number
  slidesToScroll: 1, // Number
  infinite: true, // Boolean

  centerMode: false,

  centerPadding: "0px", // String
  responsive: [
    {
      breakpoint: 1070,
      settings: {
        slidesToShow: 1,
        infinite: true, // Boolean
      },
    },
  ],
});

// explain-product
$(".slick-wrap").on("init", function (event, slick) {
  var dots = $(".slick-dots li");
  console.log("SRANZAN VEE");
  dots.each(function (k, v) {
    $(this)
      .find("button")
      .addClass("heading" + k);
  });
  var items = slick.$slides;
  items.each(function (k, v) {
    var text = $(this).find("h2").text();
    $(".heading" + k).text(text);
  });
});
function productCoverSlider() {
  $(".main-img").slick({
    dots: true,
    focusOnSelect: true,
    infinite: true,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    // centerMode: true,
  });
}

// read-blog

$(".blog__slider").slick({
  dots: false, // Boolean
  arrows: true,

  slidesToShow: 2, // Number
  slidesToScroll: 1, // Number
  infinite: true, // Boolean
  autoplay: true, // Boolean
  autoplaySpeed: 1500, // Number
  // centerMode: false,
  centerMode: true,

  centerPadding: "0px", // String
  responsive: [
    {
      breakpoint: 978,
      settings: {
        slidesToShow: 2,
        infinite: true, // Boolean
        dots: true,
      },
    },
    {
      breakpoint: 470,
      settings: {
        slidesToShow: 1,
        infinite: true, // Boolean
        arrows: false,
      },
    },
  ],
});

$("#readBlog .blogs__boxes").slick({
  dots: true, // Boolean
  // arrows: false,
  // asNavFor: ".slider-for",
  slidesToShow: 2, // Number
  slidesToScroll: 1, // Number
  infinite: false, // Boolean

  centerMode: false,

  centerPadding: "0px", // String
  responsive: [
    {
      breakpoint: 978,
      settings: {
        slidesToShow: 2,
        dots: true,
        focusOnSelect: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        infinite: true, // Boolean
        arrows: false,
        dots: true,
      },
    },
  ],
});

export { aricleSliderHome, aricleSliderSearch, productCoverSlider };
