import { FC } from "react"
import PanelHeader from "./header"
import { Divider } from "@illa-design/divider"
import { PanelConfig } from "./interface"
import { fieldFactory } from "./utils/fieldFactory"

const mockData1: PanelConfig[] = [
  {
    id: "1",
    isOpened: true,
    groupName: "Basic",
    children: [
      {
        id: "423",
        labelName: "tootips",
        setterType: "switch",
        attrName: "test",
        labelDesc: "xxxxxx",
      },
      {
        id: "413",
        labelName: "testLabel2",
        setterType: "input",
        attrName: "test",
      },
      {
        id: "443",
        labelName: "testLabel3",
        setterType: "input",
        attrName: "test",
      },
    ],
  },
  {
    id: "2",
    groupName: "Styled",
    children: [
      {
        id: "442",
        labelName: "testLabel4",
        setterType: "switch",
        attrName: "test",
      },
    ],
  },
  {
    id: "3",
    isOpened: false,
    groupName: "Event",
    children: [
      {
        id: "42323",
        labelName: "testLabel1",
        setterType: "input",
        attrName: "test",
      },
      {
        id: "4131f",
        labelName: "testLabel2",
        setterType: "input",
        attrName: "test",
      },
      {
        id: "44asd23",
        labelName: "testLabel3",
        setterType: "switch",
        attrName: "test",
      },
    ],
  },
]

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
      <div>{fieldFactory(mockData1)}</div>
    </div>
  )
}

export default InspectPanel
