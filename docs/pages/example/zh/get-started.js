var mychart = new H5Charts(el, {
    title: {
        text: "H5Charts 入门例子"
    },
    grid: {
        top: 70
    },
    color: ["red"],
    xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    series: [{
        data: [120, 190, 150, 80, 70, 110, 130],
        type: "bar"
    }]
});