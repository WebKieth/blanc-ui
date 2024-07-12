import { defineComponent } from 'vue'

export const iconComponentProps = {
	width: {
		type: Number,
		required: true,
	},
	height: {
		type: Number,
		required: true,
	},
	stroke: {
		type: Number,
		required: true,
	},
}

export default defineComponent({
	props: iconComponentProps,
	setup(props) {
		return () => (
			<svg
				id="ri-arrow-down-s-line"
				fill="currentColor"
				viewBox="0 0 24 24"
				width={props.width}
				height={props.height}
			>
			
    <g>
        <path fill="none"
			d="M0 0h24v24H0z"
		></path>
        <path
			d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
		></path>
    </g>

			</svg>
		)
	},
})
