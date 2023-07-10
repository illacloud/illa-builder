import { forwardRef } from "react"
import { Virtuoso, VirtuosoHandle } from "react-virtuoso"
import { MessageItem } from "@/widgetLibrary/ChatWidget/components/messageItem"
import { Receiving } from "@/widgetLibrary/ChatWidget/components/receiving"
import { BaseChatProps } from "@/widgetLibrary/ChatWidget/interface"
import { messageListContainerStyle } from "@/widgetLibrary/ChatWidget/style"

export const BaseChat = forwardRef<VirtuosoHandle, BaseChatProps>(
  (props, ref) => {
    const { value = [], leftMessageColor, showAvatar } = props
    return (
      <div css={messageListContainerStyle}>
        <Virtuoso
          ref={ref}
          totalCount={value.length}
          height="100%"
          data={value}
          initialTopMostItemIndex={value.length - 1}
          itemContent={(_, data) => (
            <>
              {data.loading ? (
                <Receiving
                  leftMessageColor={leftMessageColor}
                  showAvatar={showAvatar}
                />
              ) : (
                <MessageItem {...props} message={data} />
              )}
            </>
          )}
        />
      </div>
    )
  },
)
BaseChat.displayName = "BaseChat"
