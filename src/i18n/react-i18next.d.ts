import { resources } from "./config"

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: typeof resources["en"]
  }
}
