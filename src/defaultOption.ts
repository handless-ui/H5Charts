import type OptionType from "../types/option"

export default function () {
    let result: OptionType = {
        grid: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50
        },
        xAxis: {
            type: "category"
        },
        yAxis: {
            type: "value"
        },
        series: []
    }
    return result
}
