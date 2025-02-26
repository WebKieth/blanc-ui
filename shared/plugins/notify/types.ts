export type NotifyPosition = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight'


export type _NotifyOptions<R> = {
  title?: string
	summary?: string
	position?: NotifyPosition
	renderer?: R
	autoHide?: boolean
	closable?: boolean
}