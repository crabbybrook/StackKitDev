import { create } from "zustand"

interface JwtProps {
    header: string,
    payload: string,
    sign: string,
    token: string,
    tokenStatus: {
        isActive: boolean | string,
        statusText: string,
        timeLeftTime: string,
    }
    setTokenStatus: (state: {
        isActive: boolean,
        statusText: string,
        timeLeftTime: string,
    }) => void
    expDate: Date | null
    setHeader: (state: string) => void
    setPayload: (state: string) => void
    setSign: (state: string) => void
    setToken: (state: string) => void
    setExpDate: (state: Date) => void
    setClear: () => void
}

export const useJWT = create<JwtProps>((set) => ({
    header: '',
    payload: '',
    sign: '',
    token: '',
    tokenStatus: {
        isActive: '',
        statusText: '',
        timeLeftTime: '',
    },
    expDate: null,
    setExpDate: (state) => set({expDate: state}),
    setTokenStatus: (state) => set({tokenStatus: {isActive: state.isActive, statusText: state.statusText, timeLeftTime: state.timeLeftTime}}),
    setToken: (state) => set({ token: state }),
    setHeader: (state) => set({ header: state }),
    setPayload: (state) => set({ payload: state }),
    setSign: (state) => set({ sign: state }),
    setClear: () => set({header: '',
    payload: '',
    sign: '',
    token: '',
    tokenStatus: {
        isActive: '',
        statusText: '',
        timeLeftTime: '',
    },expDate: null})
}))