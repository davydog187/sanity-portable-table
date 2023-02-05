import {BlockDefinition} from 'sanity'

import {PortableTextBlock} from 'sanity'

export interface TableConfig {
  cellSchema: BlockDefinition
}

export type Cell = {
  _key: string
  _type: 'table-cell'
  text: PortableTextBlock[]
}

export type Row = {
  _key: string
  _type: 'table-row'
  cells: Cell[]
}

export type Table = {
  num_cols: number
  rows: Row[]
}
