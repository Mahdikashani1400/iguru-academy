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
  slidesToScroll: 4, // Number
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

$(".blogs__description + .blogs__boxes").slick({
  dots: false, // Boolean
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
        slidesToShow: 1,
        infinite: true, // Boolean
        arrows: false,
      },
    },
  ],
});
