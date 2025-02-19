fetchGeo("HK", function (HK) {

    H5Charts.registerMap("HK", HK);

    new H5Charts(el, {
        title: {
            text: 'Population Density of Hong Kong （2011）',
            subtext: 'Data from Wikipedia'
        },
        visualMap: {
            min: 800,
            max: 50000,
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            }
        },
        series: [{
            type: "map",
            map: "HK",
            label: {
                show: true
            },
            data: [
                { name: '中西区', value: 20057.34 },
                { name: '湾仔区', value: 15477.48 },
                { name: '东区', value: 31686.1 },
                { name: '南区', value: 6992.6 },
                { name: '油尖旺区', value: 44045.49 },
                { name: '深水埗区', value: 40689.64 },
                { name: '九龙城区', value: 37659.78 },
                { name: '黄大仙区', value: 45180.97 },
                { name: '观塘区', value: 55204.26 },
                { name: '葵青区', value: 21900.9 },
                { name: '荃湾区', value: 4918.26 },
                { name: '屯门区', value: 5881.84 },
                { name: '元朗区', value: 4178.01 },
                { name: '北区', value: 2227.92 },
                { name: '大埔区', value: 2180.98 },
                { name: '沙田区', value: 9172.94 },
                { name: '西贡区', value: 3368 },
                { name: '离岛区', value: 806.98 }
            ]
        }]
    });

});