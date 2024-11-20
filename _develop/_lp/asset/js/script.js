$('.slider_customer').slick({
  draggable: true,
  accessibility: false,
  // centerMode: true,
  variableWidth: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 1000,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 769,
      settings: {
        centerMode: true,
        slidesToShow: 3,
        arrows: false
      }
    }
  ]
});

document.addEventListener("readystatechange", () => {
  const progressBar = document.getElementById("js-progress");
  const progressText = document.getElementById("js-text");

  const states = {
    loading: 50, 
    interactive: 75, 
    complete: 100, 
  };
  const currentProgress = states[document.readyState] || 0;
  progressBar.style.width = currentProgress + "%";
  progressText.innerHTML= currentProgress+"%";
  if (document.readyState === "complete") {
    setTimeout(() => {
      document.querySelector("#js-loading").classList.add("hidden");
    }, 500);
  }
});

wow = new WOW(
  {
  boxClass:     'wow',      // default
  animateClass: 'animated', // default
  offset:       0,          // default
  mobile:       true,       // default
  live:         true        // default
}
)
wow.init();