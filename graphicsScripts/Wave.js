class Wave extends Momo {
	constructor() {
		super();
		this.momoName = "Wave";
		this.background = new D2dColor("#120527");
		this.hola = new D2dColor("#560698");
		this.sample = new D2dInt(3);
		this.scale = new D2dRange(5, 30, 10);
		this.radius = new D2dRange(0, 0.4, 0.1);
		this.randRadius= new D2dRange(0, 1, 0.5);
		this.randMove = new D2dRange(0, 1, 0.4);
		this.width = new D2dRange(0, 1, 0.1);
		
		this.frag = `
			let bg = new D2dColor(momo.background);
			let hola = new D2dColor(momo.hola);
			let afix = [1, momo.canvasWidth / momo.canvasHeight];
			let smp = Math.abs(momo.sample);
			for (let i = -smp; i <= smp; i++) {
				for (let j = -smp; j <= smp; j++) {
					let center = [parseInt(x * momo.scale + i) / momo.scale, parseInt(y * momo.scale + j) / momo.scale];
					let radius = noise([parseInt(x * momo.scale + i) / momo.scale, parseInt(y * momo.scale + j) / momo.scale], 1) * momo.randRadius + 1 - momo.randRadius;
					radius *= momo.radius
					let dx = tool.rand1(parseInt(x * momo.scale + i) / momo.scale, parseInt(y * momo.scale + j) / momo.scale) * momo.randMove - momo.randMove / 2;
					let dy = tool.rand2(parseInt(x * momo.scale + i) / momo.scale, parseInt(y * momo.scale + j) / momo.scale) * momo.randMove - momo.randMove / 2;
					center = [center[0] + dx, center[1] + dy];
					let dis = distance(mul2([x, y], afix), center);
					if (dis < radius && dis > radius - momo.width * momo.radius) {
						bg = colorLerp(bg, hola, Math.cos((radius - dis) / momo.width / momo.radius * Math.PI * -2) * 0.5 + 0.5);
					}
				}
			}
			return bg;
		`;
		
		this.start = `
			this.rand1 = function (x, y) {
				return frac(Math.abs(Math.sin(dot([x, y], [16.9798, 318.23324]) + 13.5435) * 34053.345));
			}
			this.rand2 = function (x, y) {
				return frac(Math.abs(Math.sin(dot([x, y], [12.9898, 378.23324]) + 3.65017) * 34053.345));
			}
		`;
	}
}