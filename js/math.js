function dot(x1, y1, x2, y2) {
	return x1 * x2 + y1 * y2;
}

function colorLerp(c1, c2, lerp) {
	lerp = Math.min(1, Math.max(lerp, 0));
	let col = new D2dColor("#FFFFFF");
	let blerp = 1 - lerp;
	col.color(
		c1.R() * lerp + c2.R() * blerp,
		c1.G() * lerp + c2.G() * blerp,
		c1.B() * lerp + c2.B() * blerp,
		c1.A() * lerp + c2.A() * blerp
	);
	return col;
}