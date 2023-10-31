import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { requestWhiteListIP } from "@/services/resource"
import {
  descriptionContainerStyle,
  headerContainerStyle,
  ipItemStyle,
  ipListContainerStyle,
  titleContainerStyle,
} from "./style"

export const WhiteList: FC = () => {
  const { t } = useTranslation()

  const [ipList, setIPList] = useState<string[]>([])

  useEffect(() => {
    requestWhiteListIP().then((response) => {
      const { resources } = response.data
      setIPList(resources)
    })
  }, [])

  return (
    <>
      <div css={headerContainerStyle}>
        <h6 css={titleContainerStyle}>
          {t("editor.action.resource.tip.allowlist.title")}
        </h6>
        <p css={descriptionContainerStyle}>
          {t("editor.action.resource.tip.allowlist.message")}
        </p>
      </div>
      <div css={ipListContainerStyle}>
        {ipList.map((ip) => (
          <p key={ip} css={ipItemStyle}>
            {ip}
          </p>
        ))}
      </div>
    </>
  )
}
