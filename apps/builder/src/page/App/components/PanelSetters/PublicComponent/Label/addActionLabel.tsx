import { FC } from "react"
import { useTranslation } from "react-i18next"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { Button } from "@illa-design/button"
import { AddIcon } from "@illa-design/icon"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { AddActionLabelProps } from "@/page/App/components/PanelSetters/PublicComponent/Label/interface"
import { headerWrapperStyle } from "@/page/App/components/PanelSetters/PublicComponent/Label/style"

export const AddActionLabel: FC<AddActionLabelProps> = (props) => {
  const { labelName, labelDesc, handleAddItem } = props
  const { t } = useTranslation()

  return (
    <div css={headerWrapperStyle}>
      <PanelLabel labelName={labelName} labelDesc={labelDesc} />
      <Button
        pd="1px 8px"
        colorScheme="techPurple"
        size="medium"
        variant="text"
        onClick={handleAddItem}
        leftIcon={
          <AddIcon color={globalColor(`--${illaPrefix}-techPurple-08`)} />
        }
      >
        {t("editor.inspect.setter_content.event_handler_list.new")}
      </Button>
    </div>
  )
}

AddActionLabel.displayName = "AddActionLabel"
