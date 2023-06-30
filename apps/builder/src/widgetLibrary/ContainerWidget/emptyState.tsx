import { FC, ReactNode } from "react"
import { Trans } from "react-i18next"
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
  return (
    <div css={applyEmptyStateWrapperStyle}>
      <span css={emptyStateStyle}>
        <Trans
          i18nKey="widget.container.empty"
          components={{
            keyPress: <KeyPressComponent />,
          }}
        />
      </span>
    </div>
  )
}
