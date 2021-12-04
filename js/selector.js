let selector = document.getElementById("script_selector");
function loadSelector() {
	selector.innerHTML = "";
	document.getElementById("scriptLib").innerHTML = "";
	for (let i = 0; i < scriptList.length; i++) {
		let option = document.createElement("option");
		let src = scriptsRoot + scriptList[i] + ".js";

		try {
			let momoScript = document.createElement("script");
			momoScript.src = src;
			document.getElementById("scriptLib").appendChild(momoScript);
		} catch (e) { }

		option.value = scriptList[i];
		option.innerHTML = scriptList[i];
		selector.appendChild(option);
	}

	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i) + "";
		if (key.indexOf('&') < 0) continue;
		let source = JSON.parse(localStorage.getItem(key)).code + "";
		key = key.substring(key.indexOf('&') + 1, key.length);
		let option = document.createElement("option");

		try {
			let momoScript = document.createElement("script");
			momoScript.innerHTML = source;
			document.getElementById("scriptLib").appendChild(momoScript);
		} catch (e) { }

		console.log(source);
		option.value = key;
		option.innerHTML = key;
		selector.appendChild(option);
	}

	selector.onchange = function () {
		nowMomo = eval("new " + this.value + "()");
		nowMomo.draw(document.getElementById("canvas"));
		renderMomo();
	};
}

loadSelector();
