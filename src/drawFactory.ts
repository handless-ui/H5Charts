import type CanvasType from "vislite/types/Canvas"
import type MapType from "vislite/types/Map"

import initOption from "vislite/package/initOption/index"
import rotate from "vislite/package/rotate/index"
import { featureFactory } from "./painter"

export default function (painter: CanvasType, visualMap: any, grid: any, coordinate: any, map: MapType) {
    let getLenByValue: (value: number) => number
    let getIndexByIJFactory: (count: number, j: number) => { size: number, getIndexByIJ: (i: number) => number }

    let labelLeft: number, labelLen: number, valueLeft: number, valueLen: number

    if (coordinate) { // 坐标系

        painter.config({
            fillStyle: "#000000",
            strokeStyle: "#aeaeae",
            fontSize: 12
        })

        if (coordinate.category.name === "xAxis") {
            labelLeft = grid.left, labelLen = grid.width, valueLeft = grid.top + grid.height, valueLen = -1 * grid.height
        } if (coordinate.category.name === "yAxis") {
            labelLeft = grid.top, labelLen = grid.height, valueLeft = grid.left, valueLen = grid.width
        }

        getLenByValue = function (value: number) {
            return (value - coordinate.value.value[0]) / (coordinate.value.value[coordinate.value.value.length - 1] - coordinate.value.value[0]) * valueLen
        }

        let splitWidth = labelLen / coordinate.category.label.length
        let itemWidth = splitWidth * 0.9
        getIndexByIJFactory = function (count: number, j: number) {
            let singleWidth = itemWidth / count
            return {
                size: singleWidth,
                getIndexByIJ: function (i: number) {
                    return labelLeft + splitWidth * i + (splitWidth - itemWidth) * 0.5 + singleWidth * j
                }
            }
        }

        painter.config({
            lineWidth: 1
        })

        if (coordinate.category.name === "xAxis") {

            painter.config({
                textAlign: "center",
                textBaseline: "top"
            })

            // label刻度尺
            for (let i = 0; i < coordinate.category.label.length; i++) {
                painter.fillText(coordinate.category.label[i], labelLeft + splitWidth * (i + 0.5), valueLeft + 10)
            }
            painter.beginPath().moveTo(labelLeft, valueLeft).lineTo(labelLeft + labelLen, valueLeft).stroke()
            for (let i = 0; i <= coordinate.category.label.length; i++) {
                let x = labelLeft + splitWidth * i
                let y = valueLeft
                painter.beginPath().moveTo(x, y).lineTo(x, y + 5).stroke()
            }

            painter.config({
                textAlign: "right",
                textBaseline: "middle"
            })

            // value 刻度尺
            for (let i = 0; i < coordinate.value.value.length; i++) {
                let x = labelLeft
                let y = valueLeft + getLenByValue(coordinate.value.value[i])
                painter.fillText(coordinate.value.value[i], x - 5, y)
                if (i != 0) {
                    painter.beginPath().moveTo(x, y).lineTo(x + labelLen, y).stroke()
                }
            }

        } else if (coordinate.category.name === "yAxis") {

            painter.config({
                textAlign: "right",
                textBaseline: "middle"
            })

            // label刻度尺
            for (let i = 0; i < coordinate.category.label.length; i++) {
                painter.fillText(coordinate.category.label[i], valueLeft - 10, labelLeft + splitWidth * (i + 0.5))
            }
            painter.beginPath().moveTo(valueLeft, labelLeft).lineTo(valueLeft, labelLeft + labelLen).stroke()
            for (let i = 0; i <= coordinate.category.label.length; i++) {
                let x = valueLeft
                let y = labelLeft + splitWidth * i
                painter.beginPath().moveTo(x, y).lineTo(x - 5, y).stroke()
            }

            painter.config({
                textAlign: "center",
                textBaseline: "top"
            })

            // value 刻度尺
            for (let i = 0; i < coordinate.value.value.length; i++) {
                let x = valueLeft + getLenByValue(coordinate.value.value[i])
                let y = labelLeft + labelLen
                painter.fillText(coordinate.value.value[i], x, y + 5)
                if (i != 0) {
                    painter.beginPath().moveTo(x, y).lineTo(x, y - labelLen).stroke()
                }
            }
        }
    }

    return {
        custom(serie: any) { // 自定义
            serie.draw(initOption(serie.params, {
                painter
            }))
        },
        pie(serie: any) {// 饼图
            let count = 0
            for (let i = 0; i < serie.data.length; i++)  count += serie.data[i].value

            let beginDeg = serie.beginDeg
            for (let i = 0; i < serie.data.length; i++) {
                let item = serie.data[i]
                let cdeg = (item.value / count) * serie.deg

                painter.config({
                    fillStyle: serie.colors[i]
                }).fillArc(serie.center[0], serie.center[1], serie.radius[0], serie.radius[1], beginDeg, cdeg)

                let deg = beginDeg + cdeg * 0.5, radius = Math.max(serie.radius[0], serie.radius[1])
                let p1 = rotate(serie.center[0], serie.center[1], deg, serie.center[0] + radius, serie.center[1])
                let p2 = rotate(serie.center[0], serie.center[1], deg, serie.center[0] + radius + 15, serie.center[1])

                let flag = p1[0] > serie.center[0] ? 1 : -1

                painter.config({
                    strokeStyle: serie.colors[i],
                    lineWidth: 1.5
                }).beginPath().moveTo(...p1).lineTo(...p2).lineTo(p2[0] + flag * 15, p2[1]).stroke()

                painter.config({
                    fillStyle: "#929292",
                    textAlign: p1[0] > serie.center[0] ? "left" : "right",
                    fontSize: 12,
                    fontWeight: 400
                }).fillText(item.name, p2[0] + flag * 20, p2[1])

                beginDeg += cdeg
            }
        },
        map(serie: any) {// 地图
            let fullFeature = featureFactory(painter, "full")
            let geojson = serie.geojson

            painter.config({
                fillStyle: serie.color,
                strokeStyle: "#73909c"
            })

            let dataLink = null
            if (serie.data) {
                dataLink = {}
                for (let item of serie.data) {
                    dataLink[item.name] = item.value
                }
            }

            for (let i = 0; i < geojson.features.length; i++) {
                let name = geojson.features[i].properties.name

                if (dataLink && visualMap) {
                    if (name in dataLink) {
                        painter.config({
                            fillStyle: visualMap(dataLink[name]),
                            lineWidth: 1,
                            strokeStyle: "#73909c"
                        })
                    }
                }

                fullFeature(map, geojson.features[i])
            }

            if (serie.label.show) {
                for (let i = 0; i < geojson.features.length; i++) {
                    let properties = geojson.features[i].properties

                    let center: [number, number] = properties.centroid || properties.center || properties.cp

                    if (center) {
                        let name = properties.name
                        let p = map.use(...center)

                        painter.config({
                            fillStyle: "black",
                            fontSize: 10
                        }).fillText(name, p[0], p[1])
                    }
                }
            }
        },
        bar(serie: any) { // 柱状图
            let { getIndexByIJ, size } = getIndexByIJFactory(serie.count, serie.index)

            painter.config({
                fillStyle: serie.color
            })

            if (coordinate.category.name === "xAxis") {
                for (let i = 0; i < serie.value.length; i++) {
                    painter.fillRect(getIndexByIJ(i), valueLeft, size, getLenByValue(serie.value[i]))
                }
            } if (coordinate.category.name === "yAxis") {
                for (let i = 0; i < serie.value.length; i++) {
                    painter.fillRect(valueLeft, getIndexByIJ(i), getLenByValue(serie.value[i]), size)
                }
            }
        }

    }
}