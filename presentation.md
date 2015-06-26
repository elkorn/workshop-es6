title: ECMAScript 6
author:
  name: Korneliusz Caputa
  twitter: elkornel
  url: http://github.com/elkorn
style: presentation.css
script: script.js
output: index.html
controls: true

--
# ECMAScript 6

<script src="https://cdn.firebase.com/js/client/2.2.2/firebase.js"></script>
<script src="firebase-pilot.js"></script>

--
# Freshly standardized JavaScript

Proposals started in 2008, the final version of the specification was established in June 2015.

--
# New features

There is a lot of stuff that was not available natively in ES5.

We'll go over some of it today.

--
# Compatibility

Until the browser vendors implement the ES6 standard, we have to use transpilers.

The go-to resource for this matter is https://kangax.github.io/compat-table/es6/.

Generally, you can use ES6 today in the browser as well as in node.js without problems if you use a transpiler.

--
# The Features

--
### Feature: modules

ES6 modules constitute a format that would fit both into client-side and server-side solutions.

That is, they can be used asynchronously (hat-tip in the direction of AMD) as well as synchronously (CommonJS / Node module approach).

It is noteworthy that cyclic dependencies are supported by ES6 modules, which is useful e.g. in DOM node relationships.

---
### Feature: modules

Example usage on the client-side (via SystemJS):
```
System.import('some_module')
.then(some_module => {
    // Use some_module
})
.catch(error => {
    ···
});
```

--
### Feature: modules

Example usage on the client-side (native):
```
<script type="module">
    // This module will be loaded asynchronously
    import $ from 'lib/jquery';
    var x = 123;

    // The current scope is not global
    console.log('$' in window); // false
    console.log('x' in window); // false

    // `this` still refers to the global object
    console.log(this === window); // true
</script>
```

--
### Feature: arrow functions

Arrow functions provide a clean notation for simple functions.

More importantly though, we get a lexical-scope `this` inside them (`this` is still being bound according to the 'old' rules within normally declared functions).

--
### Feature: classes

ES6 classes constitute syntax sugar on the prototype-based inheritance system known from previous versions of the standard.

We just get a 'normal' way to define all the stuff that was available before.

--
### Feature: symbols

Symbols are a new primitive type.

They are inherently unique, that is you cannot create two Symbol instances that are equal.

As you can imagine, they are pretty useful when used as keys for objects and data structures.

--
### Feature: symbols

There are a few pre-defined 'static' symbols:

* `Symbol.iterator` - used to make an object iterable
* `Symbol.unscopables` - hides properties from the `with` statements
* `Symbol.species` - helpful for cloning Typed Arrays, RegExps, Promises and ArrayBuffers.
* `Symbol.isConcatSpreadable` - indicates how `Array.prototype.concat` should behave when dealing with indexed elements of an object.

--
### Feature: collections

ES6 introduces a few new collection types to the table: `Map`, `Set`, `WeakMap` and `WeakSet`. They behave just as you would expect.

Additionally, `WeakMap` and `WeakSet` keep memory usage in check for you.

There are also a few new convenience methods on `Array`.

--
### Feature: iterables and iterators

Iterability has been introduced as a first-class concept in ES6.

We now have access to iterators which operate on pretty much anything we deem to make iterable by implementing a method, whose name is `Symbol.iterator`.

All collections are iterable by default.

--
### Feature: generators

Generators are functions that can be paused and resumed.

They can be viewed as *somewhat similar* to streams, but have a wider array of applications.

--
### Feature: generators

Generators can be used in three ways:

* Iterators (data producers)

```
function* simpleGenerator(howMany) {
    let x = 0;
    while (x < howMany) {
        yield ++x;
    }

    return 'DONE';
}

let gen = simpleGenerator(3);
gen.next();
gen.next();
gen.next();
gen.next();
```

--
### Feature: destructuring

Thanks to destructuring, we can now pattern match on objects and arrays to extract values from them.

Destructuring is useful mainly in context of variables, function parameters and function return values.

It also allows us to elegantly express default function parameter values instead of writing `var value = param || SOME_DEFAULT;` everywhere.


