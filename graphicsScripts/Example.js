class Example extends Momo {
	// class name should be same as the file name.
	constructor() {
		super();
		this.mainColor = new D2dColor("#FF8945");
		this.alpha = new D2dFloat(1);
		
		this.frag = `
			var col = new D2dColor(tool.color);
			col.alpha = momo.alpha;
			return col; 
		`; // 'tool' is a object created with 'this.start' as a construct function.
		// REFER: let frag = new Function("x", "y", "momo", "tool", momo);
		
		this.start = `
			this.color = momo.mainColor;
		`; // 'momo' is a object containing all d2d attributes of 'Example'. It also can be used in 'frag' function.
		// REFER: let start = new Function("momo", momos);
	}
}

