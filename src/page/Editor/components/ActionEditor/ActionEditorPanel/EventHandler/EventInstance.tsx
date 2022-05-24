import { useState } from "react"
import {
  DashBorderBottomCSS,
  GridHandlersCSS,
  NewBtnCSS,
  PanelSubBarCSS,
  SectionTitleCSS,
} from "@/page/Editor/components/ActionEditor/ActionEditorPanel/style"
import { Button } from "@illa-design/button"
import { PlusIcon } from "@illa-design/icon"
import { v4 as uuid } from "uuid"
import { HandlerItem } from "./HandlerItem"
import { EventInstanceProps } from "./interface"

export const EventInstance = (props: EventInstanceProps) => {
  const { title } = props
  const [handlerList, setHandlerList] = useState([{ key: uuid() }])
  return (
    <>
      <div css={PanelSubBarCSS}>
        <label css={[SectionTitleCSS, DashBorderBottomCSS]}>{title}</label>
      </div>
      <div css={GridHandlersCSS}>
        {handlerList.map((item) => (
          <HandlerItem key={item.key} content={"ILLA"} />
        ))}
      </div>
      <div css={NewBtnCSS}>
        <Button
          variant="text"
          size="medium"
          colorScheme="techPurple"
          leftIcon={<PlusIcon />}
          onClick={() => {
            setHandlerList([...handlerList, { key: uuid() }])
          }}
        >
          New
        </Button>
      </div>
    </>
  )
}
