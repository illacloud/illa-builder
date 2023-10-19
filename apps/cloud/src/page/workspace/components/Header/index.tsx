import { FC } from "react"
import { DashboardHeaderProps } from "./interface"
import {
  mobileHeaderContainerStyle,
  mobileInnerHeaderContainerStyle,
} from "./mobileStyle"
import {
  actionGroupContainerStyle,
  headerContainerStyle,
  innerHeaderContainerStyle,
  titleStyle,
} from "./style"

export const DashboardHeader: FC<DashboardHeaderProps> = (props) => {
  const { titleName, actionGroupComponent } = props
  return (
    <header css={headerContainerStyle}>
      <div css={innerHeaderContainerStyle}>
        <h1 css={titleStyle}>{titleName}</h1>
        {!!actionGroupComponent && (
          <div css={actionGroupContainerStyle}>{actionGroupComponent}</div>
        )}
      </div>
    </header>
  )
}

export const MobileDashboardHeader: FC<DashboardHeaderProps> = (props) => {
  const { titleName, actionGroupComponent } = props

  return (
    <header css={mobileHeaderContainerStyle}>
      <div css={mobileInnerHeaderContainerStyle}>
        <h1 css={titleStyle}>{titleName}</h1>
        {!!actionGroupComponent && (
          <div css={actionGroupContainerStyle}>{actionGroupComponent}</div>
        )}
      </div>
    </header>
  )
}
