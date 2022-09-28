import { FC, useRef, useMemo } from "react"
import { RenderComponentCanvas } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { cloneDeep } from "lodash"
import { ContainerProps } from "@/widgetLibrary/ContainerWidget/interface"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

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

export const ContainerWidget: FC<ContainerProps> = props => {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentViewComponents = useMemo(() => {
    const currentIndex = props.currentViewIndex
    const viewComponentsArray = props.viewComponentsArray
    if (
      Array.isArray(viewComponentsArray) &&
      currentIndex < viewComponentsArray.length
    ) {
      return viewComponentsArray[currentIndex]
    }
    return []
  }, [props.currentViewIndex, props.viewComponentsArray])

  const finalCurrentComponentNode = useMemo(() => {
    return currentViewComponents
      .map(displayName => {
        return props.componentNode.childrenNode.find(node => {
          return node.displayName === displayName
        })
      })
      .filter(node => !!node)
  }, [currentViewComponents, props.componentNode.childrenNode])

  const finalComponentNode = useMemo(() => {
    const componentNode = cloneDeep(props.componentNode)
    return {
      ...componentNode,
      childrenNode: finalCurrentComponentNode,
    } as ComponentNode
  }, [finalCurrentComponentNode, props.componentNode])

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
        componentNode={finalComponentNode}
        containerPadding={4}
        containerRef={containerRef}
        minHeight={props.componentNode.h * props.componentNode.unitH - 6}
      />
    </div>
  )
}
