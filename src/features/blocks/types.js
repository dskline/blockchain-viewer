import type { TransactionType } from 'src/features/transactions/types'

export type BlockType = {
  bits: number,
  block_index: number,
  fee: number,
  hash: string,
  height: number,
  n_tx: number,
  next_block: string,
  nonce: number,
  prev_block: string,
  size: number,
  time: number,
  ver: number,
  tx: Array<TransactionType>
}
