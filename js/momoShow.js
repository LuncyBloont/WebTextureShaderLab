let drawLoop = function () {
	nowMomo.draw(document.getElementById("canvas"));
	// console.log(nowMomo.rawData);
}

setInterval(drawLoop, 100);
let workerSize = 3;
let spiltSize = 6;
let worker = [];
for (let i = 0; i < workerSize; i++) {
	for (let j = 0; j < workerSize; j++) {
		if (!worker[i]) worker[i] = [];
		worker[i][j] = new Worker("./js/momo-work.js");
		worker[i][j].onmessage = function (event) {
			// console.log(event.data[0] + ", " + event.data[1] + ", " + event.data[2] + ", " + event.data[3] + " Worker complete.");
			for (let x = event.data[0]; x < event.data[1]; x++) {
				for (let y = event.data[2]; y < event.data[3]; y++) {
					let index = (y * nowMomo.canvasWidth.code() + x) * 4;
					nowMomo.rawData[index] = event.data[4][index];
					nowMomo.rawData[index + 1] = event.data[4][index + 1];
					nowMomo.rawData[index + 2] = event.data[4][index + 2];
					nowMomo.rawData[index + 3] = event.data[4][index + 3];
				}
			}
		};
	}
}



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
			if (nowMomo[i].d2dFlag === "int") {
				kit = document.createElement("input");
				kit.type = "number";
			}
			if (nowMomo[i].d2dFlag === "float") {
				kit = document.createElement("input");
				kit.type = "number";
				kit.step = "0.1";
			}
			if (nowMomo[i].d2dFlag === "range") {
				kit = document.createElement("input");
				kit.type = "range";
				kit.max = nowMomo[i].max * nowMomo[i].scale;
				kit.min = nowMomo[i].min * nowMomo[i].scale;
			}
			if (nowMomo[i].d2dFlag === "color") {
				kit = document.createElement("input");
				kit.type = "color";
			}
			if (nowMomo[i].d2dFlag === "toggle") {
				kit = document.createElement("input");
				kit.type = "checkbox";
			}
			if (nowMomo[i].d2dFlag === "image") {
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

				for (let x = 0; x < nowMomo.canvasWidth.code(); x++) {
					for (let y = 0; y < nowMomo.canvasHeight.code(); y++) {
						let index = (y * nowMomo.canvasWidth.code() + x) * 4;
						nowMomo.rawData[index] = 0;
						nowMomo.rawData[index + 1] = 255;
						nowMomo.rawData[index + 2] = 255;
						nowMomo.rawData[index + 3] = 255;
					}
				}

				let post = function () {
					for (let i = 0; i < workerSize; i++) {
						for (let j = 0; j < workerSize; j++) {
							let obj = new Object();
							for (let x in nowMomo) {
								if (nowMomo[x].d2dFlag) {
									obj[x] = nowMomo[x].code();
								}
							}
							worker[i][j].postMessage([nowMomo.canvasWidth.code(), nowMomo.canvasHeight.code(), 0,
							nowMomo.start, nowMomo.frag, obj, texLib,
							parseInt(nowMomo.canvasWidth.code() * i / workerSize),
							parseInt(nowMomo.canvasHeight.code() * j / workerSize),
							parseInt(nowMomo.canvasWidth.code() * (i + 1) / workerSize),
							parseInt(nowMomo.canvasHeight.code() * (j + 1) / workerSize),
								spiltSize]);
						}
					}
				};

				setTimeout(post, 550);
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