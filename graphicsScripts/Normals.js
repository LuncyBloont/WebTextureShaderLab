class Normals extends Momo {
	constructor() {
		super();
		this.momoName = "Normals Map";
		this.texture = new D2dImage("example/Example3.png");
		this.frag = `
			let col = tex2D(momo.texture, x, y);
			
			return col;
		`;
	}
}