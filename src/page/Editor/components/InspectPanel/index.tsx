import { FC } from "react"
import PanelHeader from "./header"
import { Divider } from "@illa-design/divider"
import { PanelConfig } from "../PanelSetters/interface"
import { fieldFactory } from "./utils/fieldFactory"

const mockData1: PanelConfig[] = [
  {
    id: "1", // 随机生成
    isOpened: true, // 默认为 true
    groupName: "Basic", // 看情况拓展成对象，来搞多语言，但凡展示的都这样考虑
    children: [
      {
        id: "423",
        labelName: "tootips",
        setterType: "INPUT",
        attrName: "test",
        labelDesc: "xxxxxx",
      },
      {
        id: "413",
        labelName: "testLabel2",
        setterType: "INPUT",
        attrName: "test",
      },
      {
        id: "443",
        labelName: "testLabel3",
        setterType: "INPUT",
        attrName: "test",
      },
    ],
  },
  {
    id: "2", // 随机生成
    groupName: "Styled", // 看情况拓展成对象，来搞多语言，但凡展示的都这样考虑
    children: [
      {
        id: "442",
        labelName: "testLabel4",
        setterType: "INPUT",
        attrName: "test",
      },
    ],
  },
  {
    id: "3", // 随机生成
    isOpened: false, // 默认为 true
    groupName: "Event", // 看情况拓展成对象，来搞多语言，但凡展示的都这样考虑
    children: [
      {
        id: "7", // 随机生成
        isOpened: true, // 默认为 true
        groupName: "Basic", // 看情况拓展成对象，来搞多语言，但凡展示的都这样考虑
        children: [
          {
            id: "42323",
            labelName: "testLabel1",
            setterType: "INPUT",
            attrName: "test",
          },
          {
            id: "4131f",
            labelName: "testLabel2",
            setterType: "INPUT",
            attrName: "test",
          },
          {
            id: "44asd23",
            labelName: "testLabel3",
            setterType: "INPUT",
            attrName: "test",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    labelName: "testLabel5",
    setterType: "INPUT",
    attrName: "test",
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
