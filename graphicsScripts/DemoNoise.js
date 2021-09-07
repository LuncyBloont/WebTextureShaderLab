class DemoNoise extends Momo {
	constructor() {
		super();
		this.momoName = "Noise";
		this.canvasWidth = new D2dScaleInt(700);
		this.canvasHeight = new D2dScaleInt(700);
		this.scale = new D2dRange(5, 30, 20);
		this.times = new D2dRange(2, 32, 8);
		this.frag = `
			var col = new D2dColor("#FF00FF");
			var dark = 0;
			var base = 0;
			for (var i = 1; i < momo.times; i *= 2) {
				dark += tool.rand(x, y, i * momo.scale) / i;
				base += 1 / i;
			}
			dark /= base;
			col.color(dark * 255, dark * 255, dark * 255, 1);
			return col;
		`;
		this.start = `
			this.rand = function (x, y, scale) {
				var xx;
				var yy;
				xx = parseInt(x * scale) / scale;
				yy = parseInt(y * scale) / scale;
				var a1 = Math.abs(Math.sin(dot(xx, yy, 12.9898, 378.23324)) * 34053.345);
				a1 = a1 - parseInt(a1);
				
				xx = parseInt(x * scale + 1) / scale;
				yy = parseInt(y * scale) / scale;
				var a2 = Math.abs(Math.sin(dot(xx, yy, 12.9898, 378.23324)) * 34053.345);
				a2 = a2 - parseInt(a2);
				
				xx = parseInt(x * scale) / scale;
				yy = parseInt(y * scale + 1) / scale;
				var a3 = Math.abs(Math.sin(dot(xx, yy, 12.9898, 378.23324)) * 34053.345);
				a3 = a3 - parseInt(a3);
				
				xx = parseInt(x * scale + 1) / scale;
				yy = parseInt(y * scale + 1) / scale;
				var a4 = Math.abs(Math.sin(dot(xx, yy, 12.9898, 378.23324)) * 34053.345);
				a4 = a4 - parseInt(a4);
				
				var ddx = x * scale - parseInt(x * scale);
				ddx = (-Math.cos(ddx * Math.PI) + 1) / 2;
				var ddy = y * scale - parseInt(y * scale);
				ddy = (-Math.cos(ddy * Math.PI) + 1) / 2;
				
				var u = (a2 * ddx + a1 * (1 - ddx));
				var d = (a4 * ddx + a3 * (1 - ddx));
				
				return (d * ddy + u * (1 - ddy));
			};
		`;
	}
}