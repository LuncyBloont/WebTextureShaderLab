class DemoNoise extends Momo {
	constructor() {
		super();
		this.momoName = "Noise";
		this.canvasWidth = new D2dScaleInt(700);
		this.canvasHeight = new D2dScaleInt(700);
		this.scale = new D2dRange(5, 30, 20);
		this.times = new D2dRange(2, 32, 8);
		this.week = new D2dRange(0, 1, 0.5);
		this.frag = `
			let col = new D2dColor("#FF00FF");
			let dark = 0;
			let base = 0;
			for (let i = 1; i < momo.times; i *= 2) {
				dark += tool.rand(limit(x), limit(y), i * momo.scale) * Math.pow(momo.week, i);
				base += Math.pow(momo.week, i);
			}
			dark /= base;
			col.color(dark * 255, dark * 255, dark * 255, 1);
			return col;
		`;
		this.start = `
			this.rand = function (x, y, scale) {
				let xx;
				let yy;
				xx = parseInt(x * scale) / scale;
				yy = parseInt(y * scale) / scale;
				let a1 = Math.abs(Math.sin(dot([limit(xx), limit(yy)], [12.9898, 378.23324])) * 34053.345);
				a1 = a1 - parseInt(a1);

				xx = parseInt(x * scale + 1) / scale;
				yy = parseInt(y * scale) / scale;
				let a2 = Math.abs(Math.sin(dot([limit(xx), limit(yy)], [12.9898, 378.23324])) * 34053.345);
				a2 = a2 - parseInt(a2);

				xx = parseInt(x * scale) / scale;
				yy = parseInt(y * scale + 1) / scale;
				let a3 = Math.abs(Math.sin(dot([limit(xx), limit(yy)], [12.9898, 378.23324])) * 34053.345);
				a3 = a3 - parseInt(a3);

				xx = parseInt(x * scale + 1) / scale;
				yy = parseInt(y * scale + 1) / scale;
				let a4 = Math.abs(Math.sin(dot([limit(xx), limit(yy)], [12.9898, 378.23324])) * 34053.345);
				a4 = a4 - parseInt(a4);

				let ddx = x * scale - parseInt(x * scale);
				ddx = (-Math.cos(ddx * Math.PI) + 1) / 2;
				let ddy = y * scale - parseInt(y * scale);
				ddy = (-Math.cos(ddy * Math.PI) + 1) / 2;

				let dis00 = limit01(Math.sqrt(Math.pow(ddx, 2) + Math.pow(ddy, 2)));
				let dis10 = limit01(Math.sqrt(Math.pow(1 - ddx, 2) + Math.pow(ddy, 2)));
				let dis01 = limit01(Math.sqrt(Math.pow(ddx, 2) + Math.pow(1 - ddy, 2)));
				let dis11 = limit01(Math.sqrt(Math.pow(1 - ddx, 2) + Math.pow(1 - ddy, 2)));

				let p1 = Math.cos(dis00 * Math.PI) + 1;
				let p2 = Math.cos(dis10 * Math.PI) + 1;
				let p3 = Math.cos(dis01 * Math.PI) + 1;
				let p4 = Math.cos(dis11 * Math.PI) + 1;

				let u = (a2 * ddx + a1 * (1 - ddx));
				let d = (a4 * ddx + a3 * (1 - ddx));

				let dark = a1 * p1 + a2 * p2 + a3 * p3 + a4 * p4;
				dark /= p1 + p2 + p3 + p4;

				// return (d * ddy + u * (1 - ddy));
				return dark;
			};
		`;
	}
}
