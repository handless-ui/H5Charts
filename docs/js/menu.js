var urlObj = pageby.url();

function initEnv() {
    goto(urlObj.router.join("/") || "home", true);
}

var preNavEl = void 0;
function goto(urlstr, isInit) {
    var routers = urlstr.split("/");

    var ulEl = document.getElementById("nav-" + routers[0] + "-id");
    if (ulEl) {
        ulEl.style.display = "none";
        setTimeout(function () {
            ulEl.style.display = "";
        });
    }

    fetchData("./pages/" + urlstr + ".html").then(function (template) {
        if (!isInit) window.location.href = "#/" + urlstr;

        var contentEl = document.getElementById("content-id");

        contentEl.innerHTML = template;
        pageby.shader(contentEl);

        if (preNavEl) {
            preNavEl.setAttribute("active", "no");
        }
        preNavEl = document.getElementById("nav-btn-" + routers[0] + "-id");
        preNavEl.setAttribute("active", "yes");

        // 用例界面
        if (routers[0] == "example" && routers[1] == "zh" && routers[2] == "editor") {
            var exampleName = urlObj.params.c;

            if (!exampleName) {
                alert("非常抱歉，打开例子时发生了错误！");
            } else {
                fetchData("./pages/example/zh/" + exampleName + ".js").then(function (exampleCode) {
                    document.getElementById("source-id").value = exampleCode;
                    document.getElementById('run-btn').click();
                });
            }
        }

        // 菜单
        var menuEl = document.getElementById(routers.join("-") + "-menu-id");
        if (menuEl) {
            initMenu(menuEl);
        }

        var tagEl = document.getElementsByName(urlObj.params.tag)[0];
        if (tagEl) {
            tagEl.click();
        } else {

            var defaultName = {
                manual: "get-started",
                api: "h5charts.registerMap",
                option: "xAxis.type"
            }[routers[1]];

            if (defaultName) document.getElementsByName(defaultName)[0].click();
        }
    });
}

function doExampleScroll(targetName) {

    var menuEl = document.getElementById("menu-id");

    var offsetTop = document.getElementById("menu-" + targetName + "-id").offsetTop - 70;
    var currentScrollTop = menuEl.scrollTop || 0;

    pageby.animation(function (deep) {
        menuEl.scrollTop = (offsetTop - currentScrollTop) * deep + currentScrollTop;
    }, 500, function () {
        menuEl.scrollTop = offsetTop;
    });
}

function doSearch(event) {
    alert("开发中，敬请期待！");
}