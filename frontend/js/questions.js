import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
const $ = document;
window.addEventListener("load", async () => {
  getModals();
  await getHeader();
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "qs_page-bg.jpg");
  getFooter();
  particlesJS(
    "questions__particles",

    {
      particles: {
        number: {
          value: 20,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ["#ff6e34", "#00bda6", "#F3F3F3"],
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            // color: "#000",
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 1,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 10,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 1,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
          distance: 150,
          color: "#ff6e34",
          opacity: 1,
          width: 1.2,
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: "top",
          random: true,
          straight: false,
          out_mode: "out",
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 120,
            line_linked: {
              opacity: 0.7,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
      config_demo: {
        hide_card: false,
        background_color: "#b61924",
        background_image: "",
        background_position: "50% 50%",
        background_repeat: "no-repeat",
        background_size: "cover",
      },
    }
  );
});

$.querySelectorAll(".questions__collapse .collapse").forEach((qustion) => {
  qustion.addEventListener(
    "show.bs.collapse",
    collapseElemHandler.bind(qustion)
  );
  qustion.addEventListener(
    "hide.bs.collapse",
    collapseElemHandler.bind(qustion)
  );
});

function collapseElemHandler(e) {
  this.previousElementSibling.classList.toggle("active");
}
