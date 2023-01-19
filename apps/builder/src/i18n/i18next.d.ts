import "i18next"
import { resources } from "./config"

declare module "i18next" {
  interface CustomTypeOptions {
    // resources: typeof resources["en-US"]
    returnNull: false
  }
}
