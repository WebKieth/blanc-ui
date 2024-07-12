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
				id="ri-checkbox-indeterminate-fill"
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
			d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm3 8v2h10v-2H7z"
		></path>
    </g>

			</svg>
		)
	},
})
