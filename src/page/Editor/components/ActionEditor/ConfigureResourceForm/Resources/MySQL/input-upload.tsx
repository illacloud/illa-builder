import { Input } from "@illa-design/input"
import { useState, useRef, FC } from "react"
import { InputUploadProps } from "./interface"
import { Button } from "@illa-design/button"
import { displayNoneCss } from "./style"

export const InputUpload: FC<InputUploadProps> = (props) => {
  const { reset, register, name, setValue } = props
  const registerValue = register(name)
  const [fileName, setFileName] = useState("")
  const uploadRef = useRef<HTMLInputElement | null>(null)
  const handleUpload = () => {
    uploadRef.current?.click()
  }
  const reader = new FileReader()
  reader.onload = function () {
    this.result && setValue(name, this.result as string)
  }
  return (
    <div>
      <Input
        placeholder="e.g.path/to/root.crt"
        value={fileName}
        suffix={{
          render: (
            <Button
              variant="text"
              colorScheme="techPurple"
              onClick={handleUpload}
              type="button"
            >
              Choose a File
            </Button>
          ),
        }}
        onClear={() => {
          setFileName("")
          reset(name)
        }}
        allowClear
      />
      <input
        css={displayNoneCss}
        {...registerValue}
        ref={(e) => {
          registerValue.ref(e)
          uploadRef.current = e
        }}
        onChange={(event) => {
          registerValue.onChange(event)
          const files = event.target.files
          if (files) {
            setFileName(files[0].name)
            reader.readAsText(files[0])
          }
        }}
        type="file"
      />
    </div>
  )
}

InputUpload.displayName = "InputUpload"
