# sanity-plugin-portable-table

## Installation

```
npm install --save sanity-plugin-portable-table
```

or

```
yarn add sanity-plugin-portable-table
```

## Usage
Add it as a plugin in sanity.config.ts (or .js):

```
 import {defineConfig} from 'sanity'
 import {myPlugin} from 'sanity-plugin-portable-table'

 export const defineConfig({
     /...
     plugins: [
         myPlugin({})
     ]
 })
```
## License

Apache License 2.0 © Dave Lucia
See LICENSE