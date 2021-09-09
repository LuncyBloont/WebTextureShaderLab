function dot(p1, p2) {
	return p1[0] * p2[0] + p1[1] * p2[1];
}

function colorLerp(c1, c2, lerp) {
	lerp = Math.min(1, Math.max(lerp, 0));
	let col = new D2dColor("#FFFFFF");
	let blerp = 1 - lerp;
	col.color(
		c1.R() * lerp + c2.R() * blerp,
		c1.G() * lerp + c2.G() * blerp,
		c1.B() * lerp + c2.B() * blerp,
		c1.A() * lerp + c2.A() * blerp
	);
	return col;
}

function frac(a) {
	return a - parseInt(a);
}

function length(p) {
	return Math.sqrt(Math.pow(p[0], 2) + Math.pow(p[1], 2));
}

function distance(p1, p2) {
	return length([p2[0] - p1[0], p2[1] - p1[1]]);
}

function mul2(p1, p2) {
	return [p1[0] * p2[0], p1[1] * p2[1]];
}

function noise(p, s) {
	return frac(Math.abs(Math.sin(dot(p, [12.9898, 378.23324]) + s) * 34053.345));
}


let load2Dimg = null;
let texLib = [];
let libEnd = 0;
function loadPrepare() {
	load2Dimg = document.createElement("canvas");
	load2Dimg.className = "buffer";
	document.body.appendChild(load2Dimg);
}

function load2D(src) {
	let image = new Image();
	let end = libEnd;
	libEnd += 1;
	image.onload = function () {
		let g = load2Dimg.getContext("2d");
		load2Dimg.width = this.naturalWidth;
		load2Dimg.height = this.naturalHeight;
		g.drawImage(this, 0, 0);
		texLib[end] = ([g.getImageData(0, 0, load2Dimg.width, load2Dimg.height).data, load2Dimg.width, load2Dimg.height]);
	};
	image.src = src;
	return end;
}

function tex2D(tex, x, y) {
	x = frac(frac(x) + 1);
	y = frac(frac(y) + 1);
	let col = new D2dColor("#FFFFFF");
	let index = parseInt(y * texLib[tex][2]) * texLib[tex][1] + parseInt(x * texLib[tex][1]);
	index *= 4;
	col.color(texLib[tex][0][index], texLib[tex][0][index + 1], texLib[tex][0][index + 2], texLib[tex][0][index + 3] / 255);
	return col;
}