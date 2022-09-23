import { FC } from "react"
import { Trans } from "react-i18next"
import {
  emptyStateStyle,
  keyPressComponentStyle,
} from "@/widgetLibrary/ContainerWidget/style"

export const KeyPressComponent: FC = props => {
  return <span css={keyPressComponentStyle}>{props.children}</span>
}

export const ContainerEmptyState: FC = () => {
  return (
    <span css={emptyStateStyle}>
      <Trans
        i18nKey="widget.container.empty"
        components={{
          keyPress: <KeyPressComponent />,
        }}
      />
    </span>
  )
}
