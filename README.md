-   💘 开源不易，去 <i>[Github给个Star](https://github.com/handless-ui/H5Charts) </i>吧！

<img src='https://handless-ui.github.io/H5Charts/images/logo.png' width='500px' style='margin:50px 0;'/>

<p>
    <a href="https://zxl20070701.github.io/toolbox/#/npm-download?packages=h5charts&interval=7">
        <img src="https://img.shields.io/npm/dm/h5charts.svg" alt="downloads">
    </a>
    <a href="https://www.npmjs.com/package/h5charts">
        <img src="https://img.shields.io/npm/v/h5charts.svg" alt="Version">
    </a>
    <a href="https://github.com/handless-ui/H5Charts" target='_blank'>
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/handless-ui/H5Charts?style=social">
    </a>
</p>

<img src="https://nodei.co/npm/h5charts.png?downloads=true&amp;downloadRank=true&amp;stars=true" alt="NPM">

# H5Charts

一个基于 JavaScript 的开源可视化图表库。官网地址：[https://handless-ui.github.io/H5Charts](https://handless-ui.github.io/H5Charts)

## 如何使用？

首先需要进行安装：

```
npm install --save h5charts
```

安装完成以后，就可以在项目中引入了：

```js
import H5Charts from "h5charts"
```

下面以绘制一个柱状图为例子：

<img width="300px" src="https://handless-ui.github.io/H5Charts/images/examples/bar-simple.webp" />

首先准备好画布：

```html
<div id="root" style="width:500px;height:400px;"></div>
```

然后直接绘制：

```js
var el = document.getElementById("root");
var mychart =  new H5Charts(el, {
    xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar"
    }]
});
```

如果后续需要修改数据，直接：

```js
mychart.setOption({
    series: [{
        data: [20, 130, 50, 80, 170, 10, 130],
        type: "bar"
    }]
});
```

更多内容和细节，你可以直接[ 查看文档 ](https://handless-ui.github.io/H5Charts) 获得哦～

## 版权

MIT License

Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) 走一步，再走一步