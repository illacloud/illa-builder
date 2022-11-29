import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { AddActionLabelProps } from "@/page/App/components/PanelSetters/PublicComponent/Label/interface"
import { headerWrapperStyle } from "@/page/App/components/PanelSetters/PublicComponent/Label/style"
import { Button, AddIcon, globalColor, illaPrefix } from "@illa-design/react"
import { FC } from "react"
import { useTranslation } from "react-i18next"

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
