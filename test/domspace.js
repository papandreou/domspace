const domspace = require('../lib/domspace');
var JSDOM = require('jsdom').JSDOM;
const expect = require('unexpected')
  .clone()
  .addAssertion(
    '<string> to pretty print HTML [fragment] <string>',
    (expect, subject, value) => {
      expect.errorMode = 'nested';
      if (expect.flags.fragment) {
        subject = `<!DOCTYPE html><html><head></head><body>${subject}</body></html>`;
      }
      const jsdom = new JSDOM(subject);
      let node = jsdom.window.document;
      if (expect.flags.fragment) {
        node = node.body.firstChild;
      }
      domspace(node);
      let html;
      if (expect.flags.fragment) {
        html = node.outerHTML;
      } else {
        html = jsdom.serialize(node);
      }
      expect(html, 'to equal', value);
    }
  );

describe('domspace', function() {
  it('should pretty print a document without whitespace', function() {
    expect(
      '<div><span>foo</span></div>',
      'to pretty print HTML fragment',
      '<div>\n  <span>foo</span>\n</div>'
    );
  });

  it('should handle multiple child with text nodes first and last', function() {
    expect(
      '<div>foo<span>bar</span>quux</div>',
      'to pretty print HTML fragment',
      '<div>\n  foo\n  <span>bar</span>\n  quux\n</div>'
    );
  });

  it('should handle comments', function() {
    expect(
      '<div><!--foo--><!--bar--></div>',
      'to pretty print HTML fragment',
      '<div>\n  <!--foo-->\n  <!--bar-->\n</div>'
    );
  });

  it('should pretty print deeply nested document', function() {
    expect(
      '<div><ul><li>foo</li></ul></div>',
      'to pretty print HTML fragment',
      '<div>\n  <ul>\n    <li>foo</li>\n  </ul>\n</div>'
    );
  });

  it('should pretty print multiple child nodes', function() {
    expect(
      '<div><span>foo</span><span>foo</span></div>',
      'to pretty print HTML fragment',
      '<div>\n  <span>foo</span>\n  <span>foo</span>\n</div>'
    );
  });

  it('should reformat an already indented document', function() {
    expect(
      `<div>
          <span>foo</span>
      </div>`,
      'to pretty print HTML fragment',
      '<div>\n  <span>foo</span>\n</div>'
    );
  });

  it('should format a document', function() {
    expect(
      '<!DOCTYPE html><head><link rel="stylesheet" href="styles.css"></head><body><span>foo</span></body></html>',
      'to pretty print HTML',
      '<!DOCTYPE html><html>\n<head>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <span>foo</span>\n</body>\n</html>'
    );
  });
});
