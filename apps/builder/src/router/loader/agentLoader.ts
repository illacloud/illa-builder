import { LoaderFunction, redirect } from "react-router-dom"

export const agentLoader: LoaderFunction = async (args) => {
  const { agentId } = args.params
  if (!agentId) {
    return redirect("/404")
  }
}
