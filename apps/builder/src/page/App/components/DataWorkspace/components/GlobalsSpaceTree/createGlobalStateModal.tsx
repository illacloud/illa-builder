import { FC, useCallback, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, Input } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { BuilderModal } from "@/components/Modal"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { getOriginalGlobalData } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
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
  const { onClickSave } = props
  return (
    <div css={footerWrapperStyle}>
      <Button
        colorScheme="techPurple"
        fullWidth
        fullHeight
        onClick={onClickSave}
      >
        {t("save")}
      </Button>
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

export const CreateGlobalStateModal: FC<CreateGlobalModalProps> = (props) => {
  const { variableName, actionType, onClose } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const globalData = useSelector(getOriginalGlobalData)

  const [currentVariableName, setCurrentVariableName] = useState("")
  const [currentValue, setCurrentValue] = useState("")

  const prevVariableName = useRef<string>(getPrevName(actionType, variableName))
  const prevValue = useRef<string>(
    getPrevValue(actionType, globalData, variableName),
  )

  const onClickSave = useCallback(() => {
    const formatLabel = currentVariableName.trim()
    if (formatLabel === "") {
      console.error("must have label")
      return
    }
    onClose()
    if (
      prevVariableName.current === currentVariableName &&
      prevValue.current === currentValue
    ) {
      return
    }
    dispatch(
      componentsActions.setGlobalStateReducer({
        key: formatLabel,
        value: currentValue,
      }),
    )
  }, [currentVariableName, onClose, currentValue, dispatch])

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
      footerContent={<FooterContent onClickSave={onClickSave} />}
      footerH={48}
    />
  )
}

CreateGlobalStateModal.displayName = "CreateGlobalStateModal"
