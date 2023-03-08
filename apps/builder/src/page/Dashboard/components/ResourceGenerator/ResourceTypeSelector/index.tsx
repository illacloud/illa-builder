import copy from "copy-to-clipboard"
import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { CopyIcon, DownIcon, UpIcon, createMessage } from "@illa-design/react"
import { ResourceCard } from "@/page/Dashboard/components/ResourceGenerator/ResourceCard"
import { ResourceTypeList } from "@/page/Dashboard/components/ResourceGenerator/config"
import { isCloudVersion } from "@/utils/typeHelper"
import { ResourceTypeSelectorProps } from "./interface"
import {
  categoryStyle,
  containerStyle,
  resourceListStyle,
  whiteListButtonContainerStyle,
  whiteListButtonStyle,
  whiteListContentContainerStyle,
  whiteListContentStyle,
  whiteListDescriptionStyle,
  whiteListOperationIconStyle,
  whiteListTitleStyle,
} from "./style"

export const ResourceTypeSelector: FC<ResourceTypeSelectorProps> = (props) => {
  const { onSelect } = props
  const { t } = useTranslation()
  const message = createMessage()

  const [showIPList, setShowIPList] = useState<boolean>(true)

  const handleOperationIconClick = () => {
    setShowIPList((prevState) => !prevState)
  }
  const handleCopyClick = useCallback(() => {
    const copyResult = copy("")
    if (copyResult) {
      message.success({
        content: t("copied"),
      })
    } else {
      message.error({
        content: t("copy_failed"),
      })
    }
  }, [])

  return (
    <div css={containerStyle}>
      {ResourceTypeList.map(({ title, item, category }) => (
        <div key={category}>
          <span css={categoryStyle}>{title}</span>
          <div css={resourceListStyle}>
            {item.map((prop) => (
              <ResourceCard
                key={prop.resourceType}
                onSelect={(item) => {
                  onSelect(item)
                }}
                {...prop}
              />
            ))}
          </div>
        </div>
      ))}
      <div>
        <div css={whiteListContentContainerStyle}>
          <div css={whiteListContentStyle}>
            <div css={whiteListTitleStyle}>
              {t("editor.action.resource.tip.allowlist.title")}
            </div>
            <div css={whiteListDescriptionStyle}>
              {t("editor.action.resource.tip.allowlist.message")}
            </div>
          </div>
          {isCloudVersion && (
            <div css={whiteListButtonContainerStyle}>
              <div css={whiteListButtonStyle} onClick={handleCopyClick}>
                <CopyIcon />
                <span>{t("editor.action.resource.button.copy_ip")}</span>
              </div>
              <span
                css={whiteListOperationIconStyle}
                onClick={handleOperationIconClick}
              >
                {showIPList ? <UpIcon /> : <DownIcon />}
              </span>
            </div>
          )}
        </div>
        {isCloudVersion && showIPList && <div></div>}
      </div>
    </div>
  )
}

ResourceTypeSelector.displayName = "ResourceTypeSelector"
