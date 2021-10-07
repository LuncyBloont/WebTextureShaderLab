class DiffuseNoise extends Momo {
	constructor() {
		super();
		this.momoName = "Diffuse Noise";
		this.baseColor = new D2dColor("#FFFFFF");
		this.holeColor = new D2dColor("#000000");
		this.scale = new D2dRange(1, 30, 10);
		this.times = new D2dRange(2, 32, 8);
		this.week = new D2dRange(0, 1, 0.5);
		this.frag = `
			let col = new D2dColor(momo.baseColor);
			let col2 = new D2dColor(momo.holeColor);
			tool.noiseMomo.scale = momo.scale;
			tool.noiseMomo.times = momo.times;
			tool.noiseMomo.week = momo.week;
			let dark = tool.noise(x, y, tool.noiseMomo, tool.noiseStart).R();
			return colorLerp(col, col2, dark / 255);
		`;
		this.start = `
			this.noise = new Function("x", "y", "momo", "tool", new DemoNoise().frag);
			let noiseStart = new Function("momo", new DemoNoise().start);
			this.noiseStart = new noiseStart(momo);
			this.noiseMomo = getMomoObj(new DemoNoise());
		`;
	}
}
