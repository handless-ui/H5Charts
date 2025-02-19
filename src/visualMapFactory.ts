import type CanvasType from "vislite/types/Canvas"
import type VisualMapType from "../types/visualMap"

export default function (painter: CanvasType, option: VisualMapType) {
    let info = painter.getInfo()

    let x = 20, y = info.height - 20, width = 20, height = 160, len = option.inRange.color.length

    let gradient = painter.createLinearGradient(x, y, x, y - height)
    for (let index = 0; index < len; index++) {
        gradient.setColor(index / (len - 1), option.inRange.color[index])
    }

    painter.config({
        fillStyle: gradient.value()
    }).fillRect(x, y, width, -1 * height)

    painter.config({
        lineCap: "round",
        lineWidth: width * 0.2,
        strokeStyle: option.inRange.color[0]
    }).beginPath().moveTo(x - 1, y + width * 0.1).lineTo(x + width, y + width * 0.1).stroke()

    painter.config({
        strokeStyle: option.inRange.color[len - 1]
    }).beginPath().moveTo(x - 1, y - height - width * 0.15).lineTo(x + width, y - height - width * 0.15).stroke()

    painter.config({
        fontSize: 12,
        textAlign: "left",
        textBaseline: "middle",
        fillStyle: "black"
    }).fillText(option.min, x + width + 10, y)
        .fillText(option.max, x + width + 10, y - height)

    let temp = 1 / (option.max - option.min) * height
    return function (value: number) {
        if (value <= option.min) return option.inRange.color[0]
        if (value >= option.max) return option.inRange.color[len - 1]
        return painter.getColor(x + width * 0.5, y - (value - option.min) * temp)
    }
}