export type GoogleSheetAuthType = "serviceAccount" | "oauth2"

export type AccessType = "r" | "rw"

export enum GoogleSheetAuthStatus {
  Initial = 0,
  NotAuthenticated = 1,
  Authenticated = 2,
}

export interface OAuthOpts {
  privateKey: string
  accessType?: AccessType
  accessToken?: string
  accessTokenExpiry?: string
  refreshToken?: string
  authCode?: string
  status?:
    | GoogleSheetAuthStatus.NotAuthenticated
    | GoogleSheetAuthStatus.Authenticated
    | GoogleSheetAuthStatus.Initial
}

export interface GoogleSheetResource {
  authentication: GoogleSheetAuthType
  opts: OAuthOpts
}

export const GoogleSheetResourceInitial: GoogleSheetResource = {
  authentication: "serviceAccount",
  opts: {
    privateKey: "",
    status: GoogleSheetAuthStatus.Initial,
  },
}
