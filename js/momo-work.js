importScripts('momo.js', 'select-list.js', 'math.js');

for (var i = 0; i < scriptList.length; i++) {
	var src = scriptsRoot + scriptList[i] + ".js";
	importScripts("../" + src);
}

onmessage = function (event) {
	var w = event.data[0];
	var h = event.data[1];
	var data = event.data[2];
	var momos = event.data[3];
	var momo = event.data[4];
	var para = event.data[5];
	var frag = new Function("x", "y", "momo", "tool", momo);
	var start = new Function("momo", momos);
	
	var tool = new start(para);
	
	for (var x = 0.0; x < w; x += 1) {
		for (var y = 0.0; y < h; y += 1) {
			var index = (y * w + x) * 4;
			var col = frag(x / w, y / h, para, tool);
			data[index] = col.R();
			data[index + 1] = col.G();
			data[index + 2] = col.B();
			data[index + 3] = col.A() * 255;
		}
	}
	
	postMessage(data);
}