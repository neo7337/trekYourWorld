export interface FilterType {
    name: string
    value: string
}

export type TrekFilters = {
    organiser: FilterType[]
    location: FilterType[]
    duration: FilterType[]
    difficulty: FilterType[]
}