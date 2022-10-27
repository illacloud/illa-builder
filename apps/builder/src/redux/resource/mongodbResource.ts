export type MongoDbConnectionFormat = "standard" | "mongodb+srv"

export type MongoConfigType = "gui" | "uri"

export type MongoDbConfig = MongoDbGuiConfigContent | MongoDbUriConfigContent

export interface MongoDbGuiConfigContent {
  host: string
  connectionFormat: MongoDbConnectionFormat
  port: string
  databaseName: string
  databaseUsername: string
  databasePassword: string
}

export const MongoDbGuiConfigContentInitial: MongoDbGuiConfigContent = {
  host: "",
  connectionFormat: "standard",
  port: "",
  databaseName: "",
  databaseUsername: "",
  databasePassword: "",
}

export interface MongoDbUriConfigContent {
  uri: string
}

export const MongoDbUriConfigContentInitial: MongoDbUriConfigContent = {
  uri: "",
}

export interface MongoDbSSL {
  open: boolean
  client: string
  ca: string
}

export const MongoDbSSLInitial = {
  open: false,
  client: "",
  ca: "",
}

export interface MongoDbResource<T extends MongoDbConfig> {
  configType: MongoConfigType
  configContent: T
  ssl: MongoDbSSL
}

export const MongoDbResourceInitial: MongoDbResource<MongoDbGuiConfigContent> =
  {
    configType: "gui",
    configContent: MongoDbGuiConfigContentInitial,
    ssl: MongoDbSSLInitial,
  }
