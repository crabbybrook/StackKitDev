import { create } from "zustand"

interface OutFormat{
    headers?: string[],
    rows?: Record<string, unknown>[],
    rowCount?: number,
    columnCount?: number,
    msg? : string,
    ok? : boolean,
    fullCsv?: string
}

interface JsonFormatProps {
    inputJson: string,
    outputCsv: OutFormat,
    setInputJson: (text: string) => void
    setOutputCsv: (state: OutFormat) => void
    setClear: () => void
}

export const useJsonCsv = create<JsonFormatProps>((set) => ({
    setClear: () => set({ inputJson: '', outputCsv: {headers: [''], rowCount: 0, columnCount: 0, rows:[], fullCsv: ''}}),
    copy: false,
    inputJson: '',
    outputCsv: {
        headers: [''],
        rowCount: 0,
        columnCount: 0,
        rows: [], 
        fullCsv: ''
    },
    setInputJson: (state) => set({ inputJson: state }),
    setOutputCsv: (state) => set({outputCsv: {headers: state.headers, rows: state.rows, rowCount: state.rowCount, columnCount: state.columnCount, ok: state.ok, fullCsv: state.fullCsv, msg:state.msg}})
}))