import { CustomType, MapType, PieType, BarType } from "./serie"
import { AxisCategoryType, AxisValueType } from "./axis"
import { LinearGradientType, RadialGradientType, ConicGradientType } from "./gradient"
import VisualMapType from "./visualMap"

export interface EvalFunType {
    (params: {
        width: number
        height: number
    }): any
}

export interface TitleType {
    text: string
    subtext?: string
    left?: "left" | "center" | "right"
}

export default interface OptionType {
    title?: TitleType
    color?: Array<string | LinearGradientType | RadialGradientType | ConicGradientType>
    visualMap?: VisualMapType
    grid?: {
        /**
         * 可选，默认50，表示左边留白
         */
        left?: number

        /**
         * 可选，默认50，表示右边留白
         */
        right?: number

        /**
         * 可选，默认50，表示顶部留白
         */
        top?: number

        /**
         * 可选，默认50，表示底部留白
         */
        bottom?: number
    }
    xAxis?: AxisCategoryType | AxisValueType
    yAxis?: AxisCategoryType | AxisValueType
    angleAxis?: AxisCategoryType | AxisValueType
    radiusAxis?: AxisCategoryType | AxisValueType
    series?: Array<CustomType | MapType | PieType | BarType>
}