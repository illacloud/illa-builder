export interface FirebaseResource {
  databaseUrl: string
  projectID: string
  privateKey: string
}

export const FirebaseResourceInitial: FirebaseResource = {
  databaseUrl: "",
  projectID: "",
  privateKey: "",
}
