# Whisker.js

Quick, light, and easy way to fasten the keyboard to your page.

# Usage

##### Connect Whisker page-wide with jQuery:
```javascript
$(document).ready(function(){
	var whisker = Whisker();
	$(document).on('keydown', whisker);
	$(document).on('keyup', whisker);
});
```
Every invocation of `Whisker();` will create a new independant whisker instace.

### Mapping the keyboard

##### Directly with an object literal
```Javascript
whisker.map({
	onkeydown : {
		'space' : function(){console.log("Space pressed!");},
		'enter' : function(){console.log("Enter pressed!");}
	},
	onkeyup : {
		'space' : function(){console.log("Space released!");},
		'enter' : function(){console.log("Enter released!");}
	},
});
```

##### Passing an object with appropriate `onkeydown` & `onkeyup` properties
```Javascript
function enter_pressed(){console.log("Enter pressed!");}
var user_mode = {
	prop : some_property,
	method : function(){// some method},
	onkeydown : {
		'enter' : enter_pressed
	}
}
whisker.map(user_mode);
```

# Behavior

TODO:
