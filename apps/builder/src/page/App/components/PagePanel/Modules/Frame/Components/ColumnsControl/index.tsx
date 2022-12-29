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
      prevColumns.current = columns
    }
  }, [columns, inputValue])

  const handleBlur = useCallback(() => {
    if (!inputValue || !currentPageDisplayName) return
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
  }, [attrName, columnsConfig, currentPageDisplayName, dispatch, inputValue])

  return (
    <LeftAndRightLayout>
      <PageLabel labelName={t("editor.page.label_name.columns")} size="small" />
      <SetterPadding>
        <InputNumber
          w="96px"
          value={inputValue}
          borderColor="techPurple"
          onChange={setInputValue}
          onBlur={handleBlur}
          step={1}
        />
      </SetterPadding>
    </LeftAndRightLayout>
  )
}

ColumnsControl.displayName = "ColumnsControl"
