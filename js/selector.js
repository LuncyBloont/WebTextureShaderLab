var selector = document.getElementById("script_selector");
(function () {
	for (var i = 0; i < scriptList.length; i++) {
		var option = document.createElement("option");
		var src = scriptsRoot + scriptList[i] + ".js";
		
		momoScript = document.createElement("script");
		momoScript.src = src;
		document.head.appendChild(momoScript);
		
		option.value = scriptList[i];
		option.innerHTML = scriptList[i];
		selector.appendChild(option);
	}
	
	selector.onchange = function () {
		nowMomo = eval("new " + this.value + "()");
		nowMomo.draw(document.getElementById("canvas"));
		renderMomo();
	};
})();
