import type {Table} from '../types'
import {Box, Inline, Stack, Card, Text} from '@sanity/ui'
import {toPlainText} from '@portabletext/toolkit'

export function TablePreview(props: Table) {
  const {rows} = props

  return (
    <Stack>
      <Card borderBottom padding={4}>
        <Text size={4} weight="bold">
          Table
        </Text>
      </Card>
      {rows.length === 0 ? (
        <Card padding={4}>
          <Text>EmptyTable</Text>
        </Card>
      ) : (
        rows.map((row) => (
          <Box key={row._key} padding={2}>
            <Inline space={2}>
              {row?.cells?.map((cell) => (
                <Card key={cell._key} padding={4} tone="primary">
                  {toPlainText(cell.text ?? [])}
                </Card>
              ))}
            </Inline>
          </Box>
        ))
      )}
    </Stack>
  )
}
