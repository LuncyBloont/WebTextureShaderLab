function createSdr(exampleName) {
    window.open("./edit.html?open=" + exampleName);
}

function getURLParam(name) {
    var paramstr = window.location.search.substring(1);
    var params = paramstr.split("&");
    for (var i = 0; i < params.length; i++) {
        var pair = params[i].split("=");
        if (pair[0] == name) { return pair[1]; }
    }
    return "";
}

function editInit() {
    let sname = getURLParam("open");
    let script = document.createElement("script");
    script.src = "./" + scriptsRoot + sname + ".js";

    window.codeArea = document.getElementById("codeArea");

    script.addEventListener("load", (function () {
        let sdr = eval("new " + sname);
        codeArea.innerHTML = sdr.constructor;
    }), true);

    codeArea.addEventListener("keydown", insertTab, false);

    document.body.append(script);
}

function editLoad() {
    let s = "custom shaders:\n   ID>   name\n";
    for (let i = 0; i < localStorage.length; i++) {
        key = localStorage.key(i) + "";
        if (key.indexOf('&') < 0) continue;
        s += "   " + i + ">   " + key.substring(key.indexOf('&') + 1, key.length) + "\n";
        console.log(key);
    }
    let id = prompt("insert the ID of the shader you want to load.\n" + s, "");
    id = id ? ((id + "").length > 0 ? parseInt(id) : -1) : -3;
    if (id >= 0 && localStorage.key(id) && localStorage.key(id).indexOf('&') >= 0) {
        let obj = JSON.parse(localStorage.getItem(localStorage.key(id)))
        console.log(obj);
        codeArea.value = obj.code;
    }
    else if (id != -3) {
        alert("invalid ID");
    }
}

function editSave() {
    let fname = prompt("Your shader name", "shader-" + new Date().toISOString());
    let cover = (fname && fname.length > 0);
    fname = "custom&" + fname;
    if (localStorage.getItem(fname)) {
        cover = confirm("The shader with the name is exist. Recover?");
    }
    if (cover) {
        let nsdr = {
            "code": codeArea.value
        };
        console.log(nsdr);
        localStorage.setItem(fname, JSON.stringify(nsdr));
    }
}

function insertTab(e) {
    let kC = e.keyCode;
    let o = this;
    if (kC == 9 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
        let oS = o.scrollTop;
        if (o.setSelectionRange) {
            let sS = o.selectionStart;
            let sE = o.selectionEnd;
            o.value = o.value.substring(0, sS) + "\t" + o.value.substr(sE);
            o.setSelectionRange(sS + 1, sS + 1);
            o.focus();
        }
        else if (o.createTextRange) {
            document.selection.createRange().text = "\t";
            e.returnValue = false;
        }
        o.scrollTop = oS;
        if (e.preventDefault) {
            e.preventDefault();
        }
        return false;
    }
    return true;
}