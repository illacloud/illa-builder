import { Input } from "@illa-design/input"
import { css } from "@emotion/react"
import {
  LabelTextCSS,
  FooterCSS,
  GridContainerCSS,
  HostnamePortCSS,
  UsernamePasswordCSS,
  SwitchDescriptionCSS,
  SwitchAreaCSS,
  applyGridColIndex,
  applyMargin,
  applyPadding,
  DescriptionCSS,
  BorderBottomCSS,
  applyTextAlign,
  SwitchTextCommentCSS,
  AlignDefaultCSS,
} from "./style"
import { Button } from "@illa-design/button"
import { Switch } from "@illa-design/switch"

export const MySQL = () => {
  return (
    <>
      <div
        css={css(
          GridContainerCSS,
          applyPadding("top", 8),
          applyPadding("bottom", 8),
        )}
      >
        <label css={LabelTextCSS}>Hostname/Port</label>
        <div css={HostnamePortCSS}>
          <Input placeholder="Hostname" />
          <Input placeholder="3306" />
        </div>
        <label css={LabelTextCSS}>Database</label>
        <div>
          <Input placeholder="acme_production" />
        </div>
        <label css={LabelTextCSS}>Username/Password</label>
        <div css={UsernamePasswordCSS}>
          <Input placeholder="Username" />
          <Input placeholder="Password" />
        </div>
      </div>
      <div
        css={css(GridContainerCSS, applyPadding("bottom", 16), BorderBottomCSS)}
      >
        <div css={css(DescriptionCSS, applyGridColIndex(2))}>
          Credentials will be encrypted & stored securely on our servers.
        </div>
        <label css={LabelTextCSS}>Connect Type</label>
        <div css={css(LabelTextCSS, applyTextAlign("left"))}>
          Cloud: PopSQL servers will securely connect to your database.
        </div>
      </div>
      <div
        css={css(
          GridContainerCSS,
          applyPadding("top", 16),
          applyPadding("bottom", 8),
        )}
      >
        <label css={css(LabelTextCSS, AlignDefaultCSS)}>Advanced Options</label>
        <div>
          <div css={SwitchAreaCSS}>
            <Switch />
            <div css={css(SwitchDescriptionCSS, applyMargin("left", 8))}>
              <div css={css(LabelTextCSS, applyTextAlign("left"))}>
                Connect over SSH
              </div>
              <div css={SwitchTextCommentCSS}>
                Useful to connect to private network
              </div>
            </div>
          </div>
          <div
            css={css(
              applyGridColIndex(4),
              SwitchAreaCSS,
              applyMargin("top", 16),
            )}
          >
            <Switch />
            <div css={css(SwitchDescriptionCSS, applyMargin("left", 8))}>
              <div css={css(LabelTextCSS, applyTextAlign("left"))}>
                SSL option
              </div>
              <div css={SwitchTextCommentCSS}>SSL is used when available</div>
            </div>
          </div>
        </div>
      </div>
      <div css={css(FooterCSS, applyTextAlign("right"))}>
        <Button css={applyMargin("right", 8)} size="medium" colorScheme="gray">
          Cancel
        </Button>
        <Button size="medium" colorScheme="purple">
          Reply
        </Button>
      </div>
    </>
  )
}
