import React, { useCallback, useEffect, useRef, useState } from "react"
import { Frame } from "scenejs"
import Moveable from "react-moveable"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { DslActionName } from "@/redux/reducers/editorReducer/dslReducer/dsl-action"
import { DslNode, DslText } from "@/redux/reducers/editorReducer/dslReducer/dsl"
import { MenuActionName } from "@/redux/reducers/editorReducer/dslReducer/menu-action"
import { dslActions } from "@/redux/reducers/editorReducer/dslReducer"

const TextView: React.FC<DslText> = (textViewProps) => {
  const dispatch = useDispatch()
  const [target, setTarget] = useState<HTMLElement | null>()
  const [frame, setFrame] = useState<Frame>()
  const ref = useRef<Moveable>(null)
  const onWindowResize = useCallback(() => {
    ref.current!!.updateTarget()
  }, [])

  useEffect(() => {
    setTarget(
      window.document.querySelector<HTMLElement>("#" + textViewProps.dslKey),
    )
    setFrame(new Frame("transform: translateX(0px) translateY(0px)"))
    window.addEventListener("resize", onWindowResize)
    return () => {
      window.removeEventListener("resize", onWindowResize)
    }
  }, [onWindowResize])

  return (
    <div
      key={textViewProps.dslKey}
      style={{
        position: textViewProps.position,
        left: textViewProps.left,
        top: textViewProps.top,
        right: textViewProps.right,
        bottom: textViewProps.bottom,
      }}
    >
      <Moveable
        ref={ref}
        target={target}
        throttleDrag={1}
        keepRatio={false}
        draggable={true}
        scalable={false}
        rotatable={false}
        origin={false}
        onDragStart={() => {
          if (frame != null) {
            frame.set("transform", "translateX", `0px`)
            frame.set("transform", "translateY", `0px`)
          }
          selectNode(dispatch, textViewProps)
        }}
        onDrag={(translate) => {
          if (frame != null) {
            frame.set(
              "transform",
              "translateX",
              `${translate.beforeTranslate[0]}px`,
            )
            frame.set(
              "transform",
              "translateY",
              `${translate.beforeTranslate[1]}px`,
            )
            translate.target.style.cssText += frame.toCSS()
          }
        }}
        onDragEnd={() => {
          if (frame != null && target != null && ref != null) {
            const lastFrame = new Frame(
              `left: ${textViewProps.left}; top: ${textViewProps.top}`,
            )
            dispatch(
              dslActions.dslActionHandler({
                type: DslActionName.UpdateText,
                newDslText: {
                  ...textViewProps,
                  left:
                    parseFloat(lastFrame.get("left")) +
                    parseFloat(frame.get("transform", "translateX")) +
                    "px",
                  top:
                    parseFloat(lastFrame.get("top")) +
                    parseFloat(frame.get("transform", "translateY")) +
                    "px",
                },
              }),
            )
            target.style.cssText += new Frame(
              "transform: translateX(0px) translateY(0px)",
            ).toCSS()
          }
        }}
      />
      <div
        id={textViewProps.dslKey}
        style={{
          userSelect: "none",
          textAlign: "center",
          paddingLeft: "32px",
          paddingRight: "32px",
          paddingTop: "8px",
          paddingBottom: "8px",
          color: "#FFFFFF",
          borderRadius: "30px",
          background: "#1890ff",
          fontSize: "20px",
        }}
      >
        {textViewProps.nodeText}
      </div>
    </div>
  )
}

function selectNode(dispatch: Dispatch, dslNode: DslNode) {
  dispatch(
    dslActions.dslActionHandler({
      type: MenuActionName.SelectNode,
      selectedNode: dslNode,
    }),
  )
}

export default TextView
