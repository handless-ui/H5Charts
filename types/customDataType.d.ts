import CanvasType from "vislite/types/Canvas"

export default interface customDataType {
    painter: CanvasType
    grid: {
        /**
         * 左边留白
         */
        left?: number

        /**
         * 右边留白
         */
        right?: number

        /**
         * 顶部留白
         */
        top?: number

        /**
         * 底部留白
         */
        bottom?: number

        /**
         * 画布宽
         */
        width?: number

        /**
         * 画布高
         */
        height?: number
    }
    cx: number
    cy: number
}