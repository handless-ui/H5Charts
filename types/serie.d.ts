import customDataType from "./customDataType"
import { EvalFunType } from "./option"

export interface CustomType {
    type: "custom",
    draw: (data: customDataType) => void
}

export interface MapType {
    type: "map"
    map: string,
    label?: {
        show?: boolean
    },
    data?: Array<{
        value: number
        name: string
    }>
}

export interface PieType {
    type: "pie"
    startAngle?: number
    angle?: number
    radius?: [number, number] | EvalFunType
    center?: [number, number] | EvalFunType
    data: Array<{
        value: number
        name: string
    }>
}

export interface BarType {
    type: "bar"
    coordinateSystem?: "polar" | "cartesian2d"
    data: Array<number>
}