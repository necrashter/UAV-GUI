const BottomRightPanel = document.getElementById("BottomRightPanel");
const BottomRightPanelContent = BottomRightPanel.querySelector(".content");

//https://gist.github.com/jonasgroendahl/efc5c880328860b9550ceab5753a6a55 cameraHUD starts here
// const cambox = document.getElementById("cambox");
// const camButton = document.getElementById("camButton");
// const CAM_ASPECT = 1;//width/height
// const CAM_MIN_HEIGHT = 400;//px
// let camActive = false;

// camButton.addEventListener("click", function (event) {
// 	if (camActive) {
// 		camActive = false;
// 		cambox.style.display = "none";
// 	} else {
// 		camActive = true;
// 		cambox.style.display = "block";
// 		cambox.style.top = "10px";
// 		cambox.style.left = "290px";


// 		cambox.style.minHeight = CAM_MIN_HEIGHT + "px"
// 		cambox.style.minWidth = CAM_MIN_HEIGHT * CAM_ASPECT + "px"
// 	}
// })

// let isResizing = false;

// cambox.addEventListener("mousedown", function (event) {
// 	let prevX = event.clientX,
// 		prevY = event.clientY;

// 	window.addEventListener("mousemove", mousemove);
// 	window.addEventListener("mouseup", mouseup)
// 	console.log("drag mousedown");
// 	function mousemove(event) {
// 		console.log("drag mousemove");
// 		if (!isResizing) {
// 			let diffX = event.clientX - prevX,
// 				diffY = event.clientY - prevY;

// 			const rect = cambox.getBoundingClientRect();
// 			cambox.style.left = rect.left + diffX + "px",
// 				cambox.style.top = rect.top + diffY + "px";
// 			prevX = event.clientX, prevY = event.clientY;
// 		}
// 	}
// 	function mouseup(event) {
// 		window.removeEventListener("mousemove", mousemove);
// 		window.removeEventListener("mouseup", mouseup);
// 	}
// })
// const save_aspect = true;
// const resizers = document.querySelectorAll(".resizer");
// let currentResizer;

// for (let resizer of resizers) {
// 	resizer.addEventListener("mousedown", mousedown);

// 	function mousedown(event) {
// 		currentResizer = event.target;
// 		isResizing = true;

// 		let prevX = event.clientX;
// 		let prevY = event.clientY;

// 		window.addEventListener("mousemove", mousemove);
// 		window.addEventListener("mouseup", mouseup);
// 		console.log("resize mousedown");

// 		function mousemove(event) {
// 			console.log("resize mousemove");

// 			const rect = cambox.getBoundingClientRect();

// 			let diffY = event.clientY - prevY;

// 			if (currentResizer.classList.contains("se")) {
// 				let diffX = (save_aspect) ? diffY * CAM_ASPECT : event.clientX - prevX;
// 				cambox.style.width = rect.width + diffX + "px";
// 				cambox.style.height = rect.height + diffY + "px";
// 			} else if (currentResizer.classList.contains("sw")) {
// 				let diffX = (save_aspect) ? -diffY * CAM_ASPECT : event.clientX - prevX;
// 				cambox.style.width = rect.width - diffX + "px";
// 				cambox.style.height = rect.height + diffY + "px";
// 				cambox.style.left = rect.left + diffX + "px";
// 			} else if (currentResizer.classList.contains("ne")) {
// 				let diffX = (save_aspect) ? -diffY * CAM_ASPECT : event.clientX - prevX;
// 				cambox.style.width = rect.width + diffX + "px";
// 				cambox.style.height = rect.height - diffY + "px";
// 				cambox.style.top = rect.top + diffY + "px";
// 			} else {
// 				let diffX = (save_aspect) ? diffY * CAM_ASPECT : event.clientX - prevX;
// 				cambox.style.width = rect.width - diffX + "px";
// 				cambox.style.height = rect.height - diffY + "px";
// 				cambox.style.top = rect.top + diffY + "px";
// 				cambox.style.left = rect.left + diffX + "px";
// 			}

// 			prevX = event.clientX;
// 			prevY = event.clientY;
// 		}

// 		function mouseup() {
// 			window.removeEventListener("mousemove", mousemove);
// 			window.removeEventListener("mouseup", mouseup);
// 			isResizing = false;
// 		}
// 	}

// }
const camButton = document.getElementById("camButton");
let cambox = new Floating("cambox", 400, 1.5);
let camActive = false;
camButton.addEventListener("click", function (event) {
	console.log("clicked");
	if (camActive) {
		console.log("yes");
		camActive = false;
		cambox.hide();
	} else {
		console.log("no");
		camActive = true;
		cambox.show("10px", "290px");
	}
})
cambox.movable();
cambox.resizable();
//cameraHUD is until here

