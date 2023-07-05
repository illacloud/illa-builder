import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/react"

export interface ShareAppButtonProps {}

export const ShareAppButton: FC<ShareAppButtonProps> = () => {
  const { t } = useTranslation()

  return (
    <div>
      <Button colorScheme="grayBlue">{t("share")}</Button>
      {/*  [TODO]: share modal*/}
    </div>
  )
}
