import { forwardRef, ForwardedRef, useEffect, useRef } from "react"
import { ACListProps } from "./interface"
import { ACItem } from './item'

export const ACList = forwardRef<HTMLDivElement, ACListProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      ...rest
    } = props

    const listRef = useRef<HTMLDivElement>(null)
    listRef.current?.focus()

    // useEffect(() => {
    //   document.addEventListener("keydown", (e) => {
    //     if (e.keyCode === 40) {
    //       e.preventDefault()
    //       listRef.current?.focus()
    //       console.log('arrow up')
    //     }
    //   })
    // }, [])

    return (
      <div ref={ref} {...rest} tabIndex={-1} contentEditable>
        <div>Common</div>
        <ACItem type="String" content="bccInput.value" />
        <ACItem type="Number" content="Infinity" />
        <ACItem type="Array" content="bccInput.value" />
        <ACItem type="Function" content="closeModal" />
        <ACItem type="Object" content="emailPreview.value" />
        <ACItem type="Component" content="button" />
        <ACItem type="Null" content="emailPreview.valueemailPreview.valueemailPreview.valueemailPreview.value" />
      </div>
    )
  }
)