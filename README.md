# Whisker.js
Quick, light, and easy way to fasten the keyboard to your page.
* No more looking up key codes!
	- Checkout [Whisker's convention](https://github.com/JrFolk/Whisker.js/blob/master/keymap.js)
* Little overhead!
	- Seriously small, but easy to read
* Unobtrusive!
	- No special handling of modifier keys or specific browsers.  The keyboard will behave as it always has in any browser.  Whisker leaves that up to you.
	- Just put a Whisker instance where you would put listener callbacks and map your key functions.

# API
```javascript
// Instantiate
var whisker = Whisker();

// Create a keymap-object with 'onkeydown' & 'onkeyup' properties
keymap = {
	onkeydown : {
		'key' : function(event){}
	},
	onkeyup : {
		'key' : function(event){}
	}
}

// Methods
whisker.map(keymap);
whisker.unmap(keymap);
whisker.pause();
whisker.resume();
whisker.save('scope_name');
whisker.load('scope_name');
whisker.clear();
whisker.clear('scope_name');
```

# Usage

##### Connect Whisker to the document:
```javascript
var whisker = Whisker();

$(document).on('keydown', whisker);
$(document).on('keyup', whisker);
```
Every invocation of `Whisker();` will create a new Whisker instance.

You can also connect Whisker like any other event lister, for instance, to elements such as forms.


### Mapping the keyboard

##### Directly with an object literal:
```Javascript
whisker.map({
	onkeydown : {
		'space' : function(){console.log("Space pressed!");},
	},
	onkeyup : {
		'enter' : function(){console.log("Enter released!");},
	},
});
```

##### Passing an object with appropriate `onkeydown` and/or `onkeyup` properties:
```Javascript
function comma_pressed(){console.log("Comma pressed!");};
var user_mode = {
	prop : some_property,
	method : function(){/* some method */},
	onkeydown : {
		'a' : function(console.log("'A' key pressed!")),
		',' : comma_pressed,
	},
}
whisker.map(user_mode);
// Old mappings will be overwritten without error
```
Unless overwritten, old mappings will persist on a per-key basis; You can continue to add keymaps on top of one another without conflict.

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

