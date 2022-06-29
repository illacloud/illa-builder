import { FC, useCallback, useMemo } from "react"
import _ from "lodash"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { ListSetterProps } from "./interface"
import { renderFieldAndLabel } from "@/page/App/components/InspectPanel/utils/fieldFactory"
import {
  labelStyle,
  listSetterWrapperStyle,
  listWrapperStyle,
  resetButtonStyle,
  resetIconStyle,
} from "./style"
import { ResetIcon } from "@illa-design/icon"

export const ListSetter: FC<ListSetterProps> = (props) => {
  const {
    labelName,
    labelDesc,
    childrenSetter,
    panelConfig,
    attrName,
    handleUpdateDsl,
    value,
  } = props

  const getDefaultValue = useMemo(() => {
    if (childrenSetter) {
      let defaultValues: Record<string, any> = {}
      childrenSetter.forEach((child) => {
        const childAttrName = child.attrName
        const defaultValue = child.defaultValue
        defaultValues = {
          ...defaultValues,
          [childAttrName]: defaultValue,
        }
      })
      return defaultValues
    }
    return {}
  }, [childrenSetter])

  const canReset = useMemo(() => {
    return !_.isEqual(getDefaultValue, value)
  }, [getDefaultValue, value])

  const onClickReset = useCallback(() => {
    handleUpdateDsl(attrName, getDefaultValue)
  }, [attrName, getDefaultValue, handleUpdateDsl])

  return (
    <div css={listSetterWrapperStyle}>
      <div css={labelStyle}>
        <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        {canReset && (
          <div onClick={onClickReset} css={resetButtonStyle}>
            <span css={resetIconStyle}>
              <ResetIcon />
            </span>
            <span>reset</span>
          </div>
        )}
      </div>
      <div css={listWrapperStyle}>
        {childrenSetter?.map((child) => {
          return renderFieldAndLabel(child, panelConfig.id, true, attrName)
        })}
      </div>
    </div>
  )
}

ListSetter.displayName = "ListSetter"
