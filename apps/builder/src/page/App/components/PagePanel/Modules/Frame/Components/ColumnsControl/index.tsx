import { FC, useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { InputNumber } from "@illa-design/react"
import { PageLabel } from "@/page/App/components/PagePanel/Components/Label"
import { LeftAndRightLayout } from "@/page/App/components/PagePanel/Layout/leftAndRight"
import { SetterPadding } from "@/page/App/components/PagePanel/Layout/setterPadding"
import { ColumnsControlProps } from "@/page/App/components/PagePanel/Modules/Frame/Components/ColumnsControl/interface"
import { getCurrentPageSectionColumns } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ILLAEventbus, PAGE_EDITOR_EVENT_PREFIX } from "@/utils/eventBus"
import {
  BASIC_BLOCK_COLUMNS,
  LEFT_OR_RIGHT_DEFAULT_COLUMNS,
} from "@/utils/generators/generatePageOrSectionConfig"

export const ColumnsControl: FC<ColumnsControlProps> = (props) => {
  const { columns, currentPageDisplayName, attrName } = props
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState<number | undefined>(columns)
  const prevColumns = useRef(columns)
  const dispatch = useDispatch()
  const columnsConfig = useSelector(getCurrentPageSectionColumns)

  useEffect(() => {
    if (prevColumns?.current !== columns && inputValue !== columns) {
      setInputValue(columns)
    }
    prevColumns.current = columns
  }, [columns, inputValue])

  const showColumns = useCallback(() => {
    switch (attrName) {
      case "rightColumns": {
        ILLAEventbus.emit(
          `${PAGE_EDITOR_EVENT_PREFIX}/SHOW_COLUMNS_PREVIEW_RIGHT_SECTION`,
        )
        break
      }

      case "leftColumns": {
        ILLAEventbus.emit(
          `${PAGE_EDITOR_EVENT_PREFIX}/SHOW_COLUMNS_PREVIEW_LEFT_SECTION`,
        )
        break
      }
      case "bodyColumns": {
        ILLAEventbus.emit(
          `${PAGE_EDITOR_EVENT_PREFIX}/SHOW_COLUMNS_PREVIEW_BODY_SECTION`,
        )
        break
      }
      case "footerColumns": {
        ILLAEventbus.emit(
          `${PAGE_EDITOR_EVENT_PREFIX}/SHOW_COLUMNS_PREVIEW_FOOTER_SECTION`,
        )
        break
      }
      case "headerColumns": {
        ILLAEventbus.emit(
          `${PAGE_EDITOR_EVENT_PREFIX}/SHOW_COLUMNS_PREVIEW_HEADER_SECTION`,
        )
        break
      }
      default: {
        break
      }
    }
  }, [attrName])

  const handleFocusInput = useCallback(() => {
    showColumns()
  }, [showColumns])

  const hideColumns = useCallback(() => {
    switch (attrName) {
      case "rightColumns": {
        ILLAEventbus.emit(
          `${PAGE_EDITOR_EVENT_PREFIX}/HIDE_COLUMNS_PREVIEW_RIGHT_SECTION`,
        )
        break
      }

      case "leftColumns": {
        ILLAEventbus.emit(
          `${PAGE_EDITOR_EVENT_PREFIX}/HIDE_COLUMNS_PREVIEW_LEFT_SECTION`,
        )
        break
      }
      case "bodyColumns": {
        ILLAEventbus.emit(
          `${PAGE_EDITOR_EVENT_PREFIX}/HIDE_COLUMNS_PREVIEW_BODY_SECTION`,
        )
        break
      }
      case "footerColumns": {
        ILLAEventbus.emit(
          `${PAGE_EDITOR_EVENT_PREFIX}/HIDE_COLUMNS_PREVIEW_FOOTER_SECTION`,
        )
        break
      }
      case "headerColumns": {
        ILLAEventbus.emit(
          `${PAGE_EDITOR_EVENT_PREFIX}/HIDE_COLUMNS_PREVIEW_HEADER_SECTION`,
        )
        break
      }
      default: {
        break
      }
    }
  }, [attrName])

  const showColumnsChange = useCallback(() => {
    switch (attrName) {
      case "rightColumns": {
        ILLAEventbus.emit(
          `${PAGE_EDITOR_EVENT_PREFIX}/SHOW_COLUMNS_CHANGE_PREVIEW_RIGHT_SECTION`,
        )
        break
      }

      case "leftColumns": {
        ILLAEventbus.emit(
          `${PAGE_EDITOR_EVENT_PREFIX}/SHOW_COLUMNS_CHANGE_PREVIEW_LEFT_SECTION`,
        )
        break
      }
      case "bodyColumns": {
        ILLAEventbus.emit(
          `${PAGE_EDITOR_EVENT_PREFIX}/SHOW_COLUMNS_CHANGE_PREVIEW_BODY_SECTION`,
        )
        break
      }
      case "footerColumns": {
        ILLAEventbus.emit(
          `${PAGE_EDITOR_EVENT_PREFIX}/SHOW_COLUMNS_CHANGE_PREVIEW_FOOTER_SECTION`,
        )
        break
      }
      case "headerColumns": {
        ILLAEventbus.emit(
          `${PAGE_EDITOR_EVENT_PREFIX}/SHOW_COLUMNS_CHANGE_PREVIEW_HEADER_SECTION`,
        )
        break
      }
      default: {
        break
      }
    }
  }, [attrName])

  const handleBlur = useCallback(() => {
    if (!inputValue || !currentPageDisplayName) {
      hideColumns()
      return
    }
    let finalColumns = inputValue
    switch (attrName) {
      case "rightColumns":
      case "leftColumns": {
        if (finalColumns > LEFT_OR_RIGHT_DEFAULT_COLUMNS) {
          finalColumns = LEFT_OR_RIGHT_DEFAULT_COLUMNS
        }
        break
      }
      case "bodyColumns":
      case "footerColumns":
      case "headerColumns": {
        if (finalColumns > BASIC_BLOCK_COLUMNS) {
          finalColumns = BASIC_BLOCK_COLUMNS
        }
        break
      }

      default: {
        break
      }
    }
    if (finalColumns < 2) {
      finalColumns = 2
    }
    if (finalColumns === columns) {
      hideColumns()
    } else {
      showColumnsChange()
    }
    setInputValue(finalColumns)
    dispatch(
      componentsActions.updateTargetPagePropsReducer({
        pageName: currentPageDisplayName,
        newProps: {
          [attrName]: finalColumns,
        },
        options: {
          ...columnsConfig,
        },
      }),
    )
  }, [
    attrName,
    columns,
    columnsConfig,
    currentPageDisplayName,
    dispatch,
    hideColumns,
    inputValue,
    showColumnsChange,
  ])

  return (
    <LeftAndRightLayout>
      <PageLabel labelName={t("editor.page.label_name.columns")} size="small" />
      <SetterPadding>
        <InputNumber
          w="96px"
          value={inputValue}
          colorScheme="techPurple"
          onChange={setInputValue}
          onBlur={handleBlur}
          step={1}
          onFocus={handleFocusInput}
        />
      </SetterPadding>
    </LeftAndRightLayout>
  )
}

ColumnsControl.displayName = "ColumnsControl"
