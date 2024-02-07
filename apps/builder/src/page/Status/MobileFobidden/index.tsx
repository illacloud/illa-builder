import {
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_MIXPANEL_PUBLIC_PAGE_NAME,
} from "@illa-public/mixpanel-utils"
import { FC, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import LaptopIcon from "@/assets/laptop.svg?react"
import {
  contentStyle,
  contentWrapperStyle,
  iconWrapperStyle,
  wrapperStyle,
} from "@/page/Status/MobileFobidden/style"
import { track } from "@/utils/mixpanelHelper"

export const MobileForbidden: FC = () => {
  const { t } = useTranslation()
  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.VISIT,
      ILLA_MIXPANEL_PUBLIC_PAGE_NAME.MOBILE_FORBIDDEN,
    )
  }, [])
  return (
    <>
      <Helmet>
        <title>{t("status.mobile_forbidden")}</title>
      </Helmet>
      <div css={wrapperStyle}>
        <div css={contentWrapperStyle}>
          <div css={iconWrapperStyle}>
            <LaptopIcon />
          </div>
          <span css={contentStyle}>{t("status.mobile_forbidden")}</span>
        </div>
      </div>
    </>
  )
}

MobileForbidden.displayName = "MobileForbidden"

export default MobileForbidden
