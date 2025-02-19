import OptionType from "./option"

export default class H5Charts {

    /**
     * 创建图表对象
     * @param option 
     */
    constructor(el: HTMLElement | null, option?: OptionType)

    /**
     * 注册地图数据
     * @param mapName 地图数据名称
     * @param mapData 地图数据内容
     */
    static registerMap(mapName: string, mapData: any): H5Charts

    /**
     * 修改配置项
     * @param option 
     */
    setOption(option: OptionType): this

    /**
     * 主动重绘
     */
    forceUpdate(): this

}