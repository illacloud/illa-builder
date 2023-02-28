export interface AppWriteResource {
  host: string
  database: string
  projectID: string
  jwt: string
}

export const AppWriteResourceInitial: AppWriteResource = {
  host: "",
  database: "",
  projectID: "",
  jwt: "",
}
