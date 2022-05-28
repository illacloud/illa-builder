import { DashboardApp } from "./appState"

export interface AddAppPayload {
  app: DashboardApp
  index?: number
}

export interface RenameAppPayload {
  appId: string
  newName: string
}
