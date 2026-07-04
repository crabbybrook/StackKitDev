import { create } from "zustand"

interface TimezoneProps {
    date: string,
    time: string,
    fromTimezone: string,
    toTimezone: string,
    is24Hour: boolean
    outputTimezone: {
        success: boolean | string,
        converted?: {
            formatted?: string;
            datePart?: string;
            timePart?: string;
            timeZoneCode?: string;
            gmtOffset?: string;
        }
        comparison?: Record<string, {
            formatted?: string;
            datePart?: string;
            timePart?: string;
            timeZoneCode?: string;
            gmtOffset?: string;
        }> | undefined
        err?: string
    },

    setDate: (state: string) => void
    setTime: (state: string) => void
    setFromTimezone: (state: string) => void
    setToTimezone: (state: string) => void
    setis24Hour: (state: boolean) => void


    setOutputTimezone: (state: {
        success: boolean | string,
        converted?: {
            formatted?: string;
            datePart?: string;
            timePart?: string;
            timeZoneCode?: string;
            gmtOffset?: string;
        },
        comparison?: Record<string, {
            formatted?: string;
            datePart?: string;
            timePart?: string;
            timeZoneCode?: string;
            gmtOffset?: string;
        }>
        err?: string
    }) => void
    setClear: () => void
}

export const useTimezoneconv = create<TimezoneProps>((set) => ({
    hour24Check: '',
    date: '',
    time: '',
    fromTimezone: '',
    toTimezone: '',
    is24Hour: true,

    setDate: (state) => set({ date: state }),
    setTime: (state) => set({ time: state }),
    setFromTimezone: (state) => set({ fromTimezone: state }),
    setToTimezone: (state) => set({ toTimezone: state }),
    setis24Hour: (state) => set({ is24Hour: state }),

    outputTimezone: {
        success: '',
        converted: {
            formatted: '',
            datePart: '',
            timePart: '',
            timeZoneCode: '',
            gmtOffset: '',
        },
        comparison: {},
        err: '',

    },
    setOutputTimezone: (state) => set({
        outputTimezone: {
            success: state.success,
            converted: {
                formatted: state.converted?.formatted,
                datePart: state.converted?.datePart,
                timePart: state.converted?.timePart,
                timeZoneCode: state.converted?.timeZoneCode,
                gmtOffset: state.converted?.gmtOffset
            },
            comparison: state.comparison ? Object.fromEntries(Object.entries(state.comparison).map(([key, value]) => [
                key, {
                    formatted: value.formatted,
                datePart: value.datePart,
                timePart: value.timePart,
                timeZoneCode: value.timeZoneCode,
                gmtOffset: value.gmtOffset
                }
            ])) : {},
            err: state.err,
        }
    }),

    setClear: () => set({
        outputTimezone: {
            success: '',
            converted: {
                formatted: '',
                datePart: '',
                timePart: '',
                timeZoneCode: '',
                gmtOffset: ''
            },
            comparison: {},
            err: '',
        },
        date: '', fromTimezone: '', toTimezone: '', is24Hour: true, time: ''
        ,
    })
}))