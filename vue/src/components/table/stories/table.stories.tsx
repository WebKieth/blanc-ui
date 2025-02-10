import { Meta, StoryObj } from '@storybook/vue3'
import { v4 as uuidv4 } from 'uuid'
import { Table } from '../Table.tsx'
import {
	TableHeader,
	TableFooter,
} from '../modules/index.ts'
import { ColumnKey, Row } from '../../../../../shared/components/table/types.ts'


const meta: Meta<typeof Table> = {
	title: 'Components/Table',
	component: Table,
	tags: ['autodocs'],
	argTypes: {
		columns: {
			control: {
				type: 'object',
			},
		},
		rows: {
			control: {
				type: 'object',
			},
		},
		size: {
			control: {
				type: 'select',
			},
			options: ['small', 'medium', 'large'],
		},
		expandRows: {
			type: 'boolean'
		}
	},
}

export default meta

type Story = StoryObj<typeof Table>

const columns = [
	{
		key: 'id',
		width: 150,
		label: 'Идентификатор',
		sortable: false,
	},
	{
		key: 'name',
		label: 'Название',
		width: 120,
		sortable: true,
	},
	{
		key: 'createdAt',
		width: 130,
		label: 'Создано',
		sortable: true,
	},
	{
		key: 'actions',
		width: 60,
		label: 'Действия',
	},
]
const rows = [
	{
		id: uuidv4(),
		name: 'filename-1',
		createdAt: new Date(),
	},
	{
		id: uuidv4(),
		name: 'filename-2',
		createdAt: new Date(),
	},
	{
		id: uuidv4(),
		name: 'filename-3',
		createdAt: new Date(),
	},
	{
		id: uuidv4(),
		name: 'filename-4',
		createdAt: new Date(),
	},
]


/**
 * Prop driven рендер. Самый простой способ для ленивых:
 * Таблица будет ожидать на рендер шаблоны слотов, соответствующих ColKey.
 * Columns = Array< { key: ColKey, label, sortable?, width? } >
 * Rows = Array< { [ColKey] : any } >
 * Small Size,
 * Striped Variant,
 * Contained Layout,
 */
export const DefaultTable: Story = {
	args: {
		columns,
		rows,
		size: 'medium'
	},
	render(args) {
		return {
			components: {
				Table,
				TableHeader,
				TableFooter,
			},
			setup() {
				const items = Array(10)
					.fill(0)
					.map((_, index) => {
						return {
							id: uuidv4(),
							name: 'filename-' + (index + 1),
							createdAt: new Date()
						}
					})

				return () => (
					<Table
						rows={items}
						columns={args.columns}
						size={args.size}>
							{{
								header: () => <TableHeader />,
								footer: () => <TableFooter>table footer</TableFooter>,
								id: (scope: Row<ColumnKey>) => scope.id,
								name: (scope: Row<ColumnKey>) => scope.name,
								createdAt: (scope: Row<ColumnKey>) => new Date(scope.createdAt as number).toLocaleString('en-GB', { timeZone: 'UTC' })
							}}
					</Table>
				)
			}
		}
	},
}