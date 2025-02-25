import { FC, ReactNode } from "react"
import cn from 'classnames'
import { tableFooterStyle, tableFooterVariants } from '@shared/components/table/footer/styles.css'
import { TableSize } from "@shared/components/table/types"
import { useTablePropsProvided } from "../../hooks/use-table-props-provided"

export type TableFooterProps = {
  style?: string
  variants?: Record<TableSize, string>
  children?: ReactNode
}

export const TableFooter: FC<TableFooterProps> = ({
  style = tableFooterStyle,
  variants = tableFooterVariants,
  children = null
}) => {
  const { size = 'medium' } = useTablePropsProvided()
  return <div className={cn({
    [style]: style,
    [variants[size]]: size && variants[size]
  })}>
    {children}
  </div>
}