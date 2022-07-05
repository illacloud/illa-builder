export interface DottedLineSquare {
  displayName: string
  squareX: number
  squareY: number
  w: number
  h: number
}

export interface DottedLineSquareState {
  [key: string]: DottedLineSquare
}

export const DottedLineSquareInitialState: DottedLineSquareState = {}
