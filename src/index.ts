import type CanvasType from "vislite/types/Canvas"
import type OptionType from "../types/option"
import type H5ChartsType from "../types/index"

import throttle from "vislite/package/throttle/index"
import mergeOption from "vislite/package/mergeOption/index"
import Canvas from "vislite/package/Canvas/index"
import resizeObserver from "./resizeObserver"
import analysisOption from "./analysisOption"
import defaultOption from "./defaultOption"
import drawFactory from "./drawFactory"
import visualMapFactory from "./visualMapFactory"
import { drawTitle } from "./pendant"

export default class H5Charts implements H5ChartsType {

    // 记录注册的地理经纬度数据
    private static mapData: {
        [key: string]: any
    } = {}

    private option: OptionType = defaultOption()
    private painter: CanvasType

    static registerMap(mapName: string, mapData: any) {
        H5Charts.mapData[mapName] = mapData
    }

    constructor(el: HTMLElement, option: OptionType = {}) {
        mergeOption(this.option, option)
        resizeObserver(el, throttle(() => {
            this.painter = new Canvas(el) as any
            this.forceUpdate()
        }))
    }

    forceUpdate() {
        let option = this.option

        // 对option进行分析
        let viewData = analysisOption(this.painter, option, H5Charts.mapData)
        this.painter.clearRect(0, 0, viewData.width, viewData.height) // 先清空画布

        let visualMap = option.visualMap ? visualMapFactory(this.painter, option.visualMap) : void 0
        let drawMethods = drawFactory(this.painter, visualMap, viewData.grid, viewData.coordinate, viewData.mapCoordinate)

        // 标题
        if (option.title) {
            drawTitle(this.painter, option.title)
        }

        // 图表
        for (let i = 0; i < viewData.series.length; i++) {
            let serie = viewData.series[i]

            let drawMethod = (drawMethods as any)[serie.type]
            if (drawMethod) drawMethod(serie)
            else console.error("Undefined chart type: " + serie.type)
        }
        return this
    }

    setOption(option: OptionType) {
        mergeOption(this.option, option)
        this.forceUpdate()
        return this
    }

}

