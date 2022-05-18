import { useState } from "react"
import {
  ActionCSS,
  DashBorderBottomCSS,
  FillingCSS,
  GridHandlersCSS,
  PanelPaddingCSS,
  PanelSubBarCSS,
  SectionTitleCSS,
} from "@/page/Editor/components/ActionEditor/ActionEditorPanel/style"
import {
  applyMargin,
  applyPadding,
  applyIllaColor,
} from "@/page/Editor/components/ActionEditor/style"
import { EditorInput } from "@/components/EditorInput"
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
            applyPadding("top", 16),
            applyPadding("left", 16),
            applyIllaColor("grayBlue", "06"),
          ]}
        >
          EVENT HANDLER
        </div>
        <div css={PanelSubBarCSS}>
          <label css={[SectionTitleCSS, DashBorderBottomCSS]}>Success</label>
        </div>
        <div
          css={[
            applyPadding("right", 16),
            applyPadding("left", 16),
            applyPadding("bottom", 8),
            GridHandlersCSS,
          ]}
        >
          {handlerList.map((item) => (
            <Input key={item.key} addonAfter={{ render: <MoreIcon /> }} />
          ))}
        </div>
        <div css={applyPadding("left", 16)}>
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
