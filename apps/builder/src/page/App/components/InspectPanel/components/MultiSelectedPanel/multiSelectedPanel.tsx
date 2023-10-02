import { FC, useContext } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button } from "@illa-design/react"
import { getSelectedComponentDisplayNames } from "@/redux/config/configSelector"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import {
  formContentItemStyle,
  formContentStyle,
  formHeaderStyle,
  multiSelectedPanelWrapper,
} from "./style"

const MultiSelectedPanel: FC = () => {
  const selectedComponents = useSelector(getSelectedComponentDisplayNames)
  const { t } = useTranslation()
  const shortcut = useContext(ShortCutContext)

  const handleClickDeleteButton = () => {
    shortcut.showDeleteDialog(selectedComponents, "widget", {
      source: "left_multi_delete",
    })
  }

  return (
    <div css={multiSelectedPanelWrapper}>
      <div css={formHeaderStyle}>
        {t("editor.inspect.multi_selected_header", {
          number: selectedComponents.length,
        })}
      </div>
      <div css={formContentStyle}>
        {selectedComponents.map((displayName) => {
          return (
            <div key={displayName} css={formContentItemStyle}>
              {displayName}
            </div>
          )
        })}
      </div>
      <Button
        fullWidth
        size="medium"
        colorScheme="red"
        variant="light"
        onClick={handleClickDeleteButton}
      >
        {t("editor.component.delete")}
      </Button>
    </div>
  )
}

MultiSelectedPanel.displayName = "MultiSelectedPanel"
export default MultiSelectedPanel
