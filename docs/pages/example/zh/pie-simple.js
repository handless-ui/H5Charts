new H5Charts(el, {
    title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
    },
    series: [{
        type: "pie",
        radius: function ({ width, height }) {
            return [0, Math.min(width, height) * 0.25];
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