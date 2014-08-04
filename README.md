# Whisker.js

Quick, light, and easy way to fasten the keyboard to your page.
* Little overhead!
* Less than 100 lines!
* No more looking up key codes!

# Usage

##### Connect Whisker document-wide with jQuery:
```javascript
$(document).ready(function(){
	var whisker = Whisker();
	$(document).on('keydown', whisker);
	$(document).on('keyup', whisker);
});
```
Every invocation of `Whisker();` will create a new Whisker instance.
You can also connect Whisker like any other event lister, say, to elements such as forms.


### Mapping the keyboard

##### Directly with an object literal:
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

##### Passing an object with appropriate `onkeydown` & `onkeyup` properties:
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

##### Just pass an object with the appropriate keys:
```Javascript
// This will undo the mapping from the example above
whisker.unmap(user_mode);

// Or even
whisker.unmap({
	onkeydown : {
		'enter' : function(){},// value doesn't have to be a function in this case
	}
});
// No error for unmapping a key that wasn't mapped
```

### Pause & Resume

##### Pause Whisker to restore normal behavior without messing with listeners:
```Javascript
$('input').on('focusin', whisker.pause);
$('input').on('focusout', whisker.resume);
```

### Named Scopes

##### Save and load named scopes:
```Javascript
// Switch scopes
whisker.save('some_scope');
whisker.load('another_scope');
// Do some stuff with another scope

whisker.load('non-existent_scope');
// This will produce a warning in the console without crashing
```
##### Clear scopes:
```Javascript
// Clear the current scope
whisker.clear();

// Delete a named scope for memory cleanup
whisker.clear('another_scope')
```

# Behavior
Whisker uses `event.preventDefualt()` on mapped keys so that 'tab' and arrow keys will not change the focus or
move the view around if and only if Whisker is listening for that key.

