import { useEffect } from "react";
import { Clear, Copy, Cross, Minify, Run, Sample, Tick } from "../../Icons/allIcons";
import { formatJson, minifyJson } from "../../lib/json";
import { useJsonFormat } from "../../store/useJsonFormat";
import ToolBtn from "../ToolBtn";
import ToolFooter from "../ToolFooter";

export default function JsonForVal() {
    const inpJson = useJsonFormat((state) => state.inputJson)
    const outJson = useJsonFormat((state) => state.outputJson)
    const setInpJson = useJsonFormat((state) => state.setInputJson)
    const setOutJson = useJsonFormat((state) => state.setOutputJson)
    const setClear = useJsonFormat((state) => state.setClear)

    const lines = outJson ? outJson.value.split('\n').length : 0
    const characters = outJson ? outJson.value.length : 0
    const fileSize = outJson ? new Blob([outJson.value]).size : 0

    const outCopied = async () => {
        if (!outJson) return
        await navigator.clipboard.writeText(outJson.value)
    }
    const inpCopied = async () => {
        if (!inpJson) return
        await navigator.clipboard.writeText(inpJson)
    }


    const loadSample = () => {
        const sample = {
            id: 1,
            name: "Wireless Mouse",
            price: 25.99,
            inStock: true,
            tags: ["electronics", "accessory", "office"]
        }
        const stringedSample = JSON.stringify(sample, null, 2)
        setInpJson(stringedSample)
    }

    useEffect(()=> {
        setClear()
    }, [])
    
    return <div className="w-full min-h-fit text-white">
        <div className="flex gap-2 mt-3">
            <ToolBtn title="Sample" logo={Sample} onClick={()=>{
                loadSample()
            }} hoverColor="hover:bg-gray-900"/>
           
            <ToolBtn title="Run" logo={Run} onClick={() => {
                const returnedValue = formatJson(inpJson)
                if(returnedValue.ok && returnedValue.value2){
                    setOutJson({ok: returnedValue.ok, value: returnedValue.value2})
                }else{
                    setOutJson({ok:returnedValue.ok, err: returnedValue.error, value: ''})
                }
            }}hoverColor="hover:bg-green-600" />
            <ToolBtn title="Run Minify" logo={Minify} onClick={() => {
               const returnedValue = minifyJson(inpJson)
                if(returnedValue.ok && returnedValue.value2){
                    setOutJson({ok: returnedValue.ok, value: returnedValue.value2})
                }else{
                    setOutJson({ok:returnedValue.ok, err: returnedValue.error, value: ''})
                }
            }} hoverColor="hover:bg-purple-500"/>
            <ToolBtn title="Clear" logo={Clear} onClick={() => {
                setClear()
            }} hoverColor="hover:bg-white hover:text-black"/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 justify-start mt-5 gap-2">
            <div className="text-white bg-gray-800  p-2 rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="select-none">Input JSON</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={inpCopied} hoverColor="hover:text-gray-500"/>
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg h-30 md:h-85">

                    <textarea value={inpJson} onChange={(e) => setInpJson(e.target.value)} placeholder="Paste your raw JSON string here." className="flex-1 p-2 bg-transparent text-orange-300 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full" spellCheck="false" />


                </div>

            </div>
            <div className="text-white bg-gray-800  p-2 rounded-2xl mt-2 md:mt-0">
                <div className="flex justify-between items-center">

                    <p className="select-none">Output JSON</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={outCopied} hoverColor="hover:text-gray-500"/>
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg h-30 md:h-85">

                    <textarea value={outJson.value} readOnly  className="flex-1 p-2 bg-transparent text-orange-300 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 min-h-full" spellCheck="false" />


                </div>
            </div>
            
        </div>

        {(outJson.value || outJson.err) && <div className="bg-gray-800 text-sm mt-3 p-2 rounded-lg">
            <div className="flex justify-between items-center text-white select-none">
                {(!outJson.ok && outJson.err) ? <ToolFooter logo={Cross} title={outJson.err} color="text-red-500"/> : <ToolFooter logo={Tick} title="Valid JSON" color="text-green-400"/>}
                <div className="text-white text-sm flex gap-2 select-none">
                    <p>Lines: {`${lines}`}</p>
                    <p>Characters: {`${characters}`}</p>
                    <p>Size: {fileSize > 1024 ? `${(fileSize / 1024).toFixed(2)}KB` : `${fileSize}B`}</p>
                </div>
            </div>
        </div>}
    </div>
}

