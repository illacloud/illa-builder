import { Room } from "@/api/ws/ws"

export interface ConnectionError {
  errorState: boolean
  room?: Room
}

export interface BuilderInfo {
  version: string
  language: string
}

export const BuilderInfoInitialState: BuilderInfo = {
  version: "0.0.0",
  language: "English",
}
