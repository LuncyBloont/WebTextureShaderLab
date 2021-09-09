importScripts('momo.js', 'select-list.js', 'math.js');

for (let i = 0; i < scriptList.length; i++) {
	let src = scriptsRoot + scriptList[i] + ".js";
	importScripts("../" + src);
}

onmessage = function (event) {
	let w = event.data[0];
	let h = event.data[1];
	let data = event.data[2];
	let momos = event.data[3];
	let momo = event.data[4];
	let para = event.data[5];
	let frag = new Function("x", "y", "momo", "tool", momo);
	let start = new Function("momo", momos);
	texLib = event.data[6];
	
	let tool = new start(para);
	
	for (let x = 0.0; x < w; x += 1) {
		for (let y = 0.0; y < h; y += 1) {
			let index = (y * w + x) * 4;
			let col = frag(x / w, y / h, para, tool);
			data[index] = col.R();
			data[index + 1] = col.G();
			data[index + 2] = col.B();
			data[index + 3] = col.A() * 255;
		}
	}
	
	postMessage(data);
}