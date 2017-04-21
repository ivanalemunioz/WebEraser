//Add StyleSheet
if (document.getElementById("_eraserStyleSheet") == null) {
	var styleSheet			= document.createElement("STYLE");
	styleSheet.type			= "text/css";
	styleSheet.innerHTML	= 
	".__eraserContollers{position:fixed;top:0;right:0;padding:7px 7px;z-index: 99999999999999;text-align:center;}"+
	".__endButton{cursor:pointer;padding:5px 8px;background:#3db03d;border-radius:3px;color:#FFF;display:inline-block} .__endButton:hover{background:#279e27}.__endButton:hover:active{background:#26bf26}"+
	".__eraserClass:hover{border:3px solid #ff2b2b !important;cursor: pointer !important}";

	styleSheet.setAttribute("id", "_eraserStyleSheet");

	document.getElementsByTagName("head")[0].appendChild(styleSheet);
}

var nodesList;

startDeletes();

function startDeletes() {
	nodesList = document.querySelectorAll("body, html, body *");
	each(nodesList, function(i, node) {
		//Save original node events
		node.originalOver 	= node.onmouseover;		
		node.originalOut 	= node.onmouseout;		
		node.originalClick 	= node.onclick;		

		var className = "__eraserClass";

		node.onmouseover = function(e) {
			e.stopPropagation();

			//Add eraser class to node
			var classIndex = node.className.indexOf(className);
			if (classIndex == -1) {
				node.className += " "+className;
			}
		};
		
		node.onmouseout = function(e) {
			e.stopPropagation();

			//Remove eraser class from node
			var classIndex = node.className.indexOf(className);
			if (classIndex != -1) {
				node.className = node.className.substring(0, classIndex)+node.className.substring(classIndex+className.length);
			}
		};

		node.onclick = function(e) {
			e.preventDefault();
			e.stopPropagation();

			//Remove node
			this.remove();
		}
	});


	var eraserControllers 		= document.createElement("DIV");
	eraserControllers.className = "__eraserContollers";

	var buttonEnd 				= document.createElement("SPAN");
	buttonEnd.className 		= "__endButton";			
	buttonEnd.innerHTML 		= "End";

	eraserControllers.setAttribute("id", "eraserControllers");

	buttonEnd.onmouseover = function(e) {
		e.stopPropagation();
	}

	buttonEnd.onclick = endDeletes;

	eraserControllers.appendChild(buttonEnd);
	document.getElementsByTagName("body")[0].appendChild(eraserControllers);
}

function endDeletes() {
	each(nodesList, function(i, node) {
		node.onmouseover 	= node.originalOver;
		node.onmouseout 	= node.originalOut;
		node.onclick 		= node.originalClick;

	});
	document.getElementById("eraserControllers") != null ? document.getElementById("eraserControllers").remove() : false;
}

function each(items, callback) {
	for (var i = 0; i < items.length; i++) {
		callback(i, items[i])
	}
}
