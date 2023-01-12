import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ReactComponent as LaptopIcon } from "@/assets/laptop.svg"
import {
  contentStyle,
  contentWrapperStyle,
  iconWrapperStyle,
  wrapperStyle,
} from "@/page/status/MobileFobidden/style"

export const MobileForbidden: FC = () => {
  const { t } = useTranslation()
  return (
    <div css={wrapperStyle}>
      <div css={contentWrapperStyle}>
        <div css={iconWrapperStyle}>
          <LaptopIcon />
        </div>
        <span css={contentStyle}>{t("status.mobile_forbidden")}</span>
      </div>
    </div>
  )
}

MobileForbidden.displayName = "MobileForbidden"
