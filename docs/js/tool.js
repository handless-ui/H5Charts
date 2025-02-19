// 请求数据
function fetchData(url) {
    return new Promise(function (resolve, reject) {
        var cacheData = sessionStorage.getItem("cache://" + url);
        if (window.needCache && cacheData) {
            resolve(cacheData);
        } else {
            fetch(url, {
                method: "GET"
            }).then(function (res) {
                if (res.status === 200) {
                    return res.text();
                } else {
                    return Promise.reject(res.json());
                }
            }).then(function (res) {

                if (window.needCache) {
                    sessionStorage.setItem("cache://" + url, res);
                }

                resolve(res);
            }).catch(function (err) {
                reject(err);
            });
        }
    });
}

function compilerImport(source, isOnline) {
    execResult = /import *([^} ]+) *from *(["'])h5charts\2;?/.exec(source);
    if (execResult) {
        var libSrc = isOnline ? ("https://cdn.jsdelivr.net/npm/h5charts@" + window.H5Charts_system.version) : "../dist/H5Charts.js";
        importCode = "import '" + libSrc + "';var " + execResult[1] + " = window.H5Charts;";
        source = source.replace(execResult[0], importCode);
    }
    return source;
}

function fullExampleCode(source) {
    return '<div id="root"></div>\n' +
        '<script type="module">\n' +
        '    import H5Charts from "h5charts";\n' +
        '    var el = document.getElementById("root");\n' +
        ("\n" + source).replace(/\n/g, "\n    ") + '\n' +
        '</script>\n' +
        '<style>\n' +
        '    body {\n' +
        '        margin: 0;\n' +
        '    }\n' +
        '\n' +
        '    #root {\n' +
        '        width: 100vw;\n' +
        '        height: 100vh;\n' +
        '    }\n' +
        '</style>\n';
}

// 运行例子
// pageExample如果存在，说明就是页面内嵌例子
function runExample(pageExample) {
    var code = fullExampleCode(pageExample ? pageExample.code : document.getElementById('source-id').value);

    if (!pageExample) {
        document.getElementById("code-id").innerHTML = "<pre tag='html'>" + code + "</pre>";
        pageby.shader(document.getElementById("code-id"));
    }

    var iframeWindow = (pageExample ? pageExample.iframe : document.getElementById('run-id')).contentWindow;
    var iframeDocument = iframeWindow.document;

    iframeWindow.fetchGeo = function (mapName, callback) {
        var geoUrl = {
            "HK": "https://cdn.jsdelivr.net/npm/@datapool/hk.geojson"
        }[mapName];

        var cacheData = localStorage.getItem("cache://geo/" + mapName);
        if (cacheData) {
            callback(JSON.parse(cacheData));
        } else {

            // fetch(geoUrl, {
            //     method: "GET"
            // }).then(function (res) {
            //     return res.json();
            // }).then(function (HK) {
            //     callback(HK);
            //     localStorage.setItem("cache://geo/" + mapName, JSON.stringify(HK));
            // });

            // 获取head标签
            var head = document.getElementsByTagName('head')[0];

            // 创建script
            var script = document.createElement('script');

            // 设置属性
            script.setAttribute("async", "async");
            script.src = geoUrl;

            // 追加到页面
            head.appendChild(script);

            script.addEventListener('load', function () {
                callback(HKGeoJSON);
                localStorage.setItem("cache://geo/" + mapName, JSON.stringify(HKGeoJSON));
            }, false);

        }
    };

    iframeDocument.open();
    iframeDocument.write(compilerImport(code, window.needCache));
    iframeDocument.close();
}

function showExampleEditor() {
    document.getElementById("nav-editor-btn").setAttribute("class", "active");
    document.getElementById("nav-code-btn").setAttribute("class", "");

    document.getElementById("source-id").style.display = "";
    document.getElementById("code-id").style.display = "none";
}

function showExampleCode() {
    document.getElementById("nav-editor-btn").setAttribute("class", "");
    document.getElementById("nav-code-btn").setAttribute("class", "active");

    document.getElementById("source-id").style.display = "none";
    document.getElementById("code-id").style.display = "";
}

function loadPageByName(tag) {
    var tagArray = tag.split(".");
    if (tag) {
        var urlObj = pageby.url();

        var fixed = tagArray.length <= 1 ? undefined : tagArray.pop();
        var pagepath = tagArray.join("/");

        window.location.href = "#/" + urlObj.router.join("/") + "?tag=" + tag;

        fetchData("./pages/" + urlObj.router.join("/") + "/" + pagepath + ".html").then(function (template) {
            var contentEl = document.getElementById("content-right-id");

            contentEl.innerHTML = template;
            pageby.shader(contentEl);

            contentEl.scrollTop = fixed ? document.getElementById("fixed-" + fixed).offsetTop : 0;

            // 运行页面中例子
            var examples = document.getElementsByName("example");
            for (var index = 0; index < examples.length; index++) {
                (function (targetEl) {
                    targetEl.style.position = 'relative';
                    let exampleName = targetEl.getAttribute("c");
                    fetchData("./pages/example/zh/" + exampleName + ".js").then(function (exampleCode) {

                        var iframeEl = document.createElement("iframe");
                        iframeEl.style.width = "100%";
                        iframeEl.style.height = "100%";
                        iframeEl.style.border = "none";

                        targetEl.appendChild(iframeEl);
                        runExample({
                            code: exampleCode,
                            iframe: iframeEl
                        });

                        var editorEl = document.createElement("a");
                        editorEl.setAttribute("href", "?#/example/zh/editor?c=" + exampleName);
                        editorEl.setAttribute("target", "_blank");
                        editorEl.innerText = "编辑一下试试？";
                        editorEl.style.position = 'absolute';
                        editorEl.style.right = "10px";
                        editorEl.style.top = "15px";
                        editorEl.style.textDecoration = "underline";
                        editorEl.style.color = "blue";

                        targetEl.appendChild(editorEl);
                    });
                })(examples[index]);
            }
        });
    }
}

function loadPage(event) {
    loadPageByName(event.target.getAttribute("name"));
}

// 初始化菜单
function initMenu(el) {
    var spans = el.getElementsByTagName("span");
    for (var i = 0; i < spans.length; i++) {
        (function (i) {

            // 如果有孩子，只需要控制菜单打开关闭即可
            if (spans[i].parentElement.getElementsByTagName('li').length > 0) {
                if (!spans[i].parentElement.getAttribute('is-open'))
                    spans[i].parentElement.setAttribute('is-open', 'no');
                spans[i].addEventListener('click', function () {
                    spans[i].parentElement.setAttribute('is-open', spans[i].parentElement.getAttribute('is-open') == 'no' ? 'yes' : 'no');
                });

                var type = spans[i].getAttribute("type");
                if (type == "Array") {
                    spans[i].innerHTML = spans[i].innerHTML.trim() + ":[{<i>...}]</i>";
                } else if (type == "JSON") {
                    spans[i].innerHTML = "{<i>" + spans[i].innerHTML.trim() + ", ...}</i>"
                } else {
                    spans[i].innerHTML = spans[i].innerHTML.trim() + ":{<i>...}</i>";
                }
            }

            // 否则就要控制打开关闭页面了
            else {
                spans[i].addEventListener('click', function () {
                    loadPageByName(spans[i].getAttribute("name"));
                });
            }

        })(i);
    }
}

function closeAll(elid) {
    var lis = document.getElementById(elid).getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
        if (lis[i].getAttribute("is-open") == "yes") {
            lis[i].setAttribute("is-open", "no");
        }
    }
}