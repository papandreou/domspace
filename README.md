# domspace

Adjust the text nodes in an HTML DOM so that the document is pretty-printed when serialized.

## Installation

```
npm install domspace
```

## Example

```
const domspace = require('domspace');
const myDiv = document.createElement('div');
myDiv.innerHTML = '<span><i>foo</i></span>';
domspace(myDiv);
console.log(myDiv.outerHTML);
```

Output:

```html
<div>
  <span>
    <i>foo</i>
  </span>
</div>
```
