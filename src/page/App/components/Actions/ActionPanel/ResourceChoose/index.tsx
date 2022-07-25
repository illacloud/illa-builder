import { FC } from "react"
import { ResourceChooseProps } from "./interface"
import { resourceChooseContainerStyle, resourceTitleStyle } from "./style"
import { useTranslation } from "react-i18next"

export const ResourceChoose: FC<ResourceChooseProps> = () => {
  const { t } = useTranslation()

  return (
    <div css={resourceChooseContainerStyle}>
      <span css={resourceTitleStyle}>{t("resources")}</span>
    </div>
  )
}
