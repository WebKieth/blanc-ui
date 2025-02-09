import { defineComponent, ExtractPublicPropTypes } from 'vue'
import { tableFooterStyle } from '@shared/components/table/footer/styles.css'

export const tableFooterProps = {
	style: {
		type: String,
		default: tableFooterStyle
	}
} as const

export type TableFooterProps = ExtractPublicPropTypes<typeof tableFooterProps>

export const TableFooter = defineComponent({
	name: 'TableFooter',
	props: tableFooterProps,
	setup(props, { attrs, slots }) {
		return () => (
			<tfoot
				{...attrs}
				class={props.style}
			>
				{slots.default && slots.default()}
			</tfoot>
		)
	}
})