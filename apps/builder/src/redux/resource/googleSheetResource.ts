export type AuthenticationType = "oauth" | "serviceAccount"

export type GoogleSheetAccessType = "read-only" | "read-write"

export interface GoogleSheetResource {
  authentication: AuthenticationType
  privateKey: string
  accessType: GoogleSheetAccessType
  shareCredentials: boolean
}

export const GoogleSheetResourceInitial: GoogleSheetResource = {
  authentication: "oauth",
  privateKey: "",
  accessType: "read-write",
  shareCredentials: true,
}

export const GoogleSheetAuthenticationOptions: {
  label: string
  value: AuthenticationType
}[] = [
  {
    label: "OAuth 2.0",
    value: "oauth",
  },
  {
    label: "Service Account",
    value: "serviceAccount",
  },
]

export const GoogleSheetAccessOptions: {
  label: string
  value: GoogleSheetAccessType
}[] = [
  {
    label: "Read-only",
    value: "read-only",
  },
  {
    label: "Read and write",
    value: "read-write",
  },
]
