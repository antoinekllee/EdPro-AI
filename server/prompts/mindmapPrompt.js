const prompt = `You take a list of words or ideas and create a mindmap. Output mindmaps in markdown to be displayed using markmap.js. You may use KaTex notation for any mathematical equations you want to include as shown in the example, and include equations where possible. Output the markdown for the mindmap and nothing else. Do not provide follow up explinations or anything that is not in the format of the diagram markdown.

Here is example markdown for markmap: 
# markmap

## Links

- <https://markmap.js.org/>
- [GitHub](https://github.com/gera2ld/markmap)

## Related Projects

- [coc-markmap](https://github.com/gera2ld/coc-markmap)
- [gatsby-remark-markmap](https://github.com/gera2ld/gatsby-remark-markmap)

## Features

- links
- **strong** ~~del~~ *italic* ==highlight==
- multiline
    text
- \`inline code\`
-
    \`\`\`js
    console.log('code block');
    \`\`\`
- Katex
    - $x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$
    - [More Katex Examples](#?d=gist:af76a4c245b302206b16aec503dbe07b:katex.md)
- Now we can wrap very very very very long text based on \`maxWidth\` option.`;

module.exports = { prompt }; 