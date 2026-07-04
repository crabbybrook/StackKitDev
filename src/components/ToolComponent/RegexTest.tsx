import { useEffect } from "react";
import { Clear, Copy, Run, Sample } from "../../Icons/allIcons";
import { processRegexTool } from "../../lib/regex";
import { useRegex } from "../../store/useRegex";
import RegexBtn from "../RegexBtn";
import ToolBtn from "../ToolBtn";


export default function RegexTest() {
    const pattern = useRegex((state) => state.pattern)
    const text = useRegex((state) => state.text)
    const flags = useRegex((state) => state.flags)
    const setPattern = useRegex((state) => state.setPattern)
    const setText = useRegex((state) => state.setText)
    const setFlag = useRegex((state) => state.setFlag)
    const output = useRegex((state) => state.output)
    const setOutput = useRegex((state) => state.setOutput)
    const setClear = useRegex((state) => state.setClear)
    const active = useRegex((state) => state.active)
    const setActive = useRegex((state) => state.setActive)


    const loadSample = () => {
        const pattern = "\\[TEST\\]\\s*(?<emoji>\\p{Emoji_Presentation})?\\s*(?<content>.*)"
        const text = `[TEST] 🚨 Line One
Line Two

[test] ✨ Line Three
Line Four`;
        setPattern(pattern)
        setText(text)
    }

    const expCopy = async () => {
        await navigator.clipboard.writeText(JSON.stringify(pattern, null, 2))
    }
    const textCopy = async () => {
        await navigator.clipboard.writeText(JSON.stringify(text, null, 2))
    }
    const matchCopy = async () => {
        await navigator.clipboard.writeText(JSON.stringify(output.matches, null, 2))
    }
    const timeCopy = async () => {
        await navigator.clipboard.writeText(JSON.stringify(output.executionTimeMs, null, 2))
    }

    useEffect(()=>{
        setClear()
    }, [])

    return <div className="w-full text-white">
        <div className="flex gap-2 items-center">
            <ToolBtn title="Sample" logo={Sample} onClick={() => {
                loadSample()
            }} hoverColor="hover:bg-gray-900" />
            <ToolBtn title="Clear" logo={Clear} onClick={() => {
                setClear()
            }} hoverColor="hover:bg-gray-900" />
            <ToolBtn title="Run" logo={Run} onClick={() => {
                const { success, matches, executionTimeMs, err } = processRegexTool(pattern, text, flags)
                if (success) {
                    setOutput({ success, matches: matches, executionTimeMs })
                } else {
                    setOutput({ success, matches: matches, executionTimeMs, err })
                }
            }} hoverColor="hover:bg-gray-900" />
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-6 mb-2 overflow-hidden mt-1 rounded-lg pl-0 p-2 gap-2 ">

            <RegexBtn title="Global (g)" onClick={() => {
                setFlag("g")
                setActive("g")
            }} hoverColor="text-blue-400" grid={`${active === "g" ? "bg-blue-500 text-white" : "bg-gray-800"}`} />

            <RegexBtn title="Ignore (i)" onClick={() => {
                setFlag("i")
                setActive("i")
            }} hoverColor="text-blue-400" grid={`${active === "i" ? "bg-blue-500 text-white" : "bg-gray-800"}`} />
            <RegexBtn title="Multiline (m)" onClick={() => {
                setFlag("m")
                setActive("m")
            }} hoverColor="text-blue-400" grid={`${active === "m" ? "bg-blue-500 text-white" : "bg-gray-800"}`} />
            <RegexBtn title="Dot All (s)" onClick={() => {
                setFlag("s")
                setActive("s")
            }} hoverColor="text-blue-400" grid={`${active === "s" ? "bg-blue-500 text-white" : "bg-gray-800"}`} />
            <RegexBtn title="Unicode (u)" onClick={() => {
                setFlag("u")
                setActive("u")
            }} hoverColor="text-blue-400" grid={`${active === "u" ? "bg-blue-500 text-white" : "bg-gray-800"}`} />
            <RegexBtn title="Unicode Sets (v)" onClick={() => {
                setFlag("v")
                setActive("v")
            }} hoverColor="text-blue-400" grid={`${active === "v" ? "bg-blue-500 text-white" : "bg-gray-800"}`} />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 justify-start mt-5 gap-2">
            <div className="text-white bg-gray-800  p-2 rounded-xl col-span-2">
                <div className="flex justify-between items-center">
                    <p className="text-white select-none">Expression</p>
                    <div className="flex justify-between items-center">
                        <ToolBtn title="Copy" logo={Copy} onClick={expCopy} hoverColor="hover:text-gray-500" />

                        {(output.success && output.success !== '') ? <p className="text-green-500 select-none">Test: Success</p> : output.err ? <p className="text-red-500 select-none">Test: Failed</p> : ''}
                    </div>
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden mt-1 rounded-lg h-30 md:h-85">

                    <textarea value={pattern} onChange={(e) => { setPattern(e.target.value) }} className="flex-1 p-2 bg-transparent text-green-500 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full" spellCheck="false" />


                </div>

            </div>
            <div className="text-white bg-gray-800  p-2 rounded-xl col-span-1">
                <div className="flex justify-between items-center">
                    <p className="text-orange-500 select-none">Text String</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={textCopy} hoverColor="hover:text-gray-500" />

                </div>

                <div className="flex bg-[#0b1329] overflow-hidden mt-1 rounded-lg h-30 md:h-85">

                    <textarea value={text} className="flex-1 p-2 bg-transparent text-lime-400 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full" spellCheck="false" onChange={(e) => { setText(e.target.value) }} />


                </div>

            </div>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
            <div className="text-white bg-gray-800  p-2 rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="text-lime-400 select-none">Matches</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={matchCopy} hoverColor="hover:text-gray-500" />

                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg h-30 mt-1 md:h-85">
                    <textarea value={JSON.stringify(output.matches) === '[]' ? '' : JSON.stringify(output.matches, null, 2)} readOnly className="flex-1 p-2 bg-transparent text-orange-300 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full" spellCheck="false" />


                </div>

            </div>
            <div className="text-white bg-gray-800  p-2 rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="text-purple-400 select-none">Execution Time (ms)</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={timeCopy} hoverColor="hover:text-gray-500" />

                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg h-30 mt-1 md:h-85">

                    <textarea value={output.executionTimeMs} readOnly className="flex-1 p-2 bg-transparent text-orange-300 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full" spellCheck="false" />


                </div>

            </div>

        </div>

    </div>
}