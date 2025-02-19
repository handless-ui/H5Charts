import type CanvasType from "vislite/types/Canvas"
import type { TitleType } from "../types/option"

export function drawTitle(painter: CanvasType, title: TitleType) {

    let left = title.left || "left"
    let info = painter.getInfo()

    let x = {
        left: 20,
        right: info.width - 20,
        center: info.width * 0.5
    }[left]

    painter.config({
        textAlign: left,
        textBaseline: "middle",
        fontSize: 18,
        fillStyle: "#464646",
        fontWeight: 800
    }).fillText(title.text, x, 30)

    if (title.subtext) {
        painter.config({
            fontSize: 12,
            fontWeight: 400,
            fillStyle: "#7a7b7f"
        }).fillText(title.subtext, x, 55)
    }

}