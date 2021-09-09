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
		this.tan = new D2dRange(2, 600, 20);
		this.transport = new D2dToggle(false);
		this.frag = `
			let col = new D2dColor(momo.color);
			let col2 = new D2dColor(momo.colorBg);
			if (momo.transport) {
				return colorLerp(col, col2, Math.cos(y * momo.scale + x * momo.tan) / 2 + 0.5);
			}
			return colorLerp(col, col2, Math.cos(x * momo.scale + y * momo.tan) / 2 + 0.5);
		`;
	}
}