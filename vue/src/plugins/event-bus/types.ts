export type EventsMap = Array<(...args: unknown[]) => void>
export type EventName = string

export type EventBusMap = Map<EventName, EventsMap>