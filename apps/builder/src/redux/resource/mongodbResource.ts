import { DbSSL } from "@/redux/resource/resourceState"

export type MongoDbConnectionFormat = "standard" | "mongodb+srv"

export interface MongoDbResource {
  host: string
  connectionFormat: MongoDbConnectionFormat
  port: string
  databaseName: string
  databaseUsername: string
  databasePassword: string
  ssl: DbSSL
}
