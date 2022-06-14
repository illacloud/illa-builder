import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  gridHandlersStyle,
  newBtnStyle,
  panelSubBarStyle,
  sectionTitleStyle,
} from "@/page/App/components/ActionEditor/ActionEditorPanel/style"
import { Button } from "@illa-design/button"
import { PlusIcon } from "@illa-design/icon"
import { v4 as uuid } from "uuid"
import { HandlerItem } from "./HandlerItem"
import { EventInstanceProps } from "./interface"

export const EventInstance = (props: EventInstanceProps) => {
  const { title } = props
  const [handlerList, setHandlerList] = useState([{ key: uuid() }])
  const { t } = useTranslation()

  return (
    <>
      <div css={panelSubBarStyle}>
        <label css={sectionTitleStyle}>{title}</label>
      </div>
      <div css={gridHandlersStyle}>
        {handlerList.map((item) => (
          <HandlerItem key={item.key} content={"ILLA"} />
        ))}
      </div>
      <div css={newBtnStyle}>
        <Button
          variant="text"
          size="medium"
          colorScheme="techPurple"
          leftIcon={<PlusIcon />}
          onClick={() => {
            setHandlerList([...handlerList, { key: uuid() }])
          }}
        >
          {t("editor.action.panel.btn.new")}
        </Button>
      </div>
    </>
  )
}
