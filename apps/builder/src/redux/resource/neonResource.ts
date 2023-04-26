import { MysqlLikeResource } from "@/redux/resource/mysqlLikeResource"
import { DbSSL } from "@/redux/resource/resourceState"

export interface NeonResource extends MysqlLikeResource {}

export const neonSSLInitialValue: DbSSL = {
  clientCert: "",
  clientKey: "",
  serverCert: "",
  ssl: false,
}

export const neonDefaultPort = "5432"