--
### Feature: spread operator

The spread operator (`...`) allows us to convert iterable objects to arrays.

It's pretty powerful. :)

--
### Feature: string goodies

Strings also got some love in ES6.

The main new feature are backtick (i.e. ``someStr``) which are templatable.

There are also a few convenience methods.

--
### Feature: math and numbers

A hat-tip in the direction of game developers, the `Math` method set has been extended to include a few useful functions (mainly trigonometric).

To help with IEEE number quirks, convenience methods have been introduced as static `Number` members.

Check this presentation out: https://www.youtube.com/watch?v=MqHDDtVYJRI.
It sheds a lot of light on the whys and hows of numbers in JS.

--
### Feature: generators

Generators can be used in three ways:

* Observers (data consumers)

```
function* dataConsumer() {
    console.log('Started');
    console.log(`1. ${yield}`); // (A)
    console.log(`2. ${yield}`);
    return 'result';
}

let genObj = dataConsumer();

genObj.next();
genObj.next('a');
```

--
### Feature: generators

Generators can be used in three ways:

* Coroutines (data producers + data consumers)

```
co(function* () {
    try {
        let [croftStr, bondStr] = yield Promise.all([  // (A)
            getFile('http://localhost:8000/croft.json'),
            getFile('http://localhost:8000/bond.json'),
        ]);
        let croftJson = JSON.parse(croftStr);
        let bondJson = JSON.parse(bondStr);

        console.log(croftJson);
        console.log(bondJson);
    } catch (e) {
        console.log('Failure to read: ' + e);
    }
});
```

--
### Feature: promises

Promises are native in ES6.

I'm leaving them out though, because the API is pretty well known from current libraries.

--
# Deployment strategies

--
### Deployment strategies

As I've said earlier, you can use ES6 today with transpilers.

You need to hook up a build step to your pipeline that will do that for you.

There is a ton of tools available for  that, summarized nicely here:
https://github.com/addyosmani/es6-tools

--
# Resources

--
### Resources

Pretty much all you need to know is here: https://leanpub.com/exploring-es6. (Some of  the examples are from there)

There is also an ongoing series of MDN articles: https://hacks.mozilla.org/category/es6-in-depth/.

--
# And now...

--
# Alternative to ES6: CoffeeScript

<center>(Kamil Durkiewicz)</center>
--
### Language features
 
* transcompiles to JavaScript
* syntax inspired by Ruby, Python and Haskell
* introduced 5+ years ago
* [coffeescript.org](http://coffeescript.org)

--
### ES6 features in CoffeeScript

|                         | CoffeeScript |
|------------------------:|:------------:|
|                  Arrows |       +      |
|                 Classes |       +      |
|        Template Strings |       +      |
|           Destructuring |       +      |
|    Map, Set and WeakMap |       -      |
|           Destructuring |       +      |
|                for.. of |       +      |
|       New math features |       -      |
|                 Modules |       -      |
|  Computed property keys |       -      |
| Default + Rest + Spread |       +      |

--
### What is better in CoffeeScript (1/3)

* More functional style

  Everything is an expression, including conditionals, loops, try/catch and function's body (return is not required)

* Lighter syntax. More friendly for VCSs.

* Linting tools are not so much needed.

    * compiled code passes JsLint
    * compiler takes care to make sure that all of your variables are properly declared within lexical scope — you never need to write  var yourself"

--
### What is better in CoffeeScript (2/3)

* Performance

  Array.prototype.forEach, Array.prototype.map etc. are much slower than for loop in JavaScript.
  
  You don't have to resign from functional programming style. CoffeeScript compiler converts the
  code to imperative code (which seems to be easier for JS engines to optimize) 

--
### What is better in CoffeeScript (3/3)

* Better block strings [coffeescript.org/#strings](http://coffeescript.org/#strings)

* Block regexes

* existential operator
  
  `zip = lottery.drawWinner?().address?.zipcode`

* additional operators
  
  `a ** b` (`Math.pow(a, b)`)
  
  `a // b` (`Math.floor(a / b)`)

* chained comparison
  
  `healthy = 200 > cholesterol > 60`
