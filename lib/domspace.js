const indentCache = [''];
function indent(level) {
  for (let i = indentCache.length; i < level + 1; i += 1) {
    indentCache.push(indentCache[i - 1] + ' ');
  }
  return indentCache[level];
}

module.exports = function domspace(node, indentLevel = 0) {
  if (
    node.childNodes.length === 1 &&
    node.firstChild.nodeType === node.TEXT_NODE
  ) {
    node.firstChild.nodeValue = node.firstChild.nodeValue.trim();
  } else {
    let nextIndentLevel = indentLevel;
    if (node.nodeType !== node.DOCUMENT_NODE && node.nodeName !== 'HTML') {
      nextIndentLevel += 2;
    }
    for (let i = 0; i < node.childNodes.length; i += 1) {
      const childNode = node.childNodes[i];
      if (childNode.nodeType === node.TEXT_NODE) {
        if (/^\s*$/.test(childNode.nodeValue)) {
          node.removeChild(childNode);
          i -= 1;
        } else {
          childNode.nodeValue = childNode.nodeValue
            .replace(/^\s*/, '\n' + indent(nextIndentLevel))
            .replace(/(\S)\s*/, '$1');
        }
      } else {
        if (node.nodeType !== node.DOCUMENT_NODE) {
          node.insertBefore(
            (node.ownerDocument || node).createTextNode('\n' + indent(nextIndentLevel)),
            childNode
          );
          i += 1;
        } else if (i > 0) {
          node.insertBefore(
            (node.ownerDocument || node).createTextNode('\n'),
            childNode
          );
          i += 1;
        }
        domspace(childNode, nextIndentLevel);
      }
    }
    node.appendChild(
      (node.ownerDocument || node).createTextNode('\n' + indent(indentLevel))
    );
  }
  return node;
};
