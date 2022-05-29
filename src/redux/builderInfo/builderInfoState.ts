import { Room } from "@/api/ws/ws"

export interface ConnectionError {
  errorState: boolean
  room?: Room
}

export interface BuilderInfo {
  version: string
  language: string
  connection: {
    loading: boolean
    error: ConnectionError
  }
}

export const BuilderInfoInitialState: BuilderInfo = {
  version: "0.0.0",
  language: "English",
  connection: {
    loading: false,
    error: {
      errorState: false,
      room: undefined,
    },
  },
}
