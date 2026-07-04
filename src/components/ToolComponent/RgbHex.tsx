import { useEffect } from "react"
import { Clear, Copy, Run } from "../../Icons/allIcons"
import { generateAdvancedHarmonies, generateScales, getColorDetails, hexToHsl, hexToRgb, rgbToHex, rgbToHsl, rgbToOklch } from "../../lib/color"
import { useRgbHex } from "../../store/useRgbHex"
import ToolBtn from "../ToolBtn"

export default function RgbHex() {
    const setClear = useRgbHex((state) => state.setClear)
    const r = useRgbHex((state) => state.r)
    const g = useRgbHex((state) => state.g)
    const b = useRgbHex((state) => state.b)
    const a = useRgbHex((state) => state.a)
    const setR = useRgbHex((state) => state.setR)
    const setG = useRgbHex((state) => state.setG)
    const setB = useRgbHex((state) => state.setB)
    const setA = useRgbHex((state) => state.setA)
    const outputHSL = useRgbHex((state) => state.outHSL)
    const setOutputHSL = useRgbHex((state) => state.setOutHSL)
    const outputOklch = useRgbHex((state) => state.outOklch)
    const setOutputOklch = useRgbHex((state) => state.setOutOklch)
    const preview = useRgbHex((state) => state.preview)
    const setPreview = useRgbHex((state) => state.setPreview)
    const scales = useRgbHex((state) => state.scales)
    const setScales = useRgbHex((state) => state.setScales)
    const copy = useRgbHex((state) => state.copy)
    const setCopy = useRgbHex((state) => state.setCopy)
    const harmonics = useRgbHex((state) => state.harmonies)
    const setHarmonics = useRgbHex((state) => state.setHarmonies)
    const dropMenu = useRgbHex((state) => state.dropMenu)
    const setDropMenu = useRgbHex((state) => state.setDropMenu)

    useEffect(() => {
        setClear()
    }, [])

    const harmonicsCopy = async (text: string) => {
        await navigator.clipboard.writeText(text)
        setCopy(text)

        setTimeout(() => {
            setCopy('')
        }, 2000)
    }

    const hexCopy = async () => {
        await navigator.clipboard.writeText(`${preview.hex}`)
    }
    const rgbaCopy = async () => {
        await navigator.clipboard.writeText(`${preview.rgba}`)
    }

    const hslCopy = async () => {
        await navigator.clipboard.writeText(`hsl(${outputHSL.h}, ${outputHSL.s}, ${outputHSL.l})`)
    }
    const hslaCopy = async () => {
        await navigator.clipboard.writeText(`hsla(${outputHSL.h}, ${outputHSL.s}, ${outputHSL.l}, ${outputHSL.a})`)
    }
    const oklchCopy = async () => {
        await navigator.clipboard.writeText(`oklch(${outputOklch.l}, ${outputOklch.c}, ${outputOklch.h})`)
    }
    const oklchaCopy = async () => {
        await navigator.clipboard.writeText(`oklch(${outputOklch.l} ${outputOklch.c} ${outputOklch.h} / ${outputOklch.a})`)
    }

    const previewCopy = async (text: string) => {
        await navigator.clipboard.writeText(text)
        setCopy(text)

        setTimeout(() => {
            setCopy('')
        }, 2000)
    }
    const shadeCopy = async (text: string) => {
        await navigator.clipboard.writeText(text)
        setCopy(text)

        setTimeout(() => {
            setCopy('')
        }, 2000)
    }
    const tintCopy = async (text: string) => {
        await navigator.clipboard.writeText(text)
        setCopy(text)

        setTimeout(() => {
            setCopy('')
        }, 2000)
    }

    return <div className="w-full min-h-fit text-white">
        <div className="flex gap-2 mt-3">
            <ToolBtn title="Convert" logo={Run} onClick={() => {
                const returnHEX = rgbToHex(Number(r), Number(g), Number(b), Number(a))
                const returnedHSL = rgbToHsl(Number(r), Number(g), Number(b), Number(a))
                const returnOklch = rgbToOklch(Number(r), Number(g), Number(b), Number(a))
                const returnColorDetails = getColorDetails(returnHEX)
                const returnScales = generateScales(returnHEX)
                const returnHarmonics = generateAdvancedHarmonies(returnHEX)
                setHarmonics(returnHarmonics)

                setOutputOklch({ l: returnOklch.l, c: returnOklch.c, h: returnOklch.h, a: returnOklch.a })
                setScales({ shades: returnScales.shades, tints: returnScales.tints })
                setOutputHSL({ h: returnedHSL.h, s: returnedHSL.s, l: returnedHSL.l, a: returnedHSL.a })
                setPreview({
                    hex: returnColorDetails.hex,
                    rgba: returnColorDetails.rgba,
                    isDark: returnColorDetails.isDark,
                    contrastWithWhite: returnColorDetails.contrastWithWhite,
                    contrastWithBlack: returnColorDetails.contrastWithBlack
                })

            }} hoverColor="hover:bg-green-600" />

            <ToolBtn title="Clear" logo={Clear} onClick={() => {
                setClear()
            }} hoverColor="hover:bg-white hover:text-black" />

        </div>
        <div className="grid grid-cols-1 justify-start mt-5 gap-2">
            <div className="text-white bg-gray-800  p-2 rounded-xl">
                <div className="flex justify-between items-center select-none">
                    <p>Input RGB</p>
                </div>

                <div className="grid grid-cols-1 overflow-hidden justify-center rounded-lg mt-3">
                    <div className="grid grid-cols-1 justify-start items-center rounded-lg bg-[#0b1329] gap-4 p-2">
                        <div className="border border-red-500 rounded-lg flex p-2 justify-center items-center gap-3">
                            <p className="font-bold text-lg select-none">r:</p>
                            <input value={r} onChange={(e) => setR(e.target.value)} placeholder="0" className="flex-1  text-red-500 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full  bg-transparent content-center" spellCheck="false" />
                        </div>

                        <div className="border border-green-500 rounded-lg flex justify-center items-center gap-3 p-2">
                            <p className="font-bold text-lg select-none">g:</p>
                            <input value={g} onChange={(e) => setG(e.target.value)} placeholder="0" className="flex-1 text-green-500 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full  bg-transparent content-center" spellCheck="false" />
                        </div>
                        <div className="border border-blue-500 rounded-lg flex justify-center items-center gap-3 p-2">
                            <p className="font-bold text-lg select-none">b:</p>
                            <input value={b} onChange={(e) => setB(e.target.value)} placeholder="0" className="flex-1  text-blue-500 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full  bg-transparent content-center" spellCheck="false" />
                        </div>

                        <div className="border border-pink-500 rounded-lg flex justify-center items-center gap-3 p-2">
                            <p className="font-bold text-lg select-none">a:</p>
                            <input value={a} onChange={(e) => setA(e.target.value)} placeholder="0" className="flex-1  text-pink-500 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full  bg-transparent content-center" spellCheck="false" />

                        </div>


                    </div>

                </div>
            </div>
            <div className="text-white bg-gray-800  p-2 rounded-xl">
                <div className="flex justify-between items-center select-none">
                    <p>Output</p>
                </div>

                <div className="grid grid-cols-1 overflow-hidden justify-center rounded-lg mt-3">

                    <div className="h-10 border border-gray-600 flex justify-between items-center rounded-lg bg-[#0b1329] gap-2 p-2">
                        <div className="flex gap-2 justify-center items-center">
                            <p className="text-xs select-none">HEX:</p>
                            <div className={`${preview.hex ? "text-lime-400" : "text-gray-500"} resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5  bg-transparent content-center`} spellCheck="false" >
                                {preview.hex ? preview.hex : '#000000'}
                            </div>

                        </div>
                        <div className={`${preview.hex ? "block" : "hidden"}`}>
                            <ToolBtn title="Copy" logo={Copy} onClick={hexCopy} hoverColor="hover:text-gray-500" />

                        </div>
                    </div>
                    <div className="h-10 border border-gray-600 flex justify-between items-center rounded-lg bg-[#0b1329] gap-2 p-2">
                        <div className="flex gap-2 justify-center items-center">
                            <p className="text-xs select-none">RGBA: </p>
                            <div className={`${preview.rgba ? "text-lime-400" : "text-gray-500"} resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5  bg-transparent content-center`} spellCheck="false" >
                                {preview.rgba ? preview.rgba : `rgba(0, 0, 0, 0)`}
                            </div>

                        </div>
                        <div className={`${preview.rgba ? "block" : "hidden"}`}>
                            <ToolBtn title="Copy" logo={Copy} onClick={rgbaCopy} hoverColor="hover:text-gray-500" />

                        </div>
                    </div>


                    <div className="h-10 border border-gray-600 flex justify-between items-center rounded-lg bg-[#0b1329] gap-2 p-2">
                        <div className="flex gap-2 justify-center items-center">

                            <p className="text-xs select-none">HSL:</p>
                            <div className={`${preview.hex ? "text-lime-400" : "text-gray-500"} resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5  bg-transparent content-center`} spellCheck="false" >
                                {`hsl(${outputHSL.h}, ${outputHSL.s}, ${outputHSL.l})`}
                            </div>
                        </div>
                        <div className={`${preview.hex ? "block" : "hidden"}`}>
                            <ToolBtn title="Copy" logo={Copy} onClick={hslCopy} hoverColor="hover:text-gray-500" />

                        </div>
                    </div>
                    <div className="h-10 border border-gray-600 flex justify-between items-center rounded-lg bg-[#0b1329] gap-2 p-2">
                        <div className="flex gap-2 justify-center items-center">

                            <p className="text-xs select-none">HSLA:</p>
                            <div className={`${preview.hex ? "text-lime-400" : "text-gray-500"} resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5  bg-transparent content-center`} spellCheck="false" >
                                {`hsla(${outputHSL.h}, ${outputHSL.s}, ${outputHSL.l}, ${outputHSL.a})`}
                            </div>
                        </div>
                        <div className={`${preview.hex ? "block" : "hidden"}`}>
                            <ToolBtn title="Copy" logo={Copy} onClick={hslaCopy} hoverColor="hover:text-gray-500" />

                        </div>
                    </div>

                    <div className="h-10 border border-gray-600 flex justify-between items-center rounded-lg bg-[#0b1329] gap-2 p-2">
                        <div className="flex gap-2 justify-center items-center">
                            <p className="text-xs select-none">Oklch:</p>
                            <div className={`${preview.hex ? "text-lime-400" : "text-gray-500"} resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5  bg-transparent content-center`} spellCheck="false" >
                                {`oklch(${outputOklch.l} ${outputOklch.c} ${outputOklch.h} / ${outputOklch.a})`}
                            </div>

                        </div>
                        <div className={`${preview.hex ? "block" : "hidden"}`}>
                            <ToolBtn title="Copy" logo={Copy} onClick={oklchaCopy} hoverColor="hover:text-gray-500" />

                        </div>
                    </div>


                </div>
                {(preview.hex) && <>
                    <div className="grid grid-cols-1 overflow-hidden justify-center rounded-lg h-20 mt-3">
                        <div className="h-15 flex justify-start items-center rounded-lg gap-2 p-2" style={{ backgroundColor: preview.hex || "#ffffff" }}>
                            <div className={`flex-1 p-2 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full  bg-transparent content-center font-bold cursor-pointer select-none ${preview.isDark ? 'text-white' : 'text-black'}`} onClick={()=>{
                                previewCopy(preview.hex)
                            }} spellCheck="false">
                                {copy === preview.hex ? "Copied" : preview.hex}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 overflow-hidden justify-center rounded-lg  mt-3">
                        <div className="flex justify-center items-center gap-2">
                            <select value={dropMenu} onChange={(e) => { setDropMenu(e.target.value) }} className="bg-white text-black select-none">
                                {dropMenu === "Choose Harmony" && <option>{`${dropMenu}`}</option>}
                                <option>{`${harmonics[0].name}`}</option>
                                <option>{`${harmonics[1].name}`}</option>
                                <option>{`${harmonics[2].name}`}</option>
                                <option>{`${harmonics[3].name}`}</option>
                                <option>{`${harmonics[4].name}`}</option>
                                <option>{`${harmonics[5].name}`}</option>
                                <option>{`${harmonics[6].name}`}</option>
                            </select>
                        </div>
                        {dropMenu !== "Choose Harmony" && <div className="flex flex-wrap justify-center items-center mt-2 p-2 m-2">
                            {harmonics.find(x => x.name === dropMenu)?.colors.map((color) => {
                                const hex = color.replace('#', '');
                                const r = parseInt(hex.substring(0, 2), 16);
                                const g = parseInt(hex.substring(2, 4), 16);
                                const b = parseInt(hex.substring(4, 6), 16);

                                const brightness = (r * 299 + g * 587 + b * 114) / 1000;

                                const isDark = brightness < 128;
                                return <div className={`flex font-bold p-5 text-xs transition-transform duration-200 ease-in-out hover:scale-95 origin-center cursor-pointer ${isDark ? 'text-white' : 'text-black'}`} onClick={() => { harmonicsCopy(color) }} spellCheck="false" style={{ backgroundColor: color }}>
                                    {copy === color ? "Copied" : color}
                                </div>
                            })
                            }

                        </div>
                        }

                    </div>
                        <div className="gap-2 mt-5 select-none">
                            <div className="font-bold text-sm">
                                <p>Shades</p>
                            </div>
                            <div className="flex flex-wrap justify-center rounded-lg h-20 mt-3 gap-2 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5">


                                {scales.shades.map((shade, i) => {
                                    const hex = shade.replace('#', '');
                                    const r = parseInt(hex.substring(0, 2), 16);
                                    const g = parseInt(hex.substring(2, 4), 16);
                                    const b = parseInt(hex.substring(4, 6), 16);

                                    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

                                    const isDark = brightness < 128;
                                    return <div className={`font-bold rounded-xl flex items-center p-2 text-xs transition-transform duration-200 ease-in-out hover:scale-95 origin-center cursor-pointer ${isDark ? 'text-white' : 'text-black'}`} style={{ backgroundColor: shade }} key={i} onClick={() => { shadeCopy(shade) }}>
                                        {copy === shade ? "Copied" : shade}
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className="mt-4 select-none">
                            <div className="font-bold text-sm">
                                <p>Tints</p>
                            </div>
                            <div className="flex flex-wrap justify-center rounded-lg h-20 mt-3 gap-2 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5">

                                {scales.tints.map((tint, i) => {
                                    const hex = tint.replace('#', '');
                                    const r = parseInt(hex.substring(0, 2), 16);
                                    const g = parseInt(hex.substring(2, 4), 16);
                                    const b = parseInt(hex.substring(4, 6), 16);

                                    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

                                    const isDark = brightness < 128;
                                    return <div className={`font-bold rounded-xl flex items-center p-2 text-xs transition-transform duration-200 ease-in-out hover:scale-95 origin-center cursor-pointer ${isDark ? "text-white" : 'text-black'}`} style={{ backgroundColor: tint }} key={i} onClick={() => { tintCopy(tint) }}>
                                        {copy === tint ? "Copied" : tint}
                                    </div>
                                })}
                            </div>
                        </div>

                        <div className="flex gap-2 text-xs mt-5 p-2 font-mono justify-center items-center">
                            <span className={`px-1.5 py-0.5 rounded ${preview.contrastWithWhite >= 4.5 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                White: {preview.contrastWithWhite.toFixed(1)}x
                            </span>
                            <span className={`px-1.5 py-0.5 rounded ${preview.contrastWithBlack >= 4.5 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                Black: {preview.contrastWithBlack.toFixed(1)}x
                            </span>
                        </div>
                    </>}
                </div>
            </div>
        </div>

}