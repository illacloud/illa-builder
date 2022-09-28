import { FC } from "react"
import { Trans } from "react-i18next"
import {
  emptyStateStyle,
  emptyStateWrapperStyle,
  keyPressComponentStyle,
} from "@/widgetLibrary/ContainerWidget/style"

export const KeyPressComponent: FC = props => {
  return <span css={keyPressComponentStyle}>{props.children}</span>
}

export const ContainerEmptyState: FC = () => {
  return (
    <div css={emptyStateWrapperStyle}>
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
