import { forwardRef } from "react"
import { Virtuoso, VirtuosoHandle } from "react-virtuoso"
import { BaseChatProps } from "@/widgetLibrary/ChatWidget/interface"
import { MessageItem } from "@/widgetLibrary/ChatWidget/messageItem"
import { Receiving } from "@/widgetLibrary/ChatWidget/receiving"

export const BaseChat = forwardRef<VirtuosoHandle, BaseChatProps>(
  (props, ref) => {
    const { value = [], leftMessageColor, showAvatar } = props
    return (
      <div
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
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
