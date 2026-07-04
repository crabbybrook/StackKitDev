import { Clear, Copy, Cross, Run, Sample, Tick } from "../../Icons/allIcons";
import ToolBtn from "../ToolBtn";
import ToolFooter from "../ToolFooter";
import { useCsvJson } from "../../store/useCsvJson";
import { csvToJson } from "../../lib/csv";
import { useEffect } from "react";

export default function Csvjson() {
    const inpCsv = useCsvJson((state) => state.inpCsv)
    const outJson = useCsvJson((state) => state.outJson)
    const setInpCsv = useCsvJson((state) => state.setInpCsv)
    const setOutJson = useCsvJson((state) => state.setOutJson)
    const setClear = useCsvJson((state) => state.setClear)

    const lines = outJson ? outJson.split('\n').length : 0
    const characters = outJson ? outJson.length : 0
    const fileSize = outJson ? new Blob([outJson]).size : 0

    useEffect(()=>{
        setClear()
    }, []) 

    const outCopied = async () => {
        if (!outJson) return
        await navigator.clipboard.writeText(outJson)

    }
    const inpCopied = async () => {
        if (!inpCsv) return
        await navigator.clipboard.writeText(inpCsv)

    }


    const loadSample = () => {
        const sample = `Name,Age,Role
Alice,28,Developer
Bob,34,Manager
Charlie,25,Designer
                `
       
        setInpCsv(sample)
    }
    return <div className="w-full min-h-fit text-white">
        <div className="flex gap-2 mt-3">
            <ToolBtn title="Sample" logo={Sample} onClick={() => {
                loadSample()
            }} hoverColor="hover:bg-gray-900" />

            <ToolBtn title="Convert" logo={Run} onClick={() => {
                const returnedValue = csvToJson(inpCsv)
                if (returnedValue) {
                    setOutJson(JSON.stringify(returnedValue, null, 2))
                } else {
                    setOutJson("Conversion Failed")
                }
            }} hoverColor="hover:bg-green-600" />

            <ToolBtn title="Clear" logo={Clear} onClick={() => {
                setClear()
            }} hoverColor="hover:bg-white hover:text-black" />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 justify-start mt-5 gap-2">
            <div className="text-white bg-gray-800  p-2 rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="select-none">Input CSV</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={inpCopied} hoverColor="hover:text-gray-500" />
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg h-30 md:h-85">

                    <textarea value={inpCsv} onChange={(e) => setInpCsv(e.target.value)} placeholder="Paste your CSV data here." className="flex-1 p-2 bg-transparent text-orange-300 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full" spellCheck="false" />


                </div>

            </div>
            <div className="text-white bg-gray-800  p-2 rounded-2xl mt-2 md:mt-0">
                <div className="flex justify-between items-center">

                    <p className="select-none">Output JSON</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={outCopied} hoverColor="hover:text-gray-500" />
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg h-30 md:h-85">

                    <textarea value={outJson} readOnly className="flex-1 p-2 bg-transparent text-orange-300 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 min-h-full" />


                </div>
            </div>

        </div>

        {outJson && <div className="bg-gray-800 text-sm mt-3 p-2 rounded-lg">
            <div className="flex justify-between items-center text-white select-none">
                {outJson == "Conversion Failed" ? <ToolFooter logo={Cross} title={outJson} color="text-red-500" /> : <ToolFooter logo={Tick} title="Converted Succeesfully" color="text-green-400" />}
                <div className="text-white text-sm flex gap-2 select-none">
                    <p>Lines: {`${lines}`}</p>
                    <p>Characters: {`${characters}`}</p>
                    <p>Size: {fileSize > 1024 ? `${(fileSize / 1024).toFixed(2)}KB` : `${fileSize}B`}</p>
                </div>
            </div>
        </div>}
    </div>
}

