import { FC } from "react"
import { MoreIcon } from "@illa-design/icon"
import { Dropdown } from "@illa-design/dropdown"
import {
  handlerItemContentStyle,
  handlerItemMoreStyle,
  handlerItemWrapperStyle,
  moreListItemStyle,
  moreListStyle,
  moreListItemWarnStyle,
} from "@/page/App/components/ActionEditor/ActionEditorPanel/style"
import { HandlerItemProps } from "./interface"

export const HandlerItem: FC<HandlerItemProps> = (props) => {
  const { content } = props
  const dropList = (
    <ul css={moreListStyle}>
      <li css={moreListItemStyle}>Duplicate</li>
      <li css={moreListItemWarnStyle}>Delete</li>
    </ul>
  )
  return (
    <div role="button" css={handlerItemWrapperStyle}>
      <span css={handlerItemContentStyle}>{content}</span>
      <Dropdown
        dropList={dropList}
        trigger="click"
        triggerProps={{
          openDelay: 0,
          closeDelay: 0,
          showArrow: false,
        }}
      >
        <span css={handlerItemMoreStyle}>
          <MoreIcon />
        </span>
      </Dropdown>
    </div>
  )
}

HandlerItem.displayName = "HandlerItem"
