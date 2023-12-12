import ChatWidgetIcon from "@/assets/widgetCover/chat.svg?react"
import i18n from "@/i18n/config"
import { BasicContainerConfig } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { BUTTON_WIDGET_CONFIG } from "@/widgetLibrary/ButtonWidget"
import { INPUT_WIDGET_CONFIG } from "@/widgetLibrary/InputWidget"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"
import { emptyMessage } from "./constants"

export const CHAT_WIDGET_CONFIG: WidgetConfig = {
  version: 0,
  type: "CHAT_WIDGET",
  displayName: "chat",
  widgetName: i18n.t("widget.chat.name"),
  icon: <ChatWidgetIcon />,
  keywords: ["chat", "聊天"],
  sessionType: "PRESENTATION",
  resizeDirection: RESIZE_DIRECTION.ALL,
  w: 18,
  h: 50,
  childrenNode: [
    {
      ...BasicContainerConfig,
      childrenNode: [
        {
          ...INPUT_WIDGET_CONFIG,
          w: 28,
          h: 5,
          x: 0,
          y: 1,
          defaults: {
            ...INPUT_WIDGET_CONFIG.defaults,
            labelHidden: true,
            showVisibleButton: false,
            value: "",
          },
        },
        {
          ...BUTTON_WIDGET_CONFIG,
          w: 3,
          h: 5,
          x: 29,
          y: 1,
          defaults: {
            ...BUTTON_WIDGET_CONFIG.defaults,
            text: "Send",
          },
        },
      ],
    },
  ],
  defaults: {
    dataSources: `{{[
      {
        messageId: "001",
        message: "What is ILLA Cloud?",
        sendTime: "2022-12-31 23:59:59",
        replyMessageId: "",
        senderName: "James",
        senderId: "1",
        senderAvatar:
          "https://images.pexels.com/photos/6045220/pexels-photo-6045220.jpeg?auto=compress&cs=tinysrgb&w=800",
        messageType: "text",
      },
      {
        messageId: "002",
        message: "ILLA Cloud is a low-code platform for developers to build internal tools in minutes.",
        replyMessageId: "001",
        sendTime: "2023-01-01 00:00:00",
        senderName: "Tom",
        senderId: "2",
        senderAvatar:
          "https://images.pexels.com/photos/1888403/pexels-photo-1888403.jpeg?auto=compress&cs=tinysrgb&w=800",
        messageType: "text",
      },
    ]}}`,
    backgroundColor: "white",
    leftMessageColor: "grayBlue",
    rightMessageColor: "blue",
    enableMessageSelection: "{{true}}",
    toolbarReply: "{{true}}",
    toolbarDelete: "{{true}}",
    showAvatar: "{{true}}",
    showName: "{{true}}",
    showSendTime: "{{true}}",
    showFooter: "{{true}}",
    timeFormat: "YYYY-MM-DD hh:mm:ss",
    selectionType: "rightClick",
    selectedMessage: emptyMessage,
    replyMessage: emptyMessage,
    radius: "4px",
    shadow: "small",
    avatarPadding: "32px",
  },
}
