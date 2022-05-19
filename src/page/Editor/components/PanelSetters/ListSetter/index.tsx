import { FC, useCallback, useContext, useMemo } from "react"
import PanelLabel from "@/page/Editor/components/InspectPanel/label"
import { ListSetterProps } from "./interface"
import { renderFieldAndLabel } from "@/page/Editor/components/InspectPanel/utils/fieldFactory"
import { labelCss, listWrapperCss } from "./style"
import { ConfigPanelContext } from "@/page/Editor/components/InspectPanel/context"

const ListSetter: FC<ListSetterProps> = (props) => {
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
    <>
      {useCustomLabel && (
        <div css={labelCss}>
          <PanelLabel labelName={labelName} labelDesc={labelDesc} />
          {canReset && <div onClick={onClickReset}>reset</div>}
        </div>
      )}
      <div css={listWrapperCss}>
        {childrenSetter?.map((child, index) => {
          return renderFieldAndLabel(child, componentDsl.id, true)
        })}
      </div>
    </>
  )
}

export default ListSetter
