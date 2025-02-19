interface ColorStopsType {
    colorStops: Array<{
        offset: number
        color: string
    }>
}

export interface LinearGradientType extends ColorStopsType {
    type: 'linear'
    x1: number
    y1: number
    x2: number
    y2: number
}

export interface RadialGradientType extends ColorStopsType {
    type: 'radial'
    cx: number
    cy: number
    radius: number
}

export interface ConicGradientType extends ColorStopsType {
    type: 'conic'
    cx: number
    cy: number
    beginDeg: number
    deg: number
}