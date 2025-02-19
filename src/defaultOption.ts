import type OptionType from "../types/option"

export default function () {
    let result: OptionType = {
        grid: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50
        },

        // 直角坐标系
        xAxis: {
            type: "category"
        },
        yAxis: {
            type: "value"
        },

        // 极坐标系
        radiusAxis: {
            type: "value"
        },
        angleAxis: {
            type: "category"
        },

        series: []
    }
    return result
}