import { useState } from "react"
import { Input } from "@illa-design/input"
import { MoreIcon, PlusIcon } from "@illa-design/icon"
import { Button } from "@illa-design/button"
import { v4 as uuid } from "uuid"
import {
  DashBorderBottomCSS,
  GridHandlersCSS,
  HandlerMoreIconCSS,
  HandlerTitleCSS,
  NewBtnCSS,
  PanelSubBarCSS,
  SectionTitleCSS,
} from "@/page/Editor/components/ActionEditor/ActionEditorPanel/style"

export const EventHandler = () => {
  const [handlerList, setHandlerList] = useState([{ key: uuid() }])
  return (
    <>
      <div>
        <div css={HandlerTitleCSS}>EVENT HANDLER</div>
        <div css={PanelSubBarCSS}>
          <label css={[SectionTitleCSS, DashBorderBottomCSS]}>Success</label>
        </div>
        <div css={GridHandlersCSS}>
          {handlerList.map((item) => (
            <Input
              key={item.key}
              addonAfter={{
                custom: true,
                render: (
                  <span css={HandlerMoreIconCSS}>
                    <MoreIcon />
                  </span>
                ),
              }}
            />
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
      </div>
    </>
  )
}
