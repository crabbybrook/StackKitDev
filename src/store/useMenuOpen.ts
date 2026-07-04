import { create } from "zustand"
import { persist } from "zustand/middleware"

interface MenuProps{
    jsonTools: boolean
    encodeTools: boolean
    regexTools: boolean
    timeTools: boolean
    colorTools: boolean
    setJsonToolsOpen: (jsonTools: boolean) => void
    setEncodeToolsOpen: (encodeTools: boolean) => void
    setRegexToolsOpen: (regexTools: boolean) => void
    setTimeToolsOpen: (timeTools: boolean) => void
    setColorToolsOpen: (colorTools: boolean) => void
}

export const useMenuOpen = create<MenuProps>((set)=>({
    jsonTools: false,
    encodeTools: false,
    regexTools: false,
    timeTools: false,
    colorTools: false,
    setJsonToolsOpen: (jsonTools) => set({jsonTools: jsonTools}),
    setEncodeToolsOpen: (encodeTools) => set({encodeTools: encodeTools}),
    setRegexToolsOpen: (regexTools) => set({regexTools: regexTools}),
    setTimeToolsOpen: (timeTools) => set({timeTools: timeTools}),
    setColorToolsOpen: (colorTools) => set({colorTools: colorTools})
}))