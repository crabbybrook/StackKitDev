import { create } from "zustand"

interface TimeStampProp {
    mode: string,
    inputTime: string,
    
    output: {
        success: boolean | string,
        date?: Date | null,
        isoString?: string,
        utcString?: string,
        localString?: string,
        localFormatted?: string,
        relativeString?: string,
        detectedPrecision?: string,
        err?: string,
        timestampMs?: number | string,
        timestampSec?: number | string,
    },
   
    setInputTime: (state: string) => void

    setOutput: (state: {
        success: boolean | string,
        date?: Date,
        isoString?: string,
        utcString?: string,
        localString?: string,
        localFormatted?: string,
        relativeString?: string,
        detectedPrecision?: string,
        err?: string,
        timestampMs?: number,
        timestampSec?: number
    }) => void,
    

    setClear: () => void
    setMode: (state: string) => void
    active: string,
    setActive: (state: string) => void
    miniActive: string,
    setMiniActive: (state: string) => void
}

export const useTimestampConv = create<TimeStampProp>((set) => ({
    mode: '',
    active: '',
    setActive: (state) => set({active: state}),
    miniActive: '',
    setMiniActive: (state) => set({miniActive: state}),
    setMode: (state) => set({mode: state}),
    inputTime: '',
    
    setInputTime: (state) => set({ inputTime: state }),
    output: {
        success: '',
        date: null,
        isoString: '',
        utcString: '',
        localString: '',
        localFormatted: '',
        relativeString: '',
        detectedPrecision: '',
        timestampMs: 0,
        timestampSec: 0,
        err: ''
    },
    
    setOutput: (state)=> set({output: {
        success: state.success,
        date: state.date,
        isoString: state.isoString,
        utcString: state.utcString,
        localString: state.localString,
        localFormatted: state.localFormatted,
        relativeString: state.relativeString,
        detectedPrecision: state.detectedPrecision,
        err: state.err,
        timestampMs: state.timestampMs,
        timestampSec: state.timestampSec,
    }}),
    
    setClear: ()=> set({inputTime: '', output: {
        success: '',
        date: null,
        isoString: '',
        utcString: '',
        localString: '',
        localFormatted: '',
        relativeString: '',
        detectedPrecision: '',
        err: '',
        timestampMs: '',
        timestampSec: ''
    },  active: '', miniActive: ''})
}))

