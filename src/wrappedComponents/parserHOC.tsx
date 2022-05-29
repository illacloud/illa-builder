import { FC } from "react"
import { useDispatch } from "react-redux"
import { dslActions } from "@/redux/editor/dsl/dslSlice"

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
    const dispatch = useDispatch()

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
    // TODO: wait to add component parser and labelWrapper
    return (
      <div
        hidden={hidden && hidden !== "false"}
        style={{ height: "100%", width: "100%" }}
      >
        <WrappedComponent {...props} handleUpdateDsl={handleUpdateDsl} />
      </div>
    )
  }

  ParseredComponent.displayName = `withParser(${getDisplayName(
    WrappedComponent,
  )})`

  return ParseredComponent
}
