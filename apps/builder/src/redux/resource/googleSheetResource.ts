export type GoogleSheetAuthType = "serviceAccount" | "oauth2"

export interface GoogleSheetResource {
  authentication: GoogleSheetAuthType
  opts: { privateKey: string }
}

export const GoogleSheetResourceInitial: GoogleSheetResource = {
  authentication: "serviceAccount",
  opts: {
    privateKey: "",
  },
}
