class Example extends Momo {
	constructor() {
		super();
		this.mainColor = new D2dColor("#FF8945");
		this.alpha = new D2dFloat(1);
		
		this.frag = `
			var col = new D2dColor(tool.color);
			col.alpha = momo.alpha;
			return col; 
		`; // 'tool' is a object created with 'this.start' as a construct function.
		
		this.start = `
			this.color = momo.mainColor;
		`; // 'momo' is a object containing all d2d attributes of 'Example'. It also can be used in 'frag' function.
	}
}

