export interface Params {
  key: string
  value: string
  [key: string]: string
}

export type RestApiAuthType = "none" | "basic" | "bearer" | "digest"

export type VerifyMode = "verify-full" | "verify-ca" | "skip"

export interface RestApiResource<T extends RestApiAuth> {
  baseUrl: string
  urlParams: Params[]
  headers: Params[]
  cookies: Params[]
  authentication: RestApiAuthType
  selfSignedCert: boolean
  certs: {
    caCert: string
    clientKey: string
    clientCert: string
    mode: VerifyMode
  }
  authContent: T
}

export const RestApiResourceInit: RestApiResource<RestApiAuth> = {
  baseUrl: "",
  urlParams: [
    {
      key: "",
      value: "",
    },
  ],
  headers: [
    {
      key: "",
      value: "",
    },
  ],
  cookies: [
    {
      key: "",
      value: "",
    },
  ],
  authentication: "none",
  selfSignedCert: false,
  certs: {
    caCert: "",
    clientKey: "",
    clientCert: "",
    mode: "verify-full",
  },
  authContent: {},
}

export type RestApiAuth = NoneAuth | BasicAuth | BearerAuth | DigestAuth

export interface NoneAuth {}

export interface BasicAuth {
  username: string
  password: string
}

export interface BearerAuth {
  token: string
}

export interface DigestAuth {
  username: string
  password: string
}
