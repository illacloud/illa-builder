import "react-i18next"
import { resources } from "./config"

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: (typeof resources)["en-US"]
    returnNull: false
  }
}
