import { create } from "zustand";

interface CsvJsonProps{
    inpCsv: string,
    outJson: string,
    setInpCsv: (state: string) => void
    setOutJson: (state: string) => void
    setClear: () => void
}

export const useCsvJson = create<CsvJsonProps>((set)=>({
    inpCsv: '',
    outJson: '',
    setInpCsv: (state) => set({inpCsv: state}),
    setOutJson: (state) => set({outJson: state}),
    setClear: () => set({inpCsv: '', outJson: ''})
}))