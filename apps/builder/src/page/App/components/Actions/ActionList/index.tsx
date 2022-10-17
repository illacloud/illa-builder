import { FC, HTMLAttributes, useState } from "react"
import { List } from "@illa-design/list"
import { useDispatch, useSelector } from "react-redux"
import { ActionListItem } from "@/page/App/components/Actions/ActionListItem"
import { SearchHeader } from "@/page/App/components/Actions/SearchHeader"
import {
  actionListEmptyStyle,
  addNewActionButtonStyle,
  listContainerStyle,
  listStyle,
  searchHeaderContainerStyle,
} from "./style"
import { Button } from "@illa-design/button"
import { useTranslation } from "react-i18next"
import store, { RootState } from "@/store"
import { configActions } from "@/redux/config/configSlice"
import { Modal } from "@illa-design/modal"
import { Empty } from "@illa-design/empty"
import { ReactComponent as ActionListEmptyState } from "@/assets/action-list-empty-state.svg"
import { ActionGenerator } from "@/page/App/components/Actions/ActionGenerator"
import { AddIcon } from "@illa-design/icon"
import { Space } from "@illa-design/space"
import {
  onCopyActionItem,
  onDeleteActionItem,
} from "@/page/App/components/Actions/api"

export const ActionList: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className } = props

  const [generatorVisible, setGeneratorVisible] = useState<boolean>()
  const [searchActionValue, setSearchActionValue] = useState("")
  const actionList = useSelector((state: RootState) => {
    return state.currentApp.action.filter((value) => {
      return value.displayName
        .toLowerCase()
        .includes(searchActionValue.toLowerCase())
    })
  })

  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <div className={className} css={searchHeaderContainerStyle}>
      <SearchHeader
        onSearch={(value) => {
          setSearchActionValue(value)
        }}
      />
      <Button
        colorScheme="techPurple"
        variant="light"
        ml="16px"
        mr="16px"
        mb="8px"
        css={addNewActionButtonStyle}
        onClick={() => setGeneratorVisible(true)}
      >
        <Space size="4px" direction="horizontal" alignItems="center">
          <AddIcon size="14px" />
          {t("editor.action.action_list.btn.new")}
        </Space>
      </Button>
      <div css={listContainerStyle}>
        {actionList.length != 0 && (
          <List
            _css={listStyle}
            bordered={false}
            data={actionList}
            render={(data) => {
              return (
                <ActionListItem
                  action={data}
                  onCopyItem={onCopyActionItem}
                  onDeleteItem={onDeleteActionItem}
                  onItemClick={(action) => {
                    const selectedAction =
                      store.getState().config.selectedAction
                    if (selectedAction === null) {
                      dispatch(configActions.changeSelectedAction(action))
                      return
                    }
                    // is a change action
                    if (selectedAction?.displayName !== action.displayName) {
                      // find last action
                      const lastAction = store
                        .getState()
                        .currentApp.action.find((value) => {
                          return (
                            value.displayName === selectedAction?.displayName
                          )
                        })
                      // if not changed
                      if (
                        JSON.stringify(lastAction) ===
                        JSON.stringify(selectedAction)
                      ) {
                        dispatch(configActions.changeSelectedAction(action))
                      } else {
                        // show dialog
                        Modal.confirm({
                          content: t(
                            "editor.action.action_list.message.confirm_switch",
                          ),
                          onOk: () => {
                            dispatch(configActions.changeSelectedAction(action))
                          },
                        })
                      }
                    }
                  }}
                />
              )
            }}
            renderRaw
            renderKey={(data) => {
              return data.displayName
            }}
          />
        )}
        {actionList.length == 0 && searchActionValue !== "" && (
          <Empty
            paddingVertical="23px"
            divideSize="4px"
            icon={<ActionListEmptyState />}
            description={t("editor.action.action_list.tips.not_found")}
          />
        )}
        {actionList.length == 0 && searchActionValue == "" && (
          <div css={actionListEmptyStyle}>
            {t("editor.action.action_list.tips.empty")}
          </div>
        )}
      </div>
      <ActionGenerator
        visible={generatorVisible}
        onClose={() => setGeneratorVisible(false)}
      />
    </div>
  )
}

ActionList.displayName = "ActionList"
