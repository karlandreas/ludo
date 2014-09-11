
var Paused = function(green, turquise) {
	
	this.svgObject = new LudoSVG("paused");
	this.svg       = undefined;
	this.group     = undefined;
	
	// colors
	this.blackColor = "#000000";
	this.greenColor = green || "#4FA900";
	this.turquiseColor = turquise || "#2AFFDE";
	
	// black paths
	this.bp1={o:"path", t:"M269,200c0-52.5,2-100-26-117.5s-60,2-68.5,9.5c0,0-0.5-41-32.5-51s-51,3.5-85,22v160l38,17h13v-64c0,0,50,3.247,62-45.25l5,14.25h3c0,0,20.5-24,31-23.5s13.5,10.5,13,21.5c0,0-32.5-2.5-55.5,33.5s1,85.5,19.25,93c15.512,6.375,27.25,10,40.25,3v4.5c0,0,23.84,4.933,37.034,6.277c4.628,0.472,9.947-1.498,10.466-2.277C273.5,281,269,252.5,269,200z M102,131V85c0,0,27.01-21,27,14.5C128.99,137.5,102,131,102,131z M214,230.5c0,0-13.664,1.638-9.5-21.75c3.838-21.562,18-19.75,18-19.75S224.5,229.5,214,230.5z"};
	this.bp2={o:"path", t:"M273,76h47v135c0,0-0.5,28.5,10.75,29c14.486,0.644,12.25-28.5,12.25-33s0-134,0-134h45v221h-39l-0.5-9.388c0,0-6,9.888-25.5,9.388s-50-16.5-50-95.5S273,76,273,76z"};
	this.bp3={o:"path", t:"M675,35h-7l-0.5,56c0,0-9-3.5-26.5-3.5S602,100,595,139c0,0-5.013-63.857-57-65c-45.5-1-64,62-61,107.5c0,0,2-2-15.5-17.5s-29-17-28.5-31s8-16,16.5-9s16,18.25,16,18.25l5.139-2.217L481.75,89.12c0,0-17.87-19.56-43.87-18.56s-46.939,34.47-47.439,66.47c-0.5,32,23.529,56.49,35.529,66.49s16.011,10.49,14.511,26.99s-6.99,17.49-15.99,11.99c-6.244-3.816-22.706-19.209-22.706-19.209L396.5,223l-8.5,52.5c0,0,16.529,20.758,42.5,19.52c21-1.001,50-16.511,54-67.52c0,0,8.5,58.52,54.5,54c30.5-3,53.5-26,53.5-26L586,212l-4-1.5c0,0-24.5,24.5-41.5,23S521,196,521,196l68.5-6.5c0,0,5.57,60.74,46,63.5c22,1.5,37.5-15.5,37.5-15.5l3.75,0.5L713,222.5V51L675,35z M522,150c0,0,2.5-30,16.5-29.5S552,150,552,150H522z M650,207.5c-14.5,6-16.5-28.5-16-39.5s8-40.5,17.48-40.5c11.529,0.01,15,18.19,15.02,33.11C666.53,178,669.74,199.33,650,207.5z"};
	this.blacksObject = {g:"blacks", a:new Array(this.bp1, this.bp2, this.bp3)};

	// green paths
	this.gp1 ={o:"path", t:"M263,282c0,0-2-26-1.5-47s1.5-109.5-10-132c-10.664-20.864-34-40.5-82-4.5l-4.5,2c0,0,6-59.5-40.5-61.5C104,36,58,64,58,64v158l36,16v-68c0,0,68,7,73-63l8.5,34c0,0,19.76-26.71,38-21.5c14,4,10,26.5,10,26.5s-36.718-5.075-59,36.5c-8.843,16.5-4,59.5,11.5,75c18.252,18.252,32.5,20,52,8.5v10L263,282z M128.5,101c-3.95,42.84-34.5,32-34.5,32V82C94,82,132,63,128.5,101z M223.5,214c-1,26.5-27,27.5-25.5-3s25.5-26,25.5-26S224.4,190.18,223.5,214z"};
	this.gp2 ={o:"path", t:"M275,77h39v136c0,0,1.25,32.5,16.75,32.5S346,212,346,212V74h40v218h-35l-1-10c0,0-4,10-28.5,10s-46-30-46.5-90.5S275,77,275,77z"};
	this.gp3 ={o:"path", t:"M470,137l10-46.5c0,0-15-18.51-39-18.5c-27,0.5-45.5,38-45,61s8.333,42.667,30.5,65c13.481,13.583,22.167,14.333,19.5,35c-1.873,14.517-10,17.5-18.5,15s-26-22-26-22l-8.5,49.5c0,0,17,18.037,38,17.519S483,268.5,483,219c0-44.667-27.667-55.333-40-65c-13.906-10.9-17.837-22.385-5-37.5C448.333,104.333,470,137,470,137z"};
	this.gp4 ={o:"path", t:"M675,35.5l1,61.5c0,0-26-14-48-4c-21.39,9.72-32.39,49.24-32.52,68.42c-0.2-11.62-3.671-83.5-56.98-84.42c-58-1-60,109-51.5,142s29.5,93,102,36.5l-6-41.5c0,0-24.87,23.84-46,20c-16.5-3-17.25-39.25-17.25-39.25l75.63-6.63c0,0,5.061,43.439,25.061,55.939S657.5,249.5,678,229.5v6.5l33-14.5V51L675,35.5z M522,151c0,0,1-32.5,18-33.5s19,33.5,19,33.5H522z M651,208.5c-18,1.5-18-26.5-18-38s5.5-43.07,18.5-43c20.06,0.1,21.8,22.47,22,39.5C673.65,179.99,669,207,651,208.5z"};
	this.greensObject = {g:"greens", a:new Array(this.gp1, this.gp2, this.gp3, this.gp4)};
	
	// turquise paths
	this.tp1 ={o:"path", t:"M117,45.5c-13-0.5-53,22-53,22V217l19,8.5l1-66c45,8,69-11.5,71.5-60.5S130,46,117,45.5z M83,139V77c0,0,49.5-31.51,51.5,21.5C136.67,155.96,83,139,83,139z"};
	this.tp2 ={o:"path", t:"M251.5,154c0.5-31.5-11.5-68.5-37-68s-41,18.5-41,18.5l4.5,19c58-42,52.5,30.5,52.5,30.5c-59.167,0-65.25,32.667-65,55c0.227,20.223,9.5,56.334,37.5,57.5c23.485,0.978,29.5-19.5,29.5-19.5l0.167,23.667l22.667,5C250.667,262,251,185.5,251.5,154z M232,217c-0.5,6-8,29-26.5,27s-24-37.5-15-52.5s41.5-14.25,41.5-14.25S232.5,211,232,217z"};
	this.tp3 ={o:"path", t:"M283,86v125c0,0-0.857,74.688,40.75,75c22.5,0.169,33.25-31,33.25-31v29l20-0.5V83h-22c0,0,0,119,0,132.5s-9.5,38.5-29,39.5s-22.5-31.5-22-42.5s-0.5-126.505-0.5-126.505L283,86z"};
	this.tp4 ={o:"path", t:"M466,121.333L471.667,92c0,0-11-11.5-31.5-11S404.5,108,404.5,135s13.5,46.5,37,64s12,57.5-3.5,61s-31-15-31-15l-5,27.5c0,0,8,14.002,29,13.501s41.353-16.801,46.667-56.334C483.759,184.353,446.5,172,431.5,154s-5-37.5,5.5-45.5S466,121.333,466,121.333z"};
	this.tp5 ={o:"path", t:"M534.5,243c-19.5-3.5-22-56.5-22-56.5l77-6.25C588.5,109,570.5,86.5,543,86c-27.5-0.51-50.5,35-50.5,96.5s20,89.5,46,90S583,252,583,252l-3-22.5C568.5,239.5,554,246.5,534.5,243z M541.25,108.5c31.7,0.02,29.25,51,29.25,51L512,162C512,162,515,108.48,541.25,108.5z"};
	this.tp6 ={o:"path", t:"M688,49.75l-1.5,69.75c0,0-12-25.5-42-22.5s-39,50.5-39,74s5,75,36,72s46.5-37,46.5-37v19l18-8V57.5L688,49.75z M687,164.5c-0.77,23.67-6.5,44.5-31.25,55s-30.75-34-29.75-52s8.4-50.5,30.45-50S687.91,136.5,687,164.5z"};
	this.turquiseObject = {g:"turquise", a:new Array(this.tp1, this.tp2, this.tp3, this.tp4, this.tp5, this.tp6)};
	
	// all objects in one array
	this.allObjectsArray = new Array(this.blacksObject, this.greensObject, this.turquiseObject);
	
	// the filter
	this.filter = "<filter  width='140%' height='130%' x='-15%' y='-15%' id='AI_Shadow_2' filterUnits='objectBoundingBox'>\
				   		<feGaussianBlur  in='SourceAlpha' stdDeviation='6' result='blur'></feGaussianBlur>\
				   		<feOffset  dx='-8' dy='8' in='blur' result='offsetBlurredAlpha'></feOffset>\
							<feMerge>\
								<feMergeNode  in='offsetBlurredAlpha'></feMergeNode>\
								<feMergeNode  in='SourceGraphic'></feMergeNode>\
							</feMerge>\
				   </filter>";
}

