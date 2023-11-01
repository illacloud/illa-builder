import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ReactComponent as DisabledGoogleLogoIcon } from "@/assets/googlesheets/disabled-google.svg"
import { ReactComponent as GoogleLogoIcon } from "@/assets/googlesheets/google-logo.svg"
import { googleIconStyle, googleSheetsButtonStyle } from "./style"

const GoogleCreateButton: FC = () => {
  const { formState } = useFormContext()
  const { t } = useTranslation()

  return (
    <button
      css={googleSheetsButtonStyle}
      type="submit"
      disabled={!formState.isValid}
    >
      <span css={googleIconStyle}>
        {formState.isValid ? <GoogleLogoIcon /> : <DisabledGoogleLogoIcon />}
      </span>
      <span>{t("editor.action.form.label.gs.connect_with_oauth")}</span>
    </button>
  )
}

export default GoogleCreateButton
