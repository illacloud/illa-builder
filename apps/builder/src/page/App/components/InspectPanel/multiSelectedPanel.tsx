import { FC, useCallback, useContext } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button } from "@illa-design/react"
import {
  formContentItemStyle,
  formContentStyle,
  formHeaderStyle,
  multiSelectedPanelWrapper,
} from "@/page/App/components/InspectPanel/style"
import { getSelectedComponentDisplayNames } from "@/redux/config/configSelector"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"

export const MultiSelectedPanel: FC = () => {
  const selectedComponents = useSelector(getSelectedComponentDisplayNames)
  const { t } = useTranslation()
  const shortcut = useContext(ShortCutContext)

  const handleClickDeleteButton = useCallback(() => {
    shortcut.showDeleteDialog(selectedComponents, "widget", {
      source: "left_multi_delete",
    })
  }, [selectedComponents, shortcut])
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
