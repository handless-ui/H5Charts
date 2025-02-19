import type CanvasType from "vislite/types/Canvas"
import type MapType from "vislite/types/Map"

export function featureFactory(painter: CanvasType, type: string) {
    return function (map: MapType, feature: any) {
        let drawPolygon = function (coordinates:any) {
            for (let j = 0; j < coordinates.length; j++) {
                painter.beginPath()
                for (let k = 0; k < coordinates[j].length; k++) {
                    let dxy = map.use(coordinates[j][k][0], coordinates[j][k][1])
                    painter.lineTo(dxy[0], dxy[1])
                }
                painter[type]()
            }
        }

        if (feature.geometry.type == "Polygon") {
            drawPolygon(feature.geometry.coordinates)
        } else if (feature.geometry.type == "MultiPolygon") {
            for (let i = 0; i < feature.geometry.coordinates.length; i++) {
                drawPolygon(feature.geometry.coordinates[i])
            }
        } else {
            //    todo
        }

    }
};