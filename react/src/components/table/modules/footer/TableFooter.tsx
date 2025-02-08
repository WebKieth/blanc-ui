import { FC, ReactNode } from "react"
import { tableFooterStyle } from '@shared/components/table/footer/styles.css'

export type TableFooterProps = {
  style?: string
  children?: ReactNode
}

export const TableFooter: FC<TableFooterProps> = ({
  style = tableFooterStyle,
  children = null
}) => (
  <div className={style}>
    {children}
  </div>
)