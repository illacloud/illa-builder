import { forwardRef } from "react"

export const App = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} {...props}>
      Hello App
    </div>
  )
})

export default App

App.displayName = "App"
