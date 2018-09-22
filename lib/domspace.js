module.exports = function domspace(node, indentLevel = 0) {
  if (
    node.childNodes.length === 1 &&
    node.firstChild.nodeType === node.TEXT_NODE
  ) {
    node.firstChild.nodeValue = node.firstChild.nodeValue.trim();
  } else {
    for (let i = 0; i < node.childNodes.length; i += 1) {
      const childNode = node.childNodes[i];
      if (childNode.nodeType === node.TEXT_NODE) {
        if (/^\s*$/.test(childNode.nodeValue)) {
          node.removeChild(childNode);
          i -= 1;
        } else {
          childNode.nodeValue = childNode.nodeValue
            .replace(/^\s*/, `\n${' '.repeat(indentLevel + 2)}`)
            .replace(/(\S)\s*/, '$1');
        }
      } else {
        node.insertBefore(
          node.ownerDocument.createTextNode(`\n${' '.repeat(indentLevel + 2)}`),
          childNode
        );
        domspace(childNode, indentLevel + 2);
        i += 1;
      }
    }
    node.appendChild(
      node.ownerDocument.createTextNode(`\n${' '.repeat(indentLevel)}`)
    );
  }
  return node;
};
