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
# Alternative to ES6: CoffeeScript

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
