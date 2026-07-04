import { create } from "zustand"

interface OutFormat{
    ok?: boolean,
    value: string,
    err?: string
}
interface OutFormat2{
    ok?: boolean,
    error?: string
}

interface JsonFormatProps {
    inputJson: string,
    outputJson: OutFormat,
    setInputJson: (text: string) => void
    setOutputJson: (state: OutFormat) => void
    setClear: () => void
}

export const useJsonFormat = create<JsonFormatProps>((set) => ({
    setClear: () => set({ inputJson: '', outputJson: { value: '', err: '' } }),
    copy: false,
    inputJson: '',
    outputJson: {
        value: ''
    },
    setInputJson: (state) => set({ inputJson: state }),
    setOutputJson: (state) => set({ outputJson: { ok: state.ok, value: state.value, err: state.err} }),
}))