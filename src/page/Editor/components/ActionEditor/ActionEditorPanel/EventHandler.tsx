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
  MoreListCSS,
  MoreListItemCSS,
  MoreListItemWarnCSS,
  NewBtnCSS,
  PanelSubBarCSS,
  SectionTitleCSS,
} from "@/page/Editor/components/ActionEditor/ActionEditorPanel/style"

export const EventHandler = () => {
  const [successHandlerList, setSuccessHandlerList] = useState([
    { key: uuid() },
  ])
  const [failureHandlerList, setFailureHandlerList] = useState([
    { key: uuid() },
  ])

  const dropList = (
    <ul css={MoreListCSS}>
      <li css={MoreListItemCSS}>Duplicate</li>
      <li css={MoreListItemWarnCSS}>Delete</li>
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
                  <Dropdown dropList={dropList} trigger="click">
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
                  <Dropdown dropList={dropList} trigger="click">
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
