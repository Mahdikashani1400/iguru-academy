import { createHeader, adminInfos } from "./funcs/header.js"
import { removeLoader } from "./funcs/shared.js";

const $ = document;

window.addEventListener("load", async () => {
    const loader = $.querySelector('.loader_container')
    await createHeader().then(res => {
        removeLoader(loader)
    })
    console.log(adminInfos);
    createChart()
    getLastUsers()

})


// themeColorHandler






function createChart() {
    (async function () {

        const ctx = document.getElementById('acquisitions').getContext('2d')
        document.getElementById('acquisitions').height = 100

        const colors = {
            blue: {
                default: "rgba(0, 201, 255, 1)",
                half: "rgba(0, 201, 255, 0.5)",
                quarter: "rgba(0, 201, 255, 0.25)",
                zero: "rgba(0, 201, 255, 0)"
            },
            green: {
                default: "rgba(146, 254, 157, 1)",
                blue: "rgba(0, 201, 255, 0.5)"
            }
        };
        const bgGradient = ctx.createLinearGradient(0, 25, 0, 300);
        bgGradient.addColorStop(0, colors.blue.half);
        bgGradient.addColorStop(0.35, colors.blue.quarter);
        bgGradient.addColorStop(1, colors.blue.zero);
        const borderGradient = ctx.createLinearGradient(0, 25, 0, 300);
        borderGradient.addColorStop(0, colors.green.default);
        borderGradient.addColorStop(1, colors.green.blue);

        let draw = Chart.controllers.line.prototype.draw;
        Chart.controllers.line = Chart.controllers.line.extend({
            draw: function () {
                draw.apply(this, arguments);
                let ctx = this.chart.chart.ctx;
                let _stroke = ctx.stroke;
                ctx.stroke = function () {
                    ctx.save();
                    ctx.shadowColor = '#92FE9D';
                    ctx.shadowBlur = 10;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    _stroke.apply(this, arguments)
                    ctx.restore();
                }
            }
        });


        const data = [
            { month: "فروردین", benfit: 10 },
            { month: "اردیبهشت", benfit: 20 },
            { month: "خرداد", benfit: 15 },
            { month: "تیر", benfit: 25 },
            { month: "مرداد", benfit: 22 },
            { month: "شهریور", benfit: 33 },
            { month: "مهر", benfit: 19 },
            { month: "آبان", benfit: 28 },
            { month: "آذر", benfit: 28 },
            { month: "دی", benfit: 19 },
            { month: "بهمن", benfit: 28 },
            { month: "اسفند", benfit: 23 },
        ];
        const config = {
            tooltips: {
                enabled: false
            },
            hover: {
                animationDuration: 1
            },
            maintainAspectRatio: false,
            type: window.innerWidth > 900 ? ('line') : ('bar'),

            data: {
                labels: data.map(row => row.month),
                datasets: [


                    {
                        title: {
                            margin: 50
                        },
                        label: 'Acquisitions by month',

                        data: data.map(row => row.benfit),
                        backgroundColor: bgGradient,
                        borderColor: borderGradient,
                        borderWidth: 2,

                        fill: "start",
                    }
                ]
            },
            options: {

                events: ["mouseout", "click", "touchstart", "touchmove", "touchend", "mouseenter"],
                "animation": {
                    "duration": 1,
                    "onComplete": function () {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;
                        ctx.fillStyle = "#898989";
                        ctx.font = Chart.helpers.fontString("18px", Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                },

                responsive: true,

                legend: {
                    display: false

                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Chart.js Line Chart',
                    },


                },

                scales: {

                    xAxes: [{
                        display: true,
                        offset: true,
                        ticks: {
                            fontSize: 18,
                            fontColor: "#898989",
                            padding: 5,
                            beginAtZero: true,
                            stepSize: 20 //<-- set this
                        },

                        gridLines: {
                            color: "rgba(255, 255, 255, 0.01)",
                        }

                    }],
                    yAxes: [{
                        gridLines: {
                            color: "rgba(255, 255, 255, 0.07)",
                        },
                        ticks: {
                            fontSize: 18,
                            fontColor: "#898989",
                            padding: 5,
                        }
                    }]
                }
            },
        };

        new Chart(
            ctx,
            config

        );
    })();
}



let lastUsersTable = $.querySelector('.last__users__table tbody')
function getLastUsers() {
    lastUsersTable.innerHTML = `
    ${adminInfos.lastUsers.map((user, index) => {
        return `
        <tr class="">
        <th scope="row" class="">${++index}</th>
        <td class="px-5 py-5">${user.name}</td>
        <td class="px-5 py-5">${user.username}</td>
        <td class="px-5 py-5">${user.phone}</td>
        <td class="px-5 py-5">${user.email}</td>
        <td class="px-5 py-5">${user.createdAt.split("T")[0]}</td>
      </tr>
        `
    }).join("")}
`
}



