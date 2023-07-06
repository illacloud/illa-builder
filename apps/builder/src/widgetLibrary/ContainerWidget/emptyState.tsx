import { FC, ReactNode } from "react"
import { useTranslation } from "react-i18next"
import {
  applyEmptyStateWrapperStyle,
  emptyStateStyle,
  keyPressComponentStyle,
} from "@/widgetLibrary/ContainerWidget/style"

interface IKeyPressComponentProps {
  children?: ReactNode
}
export const KeyPressComponent: FC<IKeyPressComponentProps> = (props) => {
  return <span css={keyPressComponentStyle}>{props.children}</span>
}

export const ContainerEmptyState: FC = () => {
  const { t } = useTranslation()
  return (
    <div css={applyEmptyStateWrapperStyle}>
      <span css={emptyStateStyle}>{t("widget.container.empty")}</span>
    </div>
  )
}
