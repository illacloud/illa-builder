import { FC } from "react"

function getDisplayName(WrappedComponent: FC<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component"
}

export function withParser<T>(WrappedComponent: FC<T>): FC<T> {
  const ParseredComponent: FC<any> = (dsl) => {
    const { props } = dsl
    return <WrappedComponent {...props} />
  }

  ParseredComponent.displayName = `withParser(${getDisplayName(
    WrappedComponent,
  )})`

  return ParseredComponent
}
