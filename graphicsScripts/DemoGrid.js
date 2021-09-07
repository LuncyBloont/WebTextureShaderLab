class DemoGrid extends Momo {
	constructor() {
		super();
		this.momoName = "Grid";
		this.canvasWidth = new D2dScaleInt(800);
		this.canvasHeight = new D2dScaleInt(800);
		this.gridX = new D2dRange(1, 100, 20);
		this.gridY = new D2dRange(1, 100, 15);
		this.color1 = new D2dColor("#FFFF00");
		this.color2 = new D2dColor("#0078FF");
		this.frag = `
			var col = new D2dColor(momo.color1);
			if ((parseInt(x * momo.gridX) + parseInt(y * momo.gridY) % 2) % 2 == 0) {
				col = new D2dColor(momo.color2);
			}
			return col;
		`;
		this.start = `
			
		`;
	}
}