type TimerId = ReturnType<typeof setTimeout>
export const setInternalByTimeout = (
  callback: () => void,
  interval: number,
) => {
  let startTime = Date.now()
  let timerId: TimerId
  const deviation = 50
  function run() {
    const expected = startTime + interval
    const drift = Date.now() - expected
    if (drift > deviation) {
      startTime = Date.now() + drift
    } else {
      startTime += interval
    }
    callback()
    timerId = setTimeout(run, Math.max(0, interval - drift))
  }
  timerId = setTimeout(run, interval)
  return () => {
    clearTimeout(timerId)
  }
}

export const getsSafeNodeValue = (val: unknown) => {
  return typeof val === "string" ? val : ""
}

export const getDataFromVal = (val: unknown) => {
  const rep = /^data:audio[^,]+base64,/
  if (typeof val !== "string" || !val || !rep.test(val)) {
    return ""
  } else {
    return val.replace(rep, "")
  }
}
