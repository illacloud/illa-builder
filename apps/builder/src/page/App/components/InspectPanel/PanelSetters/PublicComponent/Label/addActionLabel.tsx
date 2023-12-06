import { FC } from "react"
import { useTranslation } from "react-i18next"
import { AddIcon, Button, globalColor, illaPrefix } from "@illa-design/react"
import { AddActionLabelProps } from "@/page/App/components/InspectPanel/PanelSetters/PublicComponent/Label/interface"
import { headerWrapperStyle } from "@/page/App/components/InspectPanel/PanelSetters/PublicComponent/Label/style"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"

export const AddActionLabel: FC<AddActionLabelProps> = (props) => {
  const { labelName, labelDesc, handleAddItem } = props
  const { t } = useTranslation()

  return (
    <div css={headerWrapperStyle}>
      <PanelLabel labelName={labelName} labelDesc={labelDesc} />
      <Button
        pd="1px 8px"
        colorScheme="techPurple"
        size="small"
        variant="text"
        onClick={handleAddItem}
        leftIcon={
          <AddIcon color={globalColor(`--${illaPrefix}-techPurple-03`)} />
        }
      >
        {t("editor.inspect.setter_content.event_handler_list.new")}
      </Button>
    </div>
  )
}

AddActionLabel.displayName = "AddActionLabel"
