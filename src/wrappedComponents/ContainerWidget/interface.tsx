import { DSLWidget, WidgetProps } from "../BaseWidget/interface"

export interface ContainerWidgetProps extends WidgetProps {
  children?: DSLWidget[]
  //
}
