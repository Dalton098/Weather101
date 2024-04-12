/**
 * Common interface pertaining to a forecast object
 */
export interface Location {
    zip: string, 
    latitude: number,
    longitude: number,
    city: string,
    state: string,
    country: string,
    office?: { office: string, x: number, y: number } | undefined
}