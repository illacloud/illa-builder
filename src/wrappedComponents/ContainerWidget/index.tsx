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
    width: "100%",
    height: "100%",
    widgetName: "Container",
    containerStyle: "card",
    borderColor: "transparent",
    borderWidth: "0",
    borderRadius: "0",
    children: [],
  },
}

export const ContainerWidget: FC<ContainerWidgetProps> = (
  containerWidgetProps,
) => {
  const { children, props, id, type } = containerWidgetProps
  const defaultProps = widgetBuilder()[type].config
  const currentProps = {
    ...containerWidgetProps,
    props: {
      ...defaultProps,
      ...props,
    },
  }

  return (
    <BaseWidget {...currentProps}>
      <div
        id={id}
        style={{
          ...props,
        }}
      >
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
          return <child.widget key={value.id} {...childProps} />
        })}
      </div>
    </BaseWidget>
  )
}

ContainerWidget.displayName = "ContainerWidget"
