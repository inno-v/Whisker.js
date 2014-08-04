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
Every invocation of `Whisker();` will create a new Whisker instace.

### Mapping the keyboard

##### Directly with an object literal
```Javascript
whisker.map({
	onkeydown : {
		'space' : function(){console.log("Space pressed!");},
	},
	onkeyup : {
		'space' : function(){console.log("Space released!");},
	},
});
```

##### Passing an object with appropriate `onkeydown` & `onkeyup` properties
```Javascript
function enter_pressed(){console.log("Enter pressed!");};
var user_mode = {
	prop : some_property,
	method : function(){/* some method */},
	onkeydown : {
		'enter' : enter_pressed,
		'space' : function(){console.log("Space pressed!")},
	},
}
whisker.map(user_mode);
// Old mappings will be overwritten without error
```

### Unmapping

Just pass an object with the appropriate keys:
```Javascript
// This will undo the mapping from the example above
whisker.unmap(user_mode);

// Or
whisker.unmap({
	onkeydown : {
		'enter' : '',
	}
});
// No error for unmapping a key that wasn't mapped
```

# Behavior

TODO:
