import { MoreIcon } from "@illa-design/icon"
import { Dropdown } from "@illa-design/dropdown"
import {
  handlerItemContentCss,
  handlerItemMoreCss,
  handlerItemWrapperCss,
  moreListItemCss,
  moreListCss,
  moreListItemWarnCss,
} from "../style"
import { HandlerItemProps } from "./interface"

export const HandlerItem = (props: HandlerItemProps) => {
  const { content } = props
  const dropList = (
    <ul css={moreListCss}>
      <li css={moreListItemCss}>Duplicate</li>
      <li css={moreListItemWarnCss}>Delete</li>
    </ul>
  )
  return (
    <div role="button" css={handlerItemWrapperCss}>
      <span css={handlerItemContentCss}>{content}</span>
      <Dropdown
        dropList={dropList}
        trigger="click"
        triggerProps={{
          openDelay: 0,
          closeDelay: 0,
          showArrow: false,
        }}
      >
        <span css={handlerItemMoreCss}>
          <MoreIcon />
        </span>
      </Dropdown>
    </div>
  )
}
