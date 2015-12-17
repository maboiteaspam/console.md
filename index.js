
var util = require('util');
var marked = require('marked');
var TerminalRenderer = require('marked-terminal');

module.exports = function (renderOpts) {

  renderOpts = renderOpts || {};

  if(!console.md) {
    var renderer = new TerminalRenderer(renderOpts);
    console.md = function (msg) {
      marked.setOptions({
        renderer: renderer
      });
      console.log(
        marked(
          util.format.apply(
            util,
            [].slice.apply(arguments)
          )
        )
      )
    }
  }
  if(!console.mdline) {
    var mdLineRenderer = new TerminalRenderer(renderOpts);
    mdLineRenderer.code = function(code, lang, escaped) {
      var g = TerminalRenderer.prototype.code.apply(mdLineRenderer, [].slice.apply(arguments));
      return g.replace(/^\n+/, '').replace(/\n+$/, '').replace(/`/g, '')
    };
    console.mdline = function (format, msg) {
      marked.setOptions({
        renderer: mdLineRenderer
      });

      console.log(
        marked(
          util.format.apply(
            util,
            [].slice.apply(arguments)
          )
        ).replace(/\n/, '')// only the first found.
          .replace(/(\s\n)*$/, '') // any terminating
      )
    }
  }
};
