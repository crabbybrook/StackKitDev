import { Clear, Copy, Cross, Tick } from "../../Icons/allIcons";
import ToolBtn from "../ToolBtn";
import ToolFooter from "../ToolFooter";
import { useBase64 } from "../../store/useBase64";
import { decodeBase64, encodeBase64 } from "../../lib/base64";
import { useEffect } from "react";

export default function Base64EncDec() {
    const input = useBase64((state) => state.input)
    const output = useBase64((state) => state.output)
    const setInput = useBase64((state) => state.setInput)
    const setOutput = useBase64((state) => state.setOutput)
    const checkbox = useBase64((state) => state.checkbox)
    const dropMenu = useBase64((state) => state.dropMenu)
    const setCheckbox = useBase64((state) => state.setCheckbox)
    const setDropMenu = useBase64((state) => state.setDropMenu)
    const setClear = useBase64((state) => state.setClear)
    const selected = useBase64((state) => state.selected)
    const setSelected = useBase64((state) => state.setSelected)
    const withoutPadding = useBase64((state) => state.withoutPadding)
    const setWithoutPadding = useBase64((state) => state.setWithoutPadding)

    const outCopied = async () => {
        if (!output) return
        await navigator.clipboard.writeText(output)

    }
    const inpCopied = async () => {
        if (!input) return
        await navigator.clipboard.writeText(input)

    }

    useEffect(()=> {
        setClear()
    }, [])


    return <div className="w-full min-h-fit text-white">
        <div className="grid grid-cols-3 lg:grid-cols-6  gap-2 mt-3">

            <div className={`flex justify-center items-center text-white ${selected === "Encode" ? "bg-blue-400" : "bg-gray-800"} p-2 gap-2 rounded-lg hover:bg-blue-400 cursor-pointer select-none col-span-1`} onClick={() => {
                setSelected("Encode")
                const returnedValue = encodeBase64(input, { charset: dropMenu, withoutPadding: withoutPadding, urlSafe: checkbox })
                if (returnedValue !== "false") {
                    setOutput(returnedValue)
                } else {
                    setOutput("Encoding Failed")
                }
            }}>
                <div className="text-sm">Encode</div>
            </div>
            <div className={`flex justify-center items-center text-white ${selected == "Decode" ? "bg-blue-400" : "bg-gray-800"}  p-2 gap-2 rounded-lg hover:bg-blue-400 cursor-pointer select-none col-span-1`} onClick={() => {
                setSelected("Decode")
                if (input === '') {
                    setOutput('')
                } else {
                    const returnedValue = decodeBase64(input, { charset: dropMenu, urlSafe: checkbox })
                    if (returnedValue !== 'false') {
                        setOutput(returnedValue)
                    } else {
                        setOutput("Decoding Failed")
                    }
                }

            }} >
                <div className="text-sm ">Decode</div>
            </div>

            <ToolBtn title="Clear" logo={Clear} onClick={() => {
                setClear()
            }} hoverColor="hover:bg-white hover:text-black" grid="col-span-1" />

            <div className="flex justify-center items-center gap-3 col-span-3 mt-2 lg:mt-0">
                <div className="flex justify-center items-center gap-2">
                    <p className="text-xs select-none">Charset</p>
                    <select value={dropMenu} onChange={(e) => { setDropMenu(e.target.value) }} className="bg-white text-black select-none">
                        <option>{'utf-8'}</option>
                        <option>{'ascii'}</option>
                        <option>{'iso-8859-1'}</option>
                        <option>{'iso-8859-2'}</option>
                        <option>{'iso-8859-6'}</option>
                        <option>{'iso-8859-15'}</option>
                        <option>{'windows-1252'}</option>
                        <option>{'utf-16'}</option>
                    </select>

                </div>
                <div className="flex justify-center items-center gap-2">
                    <input type="checkbox" value="subscribe_intent" onChange={(e) => { setCheckbox(e.target.checked) }} />
                    <p className="text-xs select-none">URL Safe</p>
                </div>

                <div className={`flex justify-center items-center gap-2 ${selected === "Decode" ? "hidden" : "block"}`}>
                    <input type="checkbox" value="subscribe_intent" onChange={(e) => { setWithoutPadding(e.target.checked) }} className="text-white" />
                    <p className="text-xs select-none">Without Padding</p>
                </div>

            </div>


        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 justify-start mt-5 gap-2">
            <div className="text-white bg-gray-800  p-2 rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="select-none">{selected === "Decode" ? "Input Base64" : "Input"}</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={inpCopied} hoverColor="hover:text-gray-500" />
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg h-30 md:h-85">

                    <textarea value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 p-2 bg-transparent text-orange-300 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full" spellCheck="false" />


                </div>

            </div>
            <div className="text-white bg-gray-800  p-2 rounded-2xl mt-2 md:mt-0">
                <div className="flex justify-between items-center">

                    <p className="select-none">{selected === "Encode" ? "Output Base64" : "Output"}</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={outCopied} hoverColor="hover:text-gray-500" />
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg h-30 md:h-85">

                    <textarea value={output === "Decoding Failed" ? "" : output} readOnly className="flex-1 p-2 bg-transparent text-orange-300 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 min-h-full" />


                </div>
            </div>

        </div>

        {output && <div className="bg-gray-800 text-sm mt-3 p-2 rounded-lg">
            <div className="flex justify-between items-center text-white select-none">

                {(output === "Decoding Failed") ? <ToolFooter logo={Cross} title="Decoding Failed" color="text-red-500" /> : <ToolFooter logo={Tick} title="Converted Succeesfully" color="text-green-400" />}
            </div>
        </div>}
    </div>
}

