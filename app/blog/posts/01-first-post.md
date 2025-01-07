---
title: 'Hello World!'
author: 'Impostor Engineer'
date: '2022-12-09'
draft: false
slug: 'hello-world'
tags: ['hello', 'world']
banner: '01-hello-world.png'
---

## First Post

### Favorite Highlight.js Styles

- Github Dark: `github-dark.css`
- Monokai: `monokai.css`
- Qtcreator Dark: `qtcreator-dark.css`
- Atom One Dark: `atom-one-dark.css`
- Chalk: `base16/chalk.css`

```JS
const allPostsData = fileNames
.filter((fileName) => path.extname(fileName) == '.md')
.map((fileName) => {
// Remove ".md" from file name to get id
const id = fileName.replace(/\.md$/, '');
// Read markdown file as string
const fullPath = path.join(postsDirectory, fileName);
const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        ...matterResult.data,
      };
    });

```

```python
def func():
  '''
  This is the definition.
  '''
  print('do something')

for e in data:
    newstr = [e][0][1]
    newstr = newstr.replace(':', '')
    [e][0].insert(1, newstr)
    del [e][0][2]
    newst = [e][0][0]
    newst = newst.split('-')
    [e][0].insert(0, newst)
    del [e][0][1]
```
