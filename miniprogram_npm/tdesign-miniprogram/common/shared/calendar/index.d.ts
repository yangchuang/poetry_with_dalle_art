import type { TDate, TCalendarType, TCalendarValue } from './type';
export default class TCalendar {
    firstDayOfWeek: number;
    value: TCalendarValue | TCalendarValue[];
    type: TCalendarType;
    minDate: Date;
    maxDate: Date;
    format: (day: TDate) => TDate;
    constructor(options: any);
    getTrimValue(): Date | Date[];
    getDays(): any[];
    getMonths(): any[];
    select({ cellType, year, month, date }: {
        cellType: any;
        year: any;
        month: any;
        date: any;
    }): Date | TCalendarValue[];
}
