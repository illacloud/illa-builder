import { FC, useCallback, useContext, useMemo, MouseEvent } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { DragPointIcon, WarningCircleIcon } from "@illa-design/icon"
import { Trigger } from "@illa-design/trigger"
import { get } from "lodash"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import {
  applyOptionStyle,
  labelAndDragIconWrapperStyle,
  labelWrapperStyle,
  moveIconStyle,
} from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/style"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { ViewListSetterContext } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/context/viewsListContext"
import {
  DragIconAndLabelProps,
  ViewItemShape,
} from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/interface"
import { RootState } from "@/store"

interface optionIconProps {
  isSelected: boolean
  onClick: (e: MouseEvent<HTMLDivElement>) => void
}

const OptionIcon: FC<optionIconProps> = ({ isSelected, onClick }) => {
  return <div css={applyOptionStyle(isSelected)} onClick={onClick} />
}

export const DragIconAndLabel: FC<DragIconAndLabelProps> = (props) => {
  const { index } = props
  const {
    widgetDisplayName,
    attrPath,
    currentViewIndex,
    handleUpdateCurrentViewIndex,
  } = useContext(ViewListSetterContext)

  const { t } = useTranslation()
  const executionResult = useSelector(getExecutionResult)

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const currentViews = useMemo(() => {
    return get(executionResult, `${widgetDisplayName}.${attrPath}.${index}`)
  }, [attrPath, executionResult, index, widgetDisplayName])

  const otherViewKeys = useMemo(() => {
    const allViews = get(
      executionResult,
      `${widgetDisplayName}.${attrPath}`,
      [],
    ) as ViewItemShape[]
    return allViews
      .map((views, i) => views.key || i)
      .filter((key, i) => i != index)
  }, [attrPath, executionResult, index, widgetDisplayName])

  const isDuplicationKey = useMemo(() => {
    return otherViewKeys.some((viewKey) => viewKey == currentViews.key)
  }, [otherViewKeys, currentViews])

  const labelName = useMemo(() => {
    return get(
      executionResult,
      `${widgetDisplayName}.${attrPath}.${index}.label`,
    )
  }, [executionResult, widgetDisplayName, attrPath, index])

  const handleChangeCurrentView = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      handleUpdateCurrentViewIndex(index)
    },
    [handleUpdateCurrentViewIndex, index],
  )

  return (
    <span css={labelAndDragIconWrapperStyle}>
      <DragPointIcon css={moveIconStyle} id="dragIcon" />
      <div css={labelWrapperStyle}>
        <OptionIcon
          isSelected={currentViewIndex === index}
          onClick={handleChangeCurrentView}
        />
        <span style={{ maxWidth: "147px" }}>{labelName}</span>
        {isDuplicationKey && (
          <Trigger
            trigger="hover"
            showArrow={false}
            position="bottom"
            content={`${t("widget.container.key_duplicated")}`}
          >
            <WarningCircleIcon
              color={globalColor(`--${illaPrefix}-orange-03`)}
            />
          </Trigger>
        )}
      </div>
    </span>
  )
}

DragIconAndLabel.displayName = "DragIconAndLabel"
