class DiffuseNoise extends Momo {
	constructor() {
		super();
		this.momoName = "Diffuse Noise";
		this.baseColor = new D2dColor("#FFFFFF");
		this.holeColor = new D2dColor("#000000");
		this.scale = new D2dRange(1, 30, 10);
		this.times = new D2dRange(2, 32, 8);
		this.frag = `
			let col = new D2dColor(momo.baseColor);
			let col2 = new D2dColor(momo.holeColor);
			let dark = tool.noise(x, y, momo, tool.noiseStart).R();
			return colorLerp(col, col2, dark / 255);
		`;
		this.start = `
			this.noise = new Function("x", "y", "momo", "tool", new DemoNoise().frag);
			let noiseStart = new Function("momo", new DemoNoise().start);
			this.noiseStart = new noiseStart(momo);
		`;
	}
}