BottomRightPanel.show = function (info = null) {
	BottomRightPanel.contentInfo = info;
	BottomRightPanel.classList.remove("hidden");
}

BottomRightPanel.hide = function () {
	BottomRightPanel.contentInfo = null;
	BottomRightPanel.classList.add("hidden");
	if (graph) graph.onPanelHide();
}

function createTextInput(target, name, value) {
	let div = target.append("div");
	div.append("label").attr("for", name).text(name + ":");
	let input = div.append("input").attr("type", "text").property("value", value);
	return input;
}

function createSelectBox(target, data, name, value) {
	let info = { value: value };
	let currentName = data.find(d => d.value == value).name;
	let div = target.append("div").style("display", 'flex');
	div.append("label").text(name + ":");
	var innerDiv;
	const wrapperDiv = div.append("div")
		.attr("class", "CustomSelect")
		.style("flex-grow", 1);
	var headDiv = wrapperDiv.append("div")
		.attr("class", "CustomSelectHead")
		.text(currentName)
		.on("click", function () {
			innerDiv.classList.toggle("open");
		}).node();
	const ul = wrapperDiv.append("div").attr("class", "CustomSelectList")
		.append("div");
	innerDiv = ul.node();

	ul.selectAll("div").data(data).join("div")
		.attr("class", "CustomSelectElement")
		.text(d => d.name)
		.on("click", d => {
			info.value = d.value;
			headDiv.innerText = d.name;
			innerDiv.classList.remove("open");
		});
	return info;
}

function createCustomSelectBox(div, data, currentIndex = 0, zIndex = 1) {
	let current = data[currentIndex];
	var innerDiv;
	const wrapperDiv = div.append("div")
		.attr("class", "CustomSelect")
		.style("flex-grow", 1)
		.style("z-index", zIndex);
	var headDiv = wrapperDiv.append("div")
		.attr("class", "CustomSelectHead")
		.html(current.name)
		.on("click", function () {
			innerDiv.classList.toggle("open");
		}).node();
	const ul = wrapperDiv.append("div").attr("class", "CustomSelectList")
		.append("div");
	innerDiv = ul.node();

	ul.selectAll("div").data(data).join("div")
		.attr("class", "CustomSelectElement")
		.html(d => d.name)
		.on("click", d => {
			d.func();
			headDiv.innerHTML = d.name;
			innerDiv.classList.remove("open");
		});
}

function createCheckbox(target, label, onChange) {
	let id = label.toLowerCase().replace(/\s+/g, "-");
	let div = target.append("div").classed("customCheckbox", true);
	let checkbox = div.append("input")
		.attr("id", id)
		.attr("type", "checkbox")
		.on("change", () => {
			onChange(checkbox.node().checked);
		});
	//checkbox.node().checked = Settings.animateAnts;
	div.append("label")
		.attr("for", id)
		.text(label);
	return div;
}

function addSpinnerDiv(div) {
	let out = div.append("div").classed("spinnerWrapper", true);
	out.append("div").classed("spinner", true);
	return out;
}



function AdvancedCopy(theText) {
	//create our hidden div element
	var hiddenCopy = document.createElement('div');
	//set the innerHTML of the div
	hiddenCopy.innerText = theText;
	//set the position to be absolute and off the screen
	hiddenCopy.style.position = 'absolute';
	hiddenCopy.style.left = '-9999px';

	//check and see if the user had a text selection range
	var currentRange;
	if (document.getSelection().rangeCount > 0) {
		//the user has a text selection range, store it
		currentRange = document.getSelection().getRangeAt(0);
		//remove the current selection
		window.getSelection().removeRange(currentRange);
	}
	else {
		//they didn't have anything selected
		currentRange = false;
	}

	//append the div to the body
	document.body.appendChild(hiddenCopy);
	//create a selection range
	var CopyRange = document.createRange();
	//set the copy range to be the hidden div
	CopyRange.selectNode(hiddenCopy);
	//add the copy range
	window.getSelection().addRange(CopyRange);

	//since not all browsers support this, use a try block
	try {
		//copy the text
		document.execCommand('copy');
	}
	catch (err) {
		window.alert("Your Browser Doesn't support this! Error : " + err);
	}
	//remove the selection range (Chrome throws a warning if we don't.)
	window.getSelection().removeRange(CopyRange);
	//remove the hidden div
	document.body.removeChild(hiddenCopy);

	//return the old selection range
	if (currentRange) {
		window.getSelection().addRange(currentRange);
	}
}
