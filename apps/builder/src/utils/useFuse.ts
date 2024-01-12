import Fuse from "fuse.js"
import { isEqual } from "lodash-es"
import { useEffect, useRef, useState } from "react"

export function useFuse<T>(
  data: ReadonlyArray<T>,
  option?: Fuse.IFuseOptions<T>,
) {
  const dataRef = useRef<ReadonlyArray<T>>()
  const optionRef = useRef<Fuse.IFuseOptions<T>>()

  dataRef.current = data
  optionRef.current = option

  const [fuse, setFuse] = useState(new Fuse<T>(data, option))

  useEffect(() => {
    if (isEqual(dataRef.current, data) && isEqual(optionRef.current, option)) {
      return
    }
    setFuse(new Fuse<T>(data, option))
  }, [data, option])

  return fuse
}
