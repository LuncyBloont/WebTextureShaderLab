class Mesh0 extends Momo {
	constructor() {
		super();
		this.momoName = "Mesh 0";
		this.canvasWidth = new D2dScaleInt(1000);
		this.canvasHeight = new D2dScaleInt(1000);
		this.sizeScale = new D2dRange(0, 100, 10);
		this.color = new D2dColor("#6778FF");
		this.colorBg = new D2dColor("#acefca");
		this.scale = new D2dRange(5, 200, 40);
		this.tan = new D2dRange(0, 600, 20);
		this.transport = new D2dToggle(false);
		this.double = new D2dToggle(false);
		this.power = new D2dRange(0, 10, 1);
		this.base = new D2dRange(0, 1, 0);
		this.frag = `
			let col = new D2dColor(momo.color);
			let col2 = new D2dColor(momo.colorBg);
			let p = Math.cos(y * momo.scale + x * momo.tan) / 2 + 0.5;

			if (!momo.double && momo.transport) p = 1;
			if (momo.transport || momo.double) { p *= Math.cos(-x * momo.scale + y * momo.tan) / 2 + 0.5; }

			let diff = Math.abs(p - momo.base);
			let sign = p > momo.base ? 1 : -1;

			return colorLerp(col, col2, Math.pow(diff, momo.power) * sign + momo.base);
		`;
	}
}
