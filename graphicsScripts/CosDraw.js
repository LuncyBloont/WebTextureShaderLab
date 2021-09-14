class CosDraw extends Momo {
	constructor() {
		super();
		this.canvasWidth = new D2dScaleInt(1000);
		this.canvasHeight = new D2dScaleInt(1000);
		this.momoName = "cos func";
		
		this.scaleX = new D2dRange(0, 1, 0.1);
		this.scaleY = new D2dRange(0, 1, 0.2);
		this.positionX = new D2dRange(0, 1, 0.5);
		this.positionY = new D2dRange(0, 1, 0.5);
		this.width = new D2dRange(0, 0.2, 0.01);
		
		this.frag = `
			if (Math.abs(Math.cos(x / momo.scaleX - momo.positionX) * momo.scaleY - y + momo.positionY) <= momo.width) {
				return new D2dColor("#FF00FF");
			}
			return new D2dColor("#FFFFFF");
		`;
		
	}
}