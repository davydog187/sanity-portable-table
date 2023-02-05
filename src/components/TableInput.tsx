import React, {useCallback} from 'react'
import {
  RenderInputCallback,
  MemberField,
  FieldMember,
  ObjectInputProps,
  BlockDefinition,
} from 'sanity'
import {PortableTextBlock, set} from 'sanity'
import {Button, Inline, Stack, Card, Text} from '@sanity/ui'
import {randomKey} from '@sanity/util/content'

import {AddIcon, RemoveIcon} from '@sanity/icons'

import type {Cell, Row, Table, TableConfig} from '../types'

function createTextBlock(text: string, cellSchema: BlockDefinition): PortableTextBlock {
  return {
    _key: randomKey(),
    _type: cellSchema.name,
    children: [
      {
        _key: randomKey(),
        _type: 'span',
        marks: [],
        text: text,
      },
    ],
    markDefs: [],
    style: 'normal',
  }
}

function createCell(text: string, cellSchema: BlockDefinition): Cell {
  return {
    _key: randomKey(),
    _type: 'table-cell',
    text: [createTextBlock(text, cellSchema)],
  }
}

function createRow(cellCount: number, cellSchema: BlockDefinition): Row {
  return {
    _key: randomKey(),
    _type: 'table-row',
    cells: Array.from(Array(cellCount)).map((_, i) => createCell(`Cell ${i + 1}`, cellSchema)),
  }
}

function popColumn(rows: Row[] = []): Row[] {
  return rows.map((row) => {
    const {cells, ...rest} = row

    const newCells = [...cells]
    newCells.pop()

    return {
      ...rest,
      cells: newCells,
    }
  })
}

function appendColumn(rows: Row[] = [], cellSchema: BlockDefinition): Row[] {
  return rows.map((row) => {
    const {cells, ...rest} = row
    return {
      ...rest,
      cells: [...cells, createCell(`Cell ${cells.length + 1}`, cellSchema)],
    }
  })
}

function locateMember(members: Array<FieldMember>, key: string) {
  return members.find(
    (member): member is FieldMember => member.kind === 'field' && member.name === key
  )
}

export function TableInput(props: ObjectInputProps & TableConfig) {
  const {members, onChange, value, renderInput, cellSchema} = props

  const rowsMember = locateMember(members as FieldMember[], 'rows')

  const addColumn = useCallback(() => {
    const num_cols = value?.num_cols + 1 || 1

    const rows: Row[] = appendColumn(value?.rows, cellSchema)

    onChange(set({...value, rows, num_cols}))
  }, [onChange, value, cellSchema])

  const removeColumn = useCallback(() => {
    if (value?.num_cols === 1) return
    const num_cols = value?.num_cols - 1 || 1

    const rows: Row[] = popColumn(value?.rows)

    onChange(set({...value, rows, num_cols}))
  }, [onChange, value])

  const rowsInput: RenderInputCallback = useCallback(
    // TODO InputProps doesn't have onInsert on it for some reason?
    (inputProps: any) => {
      const handleInsert = () => {
        const {rows, num_cols} = value as Table

        return onChange(set({...value, rows: [...rows, createRow(num_cols, cellSchema)]}))
      }

      return renderInput({...inputProps, onInsert: handleInsert})
    },
    [value, onChange, cellSchema, renderInput]
  )

  return (
    <Stack>
      <Card padding={1} paddingBottom={4}>
        <Inline space={2}>
          <Button icon={RemoveIcon} mode="ghost" onClick={removeColumn} />
          <Text>
            {value?.num_cols ?? 1} {value?.num_cols === 1 ? 'Column' : 'Columns'}
          </Text>
          <Button icon={AddIcon} tone="primary" onClick={addColumn} />
        </Inline>
      </Card>

      {rowsMember && (
        <MemberField
          member={rowsMember}
          renderInput={rowsInput}
          renderField={props.renderField}
          renderItem={props.renderItem}
          renderPreview={props.renderPreview}
        />
      )}
    </Stack>
  )
}

export function createTableInput(cellSchema: BlockDefinition) {
  return (props: ObjectInputProps) => <TableInput {...props} cellSchema={cellSchema} />
}
