import { FC } from "react"

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
    // TODO: wait to add component parser and labelWrapper
    return (
      <div
        hidden={hidden && hidden !== "false"}
        style={{ height: "100%", width: "100%" }}
      >
        <WrappedComponent {...props} />
      </div>
    )
  }

  ParseredComponent.displayName = `withParser(${getDisplayName(
    WrappedComponent,
  )})`

  return ParseredComponent
}
