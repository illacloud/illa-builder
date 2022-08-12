import { FC, useMemo } from "react";
import { omit } from "@illa-design/system";
import { PanelBar } from "@/components/PanelBar";
import { WorkSpaceTreeProps } from "./interface";
import { applyTreeContainerStyle } from "./style";
import { WorkSpaceTreeItem } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem";

const hiddenFields = ["displayName", "userId"];

export const WorkSpaceTree: FC<WorkSpaceTreeProps> = (props) => {
  const { title, dataList = [], selectedKeys, handleSelect } = props;

  const tree = useMemo(() => {
    return dataList.map((data) => {
      return <WorkSpaceTreeItem
        key={data.displayName}
        title={data.displayName}
        data={omit(data, hiddenFields)}
        handleSelect={handleSelect}
        isSelected={selectedKeys?.includes(data.displayName)}
      />;
    });
  }, [dataList, selectedKeys]);

  return (
    <PanelBar title={title}>
      <div css={applyTreeContainerStyle()}>
        {tree}
      </div>
    </PanelBar>
  );
};

WorkSpaceTree.displayName = "WorkSpaceTree";
