import type CanvasType from "vislite/types/Canvas"
import type OptionType from "../types/option"

import MapCoordinate from "vislite/package/MapCoordinate/index"
import ruler from "vislite/package/ruler/index"
import initOption from "vislite/package/initOption/index"
import getValueFactory from "./getValueFactory"
import getColorsFactory from "./getColorsFactory"

export default function (painter: CanvasType, option: OptionType, mapData: { [key: string]: any }) {
    let canvasInfo = painter.getInfo()

    let getValue = getValueFactory(canvasInfo)
    let getColors = getColorsFactory(painter, option.color)

    let width = canvasInfo.width - option.grid.left - option.grid.right
    let height = canvasInfo.height - option.grid.top - option.grid.bottom
    let cx = width * 0.5 + option.grid.left
    let cy = height * 0.5 + option.grid.top


    // 1、收集必要的基础信息
    // 2、对齐部分值

    let geos = [] // 地理数据
    let minZValue = void 0, maxZValue = void 0 // 数值最值（直角坐标系）
    let bar_count = 0 // 记录柱状图一个小条目内总个数

    for (let i = 0; i < option.series.length; i++) {
        let serie = option.series[i]

        if (serie.type === "bar" && !serie.coordinateSystem) {
            serie.coordinateSystem = "cartesian2d";
        }

        // 地图
        if (serie.type === "map") {
            if (geos.indexOf(serie.map) < 0) {
                geos.push(serie.map)
            }
        }

        // 饼图
        else if (serie.type === "pie") {
            // todo
        }

        // 柱状图
        else if (serie.type === "bar") {

            for (let j = 0; j < serie.data.length; j++) {
                if (minZValue == void 0 || minZValue > serie.data[j]) minZValue = serie.data[j]
                if (maxZValue == void 0 || maxZValue < serie.data[j]) maxZValue = serie.data[j]
            }
            bar_count += 1
        }

    }

    // 3、计算必要的数值

    let mapCoordinate = void 0 // 地理坐标系

    if (geos.length > 0) {
        for (let i = 0; i < geos.length; i++) {
            geos[i] = mapData[geos[i]]
        }
        mapCoordinate = new MapCoordinate({
            api: "Mercator",
            left: option.grid.left,
            top: option.grid.top,
            width,
            height
        }).setGeos(...geos)
    }

    let coordinate = void 0 // 坐标系

    // 刻度尺（直角坐标系）
    if (minZValue !== void 0 && maxZValue != void 0) {
        coordinate = {
            value: {
                value: ruler(maxZValue, minZValue, 5),
                name: option.xAxis.type === "value" ? "xAxis" : "yAxis"
            },
            category: option.yAxis.type === "category" ? {
                label: option.yAxis.data,
                name: "yAxis"
            } : {
                label: option.xAxis.data,
                name: "xAxis"
            }
        }
    }

    // 4、组装结果

    let resultData: any = {
        width: canvasInfo.width,
        height: canvasInfo.height,
        grid: {
            ...option.grid,
            width,
            height,
            cx,
            cy,
        },
        coordinate,
        mapCoordinate,
        series: []
    }

    // 图表
    let barIndex = 0, barColors = getColors(bar_count)
    for (let i = 0; i < option.series.length; i++) {
        let serie = option.series[i]

        if (serie.type === "custom") {
            resultData.series.push({
                type: "custom",
                draw: serie.draw,
                params: {
                    cx, cy,
                    grid: initOption(option.grid, {
                        width,
                        height
                    })
                }
            })
        } else if (serie.type === "bar") {
            resultData.series.push({
                type: "bar",
                index: barIndex,
                count: bar_count,
                value: serie.data,
                color: barColors[barIndex]
            })
            barIndex += 1
        } else if (serie.type === "map") {
            resultData.series.push({
                type: "map",
                geojson: mapData[serie.map],
                color: getColors(1)[0],
                data: serie.data,
                label: {
                    show: serie.label?.show || false
                }
            })
        } else if (serie.type === "pie") {
            resultData.series.push({
                type: "pie",
                beginDeg: serie.startAngle === 0 ? 0 : (getValue(serie.startAngle, -90) / 180 * Math.PI),
                deg: getValue(serie.angle, 360) / 180 * Math.PI,
                radius: getValue(serie.radius, [0, Math.min(width, height) * 0.5]),
                center: getValue(serie.center, [cx, cy]),
                data: serie.data,
                colors: getColors(serie.data.length)
            })
        }
    }

    return resultData
}