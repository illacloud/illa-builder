import { MoreIcon } from "@illa-design/icon"
import { Dropdown } from "@illa-design/dropdown"
import {
  HandlerItemContentCSS,
  HandlerItemMoreCSS,
  HandlerItemWrapperCSS,
  MoreListItemCSS,
  MoreListCSS,
  MoreListItemWarnCSS,
} from "../style"
import { HandlerItemProps } from "./interface"

export const HandlerItem = (props: HandlerItemProps) => {
  const { content } = props
  const dropList = (
    <ul css={MoreListCSS}>
      <li css={MoreListItemCSS}>Duplicate</li>
      <li css={MoreListItemWarnCSS}>Delete</li>
    </ul>
  )
  return (
    <div role="button" css={HandlerItemWrapperCSS}>
      <span css={HandlerItemContentCSS}>{content}</span>
      <Dropdown
        dropList={dropList}
        trigger="click"
        triggerProps={{
          openDelay: 0,
          closeDelay: 0,
          showArrow: false,
        }}
      >
        <span css={HandlerItemMoreCSS}>
          <MoreIcon />
        </span>
      </Dropdown>
    </div>
  )
}
