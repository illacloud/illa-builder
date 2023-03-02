export interface AppWriteResource {
  host: string
  databaseID: string
  projectID: string
  apiKey: string
}

export const AppWriteResourceInitial: AppWriteResource = {
  host: "",
  databaseID: "",
  projectID: "",
  apiKey: "",
}
