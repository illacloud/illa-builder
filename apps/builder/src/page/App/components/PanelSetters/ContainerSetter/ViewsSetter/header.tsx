import { FC } from "react"
import { useTranslation } from "react-i18next"
import { AddIcon, Button } from "@illa-design/react"
import {
  HeaderLabelStyle,
  HeaderWrapperStyle,
} from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/style"

export interface HeaderProps {
  labelName: string
  addAction: () => void
  hasAddAction: boolean
}

export const Header: FC<HeaderProps> = (props) => {
  const { t } = useTranslation()
  const { labelName, addAction, hasAddAction } = props
  return (
    <div css={HeaderWrapperStyle}>
      <span css={HeaderLabelStyle}>{labelName}</span>
      {hasAddAction && (
        <Button
          leftIcon={<AddIcon />}
          colorScheme="techPurple"
          variant="text"
          onClick={addAction}
        >
          {t("editor.inspect.setter_content.column_setter.new")}
        </Button>
      )}
    </div>
  )
}
