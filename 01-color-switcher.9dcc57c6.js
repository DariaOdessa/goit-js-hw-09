!function(){var t={body:document.querySelector("body"),startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};t.startBtn.addEventListener("click",(function(){e=setInterval((function(){var e="#".concat(Math.floor(16777215*Math.random()).toString(16));t.body.style.backgroundColor=e}),1e3),t.startBtn.setAttribute("disabled","disabled"),t.stopBtn.removeAttribute("disabled")})),t.stopBtn.addEventListener("click",(function(){clearInterval(e),t.startBtn.removeAttribute("disabled"),t.stopBtn.setAttribute("disabled","disabled")})),t.stopBtn.setAttribute("disabled","disabled");var e=null}();
//# sourceMappingURL=01-color-switcher.9dcc57c6.js.map
