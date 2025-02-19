import type CanvasType from "vislite/types/Canvas"
import type { LinearGradientType, RadialGradientType, ConicGradientType } from "../types/gradient"

import getLoopColors from "vislite/package/getLoopColors/index"

export default function (painter: CanvasType, color: Array<string | LinearGradientType | RadialGradientType | ConicGradientType>) {
    return function (count: number) {
        if (color) {
            return getLoopColors(count, 1, function () {

                let colors = []

                color.forEach(value => {

                    if (typeof value == "string") {
                        colors.push(value)
                    } else {
                        let gradient = null

                        if (value.type == "linear") {
                            gradient = painter.createLinearGradient(value.x1, value.y1, value.x2, value.y2)
                        } else if (value.type == "radial") {
                            gradient = painter.createRadialGradient(value.cx, value.cy, value.radius)
                        } else if (value.type == "conic") {
                            gradient = painter.createConicGradient(value.cx, value.cy, value.beginDeg, value.deg)
                        }

                        if (gradient) {

                            value.colorStops.forEach(colorStop => {
                                gradient.setColor(colorStop.offset, colorStop.color)
                            })
                            colors.push(gradient.value())

                        } else {
                            throw new Error("unsupported color types!")
                        }
                    }

                })

                return colors

            })
        } else {
            return getLoopColors(count)
        }
    }
}