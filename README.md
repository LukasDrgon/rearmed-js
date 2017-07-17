# Rearmed-JS [![Build Status](https://api.travis-ci.org/westonganger/rearmed-js.svg?branch=master)](https://travis-ci.org/westonganger/rearmed-js)

<a href='https://ko-fi.com/A5071NK' target='_blank'><img height='32' style='border:0px;height:32px;' src='https://az743702.vo.msecnd.net/cdn/kofi1.png?v=a' border='0' alt='Buy Me a Coffee' /></a> 

## Note: Current Readme is for master/v2.0.0, Latest NPM release is v1.0.0

This library is a collection of helpful methods and monkey patches for Arrays, Objects, Numbers, and Strings. Start writing your Javascript like you write your Ruby code! 

Works in the browser and in NodeJS.

4.5kb minified and gzipped.


# Install

#### Yarn, NPM, Bower
```
yarn add rearmed-js

npm install rearmed-js

bower install rearmed-js
```

#### Rails / Bundler

```ruby
# Gemfile
source 'https://rails-assets.org' do
  gem 'rails-assets-rearmed-js'
end
```

# Usage

Note: Only import/require the patches once at the beginning of your page or app start otherwise you will get warnings about redefining methods.

### Plain HTML

```html
<script src="rearmed-js/dist/rearmed.min.js" type="text/javascript" />

<!-- OR only the patches you want -->

<!-- All patches for a certain object type only -->
<script src="rearmed-js/dist/array.min.js" type="text/javascript" />
<script src="rearmed-js/dist/number.min.js" type="text/javascript" />
<script src="rearmed-js/dist/object.min.js" type="text/javascript" />
<script src="rearmed-js/dist/string.min.js" type="text/javascript" />
<script src="rearmed-js/dist/generic.min.js" type="text/javascript" />

<!-- OR only the methods you want -->
<script src="rearmed-js/dist/array/reject.min.js" type="text/javascript" />
<script src="rearmed-js/dist/array/select.min.js" type="text/javascript" />
```

### ES7+
```javascript
import 'rearmed'; // import everything

// OR 

// import patches for certain object types only
import 'rearmed/array';
import 'rearmed/number';
import 'rearmed/object';
import 'rearmed/string';
import 'rearmed/generic';

// OR

// import only the methods you want
import 'rearmed/array/reject';
import 'rearmed/array/select';
```

### ES6
```javascript
require('rearmed') // require everything

// OR

// require patches for certain object types only
require('rearmed/array');
require('rearmed/number');
require('rearmed/object');
require('rearmed/string');
require('rearmed/generic');

// OR

// require only the methods you want
require('rearmed/array/reject');
require('rearmed/array/select');
```

### Rails
```ruby
/*
 *= require rearmed-js
 *
 * OR for certain object types only
 *= require rearmed-js/array
 *= require rearmed-js/number
 *= require rearmed-js/object
 *= require rearmed-js/string
 *= require rearmed-js/generic
 *
 * OR only the methods you want
 *= require rearmed-js/array/reject
 *= require rearmed-js/array/select
*/
```

# Methods Implemented

## Generic

These methods are available on all types

```javascript
var cb = function(){ };
var str = "";
var array = [];

str.equals(array); // returns bool

str.isBlank(); // returns bool
// collections are blank if length == 0

str.isPresent(); // return bool
// collections are present if length > 0

array.presence(); // returns self or false
// same thing as: array.isPresent() ? array : false;

cb.simpleType(); // return str
// possible return values are 'Object','Array','String','Boolean','Number','Function','Other'
```

## Array

