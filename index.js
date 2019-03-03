const replace = require('replace-in-file');

module.exports = {
  hooks: {
    "finish": function() {
      try {
        const options = {
          files: [
            '_book/**.html',
            '_book/**/**.html'
          ],
          from: /href="([^"]*")/g,
          to: (link) => {
            let result = link;
            let linkWithoutDoubleQuote = link.slice(0, -1);
            if (
              !linkWithoutDoubleQuote.includes('html')
              && !linkWithoutDoubleQuote.includes('http')
              && !linkWithoutDoubleQuote.endsWith('/')
              && !linkWithoutDoubleQuote.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)
            ) {
              result = linkWithoutDoubleQuote + '/' + '"';
              console.log(link + 'changed to ' + result);
            }
            return result;
          }
        };
        const changes = replace.sync(options);
      }
      catch (error) {
        console.error('Error occurred:', error);
      }
    }
  },
  blocks: {},
  filters: {}
};