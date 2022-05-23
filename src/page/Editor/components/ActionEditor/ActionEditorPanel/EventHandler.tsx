import { useState } from "react"
import { Input } from "@illa-design/input"
import { MoreIcon, PlusIcon } from "@illa-design/icon"
import { Button } from "@illa-design/button"
import { Dropdown } from "@illa-design/dropdown"
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
import {
  NewQueryOptionsItemCSS,
  NewQueryOptionsListCSS,
} from "@/page/Editor/components/ActionEditor/QueryList/style"

export const EventHandler = () => {
  const [successHandlerList, setSuccessHandlerList] = useState([
    { key: uuid() },
  ])
  const [failureHandlerList, setFailureHandlerList] = useState([
    { key: uuid() },
  ])

  const dropList = (
    <ul>
      <ul css={NewQueryOptionsListCSS}>
        <li css={NewQueryOptionsItemCSS}>Duplicate</li>
        <li css={NewQueryOptionsItemCSS}>Delete</li>
      </ul>
    </ul>
  )

  return (
    <>
      <div>
        <div css={HandlerTitleCSS}>EVENT HANDLER</div>
        <div css={PanelSubBarCSS}>
          <label css={[SectionTitleCSS, DashBorderBottomCSS]}>Success</label>
        </div>
        <div css={GridHandlersCSS}>
          {successHandlerList.map((item) => (
            <Input
              key={item.key}
              addonAfter={{
                custom: true,
                render: (
                  <Dropdown dropList={dropList}>
                    <span css={HandlerMoreIconCSS}>
                      <MoreIcon />
                    </span>
                  </Dropdown>
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
              setSuccessHandlerList([...successHandlerList, { key: uuid() }])
            }}
          >
            New
          </Button>
        </div>
        <div css={PanelSubBarCSS}>
          <label css={[SectionTitleCSS, DashBorderBottomCSS]}>Failure</label>
        </div>
        <div css={GridHandlersCSS}>
          {failureHandlerList.map((item) => (
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
              setFailureHandlerList([...failureHandlerList, { key: uuid() }])
            }}
          >
            New
          </Button>
        </div>
      </div>
    </>
  )
}
