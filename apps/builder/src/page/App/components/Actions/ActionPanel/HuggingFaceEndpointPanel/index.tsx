import { FC } from "react"
import { HuggingFaceCommonPanel } from "@/page/App/components/Actions/ActionPanel/HuggingFaceCommonPanel"

const HuggingFaceEndpointPanel: FC = () => {
  return <HuggingFaceCommonPanel withoutModel />
}
HuggingFaceEndpointPanel.displayName = "HuggingFaceEndpointPanel"
export default HuggingFaceEndpointPanel