```javascript
var array = [];

var cb = function(val, i){ };

array.any(cb=null) // returns bool

array.all(cb=null) // returns bool

array.compact(badValues=[null, undefined]) // returns array, accepts array or splat arguments
  
array.dig(*args) // returns value, accepts splat arguments or array

array.each(function(val, i){ })

array.empty() // return bool

array.equals(array) // returns bool

array.excludes(val, fromIndex=0) //  returns bool

array.find(cb_or_val) // returns value, undefined if not found

array.findIndex(cb_or_val) // returns integer, undefined if not found

array.first() // returns value

array.flatten() // returns array

array.includes(val, fromIndex=0) // returns bool

array.inGroupsOf(int, fillWith=false) // returns nested array

array.groupBy(cb) // returns nested array

array.last // returns value

array.max(cb=null) // returns value

array.maxBy(cb=null) // returns value

array.min(cb=null) // returns value

array.minBy(cb=null) // returns value

Array.range(start, end, step) // returns array 
// Note: use on Array class, not an instance of array.
// Typescript Note: bummer dude... you cant use Array.range() because its not possible to define static methods on existing interfaces

array.reject(cb) // reutrns array

array.select(cb) // returns array

array.tap(cb); // returns array
// this is an each method that returns the original array after its done

array.smartIncludes(val, fromIndex=0) // returns bool
// smart meaning that it uses `equals` method to compare if item is Array or Object

array.smartExcludes(val, fromIndex=0) // returns bool
// smart meaning that it uses `equals` method to compare if item is Array or Object

array.sum(cb=null) // returns number

array.uniq(cb=null) // returns array
```

## Object (Hash)

Note: if requiring Object patches individually you must first require `object/rearmed`. Example:

>```
>require('rearmed/object/rearmed');
>require('rearmed-js/object/select');
>```

```javascript
var obj = {};

// Monkey-patching Object is very dangerous, so we only patch it with one method
obj = obj.rearmed(); 

var cb = function(key, val){ };

obj.all(cb=null) // returns bool

obj.any(cb=null) // returns bool

obj.compact(badValues=[null, undefined]) // returns object, accepts array or splat arguments

obj.dig(*args) // returns object, accepts splat arguments or array

obj.each(cb);

obj.empty() // returns bool

obj.equals(obj) // returns bool

obj.except(*keys) // returns object, accepts keys as splat arguments or an array

obj.hasKey() // returns bool

obj.hasValue() // returns bool

obj.join(cb, delimiter=', ') // returns string

obj.keys() // returns array

obj.merge(obj) // returns object

obj.only(*keys) // returns object, accepts keys as splat arguments or an array

obj.reject(cb) // returns object

obj.select(cb) // returns object, known to cause error with React select elements

obj.values() // returns array

Object.rearmed.add({
  myNewMethod: function(){
    // add new method to rearmed() objects
  }
);

Object.rearmed.remove(
  myNewMethod: function(){
    // remove method from rearmed() objects
  }
);
```

## Number

```javascript
var num = 8.5;

num.ceil() // returns number

num.floor() // returns number

num.isDecimal() // returns bool

num.isEven() // returns bool

num.isInteger() // returns bool

num.isOdd() // returns bool

num.round() // returns number
```

## String

```javascript
var str = 'Hello World':

str.capitalize() // returns string

str.caseCmp(str) // returns bool

str.chars() // returns array

str.downcase() // returns string

str.empty() // returns bool

str.endsWith(val) // returns bool

str.excludes(val, fromIndex=0) // returns bool

str.gsub(str, toStr) // returns string

str.includes(val, fromIndex=0) // returns bool

str.lstrip() // returns string

str.reverse() // returns string

str.rstrip() // returns string

str.startsWith(val) // returns bool

str.strip() // returns string

str.sub(str, toStr) // returns string
// Warning: doesn't warn when it overwrites the original sub method as it has been removed from the JS standard.

str.titleize(onlyFirstLetters=true) // returns string

str.toBool() // returns bool

str.upcase() // returns string
```

# Browser / NodeJS Support
- Browser support is IE 9+ and everything else. Use the files in the `dist` folder if you need pre-minified files.
- Array `find` doesnt work properly in old NodeJS 0.x and iojs.
- String `empty` doesnt work properly in old NodeJS 0.x.

# Contributing
- I recommend discussing your intentions via an issue before making a PR as they are very concious design choices that must go into this library.
- Only edit js files from src/ and test/ folders.
- Use the gulp task: `gulp` to run the build after making your changes.
- Testing these methods are simple & easy. PR's should include tests.

# Credits
Created by Weston Ganger - @westonganger

<a href='https://ko-fi.com/A5071NK' target='_blank'><img height='32' style='border:0px;height:32px;' src='https://az743702.vo.msecnd.net/cdn/kofi1.png?v=a' border='0' alt='Buy Me a Coffee' /></a> 
