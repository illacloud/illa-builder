import { get, isEqual, set } from "lodash"
import { FC, memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { ResetIcon } from "@illa-design/react"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { renderFieldAndLabel } from "@/page/App/components/InspectPanel/utils/fieldFactory"
import { ListSetterProps } from "./interface"
import {
  labelStyle,
  listSetterWrapperStyle,
  listWrapperStyle,
  resetButtonStyle,
  resetIconStyle,
} from "./style"

export const ListSetter: FC<ListSetterProps> = memo(
  (props: ListSetterProps) => {
    const {
      labelName,
      labelDesc,
      childrenSetter,
      handleUpdateDsl,
      widgetDisplayName,
      panelConfig,
    } = props

    const { t } = useTranslation()

    const childrenSetterAttrPathMapDefaultValue = useMemo(() => {
      const childrenSetterAttrPathMap: Record<string, any> = {}
      if (childrenSetter) {
        childrenSetter.forEach((childSetter) => {
          set(
            childrenSetterAttrPathMap,
            childSetter.attrName,
            childSetter.defaultValue,
          )
        })
      }
      return childrenSetterAttrPathMap
    }, [childrenSetter])

    const canReset = useMemo(() => {
      return Object.keys(childrenSetterAttrPathMapDefaultValue).some((key) => {
        const realValue = get(panelConfig, key)
        const defaultValue = get(childrenSetterAttrPathMapDefaultValue, key)
        return !isEqual(realValue, defaultValue)
      })
    }, [childrenSetterAttrPathMapDefaultValue, panelConfig])

    const onClickReset = useCallback(() => {
      Object.keys(childrenSetterAttrPathMapDefaultValue).forEach((key) => {
        const defaultValue = get(childrenSetterAttrPathMapDefaultValue, key)
        handleUpdateDsl(key, defaultValue)
      })
    }, [childrenSetterAttrPathMapDefaultValue, handleUpdateDsl])

    return (
      <div css={listSetterWrapperStyle}>
        <div css={labelStyle}>
          <PanelLabel labelName={labelName} labelDesc={labelDesc} />
          {canReset && (
            <div onClick={onClickReset} css={resetButtonStyle}>
              <span css={resetIconStyle}>
                <ResetIcon />
              </span>
              <span>
                {t("editor.inspect.setter_content.list_setter.reset")}
              </span>
            </div>
          )}
        </div>
        <div css={listWrapperStyle}>
          {childrenSetter?.map((child) => {
            return renderFieldAndLabel(child, widgetDisplayName ?? "", true, "")
          })}
        </div>
      </div>
    )
  },
)

ListSetter.displayName = "ListSetter"
