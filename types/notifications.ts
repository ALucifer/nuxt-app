export type CssClassFlashMessage = 'success' | 'warning' | 'danger' | 'info' | 'warning'

export interface AddFlashMessage {
  message: string
  class: CssClassFlashMessage
}

export interface FlashMessage extends AddFlashMessage {
  id: number
  visible: boolean
}
