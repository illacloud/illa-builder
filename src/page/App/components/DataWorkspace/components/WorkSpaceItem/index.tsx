import { FC } from "react"
import { Collapse, CollapseItem } from "@illa-design/collapse"
import { PreIcon as ExpandIcon } from "@illa-design/icon"
import { isObject } from "@illa-design/system"
import { WorkSpaceItemProps } from "./interface"
import { gridCollapseContentStyle, itemTitleStyle } from "./style"

export const WorkSpaceItem: FC<WorkSpaceItemProps> = (props) => {
  const { title, dataList = [] } = props
  console.log(dataList)
  return (
    <Collapse
      mode="builder-pro"
      expandIconPosition="right"
      destroyOnHide
      expandIcon={<ExpandIcon />}
    >
      <CollapseItem
        name="title"
        header={<span css={itemTitleStyle}>{title}</span>}
      >
        <Collapse mode="builder" destroyOnHide>
          {dataList.map((item, key) => (
            <CollapseItem name={`${key}`} header={item.displayName}>
              <div css={gridCollapseContentStyle}>
                {item.props &&
                  Object.keys(item.props).map((propKey, index) => {
                    if (isObject(item.props![propKey])) {
                      return (
                        <CollapseItem
                          name={`${key + index}`}
                          header={propKey}
                        ></CollapseItem>
                      )
                    } else {
                      return (
                        <div key={key}>{`${propKey} ${
                          item.props![propKey]
                        }`}</div>
                      )
                    }
                  })}
              </div>
            </CollapseItem>
          ))}
        </Collapse>
      </CollapseItem>
    </Collapse>
  )
}

WorkSpaceItem.displayName = "WorkSpaceItem"
