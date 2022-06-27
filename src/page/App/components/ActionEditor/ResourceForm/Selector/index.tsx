import { FC } from "react"
import { useTranslation } from "react-i18next"
import { databases, apis } from "@/page/App/components/ActionEditor/Resource"
import { ResourceFormSelectorProps } from "./interface"
import {
  categoryStyle,
  categoryTitleStyle,
  applyResourceListStyle,
  applyResourceItemStyle,
  resourceIconStyle,
  resourceNameStyle,
  selectLayoutStyle,
} from "./style"

export const ResourceFormSelector: FC<ResourceFormSelectorProps> = (props) => {
  const { onSelect } = props
  const { t } = useTranslation()
  const draftTip = t("editor.action.resource.label.comming_soon")

  return (
    <div css={selectLayoutStyle}>
      <div css={categoryTitleStyle}>Select Resource Type</div>
      <div>
        <div css={categoryStyle}>{t("editor.action.form.title.database")}</div>
        <div css={applyResourceListStyle()}>
          {databases.map((database) => (
            <div
              key={database.nameKey}
              css={applyResourceItemStyle(database.isDraft)}
              onClick={() => {
                !database.isDraft && onSelect(database.actionType)
              }}
              data-draft-tip={draftTip}
            >
              <span css={resourceIconStyle}>{database.icon}</span>
              <div css={resourceNameStyle}>
                {t(`editor.action.resource.${database.nameKey}.name`)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div css={categoryStyle}>{t("editor.action.form.title.api")}</div>
        <div css={applyResourceListStyle(true)}>
          {apis.map((api) => (
            <div
              key={api.nameKey}
              css={applyResourceItemStyle(api.isDraft)}
              onClick={() => {
                !api.isDraft && onSelect(api.actionType)
              }}
              data-draft-tip={draftTip}
            >
              <span css={resourceIconStyle}>{api.icon}</span>
              <div css={resourceNameStyle}>
                {t(`editor.action.resource.${api.nameKey}.name`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

ResourceFormSelector.displayName = "ResourceFormSelector"
