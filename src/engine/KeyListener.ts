export class KeyListener {
  private keys: Record<string, boolean> = {}

  constructor() {
    document.addEventListener('keydown', event => {
      this.keys[event.key] = true
    })
    document.addEventListener('keyup', event => {
      this.keys[event.key] = false
    })
  }

  isKeyDown(key: string) {
    return this.keys[key]
  }
}
