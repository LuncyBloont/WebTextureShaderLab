let drawLoop = function () {
	nowMomo.draw(document.getElementById("canvas"));
}

setInterval(drawLoop, 30);

let worker = new Worker("./js/momo-work.js");
worker.onmessage = function (event) {
	nowMomo.rawData = event.data;
};


function renderMomo() {
	let momoPanel = document.getElementById("momo_panel");
	momoPanel.innerHTML = nowMomo.momoName + ":<br />";
	for (let i in nowMomo) {
		if (nowMomo[i].d2dFlag) {
			let child = document.createElement("tr");
			let sub1 = document.createElement("td");
			let sub2 = document.createElement("td");
			child.className = "item";
			let lable = document.createElement("label");
			lable.innerHTML = i + "&emsp;";
			let kit;
			if (nowMomo[i].d2dFlag === "int")
			{
				kit = document.createElement("input");
				kit.type = "number";
			}
			if (nowMomo[i].d2dFlag === "float")
			{
				kit = document.createElement("input");
				kit.type = "number";
				kit.step = "0.1";
			}
			if (nowMomo[i].d2dFlag === "range")
			{
				kit = document.createElement("input");
				kit.type = "range";
				kit.max = nowMomo[i].max * nowMomo[i].scale;
				kit.min = nowMomo[i].min * nowMomo[i].scale;
			}
			if (nowMomo[i].d2dFlag === "color")
			{
				kit = document.createElement("input");
				kit.type = "color";
			}
			if (nowMomo[i].d2dFlag === "toggle")
			{
				kit = document.createElement("input");
				kit.type = "checkbox";
			}
			if (nowMomo[i].d2dFlag === "image")
			{
				kit = document.createElement("input");
				kit.type = "file";
			}
			
			if (kit.type && kit.type === "checkbox") {
				kit.checked = nowMomo[i].value;
			} else if (kit.type && kit.type === "color") {
				kit.value = nowMomo[i].str();
			} else if (kit.type && kit.type !== "file") {
				kit.value = nowMomo[i].value;
			}
			
			kit.targetRoot = nowMomo;
			kit.target = nowMomo[i];
			
			
			kit.onchange = function () {
				if (this.type && this.type === "checkbox") {
					this.target.set(this.checked);
				} else if (this.type && this.type === "file") {
					this.target.set(this.files[0]);
				} else {
					this.target.set(this.value);
				}
				
				let post = function () {
					let obj = new Object();
					for (let i in nowMomo) {
						if (nowMomo[i].d2dFlag) {
							obj[i] = nowMomo[i].code();
						}
					}
					worker.postMessage([nowMomo.canvasWidth.code(), nowMomo.canvasHeight.code(), nowMomo.rawData, 
						nowMomo.start, nowMomo.frag, obj, texLib]);
				};
				setTimeout(post, 500);
			};
			/* kit.onmousemove = kit.onchange;
			kit.onkeyup = kit.onchange;
			kit.ontouchmove = kit.onchange; */
			
			kit.onchange();
			
			sub1.appendChild(lable);
			sub2.appendChild(kit);
			child.appendChild(sub1);
			child.appendChild(sub2);
			momoPanel.appendChild(child);
		}
	}
}