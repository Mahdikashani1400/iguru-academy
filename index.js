window.addEventListener('load', async () => {
    await particlesJS(
        "particles-js",

        {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                },
                color: {
                    value: "#ffffff",
                },
                shape: {
                    type: "star",
                    stroke: {
                        width: 0,
                        color: "#000000",
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
                    value: 0.9,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 10,
                        opacity_min: 0.2,
                        sync: false,
                    },
                },
                size: {
                    value: 2,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false,
                    },
                },
                line_linked: {
                    enable: false,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    attract: {
                        enable: false,
                        rotateX: 90,
                        rotateY: 150,
                    },
                },
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: false,
                        mode: "repulse",
                    },
                    onclick: {
                        enable: false,
                        mode: "push",
                    },
                    resize: true,
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1,
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
    await new AOS.init();


    let text = document.getElementById("title");

    let typewriter = new Typewriter(text, {
        loop: false,
        delay: 75,
    });

    await typewriter
        //   .pauseFor(2500)
        .typeString("به پروژه خودتون خوش اومدید.")
        .pauseFor(300)
        .deleteAll()
        .typeString("لطفا نظرات خودتون رو از طریق بخش <strong> تماس با ما </strong> به اشتراک بگذارید.")
        //   .typeString(
        //     '<strong>only <span style="color: #27ae60;">5kb</span> Gzipped!</strong>'
        //   )
        // .pauseFor(1000)
        .start();

})