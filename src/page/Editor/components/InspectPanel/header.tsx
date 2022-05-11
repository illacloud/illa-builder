import { FC } from "react"
import { MoreIcon } from "@illa-design/icon"
import { headerWrapperCss, headerIconWrapperCss } from "./style"
import { Trigger } from "@illa-design/trigger"
import ActionMenu from "./headerActionMenu"
import { HeaderProps } from "./interface"

const PanelHeader: FC<HeaderProps> = (props) => {
  //  TODO:
  //  const {meta} = props;
  //  const {componentType,componentId} = meta;
  return (
    <div css={headerWrapperCss}>
      {/*  TODO: wait for editable component*/}
      <div>EditText</div>
      <div css={headerIconWrapperCss}>
        <Trigger
          position="br"
          trigger="click"
          content={<ActionMenu componentId="testId" componentType="testType" />}
          withoutPadding
          closeOnClick
          clickOutsideToClose
          showArrow={false}
          colorScheme="white"
        >
          <MoreIcon />
        </Trigger>
      </div>
    </div>
  )
}

export default PanelHeader
