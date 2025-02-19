new H5Charts(el, {
    series: [{
        type: "pie",
        startAngle: 180,
        angle: 180,
        radius: function ({ width, height }) {
            var radius = Math.min(width, height) * 0.5;
            return [radius * 0.4, radius * 0.7];
        },
        center: function ({ width, height }) {
            return [width * 0.5, height * 0.7];
        },
        data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
        ]
    }]
});