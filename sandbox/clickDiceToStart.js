
var ClickDiceToStart = function(green, turquise) {
	
	this.svgObject = new LudoSVG("ClickDiceToStart");
	this.svg       = undefined;
	this.group     = undefined;
	
	// colors
	this.blackColor = "#000000";
	this.greenColor = green || "#4FA900";
	this.turquiseColor = turquise || "#2AFFDE";
	
	// black paths
	this.bp1={o:"path", t:"M277.33,217l-31-80.83L274,75l-5-1.33l-27.83,3.66L230,103V23h-3.33L204,29v64c-39-20.01-55.02,34.75-55.02,34.75L149,104h-6.33L120,113V71h-7L92,83.67l0.17,15.83c0,0-20.25-4.08-42.25,23.58c-22,27.67-23.8,61.3-23.8,65.63c0,11.54,2.78,40.64,39.11,43.64C80.5,232.37,92,222.67,92,222.67V228l28-4v2l28.67-2.99l-0.09-31.53C154,210,164.33,222.33,180,222s24-13,24-13v9h22l3.33-1.83l-0.33-48.5L245,217H277.33z M64.29,204.96c-18.443-3.513-15.71-39.38-0.71-61.38s27.59-17.08,27.59-17.08L92,197l-3.19-4.35C88.81,192.65,75,207,64.29,204.96z M203,189l-0.33-11c0,0-4.67,1-10.34,6.33c-5.66,5.34-12.85,10.56-18-5.66c-5.24-16.5-3.55-47.54,6.67-57c9-8.34,19.67,5,19.67,5L203,110V189z"};
	this.bp2={o:"path", t:"M132.667,67.667c-4.167,0-13.615,6.965-13.667,21c-0.048,12.833,10.667,16,13.667,16c5,0,11.888-7.01,13-18.5C146.667,75.833,138.704,67.667,132.667,67.667z"};
	this.bp3={o:"path", t:"M379,69.83v9.73C368.22,7.57,317.63,9.8,291,24l0.67,188.34c0,0,12.66,5.66,27,5.66c12.53,0,51.08-3.3,60.99-73.02L379,214l29,2V72.25L379,69.83z M352.67,113.67C353,192.33,320,182,320,182V51C320,51,352.33,35,352.67,113.67z"};
	this.bp4={o:"path", t:"M392.5,63.25c6.252,0.184,14.493-6.248,14.5-21.75c0.007-15.25-9.5-20.5-14.5-20.75s-13.543,7-13.5,21.5C379.035,54.273,384,63,392.5,63.25z"};
	this.bp5={o:"path", t:"M408,168.96c5.61,40.98,28.04,66.73,63,40.29L470,197c0,0,11,45,58.12,17.5l-5.061-29.25l-2.279-0.75c0,0-29.113,25.167-33.511-21l37.99,7l3.74-1.75c0,0,6.13-74.32-33.25-81.75c-37.08-7-36,78.75-32.75,89.25c0,0-9.81,7.92-15,7c-8.67-1.53-15.31-8.26-14.5-36.25c0.88-30.45,6-35.84,12-35.5c8.83,0.5,16.75,13,16.75,13L464,123l5-33.25c0,0-11.25-13.5-27.75-13c-13.79,0.42-28.72,12.89-33.25,47.79 M486.75,134.25c0,0,2.628-18.83,7.75-17c8.167,2.917,8.645,20.27,8.615,20.27L486.75,134.25z"};
	this.bp6={o:"path", t:"M652.25,198c-0.029-39.826-31-57.75-42-57.75C601,140.25,595,150,595,150v-20.75L581,123l-1-28.5L556,93v16l-6-1.5l-4,2.5v26.75l9.09,3.75c0,0,0.91,30.25,0.87,54.25c-0.03,24,13.04,32.5,22.29,33.25s16-3.5,16-3.5L594,216C609.75,247.25,652.277,235.5,652.25,198z M586.646,201.423c-5.063,0.835-5.146-3.923-5.396-6.673s0.147-43.084,0.147-43.084L588,154.5C580.141,179,586.646,201.423,586.646,201.423z M622,208.75c-1.5,0-10.5-5.5-10.5-23.5c0-10.75,1-16.5,3.5-17.75c3.11-1.56,11.75,8.5,11.75,24.25S623.5,208.75,622,208.75z"};
	this.bp7={o:"path", t:"M471,355v-29.33L455,328v-39.33L430,304v25.73l-4.83,0.27c-13.67-4.67-21.17,6-21.17,6v-3h-25v131.87c-1.02-18.86-0.76-55.05-0.99-80.54c-0.33-36-12.34-52.66-29.68-53.33C331,330.33,320,345,320,345v-13h-17v-39.67L277,306v27h-11v34l10-1l0.07,42.5c-0.09-1.6-0.23-3.21-0.4-4.83c-4-37-41.67-50.67-40-75c1.66-24.34,15-18.67,30,0.33l5.66-36.33c0,0-9.66-14.34-27-14C227,279,209.67,295,208.67,329s19,55.33,24,60s16.047,12.305,14.33,32.67c-1.25,14.83-5.68,13.23-8.02,13.33c-7.98,0.33-23.65-22.33-23.65-22.33l-4,2l-5.33,34c0,0,16.33,23.66,36.67,24.33c17.01,0.56,31.46-22.46,33.38-51.66c0,0-0.05,17.05-0.05,20.33c0,27.38,15.17,41.08,26.5,40.66c9.33-0.35,16.5-6.66,16.5-6.66v-9.34c4.62,14.42,14.83,17.67,22.83,17.67s12.92-6.67,12.92-6.67l0.62,4.34L381.02,480c-0.21-0.4-0.399-0.96-0.579-1.68l27.56-4.99c0,0-5.67-93,6-104.66c5.33-5.34,13,1.33,13,1.33v-7.33l2.75-0.34c0,0-0.75,45.34-0.08,71.67c0.66,26.33,13.66,34,21.66,34.33c8,0.34,19.67-10,19.67-10l-1.67-36.66C466,423.67,456,432,456,432v-73.67L471,355z M343.33,449.67c-8,0.33-7.66-35.34,7.67-35.67v19C351,433,351.33,449.33,343.33,449.67z M312,444c0,0-8,10.33-8-7.33c0-17.67,0-68.67,0-68.67h16l3.5,17.33c0,0,14.5-19.33,20.5-19c6,0.34,6.33,9,6.33,15C350.33,381.33,309.67,382.33,312,444z"};
	this.blacksObject = {g:"blacks", a:new Array(this.bp1, this.bp2, this.bp3, this.bp4, this.bp5, this.bp6, this.bp7)};

	// green paths
	this.gp1 ={o:"path", t:"M92.67,84.33L93,100.75c0,0-49-1.5-64.48,78.39c-4.18,21.58,5.63,39.39,22.15,45.86c17.79,6.96,37.71-3.59,41.33-6.67V224l21-3.55V72L92.67,84.33z M93,212l-4.67-17.33c0,0-2.09,2.51-5.61,5.27c-0.16,0.13-0.32,0.25-0.48,0.38c-1,0.76-2.11,1.54-3.31,2.28c-0.12,0.08-0.25,0.15-0.38,0.23c-4.5,2.71-10.25,4.89-16.55,4.17c-14.67-1.67-18.09-15.9-15-35.33c3.5-22,18.67-50,41.33-48.5l4.67-20.5V212z"};
	this.gp2 ={o:"poly", t:"121,112.776 143,104.333 143,220 121,222"};
	this.gp3 ={o:"path", t:"M130.333,103.667C135,103.674,144,96.667,144,84.333S136.667,68,132,68s-12.125,9.833-12.125,20.5S126.333,103.661,130.333,103.667z"};
	this.gp4 ={o:"path", t:"M203.25,94.25c0,0-6.5-5.75-19.5-4.75s-39,22.584-38.5,73.667s30.5,68.583,56.75,45.083L200,180c0,0-12.5,12.25-19,12.25c-6.753,0-14.5-12.5-14.25-39.5s15.75-49,31.5-30.75L203.25,94.25z"};
	this.gp5 ={o:"poly", t:"205,30 205,215 226,215 226,163 227.75,162.25 245.75,213 270,213 241.5,135.25 268.75,74.5 242,78 226.75,113.75 226.5,23.25 "};
	this.gp6 ={o:"path", t:"M293,25l1,185c0,0,11.75,3.5,24.25,3.5s58.25-0.75,59.5-102.25S322,9,293,25z M316,184V47c0,0,39.67-14.78,39.75,65.75C355.84,199.75,316,184,316,184z"};
	this.gp7 ={o:"poly", t:"381,72 381,211 403,212.25 403,74 "};
	this.gp8 ={o:"path", t:"M392,60.75c6.244,0.271,14-6.5,13-20.5s-8.5-18.75-13-18.75s-11.25,7-11,21.25S386.25,60.5,392,60.75z"};
	this.gp9 ={o:"path", t:"M463,121l5-30.75c0,0-11.25-12.75-27-12.75s-32.75,19.75-33,68.25s17.485,70.691,36.5,70.75c12.5,0.039,23.5-9.75,23.5-9.75l-3.25-27.25c0,0-11.5,8.5-18.75,8s-17.5-13.75-16.25-41.75s4.5-39.75,15-40S463,121,463,121z"};
	this.gp10={o:"path", t:"M493.98,89.02c-11.75-1.25-28.15,14.4-28.761,62.01c-0.609,47.61,18.971,67.28,34.471,67.78s26.189-7.69,26.189-7.69L522,186h-1c0,0-5.25,8.88-20,6.38s-14.75-31.13-14.75-31.13l40,7.75l1.74-0.99C533,103.5,505.73,90.27,493.98,89.02z M505.5,138.7c-0.34-0.05-0.74-0.1-1.16-0.17c-0.04-0.01-0.07-0.01-0.1-0.01c-2.04-0.33-4.87-0.87-7.66-1.43c-0.45-0.08-0.9-0.17-1.35-0.26c-3.881-0.79-7.45-1.56-8.45-1.77c-0.181-0.04-0.28-0.06-0.28-0.06s1.8-21.91,10.4-19.58c8.6,2.33,10.35,22.58,10.35,23.33C507.25,138.88,506.59,138.85,505.5,138.7z"};
	this.gp11={o:"path", t:"M640.78,165.6c-7.71-13.63-19.65-25.61-31.53-23.48c-29.55,5.3-18,58.88-18,58.88s-4,3.5-9,1s-2.75-55-2.75-55l14.25,6.25L594,130l-14.25-6.75L579.25,96L558,94v18l-8-3v26l9,3.25c0,0,0.38,53,0.88,61s6.12,34.5,33.12,22.5V207c0,0,7,22.75,28.5,23.75s24.75-21.5,25.5-32.75C647.36,192.56,647.99,178.35,640.78,165.6z M620.25,211c-5-2-16.5-26.75-6.5-46.5c1.86-3.68,14,3.5,16.25,23.25C631.74,203,625.25,213,620.25,211z"};
	this.gp12={o:"path", t:"M269.75,293c0,0-9.25-13-27.75-12.5s-30.75,25-31,49.75s14.25,44.5,21.75,52.25s19,15,17.25,39.25s-15.5,24-35.5-7l-6,33.25c0,0,13.25,20.25,34.5,21s30.5-32,30-52.25S267.75,379,247,358s-15.179-50.217-2.25-48c8.75,1.5,19.5,15.75,19.5,15.75L269.75,293z"};
	this.gp13={o:"path", t:"M378.25,476.75c-2.75-6-1.25-42-1.75-87s-15-56.25-30-56.25S319,349,319,349v-14h-18v-40.5l-20.88,11.62l-0.87,27.63L269,334v29l10.75-0.5l0.37,79c2.13,28.25,11.63,37,21.63,37.5s15.75-5.25,15.75-5.25l0.25-15.75c5.25,15.5,14.5,22.75,23.25,22.75s15-7.75,15-7.75v5L378.25,476.75z M315.25,444.75c0,0-3.75,4.25-8.25,4s-5-8.75-5-8.75v-75h17v-14l5.75,28.5c0,0,11.75-18,20-17c11.83,1.43,7.75,20.5,7.75,20.5C311.5,389.5,315.25,444.75,315.25,444.75z M353.18,435.5c-1.18,6.25-4.18,16-10.18,16.25s-9.02-21.81-1.75-33.5C347,409,353.18,411,353.18,411S354.36,429.25,353.18,435.5z"};
	this.gp14={o:"path", t:"M384,475.75l21.5-3.5c0,0-0.875-72-0.125-79.75S411.5,354,426,365.25V360h7c0,0,0,70.25,0.25,76.25s2.666,31.118,21.5,28.5c8.859-1.231,15-9,15-9l-0.75-30.5c0,0-12,11.25-14.5,10.5S454,356,454,356l16-1.75l0.102-26.25l-16.352,1.5L453.5,291L433,304l-0.25,28l-8.5,0.5c0,0-9.5-5.5-19.75,6l-0.562-4.25l-19.938,1V475.75z"};
	this.greensObject = {g:"greens", a:new Array(this.gp1, this.gp2, this.gp3, this.gp4, this.gp5, this.gp6, this.gp7, this.gp8, this.gp9, this.gp10, this.gp11, this.gp12, this.gp13 ,this.gp14)};
	
	// turquise paths
	this.tp1 ={o:"path", t:"M82.333,117.333l4-13.667c0,0-47.849,15.721-55.333,80.667C27.12,218,61.667,236.667,86.333,216.5l-4-10.167c0,0-37.667,24.017-41-20.667C39.211,157.212,62.333,118,82.333,117.333z"};
	this.tp2 ={o:"poly", t:"96,218 106,216.5 106,79 96,85 "};
	this.tp3 ={o:"poly", t:"126,216.667 135,215 135,112 126,115.422 "};
	this.tp4 ={o:"path", t:"M194,112l2.667-16.333c0,0-4.333-4.334-17-1.667s-30,26.333-30.667,65s16,68,47.667,47.333L194,190.667c0,0-33.667,19.667-34-32.333S187.333,108,194,112z"};
	this.tp5 ={o:"poly", t:"209,32 209,210 220,209.333 220,163 227.333,150.333 249.667,208 263,208 236,134.333 259,79 247,81 221,137.125 220.333,28.667 "};
	this.tp6 ={o:"path", t:"M127.333,96c1.875,0.005,6.265-0.294,8.029-4.395c2.94-6.835,2.138-18.897-3.695-18.605C125.101,73.329,120.592,95.983,127.333,96z"};
	this.tp7 ={o:"path", t:"M298,27v179c0,0,73.67,24.33,75-89.5S312.33,21.67,298,27z M311,188V44c0,0,49.67-26.67,49.67,68S311,188,311,188z"};
	this.tp8 ={o:"poly", t:"387,77 387,207 399,207.667 399,78 "};
	this.tp9 ={o:"path", t:"M393,54c4.672,0.26,7.333-3,7-13.333s-2.667-15-7-14.667s-7.333,7.006-7.333,14.003S387,53.667,393,54z"};
	this.tp10={o:"path", t:"M460.667,107.667l2.666-16.333c0,0-9.666-11-23.666-9s-26.334,22.667-26.334,63s12.621,65.795,31.334,66c13.666,0.15,18.666-6.667,18.666-6.667l-2-16.667c0,0-34.667,22.908-36-41.213S457.001,101,460.667,107.667z"};
	this.tp11={o:"path", t:"M496.67,94c-18-4.62-26.34,36-26,56.67c0.33,20.66,4.66,81.36,51,57.51L518,195.67c0,0-35.33,16-36-40.34l41.67,7.06C523.67,162.39,530.97,102.8,496.67,94z M482,139.33c0,0,1-31.33,16.17-30.33c15.16,1,16.16,36.33,16.16,36.33L482,139.33z"};
	this.tp12={o:"path", t:"M557,117.25l9,3.75V98l9,1.333V125l15,6.333V145l-15-7c0,0-0.23,42.565,0.5,53.667c0.833,12.667,4.5,16.697,13.5,16.515V219c0,0-19.333,7.667-23-20v-65l-9-3V117.25z"};
	this.tp13={o:"path", t:"M645.67,191.33c0.235-15.663-14-44.24-32.34-44.62c-8.021-0.16-17,11.62-17,35.96c0,24.33,13.773,45.318,30.67,43.33C644,224,645.469,204.734,645.67,191.33z M623.33,216.5c-5.66-0.83-18.66-17.5-17-34.17c1.67-16.66,4.59-23.36,9-23.34c6.87,0.02,18.67,4.74,22.67,27.37C642,209,629,217.33,623.33,216.5z"};
	this.tp14={o:"path", t:"M260,314l3.333-19.333c0,0-11-11.666-24-9s-24.667,22.332-25,44.666s16,44.333,26,55s22.299,30.404,12,51c-11.669,23.334-35-4.333-35-4.333l-3.005,15.333c0,0,11.338,18,28.338,17.667s24.266-27.979,24.333-50.667c0.081-27-10.21-34.563-28.333-55.666c-24.333-28.334-6.257-52.668,2.038-53.334S256,309,260,314z"};
	this.tp15={o:"path", t:"M285,310.166L297,304v37l15,1v19l-16-1c0,0-0.667,65.333-0.333,76.333s5,23.333,14.667,19L312,472c0,0-24.333,15.667-27-27.333l-1.667-86L275,358v-17l9.667-0.333L285,310.166z"};
	this.tp16={o:"path", t:"M371.31,385.48c0-15.33-1.35-39.521-18.689-45.19c-17.33-5.67-27.7,11.29-27.7,11.29l2.91,14.92c0,0,12.17-12.17,19.32-8.5c15.89,8.15,10.85,31.39,10.85,31.39s-18.67,0-28.67,15.61c-20.52,32.03-2.66,71.67,10.34,72.67S360,458,360,458l1,14h10.33C370,469,371.31,400.81,371.31,385.48z M358,435c-1.67,10-3.67,25.33-16,23.67c-12.33-1.67-11.56-30.26-3.33-43c5.33-8.27,19.33-9,19.33-9S359.67,425,358,435z"};
	this.tp17={o:"path", t:"M389,341v131l12.667-1.667c0,0,0.167-69.333-0.167-78.333s5.5-35.333,19.5-33.333V336c0,0-14-2-21,29v-24H389z"};
	this.tp18={o:"path", t:"M430,339.311l9-1.644V308l11-7v36l15-1.026V351l-15,3c0,0-1.667,55.333-0.667,70s3,21.666,15.667,15.333V454c0,0-5.334,8.999-14.667,6.333S438.334,445,438.667,433s-0.532-77.333-0.532-77.333l-8.135,1V339.311z"};
	this.turquiseObject = {g:"turquise", a:new Array(this.tp1, this.tp2, this.tp3, this.tp4, this.tp5, this.tp6, this.tp7, this.tp8, this.tp9, this.tp10, this.tp11, this.tp12, this.tp13, this.tp14, this.tp15, this.tp16, this.tp17, this.tp18)};

	// all objects Array
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

ClickDiceToStart.prototype = {
	
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
		this.addStylesToSVG();
		
	},
	
	addStylesToSVG: function() {
		
		var styleTag = this.svgObject.newStyle();
		
		var blacksStyle   = ".blacks_style { fill:" + this.blackColor + ";  box-shadow: 10 10 5px rgba(0, 0, 0, 0.7); } \n";
		var greensStyle   = ".greens_style { fill:" + this.greenColor + "; } \n";
		var turquiseStyle = ".turquise_style { fill:" + this.turquiseColor + "; } \n";
			
		styleTag.innerHTML += blacksStyle;
		styleTag.innerHTML += greensStyle;
		styleTag.innerHTML += turquiseStyle;
		
		this.svg.appendChild(styleTag);
	}
}


