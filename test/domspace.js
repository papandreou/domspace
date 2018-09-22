const domspace = require('../lib/domspace');
var JSDOM = require('jsdom').JSDOM;
const expect = require('unexpected')
  .clone()
  .addAssertion(
    '<string> to come out as <string>',
    (expect, subject, value) => {
      expect.errorMode = 'nested';
      const jsdom = new JSDOM(
        `<!DOCTYPE html><html><head></head><body>${subject}</body></html>`
      );
      const node = jsdom.window.document.body.firstChild;
      domspace(node);
      expect(node.outerHTML, 'to equal', value);
    }
  );

describe('domspace', function() {
  it('should pretty print a document without whitespace', function() {
    expect(
      '<div><span>foo</span></div>',
      'to come out as',
      '<div>\n  <span>foo</span>\n</div>'
    );
  });

  it('should handle multiple child with text nodes first and last', function() {
    expect(
      '<div>foo<span>bar</span>quux</div>',
      'to come out as',
      '<div>\n  foo\n  <span>bar</span>\n  quux\n</div>'
    );
  });

  it('should handle comments', function() {
    expect(
      '<div><!--foo--><!--bar--></div>',
      'to come out as',
      '<div>\n  <!--foo-->\n  <!--bar-->\n</div>'
    );
  });

  it('should pretty print deeply nested document', function() {
    expect(
      '<div><ul><li>foo</li></ul></div>',
      'to come out as',
      '<div>\n  <ul>\n    <li>foo</li>\n  </ul>\n</div>'
    );
  });

  it('should pretty print multiple child nodes', function() {
    expect(
      '<div><span>foo</span><span>foo</span></div>',
      'to come out as',
      '<div>\n  <span>foo</span>\n  <span>foo</span>\n</div>'
    );
  });

  it('should reformat an already indented document', function() {
    expect(
      `<div>
          <span>foo</span>
      </div>`,
      'to come out as',
      '<div>\n  <span>foo</span>\n</div>'
    );
  });
});
