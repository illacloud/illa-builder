import { useState } from "react"
import {
  DashBorderBottomCSS,
  GridHandlersCSS,
  PanelSubBarCSS,
  SectionTitleCSS,
} from "@/page/Editor/components/ActionEditor/ActionEditorPanel/style"
import {
  applyPaddingSingle,
  applyIllaColor,
  applyPadding,
} from "@/page/Editor/components/ActionEditor/style"
import { Input } from "@illa-design/input"
import { MoreIcon, PlusIcon } from "@illa-design/icon"
import { Button } from "@illa-design/button"
import { v4 as uuid } from "uuid"

export const EventHandler = () => {
  const [handlerList, setHandlerList] = useState([{ key: uuid() }])
  return (
    <>
      <div>
        <div
          css={[
            SectionTitleCSS,
            applyPadding(16, 16, 0),
            applyIllaColor("grayBlue", "06"),
          ]}
        >
          EVENT HANDLER
        </div>
        <div css={PanelSubBarCSS}>
          <label css={[SectionTitleCSS, DashBorderBottomCSS]}>Success</label>
        </div>
        <div css={[applyPadding(0, 16, 8), GridHandlersCSS]}>
          {handlerList.map((item) => (
            <Input key={item.key} addonAfter={{ render: <MoreIcon /> }} />
          ))}
        </div>
        <div css={applyPaddingSingle("left", 16)}>
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
