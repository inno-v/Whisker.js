function Whisker(){
	var keymap = {"8":"backspace","9":"tab","13":"enter","16":"shift","17":"ctrl","18":"alt","19":"pause_break","20":"caps_lock","27":"escape","32":"space","33":"page_up","34":"page_down","35":"end","36":"home","37":"left","38":"up","39":"right","40":"down","45":"insert","46":"delete","48":"0","49":"1","50":"2","51":"3","52":"4","53":"5","54":"6","55":"7","56":"8","57":"9","65":"a","66":"b","67":"c","68":"d","69":"e","70":"f","71":"g","72":"h","73":"i","74":"j","75":"k","76":"l","77":"m","78":"n","79":"o","80":"p","81":"q","82":"r","83":"s","84":"t","85":"u","86":"v","87":"w","88":"x","89":"y","90":"z","91":"left_window_key","92":"right_window_key","93":"select_key","96":"numpad_0","97":"numpad_1","98":"numpad_2","99":"numpad_3","100":"numpad_4","101":"numpad_5","102":"numpad_6","103":"numpad_7","104":"numpad_8","105":"numpad_9","106":"multiply","107":"add","109":"subtract","110":"decimal_point","111":"divide","112":"f1","113":"f2","114":"f3","115":"f4","116":"f5","117":"f6","118":"f7","119":"f8","120":"f9","121":"f10","122":"f11","123":"f12","144":"num_lock","145":"scroll_lock","186":";","187":"=","188":",","189":"-","190":".","191":"/","192":"`","219":"{","220":"\\","221":"}","222":"'"};
	var onkeydown = {}, onkeyup = {}, scopes = {}, paused = false;

	var handler = function handler(evt){
		if(paused) return;
		var key = keymap[evt.which];
		if(evt.type === 'keydown' && typeof onkeydown[key] === 'function'){
			evt.preventDefault();
			onkeydown[key](evt);
		}
		else if(evt.type === 'keyup' && typeof onkeyup[key] === 'function'){
			evt.preventDefault();
			onkeyup[key](evt);
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
		var temp_onkeydown = {};
		var temp_onkeyup = {};
		if(!scope){
			console.warn("Whisker.save: No name given to scope!");
			return;
		}
		scopes[scope] = {};
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
				console.warn("Whisker.clear: '" + scope + "' is not a saved scope!");
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
			console.warn("Whisker.load: '" + scope + "' is not a saved scope!");
			return;
		} else if(!scope){
			console.warn("Whisker.load: No name given to scope!");
			return;
		}
		handler.clear();
		var temp_onkeydown = scopes[scope].onkeydown;
		var temp_onkeyup = scopes[scope].onkeyup;
		for (key in temp_onkeydown){
			onkeydown[key] = temp_onkeydown[key];
		}
		for (key in temp_onkeyup){
			onkeyup[key] = temp_onkeyup[key];
		}
	};

	return handler;
}