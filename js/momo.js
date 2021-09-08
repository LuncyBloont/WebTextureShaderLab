
class D2dFloat {
	constructor(value) {
		this.d2dFlag = "float";
	    this.value = value;
	}
	code() {
		return eval(this.value);
	}
	set(v) {
		this.value = eval(v);
	}
}

class D2dRange {
	constructor(min, max, value) {
		this.d2dFlag = "range";
	    this.min = min;
		this.max = max;
		this.value = value;
	}
	code() {
		return Math.max(this.min, Math.min(this.max, eval(this.value)));
	}
	set(v) {
		this.value = Math.max(this.min, Math.min(this.max, eval(v)));
	}
}

class D2dInt {
	constructor(value) {
		this.d2dFlag = "int";
	    this.value = value;
	}
	code() {
		return parseInt(eval(this.value));
	}
	set(v) {
		this.value = parseInt(eval(v));
	}
}

class D2dScaleInt extends D2dInt {
	constructor(value) {
		super(value);
		this.scale = 1.0;
	}
	code() {
		return parseInt(eval(this.value) * this.scale);
	}
}

class D2dScaleFloat extends D2dFloat {
	constructor(value) {
		super(value);
		this.scale = 1.0;
	}
	code() {
		return eval(this.value) * this.scale;
	}
}

class D2dColor {
	constructor(value) {
	    this.d2dFlag = "color";
		this.value = value;
		this.alpha = 1;
	}
	code() {
		return this.value;
	}
	set(v) {
		this.value = v;
	}
	R() {
		return eval("0x" + (this.value + "").substr(1, 2));
	}
	G() {
		return eval("0x" + (this.value + "").substr(3, 2));
	}
	B() {
		return eval("0x" + (this.value + "").substr(5, 2));
	}
	A() {
		return this.alpha;
	}
	ff(v) {
		let s = parseInt(v).toString(16);
		if (s.length < 2) return "0" + s;
		if (s.length > 2) return s.substr(s.length - 2, 2);
		return s;
	}
	color(r, g, b, a) {
		this.alpha = a;
		this.value = "#" + this.ff(r) + this.ff(g) + this.ff(b);
	}
}

class Momo {
	constructor() {
		this.momoName = "default";
		this.canvasWidth = new D2dScaleInt(800);
		this.canvasHeight = new D2dScaleInt(800);
		this.sizeScale = new D2dRange(0, 100, 20);
		this.rawData = new Uint8ClampedArray(this.canvasWidth.code() * this.canvasHeight.code() * 4);
		this.frag = `
			let col = new D2dColor("#000000");
			col.color(x * 255, y * 255, 128, 1);
			return col;
		`;
		this.start = `
			
		`;
	}
	talk(name) {
		alert(name + ", we are friends now!");
	}
	draw(canvas) {
		this.canvasWidth.scale = this.sizeScale.code() / 100.0;
		this.canvasHeight.scale = this.sizeScale.code() / 100.0;
		canvas.width = this.canvasWidth.code();
		canvas.height = this.canvasHeight.code();
		if (this.canvasWidth.code() * this.canvasHeight.code() * 4 != this.rawData.length) {
			this.rawData = new Uint8ClampedArray(this.canvasWidth.code() * this.canvasHeight.code() * 4);
		}
		let g = canvas.getContext("2d");
		let data = new ImageData(this.rawData, this.canvasWidth.code(), this.canvasHeight.code());
		g.putImageData(data, 0, 0);
	}
	render() {
		for (let x = 0; x < this.canvasWidth.code(); x += 1) {
			for (let y = 0; y < this.canvasHeight.code(); y += 1) {
				let index = (y * this.canvasWidth.code() + x) * 4;
				let col = this.frag(x / this.canvasWidth.code(), y / this.canvasHeight.code());
				this.rawData[index] = col.R();
				this.rawData[index + 1] = col.G();
				this.rawData[index + 2] = col.B();
				this.rawData[index + 3] = col.A() * 255;
			}
		}
	}
	
}

let nowMomo = new Momo();