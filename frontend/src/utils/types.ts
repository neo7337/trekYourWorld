export interface FilterType {
    name: string
    value: string
}

export interface FilterInfo {
    organiser: FilterType[]
    location: FilterType[]
    duration: FilterType[]
    difficulty: FilterType[]
}