
function renderMomo() {
	var momoPanel = document.getElementById("momo_panel");
	momoPanel.innerHTML = nowMomo.momoName + ":<br />";
	for (var i in nowMomo) {
		if (nowMomo[i].d2dFlag) {
			var child = document.createElement("tr");
			var sub1 = document.createElement("td");
			var sub2 = document.createElement("td");
			child.className = "item";
			var lable = document.createElement("label");
			lable.innerHTML = i + "&emsp;";
			var kit;
			if (nowMomo[i].d2dFlag == "int")
			{
				kit = document.createElement("input");
				kit.type = "number";
			}
			if (nowMomo[i].d2dFlag == "float")
			{
				kit = document.createElement("input");
				kit.type = "number";
				kit.step = "0.1";
			}
			if (nowMomo[i].d2dFlag == "range")
			{
				kit = document.createElement("input");
				kit.type = "range";
				kit.max = nowMomo[i].max;
				kit.min = nowMomo[i].min;
			}
			if (nowMomo[i].d2dFlag == "color")
			{
				kit = document.createElement("input");
				kit.type = "color";
			}
			kit.value = nowMomo[i].value;
			kit.targetRoot = nowMomo;
			kit.target = nowMomo[i];
			
			var drawLoop = function () {
				nowMomo.draw(document.getElementById("canvas"));
			}
			
			setInterval(drawLoop, 30);
			
			var worker = new Worker("./js/momo-work.js");
			worker.onmessage = function (event) {
				nowMomo.rawData = event.data;
			};
			
			kit.onchange = function () {
				this.target.set(this.value);
				var obj = new Object();
				for (var i in nowMomo) {
					if (nowMomo[i].d2dFlag) {
						obj[i] = nowMomo[i].code();
					}
				}
				worker.postMessage([nowMomo.canvasWidth.code(), nowMomo.canvasHeight.code(), nowMomo.rawData, 
					nowMomo.start, nowMomo.frag, obj]);
			};
			kit.onmousemove = kit.onchange;
			kit.onkeyup = kit.onchange;
			kit.ontouchmove = kit.onchange;
			
			kit.onchange();
			
			sub1.appendChild(lable);
			sub2.appendChild(kit);
			child.appendChild(sub1);
			child.appendChild(sub2);
			momoPanel.appendChild(child);
		}
	}
}