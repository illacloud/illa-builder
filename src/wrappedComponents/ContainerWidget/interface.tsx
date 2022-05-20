import {
  DSLWidget,
  WidgetProps,
} from "@/wrappedComponents/DraggableComponent/interface"

export interface ContainerWidgetProps extends WidgetProps {
  children?: DSLWidget[]
  //
}
