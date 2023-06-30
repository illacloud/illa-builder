export class CircularStack<T> {
  private data: T[]
  private maxSize: number
  private currentIndex: number
  private currentSize: number

  constructor(maxSize: number) {
    this.data = new Array<T>(maxSize)
    this.maxSize = maxSize
    this.currentIndex = -1
    this.currentSize = 0
  }

  push(item: T) {
    this.currentIndex = (this.currentIndex + 1) % this.maxSize
    this.data[this.currentIndex] = item
    this.currentSize++
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }

    const item = this.data[this.currentIndex]
    this.currentIndex = (this.currentIndex - 1 + this.maxSize) % this.maxSize
    this.currentSize--
    return item
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }

    return this.data[this.currentIndex]
  }

  isEmpty(): boolean {
    return this.currentSize === 0
  }

  isFull(): boolean {
    return this.currentSize === this.maxSize
  }

  clear() {
    this.data = new Array<T>(this.maxSize)
    this.currentIndex = -1
    this.currentSize = 0
  }
}
