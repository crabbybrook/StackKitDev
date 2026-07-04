import { Clear, Copy, Cross, Run, Sample, Tick } from "../../Icons/allIcons";

import ToolBtn from "../ToolBtn";
import ToolFooter from "../ToolFooter";
import { useJsonCsv } from "../../store/useJsonCsv";
import { jsonToCsv } from "../../lib/csv";
import { useEffect } from "react";

export default function Jsoncsv() {
    const inpJson = useJsonCsv((state) => state.inputJson)
    const outCsv = useJsonCsv((state) => state.outputCsv)
    const setInpJson = useJsonCsv((state) => state.setInputJson)
    const setOutCsv = useJsonCsv((state) => state.setOutputCsv)
    const setClear = useJsonCsv((state) => state.setClear)

    useEffect(()=>{
        setClear()
    }, [])


    const outCopied = async () => {
        if (!outCsv.fullCsv) return
        await navigator.clipboard.writeText(outCsv.fullCsv)
      
    }
    const inpCopied = async () => {
        if (!inpJson) return
        await navigator.clipboard.writeText(inpJson)
    }


    const loadSample = () => {
        const sample = [
            {
                "id": 1,
                "name": "Alice Smith",
                "role": "Developer",
                "active": true
            },
            {
                "id": 2,
                "name": "Bob Jones",
                "role": "Designer",
                "active": false
            },
            {
                "id": 3,
                "name": "Charlie Brown",
                "role": "Manager",
                "active": true
            }
        ]
        const stringedSample = JSON.stringify(sample, null, 2)
        setInpJson(stringedSample)
    }
    return <div className="w-full min-h-fit text-white">
        <div className="flex gap-2 mt-3">
            <ToolBtn title="Sample" logo={Sample} onClick={() => {
                loadSample()
            }} hoverColor="hover:bg-gray-900" />

            <ToolBtn title="Convert" logo={Run} onClick={() => {
                const returnedValue = jsonToCsv(inpJson)
                if (returnedValue.ok && returnedValue.headers) {
                    setOutCsv({ ok: returnedValue.ok, headers: returnedValue.headers, rows: returnedValue.rows, fullCsv: returnedValue.fullLine, rowCount: returnedValue.rowCount, columnCount: returnedValue.columnCount })
                } else {
                    setOutCsv({ ok: returnedValue.ok, msg: returnedValue.fullLine })

                }
            }} hoverColor="hover:bg-green-600" />

            <ToolBtn title="Clear" logo={Clear} onClick={() => {
                setClear()
            }} hoverColor="hover:bg-white hover:text-black" />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 justify-start mt-5 gap-2">
            <div className="text-white bg-gray-800  p-2 rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="select-none">Input JSON</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={inpCopied} hoverColor="hover:text-gray-500" />
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg h-30 md:h-85">

                    <textarea value={inpJson} onChange={(e) => setInpJson(e.target.value)} placeholder="Paste your raw JSON string here." className="flex-1 p-2 bg-transparent text-orange-300 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full" spellCheck="false" />


                </div>

            </div>
            <div className="text-white bg-gray-800  p-2 rounded-2xl mt-2 md:mt-0">
                <div className="flex justify-between items-center">

                    <p className="select-none">Output CSV</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={outCopied} hoverColor="hover:text-gray-500" />
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg h-30 md:h-85">

                    <textarea value={outCsv.fullCsv} readOnly className="flex-1 p-2 bg-transparent text-orange-300 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 min-h-full" spellCheck="false" />


                </div>
            </div>

        </div>

        {(outCsv.fullCsv || outCsv.msg) && <div className="bg-gray-800 text-sm mt-3 p-2 rounded-lg">
            <div className="flex justify-between items-center text-white select-none">
                {(!outCsv.ok && outCsv.msg) ? <ToolFooter logo={Cross} title="Invalid JSON" color="text-red-500" /> : <ToolFooter logo={Tick} title="Converted Succeesfully" color="text-green-400" />}
                <div className="text-white text-sm flex gap-2 select-none">
                    <p>Rows: {`${outCsv.rowCount ? outCsv.rowCount : 0}`}</p>
                    <p>Columns: {`${outCsv.columnCount ? outCsv.columnCount : 0}`}</p>
                </div>
            </div>
        </div>}
    </div>
}

