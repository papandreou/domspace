# domspace

Adjust the text nodes in an HTML DOM so that the document is pretty-printed when serialized.

Note that the supplied node and its children will be altered.
If you'd rather create a copy that's ready for pretty printing,
you can deep-clone it first using the DOM API:

```js
const prettyNode = domspace(node.cloneNode(true));
```

## Installation

```
npm install domspace
```

## Example

```js
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

## Releases

[Changelog](https://github.com/unexpectedjs/unexpected-express/blob/master/CHANGELOG.md)

## License

3-clause BSD license -- see the `LICENSE` file for details.
