// var value = Math.floor(Math.random() * 100);
var value = 86;

new H5Charts(el, {
    series: [{
        type: "custom",
        draw: function ({ painter, grid, cx, cy }) {

            var radius = Math.min(grid.width, grid.height) * 0.25

            // 绘制中心圆
            painter.config({
                fillStyle: "white",
                shadowColor: "rgba(76,107,167,0.4)",
                shadowBlur: 30
            }).fillCircle(cx, cy, radius);

            // 绘制进度文字
            painter.config({
                shadowBlur: 0,
                fontSize: radius * 0.4,
                fillStyle: "rgb(0,50,190)",
                textAlign: "center",
                fontWeight: 800
            }).fillText(value + "%", cx, cy);

            var deg = Math.PI * 2 * value * 0.01;

            var gradient = painter.createConicGradient(cx, cy, 0, Math.PI * 2)
                .setColor(0, "rgb(219 218 254)")
                .setColor(0.5, "rgb(34 72 245)")
                .setColor(1, "rgb(0 1 18)");

            // 绘制弧形进度
            painter.config({
                fillStyle: gradient.value()
            }).fillArc(cx, cy, radius * 1.35, radius * 1.6, 0, deg)
                .fillArc(cx, cy, radius, radius * 1.6, deg, -0.1);


        }
    }]
});