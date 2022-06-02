import { FC, useContext, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { dslActions } from "@/redux/editor/dsl/dslSlice"
import { GLOBAL_DATA_CONTEXT } from "@/page/Editor/context/globalDataProvider"

function getDisplayName(WrappedComponent: FC<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component"
}

// TODO: wait to use a component,not a HOC
export function withParser<T>(WrappedComponent: FC<T>): FC<T> {
  const ParseredComponent: FC<any> = (dsl) => {
    // tips: this is parsers,when dsl version update,can add new parser to this
    // and also can add some Component parser,when component structural changed
    const { props } = dsl
    const { hidden } = props
    const ref = useRef()
    const dispatch = useDispatch()

    const { handleUpdateGlobalData } = useContext(GLOBAL_DATA_CONTEXT)

    //TODO: @weichen wait new dsl action
    const handleUpdateDsl = (value: Record<string, any>) => {
      console.log(dsl)
      dispatch(
        dslActions.updateDslProps({
          targetId: dsl.id,
          newState: {
            ...value,
          },
        }),
      )
    }

    useEffect(() => {
      if (ref.current) {
        // TODO:@weichen the key use widgetDisplayName
        const widgetName = dsl.id.split("-").join("")
        handleUpdateGlobalData(widgetName, ref.current)
      }
    }, [])

    return (
      <div
        hidden={hidden && hidden !== "false"}
        style={{ height: "100%", width: "100%" }}
      >
        <WrappedComponent
          {...props}
          handleUpdateDsl={handleUpdateDsl}
          ref={ref}
        />
      </div>
    )
  }

  ParseredComponent.displayName = `withParser(${getDisplayName(
    WrappedComponent,
  )})`

  return ParseredComponent
}
