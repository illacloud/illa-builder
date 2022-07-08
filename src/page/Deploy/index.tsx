import { FC, useEffect } from "react"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import { useParams } from "react-router-dom"

export const Deploy: FC = (props) => {
  let { appId, versionId } = useParams()

  useEffect(() => {})

  return <CanvasPanel />
}

Deploy.displayName = "Deploy"
