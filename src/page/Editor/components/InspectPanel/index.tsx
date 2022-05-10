import { FC } from "react"
import PanelHeader from "./header"
import { Divider } from "@illa-design/divider"

const InspectPanel: FC = () => {
  //  TODO: wait for get component meta info for redux,and then get component displayName and id;
  // const meta = getCurrentComponentMeta();
  return (
    <div style={{ width: "100%" }}>
      <Divider />
      <PanelHeader
        meta={{ componentId: "testId", componentType: "testType" }}
      />
      <Divider />
    </div>
  )
}

export default InspectPanel
