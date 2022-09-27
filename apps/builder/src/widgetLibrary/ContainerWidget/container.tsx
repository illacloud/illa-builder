import { FC, useRef } from "react"
import { RenderComponentCanvas } from "@/page/App/components/DotPanel/renderComponentCanvas"

export const Container: FC = () => {
  return (
    <div
      style={{
        padding: "14px",
        background: "blue",
        width: "100%",
        height: "100%",
      }}
    ></div>
  )
}

export const ContainerWidget: FC = props => {
  console.log(props)
  // return <DotPanel componentNode={props.componentNode} />
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={containerRef}
      style={{
        padding: "4px",
        width: "100%",
        height: "100%",
      }}
    >
      <RenderComponentCanvas
        componentNode={props.componentNode}
        containerPadding={4}
        containerRef={containerRef}
        minHeight={props.componentNode.h * props.componentNode.unitH - 6}
      />
    </div>
  )
}
