export type SnowflakeAuthenticationSelectType = "basic" | "key"

export interface SnowflakeBasicAuthenticationType {
  username: string
  password: string
}

export const snowflakeBasicAuthenticationTypeInitial: SnowflakeBasicAuthenticationType =
  {
    username: "",
    password: "",
  }

export interface SnowflakeKeyAuthenticationType {
  username: string
  privateKey: string
}

export const snowflakeKeyAuthenticationTypeInitial: SnowflakeKeyAuthenticationType =
  {
    username: "",
    privateKey: "",
  }

export type SnowflakeAuthenticationType =
  | SnowflakeBasicAuthenticationType
  | SnowflakeKeyAuthenticationType

export interface SnowflakeResource<T extends SnowflakeAuthenticationType> {
  accountName: string
  warehouse: string
  database: string
  schema: string
  role: string
  authentication: SnowflakeAuthenticationSelectType
  authContent: T
}

export const snowflakeResourceInitial: SnowflakeResource<SnowflakeAuthenticationType> =
  {
    accountName: "",
    warehouse: "",
    database: "",
    schema: "PUBLIC",
    role: "PUBLIC",
    authentication: "basic",
    authContent: snowflakeBasicAuthenticationTypeInitial,
  }

export const AuthenticationOptions = [
  {
    label: "Basic Auth",
    value: "basic",
  },
  {
    label: "Key Pair (only encrypted private keys are supported)",
    value: "key",
  },
]
