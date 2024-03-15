/**
 * Common interface pertaining to a forecast object
 */
export interface DailyForecast {
    number?:number;
    name?:string;
    startTime: Date;
    humidity?: number;
    day?: string;
    endTime: Date;
    isDaytime?:boolean;
    temperature:number;
    temperatureUnit?: string;
    temperatureTrend?: any;
    probabilityOfPrecipitation?:{
        unitCode: string;
        value: number;
    },
    dewpoint?:{
        unitCode:string;
        value: number;
    },
    relativeHumidity?:{
        unitCode:string;
        value: number;
    },
    windSpeed: number;
    windDirection: 'N' | 'S' | 'E' | 'W' | 'NE' | 'SE' | 'NW' | 'SW'
    icon: string,
    shortForecast: string,
    detailedForecast?: string
};