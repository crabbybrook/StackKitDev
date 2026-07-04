import { create } from "zustand";


interface URLProps {
    selected: string
    setSelected: (state: string) => void,
    input: string,
    output: {
        success: boolean | string,
        error?: string,
        result: string
    },
    setInput: (state: string) => void
    setOutput: (state: {
        success: boolean, error?: string,
        result: string
    }) => void

    setClear: () => void
}

export const useURL = create<URLProps>((set) => ({
    selected: '',
    setSelected: (state) => set({ selected: state }),
    input: '',
    output: {
        success: '',
        error: '',
        result: ''
    },
    setInput: (state) => set({ input: state }),
    setOutput: (state) => set({
        output: {
            success: state.success,
            error: state.error,
            result: state.result
        }
    }),
    setClear: () => set({
        input: '', output: {
            success: '',
            error: '',
            result: ''
        },
    }),

}))