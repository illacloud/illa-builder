import { FC, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get } from "lodash"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { TransformWidgetProps } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/interface"
import { GLOBAL_DATA_CONTEXT } from "@/page/App/context/globalDataProvider"
import { EventsInProps } from "@/widgetLibrary/interface"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { BasicWrapper } from "@/widgetLibrary/PublicSector/BasicWrapper"
import Label from "@/widgetLibrary/PublicSector/Label"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
  widgetWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { runEventHandler } from "@/utils/eventHandlerHelper"

export const needFullHeightWrapper = (type: string): boolean => {
  return (
    type === "TEXT_WIDGET" ||
    type === "IMAGE_WIDGET" ||
    type === "BUTTON_WIDGET"
  )
}

export const getEventScripts = (events: EventsInProps[], eventType: string) => {
  return events.filter((event) => {
    return event.eventType === eventType
  })
}

export const TransformWidgetWrapper: FC<TransformWidgetProps> = (props) => {
  const { componentNode, ...otherProps } = props

  const { displayName, type } = componentNode

  const displayNameMapProps = useSelector(getExecutionResult)
  const { handleUpdateGlobalData, handleDeleteGlobalData, globalData } =
    useContext(GLOBAL_DATA_CONTEXT)
  const dispatch = useDispatch()

  const realProps = displayNameMapProps[displayName] ?? {}
  if (!type) return null
  const COMP = widgetBuilder(type).widget
  if (!COMP) return null

  const handleUpdateDsl = (value: Record<string, any>) => {
    dispatch(
      executionActions.updateExecutionByDisplayNameReducer({
        displayName,
        value,
      }),
    )
  }

  const getOnChangeEventScripts = () => {
    const events = get(realProps, "events")
    if (events) {
      return getEventScripts(events, "change")
    }
    return []
  }

  const getOnClickEventScripts = () => {
    const events = get(realProps, "events")
    if (events) {
      return getEventScripts(events, "click")
    }
    return []
  }

  const handleOnChange = () => {
    getOnChangeEventScripts().forEach((scriptObj) => {
      runEventHandler(scriptObj, globalData)
    })
  }

  const handleOnClick = () => {
    getOnClickEventScripts().forEach((scriptObj) => {
      runEventHandler(scriptObj, globalData)
    })
  }

  const {
    tooltipText,
    label,
    labelAlign,
    labelWidth,
    labelPosition,
    labelCaption,
    labelWidthUnit,
    labelHidden,
    required,
    hidden,
    value,
    regex,
    pattern,
    minLength,
    maxLength,
    customRule,
    hideValidationMessage,
  } = realProps

  const fullHeight = needFullHeightWrapper(type)

  return (
    <BasicWrapper tooltipText={tooltipText} hidden={hidden}>
      <div css={applyLabelAndComponentWrapperStyle(labelPosition, fullHeight)}>
        <Label
          label={label}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          labelCaption={labelCaption}
          labelWidthUnit={labelWidthUnit}
          labelPosition={labelPosition}
          required={required}
          labelHidden={labelHidden}
        />
        <COMP
          {...realProps}
          handleUpdateGlobalData={handleUpdateGlobalData}
          handleDeleteGlobalData={handleDeleteGlobalData}
          handleOnChange={handleOnChange}
          handleOnClick={handleOnClick}
          handleUpdateDsl={handleUpdateDsl}
          displayName={displayName}
        />
      </div>
      <div css={applyValidateMessageWrapperStyle(labelWidth, labelPosition)}>
        <InvalidMessage
          value={value}
          pattern={pattern}
          regex={regex}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          customRule={customRule}
          hideValidationMessage={hideValidationMessage}
        />
      </div>
    </BasicWrapper>
  )
}
