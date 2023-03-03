import i18n from "@/i18n/config"

export interface S3Resource {
  bucketName: string
  region: string
  endpoint: boolean
  baseURL: string
  accessKeyID: string
  secretAccessKey: string
  acl: string
}

export const S3ResourceInitial: S3Resource = {
  bucketName: "",
  region: "",
  endpoint: false,
  baseURL: "",
  accessKeyID: "",
  secretAccessKey: "",
  acl: i18n.t("editor.action.acl.option.public_read"),
}

export const SelectOptions = [
  i18n.t("editor.action.acl.option.blank"),
  i18n.t("editor.action.acl.option.private"),
  i18n.t("editor.action.acl.option.public_read"),
  i18n.t("editor.action.acl.option.public_read_write"),
  i18n.t("editor.action.acl.option.aws_exec_read"),
  i18n.t("editor.action.acl.option.auth"),
  i18n.t("editor.action.acl.option.bucket_owner_read"),
  i18n.t("editor.action.acl.option.bucket_owner_full_control"),
]
