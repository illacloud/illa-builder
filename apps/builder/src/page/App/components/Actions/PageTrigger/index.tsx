import { FC } from "react"
import { pageTriggerContainer, pageTriggerTitleStyle } from "./style"

export const PageTrigger: FC = () => {
  return (
    <div css={pageTriggerContainer}>
      <span css={pageTriggerTitleStyle}>Action running on app loading</span>
    </div>
  )
}
