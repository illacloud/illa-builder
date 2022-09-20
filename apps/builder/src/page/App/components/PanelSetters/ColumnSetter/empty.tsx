import { FC } from "react"
import { emptyEmptyBodyStyle } from "@/page/App/components/PanelSetters/OptionListSetter/style"

export const EmptyBody: FC = () => {
  return <div css={emptyEmptyBodyStyle}>No columns</div>
}

EmptyBody.displayName = "OptionListEmptyBody"
