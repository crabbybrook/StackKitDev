import { create } from "zustand"
import type { ColorHarmonies } from "../lib/color"

interface RgbHex {
    setClear: () => void,

    r: string,
    g: string,
    b: string,
    a?: string

    setR: (state: string) => void,
    setG: (state: string) => void,
    setB: (state: string) => void,
    setA: (state: string) => void,
    outHSL: {
        h: number, s: number, l: number, a?: number
    },
    setOutHSL: (state: {
        h: number, s: number, l: number, a?: number
    }) => void,
    outOklch: {
        l: number, c: number, h: number, a?: number
    }
    setOutOklch: (state: {
        l: number, c: number, h: number, a?: number
    }) => void

    scales: {
        tints: string[],
        shades: string[],
    }

    setScales: (state: {
        tints: string[],
        shades: string[],
    }) => void

    preview: {
        hex: string,
        isDark: boolean,
        rgba: string,
        contrastWithWhite: number,
        contrastWithBlack: number
    }
    setPreview: (state: {
        hex: string,
        rgba: string,
        isDark: boolean,
        contrastWithWhite: number,
        contrastWithBlack: number
    }) => void

    copy: string,
    setCopy: (state: string) => void,

     harmonies: ColorHarmonies[],
    setHarmonies: (state: ColorHarmonies[]) => void

    dropMenu: string,
    setDropMenu: (state: string) => void

}

export const useRgbHex = create<RgbHex>((set) => ({
    dropMenu: 'Choose Harmony',
    setDropMenu: (state) => set({dropMenu: state}),
    harmonies: [],
    setHarmonies: (state) => set({harmonies: state}),
    copy: '',
    setCopy: (state) => set({ copy: state }),
    preview: {
        hex: '',
        rgba: '',
        isDark: false,
        contrastWithWhite: 0,
        contrastWithBlack: 0
    },
    setPreview: (state) => set({
        preview: {
            hex: state.hex,
            rgba: state.rgba,
            isDark: state.isDark,
            contrastWithWhite: state.contrastWithWhite,
            contrastWithBlack: state.contrastWithBlack
        }
    }),
    r: '',
    g: '',
    b: '',
    a: '',
    setR: (state) => set({ r: state }),
    setG: (state) => set({ g: state }),
    setB: (state) => set({ b: state }),
    setA: (state) => set({ a: state }),
    outHSL: {
        h: 0, s: 0, l: 0, a: 0
    },
    setOutHSL: (state) => set({
        outHSL: {
            h: state.h, s: state.s, l: state.l, a: state.a
        }
    }),
    outOklch: {
        l: 0, c: 0, h: 0, a: 0
    },
    setOutOklch: (state) => set({
        outOklch: {
            l: state.l, c: state.c, h: state.h, a: state.a
        }
    }),
    scales: {
        tints: [],
        shades: [],
    },

    setScales: (state) => set({
        scales: {
            tints: state.tints,
            shades: state.shades
        }
    }),
    setClear: () => set({

        r: '',
        g: '',
        b: '',
        a: '',

        outHSL: {
            h: 0, s: 0, l: 0, a: 0
        },
        outOklch: {
            l: 0, c: 0, h: 0, a: 0
        },
        scales: {
            tints: [],
            shades: []
        },
        preview: {
            hex: '',
            isDark: false,
            rgba: '',
            contrastWithWhite: 0,
            contrastWithBlack: 0
        },
        harmonies: [],
        dropMenu: 'Choose Harmony'
    })
}))