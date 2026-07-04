import { Clear, Copy, Cross, Run, Tick } from "../../Icons/allIcons";
import ToolBtn from "../ToolBtn";
import ToolFooter from "../ToolFooter";
import { useURL } from "../../store/useURL";
import { safeDecodeUrl, safeEncodeUrl } from "../../lib/url";
import { useEffect } from "react";

export default function URLEncDec() {
    const input = useURL((state) => state.input)
    const output = useURL((state) => state.output)
    const setInput = useURL((state) => state.setInput)
    const setOutput = useURL((state) => state.setOutput)
    const setClear = useURL((state) => state.setClear)
    const selected = useURL((state) => state.selected)
    const setSelected = useURL((state) => state.setSelected)

    const outCopied = async () => {
        await navigator.clipboard.writeText(output.result)

    }
    const inpCopied = async () => {
        await navigator.clipboard.writeText(input)

    }

    useEffect(() => {
        setClear()
    }, [])

    return <div className="w-full text-white">
        <div className="grid grid-cols-2 gap-2">
            <div className="flex gap-4 mt-4 col-span-2">
                <ToolBtn title={selected === "Encode" ? "Encode" : "Decode"} logo={Run} onClick={() => {
                    if (selected === "Encode") {
                        const returnedValue = safeEncodeUrl(input)

                        if (returnedValue.success) {
                            setOutput({ success: returnedValue.success, result: returnedValue.result })
                        } else {
                            setOutput({ success: returnedValue.success, error: returnedValue.error, result: returnedValue.result })
                        }
                    } else {
                        const returnedValue = safeDecodeUrl(input)
                        if (returnedValue.success) {
                            setOutput({ success: returnedValue.success, result: returnedValue.result })
                        } else {
                            setOutput({ success: returnedValue.success, error: returnedValue.error, result: returnedValue.result })
                        }
                    }

                }} hoverColor="hover:bg-green-600" grid={selected ? "block" : "hidden"} />

                <ToolBtn title="Clear" logo={Clear} onClick={() => {
                    setClear()
                }} hoverColor="hover:bg-white hover:text-black" />

            </div>

            <div className={`flex justify-center items-center text-white ${selected === "Encode" ? "bg-blue-400" : "bg-gray-800"} p-2 gap-2 rounded-lg hover:bg-blue-400 cursor-pointer select-none col-span-1`} onClick={() => {
                setSelected("Encode")
                setClear()
                
            }}>
                <div className="text-sm">Encode</div>
            </div>
            <div className={`flex justify-center items-center text-white ${selected == "Decode" ? "bg-blue-400" : "bg-gray-800"}  p-2 gap-2 rounded-lg hover:bg-blue-400 cursor-pointer select-none col-span-1`} onClick={() => {
                setSelected("Decode")
                setClear()
            }} >
                <div className="text-sm ">Decode</div>
            </div>



        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 justify-start mt-5 gap-2">
            <div className="text-white bg-gray-800  p-2 rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="select-none">{selected === "Encode" ? "Input URL" : "Input"}</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={inpCopied} hoverColor="hover:text-gray-500" />
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg h-30 md:h-85">

                    <textarea value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 p-2 bg-transparent text-orange-300 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full" spellCheck="false" />


                </div>

            </div>
            <div className="text-white bg-gray-800  p-2 rounded-2xl mt-2 md:mt-0">
                <div className="flex justify-between items-center">

                    <p className="select-none">{selected === "Decode" ? "Output URL" : "Output"}</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={outCopied} hoverColor="hover:text-gray-500" />
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg h-30 md:h-85">

                    <textarea value={output.result !== "" ? output.result : ""} readOnly className="flex-1 p-2 bg-transparent text-orange-300 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 min-h-full" />


                </div>
            </div>

        </div>

        {output.success && output.result && <div className="bg-gray-800 text-sm mt-3 p-2 rounded-lg select-none">
            <div className="flex justify-between items-center text-white">


                {(!output.success && output.error) ? <ToolFooter logo={Cross} title={output.error} color="text-red-500" /> : <ToolFooter logo={Tick} title="Converted Succeesfully" color="text-green-400" />}
            </div>
        </div>}
    </div>
}

