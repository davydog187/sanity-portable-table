# sanity-plugin-portable-table

A table plugin for [Sanity Studio v3]() that supports [Portable Text](https://www.sanity.io/docs/presenting-block-text) cells.

This plugin is inspired by the official [@sanity/table](https://github.com/sanity-io/table) plugin, but allows you to define a Portable Text configuration in your cells.

## Installation

```bash
$ npm install --save sanity-plugin-portable-table
```

or

```bash
$ yarn add sanity-plugin-portable-table
```

## Usage

Add it as a plugin in sanity.config.ts (or .js):

```typescript
 import {defineConfig} from 'sanity'
 import {portableTable} from 'sanity-plugin-portable-table'

 export const defineConfig({
     /...
     plugins: [
         portableTable({
            cellSchema: {
                name: 'my-block',
                type: 'block',
                styles: [],
                lists: [],
                marks: {decorators: [{title: 'Strong', value: 'strong'}], annotations: []},
            }
         })
     ]
 })
```

## License

Apache License 2.0 © Dave Lucia
See LICENSE
