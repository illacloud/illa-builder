import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, useCallback, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, Input, useMessage } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { BuilderModal } from "@/components/Modal"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { getOriginalGlobalData } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { CreateGlobalModalProps } from "./interface"
import {
  codeEditorWrapperStyle,
  footerWrapperStyle,
  modalBodyWrapperStyle,
  singleLineWrapperStyle,
} from "./style"

interface IBodyContent {
  variableName: string
  value: string
  onChangeVariableName: (value: string) => void
  onChangeValue: (value: string) => void
}

interface IFooterContent {
  onClickSave: () => void
  onClickDelete: () => void
  canSave: boolean
  actionType: "ADD" | "UPDATE"
}

const BodyContent: FC<IBodyContent> = (props) => {
  const { variableName, value, onChangeVariableName, onChangeValue } = props

  const { t } = useTranslation()
  return (
    <div css={modalBodyWrapperStyle}>
      <div css={singleLineWrapperStyle}>
        <PanelLabel
          labelName={t(
            "editor.data_work_space.global_data_modal.variable_name.label",
          )}
          labelDesc={t(
            "editor.data_work_space.global_data_modal.variable_name.tooltips",
          )}
        />
        <Input
          w="184px"
          colorScheme="techPurple"
          value={variableName}
          onChange={onChangeVariableName}
          error={!variableName}
        />
      </div>
      <div css={singleLineWrapperStyle}>
        <PanelLabel
          labelName={t(
            "editor.data_work_space.global_data_modal.initial_value.label",
          )}
          labelDesc={t(
            "editor.data_work_space.global_data_modal.initial_value.tooltips",
          )}
        />
        <CodeEditor
          wrapperCss={codeEditorWrapperStyle}
          singleLine
          value={value}
          onChange={onChangeValue}
          modalTitle={t(
            "editor.data_work_space.global_data_modal.initial_value.label",
          )}
          modalDescription={t(
            "editor.data_work_space.global_data_modal.initial_value.tooltips",
          )}
          placeholder={t(
            "editor.data_work_space.global_data_modal.initial_value.placeholder",
          )}
        />
      </div>
    </div>
  )
}

const FooterContent: FC<IFooterContent> = (props) => {
  const { t } = useTranslation()
  const { actionType, canSave, onClickSave, onClickDelete } = props
  return (
    <div css={footerWrapperStyle}>
      <Button
        colorScheme="techPurple"
        fullWidth
        fullHeight
        onClick={onClickSave}
        disabled={!canSave}
      >
        {t("save")}
      </Button>
      {actionType === "UPDATE" && (
        <Button colorScheme="red" fullWidth fullHeight onClick={onClickDelete}>
          {t("editor.context_menu.delete")}
        </Button>
      )}
    </div>
  )
}

const getPrevName = (actionType: "ADD" | "UPDATE", variableName?: string) => {
  return actionType === "ADD" ? "" : variableName ?? ""
}

const getPrevValue = (
  actionType: "ADD" | "UPDATE",
  globalData: Record<string, string>,
  variableName?: string,
) => {
  return actionType === "ADD" ? "" : globalData[variableName!] ?? ""
}

const PREFIX = "state"

const generateGlobalDataKey = (hadGlobalDataKeys: string[]) => {
  let i = 1
  while (hadGlobalDataKeys.includes(`${PREFIX}${i}`)) {
    i++
  }
  return `${PREFIX}${i}`
}

export const CreateGlobalStateModal: FC<CreateGlobalModalProps> = (props) => {
  const { variableName = "", actionType, onClose } = props
  const message = useMessage()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const globalData = useSelector(getOriginalGlobalData)
  const hadGlobalDataKeys = Object.keys(globalData)
  const [currentVariableName, setCurrentVariableName] = useState(
    getPrevName(actionType, variableName) ||
      generateGlobalDataKey(hadGlobalDataKeys),
  )
  const [currentValue, setCurrentValue] = useState(
    getPrevValue(actionType, globalData, variableName),
  )

  const prevVariableName = useRef<string>(getPrevName(actionType, variableName))
  const prevValue = useRef<string>(
    getPrevValue(actionType, globalData, variableName),
  )

  const onClickSave = useCallback(() => {
    const formatLabel = currentVariableName.trim()
    if (formatLabel === "") {
      message.error({
        content: t(
          "editor.data_work_space.global_data_modal.variable_name.message",
        ),
      })
      return
    }
    if (
      prevVariableName.current !== currentVariableName &&
      hadGlobalDataKeys.includes(currentVariableName)
    ) {
      message.error({
        content: t("editor.display_name.duplicate_error", {
          displayName: currentVariableName,
        }),
      })
      return
    }
    onClose()
    if (
      prevVariableName.current === currentVariableName &&
      prevValue.current === currentValue
    ) {
      return
    }
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "global_modal_save",
      parameter2: actionType === "ADD" ? "add" : "edit",
      parameter3: {
        name: formatLabel,
        variable: currentValue,
      },
    })
    dispatch(
      componentsActions.setGlobalStateReducer({
        key: formatLabel,
        value: currentValue,
        oldKey: prevVariableName.current,
      }),
    )
  }, [
    currentVariableName,
    hadGlobalDataKeys,
    onClose,
    currentValue,
    actionType,
    dispatch,
    message,
    t,
  ])

  const onClickDelete = useCallback(() => {
    if (!variableName) return
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "global_modal_delete",
    })
    dispatch(
      componentsActions.deleteGlobalStateByKeyReducer({
        key: variableName,
      }),
    )
  }, [dispatch, variableName])

  return (
    <BuilderModal
      w={328}
      title={t("editor.data_work_space.global_data_modal.title")}
      bodyContent={
        <BodyContent
          variableName={currentVariableName}
          value={currentValue}
          onChangeVariableName={setCurrentVariableName}
          onChangeValue={setCurrentValue}
        />
      }
      onClose={onClose}
      footerContent={
        <FooterContent
          onClickSave={onClickSave}
          onClickDelete={onClickDelete}
          actionType={actionType}
          canSave={!!currentVariableName}
        />
      }
    />
  )
}

CreateGlobalStateModal.displayName = "CreateGlobalStateModal"
