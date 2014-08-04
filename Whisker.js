function Whisker(mapping){
	var keymap = {"8":"backspace","9":"tab","13":"enter","16":"shift","17":"ctrl","18":"alt","19":"pause_break","20":"caps_lock","27":"escape","32":"space","33":"page_up","34":"page down","35":"end","36":"home","37":"LEFT","38":"UP","39":"RIGHT","40":"DOWN","45":"insert","46":"delete","48":"0","49":"1","50":"2","51":"3","52":"4","53":"5","54":"6","55":"7","56":"8","57":"9","65":"a","66":"b","67":"c","68":"d","69":"e","70":"f","71":"g","72":"h","73":"i","74":"j","75":"k","76":"l","77":"m","78":"n","79":"o","80":"p","81":"q","82":"r","83":"s","84":"t","85":"u","86":"v","87":"w","88":"x","89":"y","90":"z","91":"left_window key","92":"right_window key","93":"select_key","96":"numpad 0","97":"numpad 1","98":"numpad 2","99":"numpad 3","100":"numpad 4","101":"numpad 5","102":"numpad 6","103":"numpad 7","104":"numpad 8","105":"numpad 9","106":"multiply","107":"add","109":"subtract","110":"decimal point","111":"divide","112":"f1","113":"f2","114":"f3","115":"f4","116":"f5","117":"f6","118":"f7","119":"f8","120":"f9","121":"f10","122":"f11","123":"f12","144":"num_lock","145":"scroll_lock","186":";","187":"=","188":",","189":"-","190":".","191":"/","192":"`","219":"{","220":"\\","221":"}","222":"'"};
	var onkeydown = {}, onkeyup = {}, scopes = {}, paused = false;
	var handler = function handler(evt){
		if(paused) return;
		var key = keymap[evt.which];
		if(evt.type === 'keydown' && typeof onkeydown[key] === 'function'){
			evt.preventDefault();
			onkeydown[key]();
			return false;
		}
		else if(evt.type == 'keyup' && typeof onkeyup[key] === 'function'){
			evt.preventDefault();
			onkeyup[key]();
			return false;
		}
	};
	handler.map = function map(mapping){
		var key;
		for (key in mapping.onkeydown){
			onkeydown[key] = mapping.onkeydown[key];
		}
		for (key in mapping.onkeyup){
			onkeyup[key] = mapping.onkeyup[key];
		}
	};
	handler.unmap = function unmap(mapping){
		var key;
		for (key in mapping.onkeydown){
			delete onkeydown[key];
		}
		for (key in mapping.onkeyup){
			delete onkeyup[key];
		}
	};
	handler.pause = function(){ paused = true; };
	handler.resume = function(){ paused = false; };
	handler.save = function save(scope){
		var key;
		scopes[scope] = {};
		temp_onkeydown = {};
		temp_onkeyup = {};
		for (key in onkeydown){
			temp_onkeydown[key] = onkeydown[key];
		}
		for (key in onkeyup){
			temp_onkeyup[key] = onkeyup[key];
		}
		scopes[scope].onkeydown = temp_onkeydown;
		scopes[scope].onkeyup = temp_onkeyup;
	};
	handler.clear = function clear(scope){
		if(scope){
			if(!scopes[scope]){
				console.warn("Whisker.clear: " + scope + " is not a saved scope!");
				return;
			}
			delete scopes[scope];
		}
		else {
			onkeydown = {};
			onkeyup = {};
		}
	};
	handler.load = function load(scope){
		var key;
		if(scope && !scopes[scope]){
			console.warn("Whisker.load: " + scope + " is not a saved scope!");
			return;
		}
		clear();
		temp_onkeydown = scopes[scope].onkeydown;
		temp_onkeyup = scopes[scope].onkeyup;
		for (key in temp_onkeydown){
			onkeydown[key] = temp_onkeydown[key];
		}
		for (key in temp_onkeyup){
			onkeyup[key] = temp_onkeyup[key];
		}
	};
	return handler;
}

// var keymap = {
// "8": "backspace",//delete on mac
// "9": "tab",
// "13": "enter",
// "16": "shift",
// "17": "ctrl",
// "18": "alt",
// "19": "pause_break",
// "20": "caps_lock",
// "27": "escape",
// "32": "space",
// "33": "page_up",
// "34": "page down",
// "35": "end",
// "36": "home",
// // arrow keys
// "37": "LEFT",
// "38": "UP",
// "39": "RIGHT",
// "40": "DOWN",
// //end of arrow keys
// "45": "insert",
// "46": "delete",
// "48": "0",
// "49": "1",
// "50": "2",
// "51": "3",
// "52": "4",
// "53": "5",
// "54": "6",
// "55": "7",
// "56": "8",
// "57": "9",
// "65": "a",
// "66": "b",
// "67": "c",
// "68": "d",
// "69": "e",
// "70": "f",
// "71": "g",
// "72": "h",
// "73": "i",
// "74": "j",
// "75": "k",
// "76": "l",
// "77": "m",
// "78": "n",
// "79": "o",
// "80": "p",
// "81": "q",
// "82": "r",
// "83": "s",
// "84": "t",
// "85": "u",
// "86": "v",
// "87": "w",
// "88": "x",
// "89": "y",
// "90": "z",
// "91": "left_window key",//command left on mac
// "92": "right_window key",
// "93": "select_key",//command right on mac
// // numpad
// "96": "numpad 0",
// "97": "numpad 1",
// "98": "numpad 2",
// "99": "numpad 3",
// "100": "numpad 4",
// "101": "numpad 5",
// "102": "numpad 6",
// "103": "numpad 7",
// "104": "numpad 8",
// "105": "numpad 9",
// "106": "multiply",
// "107": "add",
// "109": "subtract",
// "110": "decimal point",
// "111": "divide",
// // end of numpad
// "112": "f1",
// "113": "f2",
// "114": "f3",
// "115": "f4",
// "116": "f5",
// "117": "f6",
// "118": "f7",
// "119": "f8",
// "120": "f9",
// "121": "f10",
// "122": "f11",
// "123": "f12",
// "144": "num_lock",
// "145": "scroll_lock",
// "186": ";",
// "187": "=",
// "188": ",",
// "189": "-",
// "190": ".",
// "191": "/",
// "192": "`",//grave accent
// "219": "{",
// "220": "\\",//backslash
// "221": "}",
// "222": "'"//single quote
// };