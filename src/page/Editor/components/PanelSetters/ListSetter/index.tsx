import { FC, useCallback, useMemo } from "react"
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

export const ListSetter: FC<ListSetterProps> = (props) => {
  const {
    labelName,
    labelDesc,
    childrenSetter,
    useCustomLabel,
    panelConfig,
    handleUpdateConfigPanel,
  } = props

  const getDslKeys = useMemo(() => {
    const hadKeysMapped = new Map()
    if (panelConfig) {
      const dslKeys = Object.keys(panelConfig as Record<string, any>)
      dslKeys.forEach((key: string) => {
        const value = panelConfig[key]
        hadKeysMapped.set(key, value)
      })
    }
    return hadKeysMapped
  }, [panelConfig])

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
    return getChildrenDefaultKeys.some((key) => {
      return getDslKeys.has(key) && getDslKeys.get(key) !== getDefaultValue[key]
    })
  }, [getDslKeys])

  const onClickReset = useCallback(() => {
    handleUpdateConfigPanel(getDefaultValue)
  }, [getDefaultValue, handleUpdateConfigPanel])

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
                    strokeWidth="1.3125"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>reset</span>
            </div>
          )}
        </div>
      )}
      <div css={listWrapperCss}>
        {childrenSetter?.map((child) => {
          return renderFieldAndLabel(child, panelConfig.id, true)
        })}
      </div>
    </div>
  )
}

ListSetter.displayName = "ListSetter"
