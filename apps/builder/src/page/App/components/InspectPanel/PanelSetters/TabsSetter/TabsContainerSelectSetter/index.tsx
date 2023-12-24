import { get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { BaseSelectSetterProps } from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/interface"
import SearchSelectSetter from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/searchSelect"
import DynamicSwitchSetter from "@/page/App/components/InspectPanel/PanelSetters/SwitchSetter/dynamicSwitch"
import { getAllContainerWidget } from "@/redux/currentApp/components/componentsSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { containerStyle, selectContainerStyle } from "./style"

const TabsContainerSelectSetter: FC<BaseSelectSetterProps> = (props) => {
  const {
    handleUpdateMultiAttrDSL,
    handleUpdateOtherMultiAttrDSL,
    widgetDisplayName,
    handleUpdateDsl,
  } = props
  const containers = useSelector(getAllContainerWidget)
  const { t } = useTranslation()

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const linkWidgetDisplayName = useMemo(() => {
    return get(targetComponentProps, "linkWidgetDisplayName", "") as string
  }, [targetComponentProps])

  const isLinkToContainer = get(
    targetComponentProps,
    "navigateContainer",
    false,
  )

  const selectedOptions = useMemo(() => {
    if (!containers) return
    return Object.keys(containers)
  }, [containers])

  const handleUpdateViewList = useCallback(
    (attrName: string, targetDisplayName: string) => {
      try {
        const newList = get(containers, `${targetDisplayName}.viewList`, {})
        const currentIndex = get(
          containers,
          `${targetDisplayName}.currentIndex`,
          0,
        )
        const currentKey = get(
          containers,
          `${targetDisplayName}.currentKey`,
          "",
        )
        handleUpdateMultiAttrDSL?.({
          viewList: newList,
          currentIndex,
          currentKey,
          [attrName]: targetDisplayName,
        })
        if (targetDisplayName) {
          const targetLinkedDisplayName = get(
            containers,
            `${targetDisplayName}.linkWidgetDisplayName`,
            [],
          )
          if (targetLinkedDisplayName) {
            handleUpdateOtherMultiAttrDSL?.(targetLinkedDisplayName, {
              linkWidgetDisplayName: undefined,
            })
          }
          handleUpdateOtherMultiAttrDSL?.(targetDisplayName, {
            linkWidgetDisplayName: widgetDisplayName,
          })
        }
      } catch (e) {}
      handleUpdateMultiAttrDSL?.({
        [attrName]: targetDisplayName,
      })
    },
    [
      containers,
      handleUpdateMultiAttrDSL,
      handleUpdateOtherMultiAttrDSL,
      widgetDisplayName,
    ],
  )

  const handleUpdateLinkContainer = useCallback(
    (attrName: string, v: unknown) => {
      if (!v) {
        if (linkWidgetDisplayName) {
          handleUpdateMultiAttrDSL?.({
            linkWidgetDisplayName: undefined,
          })
          handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, {
            linkWidgetDisplayName: undefined,
          })
        }
      } else {
      }

      handleUpdateDsl(attrName, v)
    },
    [
      handleUpdateDsl,
      handleUpdateMultiAttrDSL,
      handleUpdateOtherMultiAttrDSL,
      linkWidgetDisplayName,
    ],
  )

  return (
    <div css={containerStyle}>
      <DynamicSwitchSetter
        {...props}
        labelName={t("editor.inspect.setter_label.link_to_container")}
        value={isLinkToContainer}
        openDynamic
        attrName="navigateContainer"
        expectedType={VALIDATION_TYPES.BOOLEAN}
        handleUpdateDsl={handleUpdateLinkContainer}
      />
      {isLinkToContainer && (
        <div css={selectContainerStyle}>
          <SearchSelectSetter
            {...props}
            options={selectedOptions}
            handleUpdateDsl={handleUpdateViewList}
          />
        </div>
      )}
    </div>
  )
}

TabsContainerSelectSetter.displayName = "TabsContainerSelectSetter"

export default TabsContainerSelectSetter
