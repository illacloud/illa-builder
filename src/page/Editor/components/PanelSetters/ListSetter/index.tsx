import { FC, useCallback, useContext, useMemo } from "react"
import { PanelLabel } from "@/page/Editor/components/InspectPanel/label"
import { ListSetterProps } from "./interface"
import { renderFieldAndLabel } from "@/page/Editor/components/InspectPanel/utils/fieldFactory"
import {
  labelCss,
  listSetterWrapperCss,
  listWrapperCss,
  resetButtonCss,
  resetIconCss,
} from "./style"
import { ConfigPanelContext } from "@/page/Editor/components/InspectPanel/context"

export const ListSetter: FC<ListSetterProps> = (props) => {
  const { labelName, labelDesc, childrenSetter, useCustomLabel } = props

  const { componentDsl, tempProps, handleUpdateDsl } =
    useContext(ConfigPanelContext)

  const getDslKeys = useMemo(() => {
    const hadKeysMapped = new Map()
    if (tempProps) {
      const dslKeys = Object.keys(tempProps as Record<string, any>)
      dslKeys.forEach((key: string) => {
        const value = tempProps[key]
        hadKeysMapped.set(key, value)
      })
    }
    return hadKeysMapped
  }, [tempProps])

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

  const getChildrenDefaultKeys = useMemo(() => {
    if (childrenSetter) {
      return childrenSetter.map((child) => {
        return child.attrName
      })
    }
    return []
  }, [childrenSetter])

  const canReset = useMemo(() => {
    console.log("getDslKeys", getDslKeys)
    return getChildrenDefaultKeys.some((key) => {
      return getDslKeys.has(key) && getDslKeys.get(key) !== getDefaultValue[key]
    })
  }, [getDslKeys])

  const onClickReset = useCallback(() => {
    handleUpdateDsl(getDefaultValue)
  }, [getDefaultValue, handleUpdateDsl])

  return (
    <div css={listSetterWrapperCss}>
      {useCustomLabel && (
        <div css={labelCss}>
          <PanelLabel labelName={labelName} labelDesc={labelDesc} />
          {canReset && (
            <div onClick={onClickReset} css={resetButtonCss}>
              <div css={resetIconCss}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.41057 3.5H8.53467C10.226 3.5 11.5972 4.87113 11.5972 6.5625V6.5625C11.5972 8.25387 10.226 9.625 8.53467 9.625H2.41052M2.41052 9.625L3.93745 7.875M2.41052 9.625L3.93745 11.375"
                    stroke="#1D2129"
                    stroke-width="1.3125"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span>reset</span>
            </div>
          )}
        </div>
      )}
      <div css={listWrapperCss}>
        {childrenSetter?.map((child, index) => {
          return renderFieldAndLabel(child, componentDsl.id, true)
        })}
      </div>
    </div>
  )
}

ListSetter.displayName = "ListSetter"
