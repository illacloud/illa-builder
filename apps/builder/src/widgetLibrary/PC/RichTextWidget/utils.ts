import { OutputBlockData } from "@editorjs/editorjs"

export const parseCheckList = (block: OutputBlockData) => {
  const items = block.data.items
  if (Array.isArray(items) && items.length) {
    const checkListHtml: string[] = []
    items.forEach((item: { checked: boolean; text: string }, index) => {
      const { checked, text } = item
      checkListHtml.push(`
          <div class="ejs-form-check">
            <input
              type="checkbox"
              ${checked ? "checked" : ""}
              id="ejsRadios${index}"
            />
            <label for="ejsRadios${index}">${text}</label>
          </div>`)
    })
    return checkListHtml.join("\n")
  }
}

export const handleImageUpload = (file: Blob) => {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader()
    reader.onload = function () {
      return resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
