import { NODE_URL } from "./const";

export const getCells = (typeScript: Record<'code_hash' | 'hash_type' | 'args', string>, cursor: string | null = null) =>
  fetch(NODE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      method: 'get_cells',
      params: [
        {
          script: typeScript,
          script_type: 'type',
        },
        'asc',
        '0x64',
        cursor ?? null,
      ],
    }),
  })
    .then((res) => res.json())
    .then((res) => res.result as {
      last_cursor: string | '0x';
      objects: Array<{
        output: {
          capacity: string
          lock: {
            code_hash: string
            hash_type: string
            args: string
          },
          type: {
            code_hash: string
            hash_type: string
            args: string
          }
        },
        output_data: string
      }>
    })
    .catch(console.error)
