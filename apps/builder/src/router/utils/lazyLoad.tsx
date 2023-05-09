import { LazyExoticComponent, ReactNode, Suspense } from "react"

export function lazyLoad(
  Comp: LazyExoticComponent<any>,
  fallback?: ReactNode,
): ReactNode {
  return (
    <Suspense fallback={fallback}>
      <Comp />
    </Suspense>
  )
}
