import type { TransactionType } from 'src/features/transactions/types'

export type BlockType = {
  bits: number,
  block_index: number,
  fee: number,
  hash: string,
  height: number,
  n_tx: number,
  next_block: Array<string>,
  nonce: number,
  prev_block: string,
  size: number,
  time: number,
  ver: number,
  tx: Array<TransactionType>
}

export type LatestBlockType = {
  hash: string,
  time: number,
  block_index: number,
  height: number
}
