import { FC, useMemo } from "react"
import { widgetBuilder } from "@/wrappedComponents/WidgetBuilder"
import { TransformWidgetProps } from "@/wrappedComponents/TransformWidget/interface"

export const TransformWidget: FC<TransformWidgetProps> = (props) => {
  const { componentNode } = props

  const handleUpdateDsl = (value: Record<string, any>) => {}

  const ChildComponent = useMemo(() => {
    const { type, props: componentNodeProps = {} } = componentNode
    if (!type) return null
    const COMP = widgetBuilder(type).widget
    if (!COMP) return null
    return <COMP {...componentNodeProps} handleUpdateDsl={handleUpdateDsl} />
  }, [componentNode])

  return ChildComponent
}
