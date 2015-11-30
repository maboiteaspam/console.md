
var marked = require('marked');
var TerminalRenderer = require('marked-terminal');

marked.setOptions({
  renderer: new TerminalRenderer()
});

module.exports = function () {
  if(!console.md) {
    console.md = function (msg) {
      console.log(
        marked(msg)
      )
    }
  }
};
