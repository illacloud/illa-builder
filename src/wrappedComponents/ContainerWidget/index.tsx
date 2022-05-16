import { FC, useCallback, useEffect, useRef, useState } from "react"
import { BaseWidget } from "../BaseWidget"
import { ContainerWidgetProps } from "./interface"
import { widgetBuilder } from "../WidgetBuilder"
import { generateWidgetProps, WidgetConfig } from "../utils"

export const CONTAINER_WIDGET_CONFIG = {
  type: "CONTAINER_WIDGET",
  version: "0.0.1",
  defaults: {
    backgroundColor: "#FFFFFF",
    rows: 40,
    columns: 24,
    widgetName: "Container",
    containerStyle: "card",
    borderColor: "transparent",
    borderWidth: "0",
    borderRadius: "0",
    children: [],
  },
}

export const ContainerWidget: FC<ContainerWidgetProps> = (
  ContainerWidgetProp,
) => {
  const { children, props, id } = ContainerWidgetProp

  console.log(widgetBuilder(), 'widgetBuilder')

  return (
    <BaseWidget {...ContainerWidgetProp}>
      {children?.map((value) => {
        const { type } = value
        const child = widgetBuilder()[type]
        let { defaults } = child.config
        const widgetProps = {
          ...value,
          props: {
            ...defaults,
            ...value.props,
          },
        }
        const childProps = generateWidgetProps(
          id,
          props,
          widgetProps as unknown as WidgetConfig,
        )
        return <child.widget {...childProps} />
      })}
    </BaseWidget>
  )
}

ContainerWidget.displayName = "ContainerWidget"
