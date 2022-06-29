export interface DisplayNameState {
  cacheMap: {
    [type: string]: string[]
  }
}

export const DisplayNameInitialState: DisplayNameState = {
  cacheMap: {},
}
