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
				id="ri-arrow-up-s-line"
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
			d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"
		></path>
    </g>

			</svg>
		)
	},
})