Paused.prototype = {
	
	init: function(width, height) {
		
		this.svg = this.svgObject.newSVG(width, height);
		
		// setup the filter
		this.svg.innerHTML = this.filter;
		
		for (var i = 0; i < this.allObjectsArray.length; i++) {
		
			this.group = undefined;
			
			// if groups are defined in the objects we append the paths to them
			if (this.allObjectsArray[i].g != undefined) {
				this.group = this.svgObject.newGroup();
				this.group.setAttribute("id", this.allObjectsArray[i].g);
				this.group.setAttribute("class", this.allObjectsArray[i].g + "_style");
				
				if (this.allObjectsArray[i].g == "blacks") {
					this.group.setAttribute("filter", "url(#AI_Shadow_2)");
				}
			}
			
			// loop through all of the object's
			for (var j = 0; j < this.allObjectsArray[i].a.length; j++) {
				
				if (this.allObjectsArray[i].a[j].o == "path") {
					this.path = this.svgObject.newPath();
					this.path.setAttribute("d", this.allObjectsArray[i].a[j].t);
					if (this.group != undefined) {
						this.group.appendChild(this.path);
					}
					else {
						this.svg.appendChild(this.path);
					}
				}
				else if (this.allObjectsArray[i].a[j].o == "poly") {
					this.poly = this.svgObject.newPolygon();
					this.poly.setAttribute("points", this.allObjectsArray[i].a[j].t);
					if (this.group != undefined) {
						this.group.appendChild(this.poly);
					}
					else {
						this.svg.appendChild(this.poly);
					}
				}
			}
			
			// we append each group to the svg tag
			if (this.group != undefined) {
				this.svg.appendChild(this.group);
			}
			
		}
		
		// add css styles to the svg object
		var styleTag = this.svgObject.addStylesToSVG(this.greenColor, this.turquiseColor);
		this.svg.appendChild(styleTag);
		
	} // end init
}


