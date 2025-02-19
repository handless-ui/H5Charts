export default function (canvasInfo: any) {
    return function (value: any, initValue: any) {
        return typeof value == 'function' ? value({
            width: canvasInfo.width,
            height: canvasInfo.height
        }) : (value || initValue)
    }
}