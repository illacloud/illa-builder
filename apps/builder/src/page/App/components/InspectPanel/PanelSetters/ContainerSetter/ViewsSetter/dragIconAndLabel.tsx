import { get } from "lodash-es"
import { FC, MouseEvent, useCallback, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  DragPointIcon,
  Trigger,
  WarningCircleIcon,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import { ViewListSetterContext } from "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/ViewsSetter/context/viewsListContext"
import {
  DragIconAndLabelProps,
  ViewItemShape,
} from "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/ViewsSetter/interface"
import {
  applyOptionStyle,
  labelAndDragIconWrapperStyle,
  labelWrapperStyle,
  moveIconStyle,
} from "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/ViewsSetter/style"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"

interface optionIconProps {
  isSelected: boolean
  onClick: (e: MouseEvent<HTMLDivElement>) => void
}

const OptionIcon: FC<optionIconProps> = ({ isSelected, onClick }) => {
  return <div css={applyOptionStyle(isSelected)} onClick={onClick} />
}

export const DragIconAndLabel: FC<DragIconAndLabelProps> = (props) => {
  const { index, label, isSelected } = props
  const { widgetDisplayName, attrPath, handleUpdateCurrentViewIndex } =
    useContext(ViewListSetterContext)

  const { t } = useTranslation()
  const executionResult = useSelector(getExecutionResult)

  const currentViews = useMemo(() => {
    return get(executionResult, `${widgetDisplayName}.${attrPath}.${index}`, {})
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
        <OptionIcon isSelected={isSelected} onClick={handleChangeCurrentView} />
        <span style={{ maxWidth: "147px" }}>{label}</span>
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
