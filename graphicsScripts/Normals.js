class Normals extends Momo {
	constructor() {
		super();
		this.momoName = "Normals Map";
		this.texture = new D2dImage("example/Example3.png");
		this.force = new D2dRange(0.001, 6, 1);
		this.sample = new D2dInt(2);
		this.frag = `
			let d0 = light(tex2D(momo.texture, x, y));

			let normal = [0, 0, 0];
			let base = 0;

			for (let i = 1; i <= momo.sample; i++) {
				for (let j = 0; j < Math.PI * 2; j += 1 / i) {
					let chk1 = [Math.cos(j) * i, Math.sin(j) * i];
					let chk2 = [Math.cos(j + Math.PI / 2) * i, Math.sin(j + Math.PI / 2) * i];

					let dx = light(tex2D(momo.texture, x + chk1[0] / momo.canvasWidth, y + chk1[1] / momo.canvasHeight));
					let dy = light(tex2D(momo.texture, x + chk2[0] / momo.canvasWidth, y + chk2[1] / momo.canvasHeight));

					let vx = [chk1[0] * momo.force, chk1[1] * momo.force, dx - d0];
					let vy = [chk2[0] * momo.force, chk2[1] * momo.force, dy - d0];
					normal = add(cross3(normalize3(vx), normalize3(vy)), normal);
					base += 1;
				}
			}
			normal = divnum(normal, base);
			normal = [normal[0] / 2 + 0.5, -normal[1] / 2 + 0.5, normal[2] / 2 + 0.5];

			let col = new D2dColor("#FFFFFF");
			col.color(normal[0] * 255, normal[1] * 255, normal[2] * 255, 1);
			return col;
		`;
	}
}
