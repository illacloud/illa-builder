import { SubmitHandler } from "react-hook-form"
import { AccountSettingFields } from "@/page/setting/interface"

export interface AccountSettingMobileProps {
  loading: boolean
  onSubmit: SubmitHandler<AccountSettingFields>
  validAccountReport?: () => void
  handleUpdateAvatar: (file: Blob) => Promise<boolean>
}
