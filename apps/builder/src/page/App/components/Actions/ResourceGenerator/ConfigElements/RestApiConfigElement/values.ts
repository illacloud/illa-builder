import i18n from "@/i18n/config"
import { RestApiAuthType, VerifyMode } from "@/redux/resource/restapiResource"

export const AuthenticationOptions: {
  label: string
  value: RestApiAuthType
}[] = [
  {
    label: i18n.t("editor.action.resource.restapi.option.authentication.none"),
    value: "none",
  },
  {
    label: i18n.t(
      "editor.action.resource.restapi.option.authentication.basic_auth",
    ),
    value: "basic",
  },
  {
    label: i18n.t(
      "editor.action.resource.restapi.option.authentication.bearer",
    ),
    value: "bearer",
  },
  {
    label: i18n.t(
      "editor.action.form.option.restapi.authentication.digest_auth",
    ),
    value: "digest",
  },
]

export const VerificationModeOptions: {
  label: string
  value: VerifyMode
}[] = [
  {
    label: i18n.t(
      "editor.action.form.option.restapi.verification_mode.full_verification",
    ),
    value: "verify-full",
  },
  {
    label: i18n.t(
      "editor.action.form.option.restapi.verification_mode.verify_ca_certificat",
    ),
    value: "verify-ca",
  },
  {
    label: i18n.t(
      "editor.action.form.option.restapi.verification_mode.skip_ca_certificate_",
    ),
    value: "skip",
  },
]

export const DigestAuthInfo = [
  {
    title: i18n.t("editor.action.resource.restapi.label.digest_auth_username"),
    name: "username",
    controlledType: "input",
    defaultValue: "",
    required: false,
  },
  {
    title: i18n.t("editor.action.resource.restapi.label.digest_auth_password"),
    name: "password",
    controlledType: "password",
    defaultValue: "",
    required: false,
  },
]
