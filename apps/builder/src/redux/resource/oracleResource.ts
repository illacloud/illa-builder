import i18n from "@/i18n/config"

export type OracleConnectType = "SID" | "Service"
export interface OracleResource {
  ssl: boolean
  host: string
  port: string
  connectionType: OracleConnectType
  name: string
  password: string
  username: string
}

export const OracleResourceInitial: OracleResource = {
  ssl: true,
  host: "",
  port: "",
  connectionType: "Service",
  name: "",
  password: "",
  username: "",
}

export const ConnectTypeOptions = [
  {
    label: i18n.t("editor.action.form.option.oracle.sid.sid"),
    value: "SID",
  },
  {
    label: i18n.t("editor.action.form.option.oracle.sid.service"),
    value: "Service",
  },
]
