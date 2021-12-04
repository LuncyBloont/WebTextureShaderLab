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
    
    window.fragArea = document.getElementById("codeArea");

    script.addEventListener("load", (function () {
        let sdr = eval("new " + sname);
        fragArea.innerHTML = sdr.constructor;
    }), true);

    document.body.append(script);
}

function editLoad() {
    let s = "custom shaders:\n   ID\t> name\n";
    for (let i = 0; i < localStorage.length; i++) {
        key = localStorage.key(i) + "";
        if (key.indexOf('&') < 0) continue;
        s += "   " + i + "\t> " + key.substring(key.indexOf('&') + 1, key.length) + "\n";
        console.log(key);
    }
    let id = prompt("insert the ID of the shader you want to load.\n" + s, "");
    id = parseInt(id);
    if (localStorage.key(id) && localStorage.key(id).indexOf('&') >= 0)
    {
        let obj = JSON.parse(localStorage.getItem(localStorage.key(id)))
        console.log(obj);
        codeArea.innerHTML = obj.code;
    }
    else
    {
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