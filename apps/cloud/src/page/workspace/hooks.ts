import Fuse from "fuse.js"
import { debounce } from "lodash-es"
import { useRef, useState } from "react"

export function useSearch<T>(needSearchData: T[], buildKeys: string[]) {
  const [searchKeyWords, setSearchKeywords] = useState("")
  const handleChangeSearch = useRef(() =>
    debounce((value: string) => {
      setSearchKeywords(value)
    }, 160),
  )

  const searchIndex = Fuse.createIndex(buildKeys, needSearchData)

  const fuse = new Fuse(
    needSearchData,
    {
      keys: buildKeys,
    },
    searchIndex,
  )

  const result = searchKeyWords
    ? fuse.search(searchKeyWords).map((item) => item.item)
    : needSearchData

  const onSearch = handleChangeSearch.current()

  return [result, onSearch] as [T[], (value: string) => void]
}
