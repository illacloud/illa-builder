import { SubmitHandler } from "react-hook-form"
import { PasswordSettingFields } from "@/page/setting/interface"

export interface PasswordSettingMobileProps {
  loading: boolean
  onSubmit: SubmitHandler<PasswordSettingFields>
  validPasswordReport?: () => void
}
