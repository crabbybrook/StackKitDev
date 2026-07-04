import { create } from "zustand"
import type { RegexMatchResult } from "../lib/regex"

interface RegexExp {
    pattern: string,
    text: string,
    flags: string,
    output: {
        success: boolean | string, matches: RegexMatchResult[], executionTimeMs: number | string, err?: string
    }
    setPattern: (state: string) => void
    setText: (state: string) => void
    setFlag: (state: string) => void
    setOutput: (state: {success: boolean, matches: RegexMatchResult[], executionTimeMs: number | string, err?: string}) => void

    active: string,
    setActive: (state: string) => void
    setClear: () => void
}

export const useRegex = create<RegexExp>((set)=>({
    pattern: '',
    text: '',
    flags: 'g',
    active: '',
    setActive: (state) => set({active: state}),
    setPattern: (state) => set({pattern: state}),
    setText: (state) => set({text: state}),
    setFlag: (state) => set({flags: state}),

    output: {
        success: '', matches: [], executionTimeMs: ''
    },
    setClear: () => set({
        pattern: '',
        text: '',
        flags: '',
        active: '',
    output: {
        success: '', matches: [], executionTimeMs: '', err: '' 
    }}),

    setOutput: (state) => set({output: {success: state.success, matches: state.matches, executionTimeMs: state.executionTimeMs, err: state.err}}),
}))