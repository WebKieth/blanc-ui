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
				id="ri-checkbox-circle-fill"
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
			d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"
		></path>
    </g>

			</svg>
		)
	},
})
