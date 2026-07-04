import { create } from "zustand";
import type { Charset } from "../lib/base64";

const charsetMap: Record<string, Charset> = {
    'utf-8': 'utf-8',
    'ascii': 'ascii',
    'iso-8859-1': 'iso-8859-1',
    'iso-8859-2': 'iso-8859-2',
    'iso-8859-6': 'iso-8859-6',
    'iso-8859-15': 'iso-8859-15',
    'windows-1252': 'windows-1252',
    'utf-16': 'utf-16'
};


interface Base64Props{
    selected: string
    setSelected: (state: string) => void,
    input: string,
    output: string,
    setInput: (state: string) => void
    setOutput: (state: string) => void
    dropMenu: Charset
    checkbox: boolean
    withoutPadding: boolean
    setCheckbox: (state: boolean) => void
    setWithoutPadding: (state: boolean) => void
    setDropMenu: (state: string) => void
    setClear: ()=> void
}

export const useBase64 = create<Base64Props>((set)=>({
    selected: '',
    setSelected: (state) => set({selected: state}),
    input: '',
    output: '',
    setInput: (state) => set({input: state}),
    setOutput: (state) => set({output: state}),
    checkbox: false,
    setCheckbox: (state) => set({checkbox: state}),
    dropMenu: "utf-8",
    setDropMenu: (state) => set({dropMenu: charsetMap[state]}),
    setClear: () => set({input: '', output: '', selected: ''}),
    withoutPadding: false,
    setWithoutPadding: (state) => set({withoutPadding: state})
}))