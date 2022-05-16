import React, { useCallback, useEffect, useRef, useState } from "react"
import { Frame } from "scenejs"
import Moveable from "react-moveable"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { DslActionName } from "@/redux/reducers/editorReducer/dslReducer/dsl-action"
import {
  DslNode,
  DslText,
  dslActions,
} from "@/redux/reducers/editorReducer/dslReducer"
import { MenuActionName } from "@/redux/reducers/editorReducer/dslReducer/menu-action"

const TextView: React.FC<DslText> = (textViewProps) => {
  const { props } = textViewProps
  const dispatch = useDispatch()
  const [target, setTarget] = useState<HTMLElement | null>()
  const [frame, setFrame] = useState<Frame>()
  const ref = useRef<Moveable>(null)
  const onWindowResize = useCallback(() => {
    ref.current!!.updateTarget()
  }, [])

  useEffect(() => {
    setTarget(
      window.document.querySelector<HTMLElement>("#" + textViewProps.id),
    )
    setFrame(new Frame("transform: translateX(0px) translateY(0px)"))
    window.addEventListener("resize", onWindowResize)
    return () => {
      window.removeEventListener("resize", onWindowResize)
    }
  }, [onWindowResize])

  return (
    <div
      key={textViewProps.id}
      style={{
        position: props.position,
        left: props.leftColumn,
        top: props.topRow,
        right: props.rightColumn,
        bottom: props.bottomRow,
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
              `left: ${props.leftColumn}; top: ${props.topRow}`,
            )
            dispatch(
              dslActions.dslActionHandler({
                type: DslActionName.UpdateText,
                newDslText: {
                  ...textViewProps,
                  props: {
                    ...textViewProps.props,
                    leftColumn:
                      parseFloat(lastFrame.get("left")) +
                      parseFloat(frame.get("transform", "translateX")) +
                      "px",
                    topRow:
                      parseFloat(lastFrame.get("top")) +
                      parseFloat(frame.get("transform", "translateY")) +
                      "px",
                  },
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
        id={textViewProps.id}
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
        {props.nodeText}
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
