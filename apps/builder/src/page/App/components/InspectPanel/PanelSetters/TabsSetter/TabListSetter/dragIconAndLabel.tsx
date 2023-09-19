import { get } from "lodash"
import { FC, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  DragPointIcon,
  Trigger,
  WarningCircleIcon,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { TabListSetterContext } from "./context/tabListContext"
import { DragIconAndLabelProps, ViewItemShape } from "./interface"
import {
  labelAndDragIconWrapperStyle,
  labelWrapperStyle,
  moveIconStyle,
} from "./style"

export const DragIconAndLabel: FC<DragIconAndLabelProps> = (props) => {
  const { index } = props
  const { widgetDisplayName, attrPath } = useContext(TabListSetterContext)

  const { t } = useTranslation()
  const executionResult = useSelector(getExecutionResult)

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

  return (
    <span css={labelAndDragIconWrapperStyle}>
      <DragPointIcon css={moveIconStyle} id="dragIcon" />
      <div css={labelWrapperStyle}>
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
