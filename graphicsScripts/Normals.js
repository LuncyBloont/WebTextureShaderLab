class Normals extends Momo {
	constructor() {
		super();
		this.momoName = "Normals Map";
		this.texture = new D2dImage("example/Example3.png");
		this.force = new D2dRange(0.001, 6, 1);
		this.frag = `
			let d0 = light(tex2D(momo.texture, x, y));
			let dx = light(tex2D(momo.texture, x + 1 / momo.canvasWidth, y));
			let dy = light(tex2D(momo.texture, x, y + 1 / momo.canvasHeight));
			
			let vx = [momo.force, 0, dx - d0];
			let vy = [0, momo.force, dy - d0];
			let normal = cross3(normalize3(vx), normalize3(vy));
			normal = [normal[0] / 2 + 0.5, normal[1] / 2 + 0.5, normal[2] / 2 + 0.5];
			
			let col = new D2dColor("#FFFFFF");
			col.color(normal[0] * 255, normal[1] * 255, normal[2] * 255, 1);
			return col;
		`;
	}
}