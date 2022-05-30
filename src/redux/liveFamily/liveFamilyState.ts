export interface Presence {
  userId: string
  cursor: {
    x: number
    y: number
  }
}

export interface LiveFamilyState {
  others: Presence[]
}

export const LiveFamilyInitialState: LiveFamilyState = {
  others: [],
}
