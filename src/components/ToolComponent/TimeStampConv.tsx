import { Clear, Clock, Copy, Cross, Date, Run, Sample, Tick } from "../../Icons/allIcons";
import { parseTimeStamp } from "../../lib/time";
import { useTimestampConv } from "../../store/useTimestampConv";
import ToolBtn from "../ToolBtn";
import ToolFooter from "../ToolFooter";
import TimeStampbtn from "../TimeStampbtn";
import { useEffect } from "react";

export default function TimeStampConv() {
    const inputTime = useTimestampConv((state) => state.inputTime)
    const setInputTime = useTimestampConv((state) => state.setInputTime)
    const output = useTimestampConv((state) => state.output)
    const setOutput = useTimestampConv((state) => state.setOutput)
    const setClear = useTimestampConv((state) => state.setClear)
    const mode = useTimestampConv((state) => state.mode)
    const setMode = useTimestampConv((state) => state.setMode)
    const active = useTimestampConv((state) => state.active)
    const setActive = useTimestampConv((state) => state.setActive)

    const loadSample = () => {
        const timestamp_to_date = 1782082920123456789
        const date_to_timestamp = "Sunday, 21 June 2026, 23:02:00 UTC"
        if (mode === 'Timestamp') {
            setInputTime(timestamp_to_date.toString())
        } else {
            setInputTime(date_to_timestamp)
        }
    }

    const copyText = async (text: string) => {
        await navigator.clipboard.writeText(text)
    }
    const copyOutText = async (text: {
        success: boolean | string,
        date?: Date | null,
        isoString?: string,
        utcString?: string,
        localString?: string,
        localFormatted?: string,
        relativeString?: string,
        detectedPrecision?: string,
        err?: string,
        timestampMs?: number | string,
        timestampSec?: number | string
    }) => {

        const outputDate = text.date
        const outputISO = text.isoString
        const outputUTC = text.utcString
        const outputLocal = text.localString
        const outputLocalForm = text.localFormatted
        const outputTimePassed = text.relativeString
        const outputMs = text.timestampMs
        const outputS = text.timestampSec

        if (active === 'Timestamp') {
            await navigator.clipboard.writeText(`
                Date: ${outputDate}
                ISO: ${outputISO}
                UTC: ${outputUTC}
                Local: ${outputLocal}
                Local Form: ${outputLocalForm}
                Time Passed: ${outputTimePassed}`)
        } else {
            await navigator.clipboard.writeText(`
                Timestamp (ms): ${outputMs}
                Timestamp (s): ${outputS}`)
        }
    }

    useEffect(()=>{
        setClear()
    }, [])

    return <div className="w-full min-h-fit text-white">
        <div className="flex gap-2 mt-3">
            <TimeStampbtn title="Timestamp To Date" logo={Date} onClick={() => {
                setClear()
                setActive('Timestamp')
                setMode('Timestamp')

            }} hoverColor="hover:bg-green-600" grid={active === 'Timestamp' ? "bg-green-600" : "bg-gray-800"} />
            <TimeStampbtn title="Date To Timestamp" logo={Clock} onClick={() => {
                setClear()
                setActive('Date')
                setMode('Date')
            }} hoverColor="hover:bg-purple-500" grid={active === 'Date' ? "bg-purple-500" : "bg-gray-800"} />
            <ToolBtn title="Sample" logo={Sample} onClick={() => {
                loadSample()
            }} hoverColor="hover:bg-gray-900" />

            <ToolBtn title="Run" logo={Run} onClick={() => {
                if (inputTime) {
                    const returnedValue = parseTimeStamp(inputTime)
                    if (returnedValue.success) {
                        setOutput({ success: returnedValue.success, date: returnedValue.date, isoString: returnedValue.isoString, utcString: returnedValue.utcString, localString: returnedValue.localString, localFormatted: returnedValue.localFormatted, relativeString: returnedValue.relativeString, detectedPrecision: returnedValue.detectedPrecision, timestampMs: returnedValue.timestampMs, timestampSec: returnedValue.timestampSec })
                    } else {
                        setOutput({ success: returnedValue.success, err: returnedValue.error })
                    }

                } else {
                    setOutput({ success: '' })
                }
            }} hoverColor="hover:bg-gray-900" />


            <ToolBtn title="Clear" logo={Clear} onClick={() => {
                setClear()
            }} hoverColor="hover:bg-white hover:text-black" />
        </div>
        <div>


        </div>
        <div className="grid grid-cols-1 justify-start mt-5 gap-2">
            <div className="text-white bg-gray-800  p-2 rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="select-none">{active === 'Timestamp' ? 'Timestamp' : 'Date'}</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={() => {
                        copyText(inputTime)
                    }} hoverColor="hover:text-gray-500" />
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg h-30 mt-1">

                    <textarea value={inputTime} onChange={(e) => setInputTime(e.target.value)} placeholder={`Paste your ${active === 'Timestamp' ? 'Timestamp' : 'Date'} here.`} className="flex-1 p-2 bg-transparent text-orange-300 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full" spellCheck="false" />


                </div>

            </div>
            <div className="text-white bg-gray-800  p-2 rounded-2xl mt-2 md:mt-0">
                <div className="flex justify-between items-center">
                    <p className="select-none">{active === 'Timestamp' ? 'Date' : 'Timestamp'}</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={() => {
                        copyOutText(output)
                    }} hoverColor="hover:text-gray-500" />
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg h-30 mt-1">

                    {active === 'Timestamp' && <div className="flex-1 p-2 bg-transparent overflow-y-auto whitespace-pre leading-5 min-h-full font-mono text-sm">
                        {output.success && output.date ? (
                            <div className="space-y-1">

                                <div className="flex gap-2 items-center justify-start">
                                    <div className="text-red-400 font-semibold">Date:</div>
                                    <div className="text-yellow-300">{output.date.toString()}</div>

                                </div>

                                <div className="flex gap-2 items-center justify-start">
                                    <div className="text-blue-400 font-semibold">ISO:</div>
                                    <div className="text-lime-300">{output.isoString}</div>
                                </div>

                                <div className="flex gap-2 items-center justify-start">
                                    <div className="text-orange-400 font-semibold">UTC:</div>
                                    <div className="text-purple-300">{output.utcString}</div>
                                </div>

                                <div className="flex gap-2 items-center justify-start">
                                    <div className="text-lime-400 font-semibold">Local:</div>
                                    <div className="text-red-200">{output.localString}</div>
                                </div>

                                <div className="flex gap-2 items-center justify-start">
                                    <div className="text-pink-400 font-semibold">Local Form:</div>
                                    <div className="text-orange-300">{output.localFormatted}</div>
                                </div>

                                <div className="flex gap-2 items-center justify-start">
                                    <div className="text-purple-400 font-semibold">Time Passed:</div>
                                    <div className="text-green-300">{output.relativeString}</div>
                                </div>

                            </div>
                        ) : (
                            <span className="text-[#484f58]">No parsed data available...</span>
                        )}
                    </div>}
                    {active === 'Date' && <div className="flex-1 p-2 bg-transparent overflow-y-auto whitespace-pre leading-5 min-h-full font-mono text-sm">
                        {output.success ? (
                            <div className="space-y-1">

                                <div className="flex gap-2 items-center justify-start">
                                    <div className="text-red-400 font-semibold">Timestamp (ms):</div>
                                    <div className="text-yellow-300">{output.timestampMs}</div>
                                </div>
                                <div className="flex gap-2 items-center justify-start">
                                    <div className="text-lime-400 font-semibold">Timestamp (s):</div>
                                    <div className="text-blue-300">{output.timestampSec}</div>
                                </div>
                            </div>
                        ) : (
                            <span className="text-[#484f58]">No parsed data available...</span>
                        )}
                    </div>
                    }


                </div>
            </div>

        </div>

        {output.success ? (output.detectedPrecision) && <div className="bg-gray-800 text-sm mt-5 p-2 rounded-lg select-none">
            <div className="flex justify-between items-center text-white">
                <div className=" text-lg flex gap-2 select-none items-center text-green-400">
                    <Tick size="md" />
                    Detected Input Type: {output.detectedPrecision}
                </div>

            </div>
        </div> : output.success === '' ? '' : <div className="bg-gray-800 text-sm mt-3 p-2 rounded-lg select-none">
            <div className="flex justify-between items-center text-white">
                <ToolFooter logo={Cross} title={output.err ? output.err : "Error"} color="text-red-500" />

            </div>
        </div>}
    </div>
}

