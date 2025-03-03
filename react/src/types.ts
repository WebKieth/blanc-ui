export type StyleVariants = Record<string, string>

export type ReactState<T> = [T, React.Dispatch<React.SetStateAction<T>>]