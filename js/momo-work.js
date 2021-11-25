importScripts('momo.js', 'select-list.js', 'math.js');

for (let i = 0; i < scriptList.length; i++) {
	let src = scriptsRoot + scriptList[i] + ".js";
	importScripts("../" + src);
}

onmessage = function (event) {
	let w = event.data[0];
	let h = event.data[1];
	let data = new Uint8ClampedArray(w * h * 4);
	let momos = event.data[3];
	let momo = event.data[4];
	let para = event.data[5];
	let hx = event.data[7];
	let hy = event.data[8];
	let ex = event.data[9];
	let ey = event.data[10];
	let frag = new Function("x", "y", "momo", "tool", momo);
	let start = new Function("momo", momos);
	texLib = event.data[6];
	let spilt = event.data[11];
	
	let tool = new start(para);

	for (let k = 0; k < spilt; k++) {
		for (let v = 0; v < spilt; v++) {

			let l = hx + parseInt((ex - hx) * k / spilt);
			let t = hy + parseInt((ey - hy) * v / spilt);
			let r = hx + parseInt((ex - hx) * (1 + k) / spilt);
			let b = hy + parseInt((ey - hy) * (1 + v) / spilt);

			for (let x = l; x < r; x += 1) {
				for (let y = t; y < b; y += 1) {
					let index = (y * w + x) * 4;
					let col = frag(x / w, y / h, para, tool);
					data[index] = col.R();
					data[index + 1] = col.G();
					data[index + 2] = col.B();
					data[index + 3] = col.A() * 255;
				}
			}
			postMessage([l, r, t, b, data]);
		}
	}
	
	
}