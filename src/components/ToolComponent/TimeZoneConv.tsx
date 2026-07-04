import { Clear, Copy, Run, Sample } from "../../Icons/allIcons";
import { convertBetweenTimezones } from "../../lib/time";
import ToolBtn from "../ToolBtn";
import ToolFooter from "../ToolFooter";
import { useTimezoneconv } from "../../store/useTimezoneconv";
import { useEffect } from "react";

export default function TimeZoneConv() {
    const date = useTimezoneconv((state) => state.date)
    const setDate = useTimezoneconv((state) => state.setDate)
    const time = useTimezoneconv((state) => state.time)
    const setTime = useTimezoneconv((state) => state.setTime)
    const fromTimezone = useTimezoneconv((state) => state.fromTimezone)
    const toTimezone = useTimezoneconv((state) => state.toTimezone)
    const setFromTimezone = useTimezoneconv((state) => state.setFromTimezone)
    const setToTimezone = useTimezoneconv((state) => state.setToTimezone)
    const is24Hour = useTimezoneconv((state) => state.is24Hour)
    const setIs24Hour = useTimezoneconv((state) => state.setis24Hour)
    const output = useTimezoneconv((state) => state.outputTimezone)
    const setOutputTimezone = useTimezoneconv((state) => state.setOutputTimezone)
    const setClear = useTimezoneconv((state) => state.setClear)

    const loadSample = () => {
        const sampleDate = "2026-06-22";
        const sampleTime = "14:30";
        const fromZone = "Asia/Tokyo"
        const targetZone = "America/New_York";

        if (is24Hour) {
            setDate(sampleDate)
            setTime(sampleTime)
            setFromTimezone(fromZone)
            setToTimezone(targetZone)
            setIs24Hour(true)
        } else {
            setDate(sampleDate)
            setTime(sampleTime)
            setFromTimezone(fromZone)
            setToTimezone(targetZone)
            setIs24Hour(false)
        }
    }

    const copyInput = async () => {
        await navigator.clipboard.writeText(`
            Date: ${date}
            Time: ${time}
            From: ${fromTimezone}
            To: ${toTimezone}
            `)
    }
    const copyOutput = async () => {
        let area: string[] = []
        let gmt: string[] = []
        let formatted: string[] = []

        if(output.comparison){
            Object.entries(output.comparison).map(([zone, card]) => {
                area.push(zone)
                if(card.gmtOffset && card.formatted){
                    gmt.push(card.gmtOffset)
                    formatted.push(card.formatted)

                }
            })            
            
        }            

        await navigator.clipboard.writeText(`
            Converted Time
            
            ${output.converted?.datePart}
            ${output.converted?.timePart}
            ${output.converted?.timeZoneCode} ${output.converted?.gmtOffset}

            Other Timezones
            
            ${area[0]} (${gmt[0]}): ${formatted[0]}
            ${area[1]} (${gmt[1]}): ${formatted[1]}
            ${area[2]} (${gmt[2]}): ${formatted[2]}
            
            `)
    }

    useEffect(()=>{
        setClear()
    }, [])


    return <div className="w-full min-h-fit text-white">
        <div className="flex gap-2 mt-3">
            <ToolBtn title="Sample" logo={Sample} onClick={() => {
                loadSample()
            }} hoverColor="hover:bg-gray-900" />

            <ToolBtn title="Run" logo={Run} onClick={() => {
                const returnedValue = convertBetweenTimezones(date, time, fromTimezone, toTimezone, is24Hour)
                if (returnedValue.success) {
                    setOutputTimezone({
                        success: true,
                        converted: {
                            formatted: returnedValue.converted?.formatted,
                            datePart: returnedValue.converted?.datePart,
                            timePart: returnedValue.converted?.timePart,
                            timeZoneCode: returnedValue.converted?.timeZoneCode,
                            gmtOffset: returnedValue.converted?.gmtOffset
                        },
                        comparison: returnedValue.comparisons
                    })
                } else {
                    setOutputTimezone({ success: returnedValue.success, err: returnedValue.error })
                }
            }} hoverColor="hover:bg-gray-900" />

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-start mt-5 gap-2">
            <div className="text-white bg-gray-800  p-2 rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="select-none">Input</p>
                    <div className="flex justify-center items-center">
                        <ToolBtn title="Copy" logo={Copy} onClick={copyInput} hoverColor="hover:text-gray-500" />
                        <ToolBtn title="Clear" logo={Clear} onClick={() => {
                            setClear()
                        }} hoverColor="hover:bg-white hover:text-black" />

                    </div>

                </div>

                <div className="grid grid-cols-1 overflow-hidden rounded-lg h-85 mt-3">

                    <div className="h-15 border border-lime-400 flex justify-start items-center rounded-lg bg-[#0b1329] gap-2 p-2">
                        <p className="text-lime-400 font-bold select-none">Date: </p>
                        <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="YYYY-MM-DD" className="flex-1 p-2  text-amber-400 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full  bg-transparent content-center" spellCheck="false" />
                    </div>

                    <div className="h-15 border border-pink-400 bg-[#0b1329] flex justify-start items-center rounded-lg gap-2 p-2">
                        <p className="text-pink-400 font-bold select-none">Time: </p>
                        <input value={time} onChange={(e) => setTime(e.target.value)} 
                        placeholder="HH:MM" className="flex-1 p-2 bg-transparent text-lime-400 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full content-center" spellCheck="false" />

                    </div>
                    <div className="h-15 border border-yellow-300 bg-[#0b1329] flex justify-start items-center rounded-lg gap-2 p-2">
                        <p className="text-yellow-300 font-bold select-none">From: </p>
                        <input value={fromTimezone} onChange={(e) => setFromTimezone(e.target.value)} placeholder="Area/Location" className="flex-1 p-2 bg-transparent text-green-400 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full content-center" spellCheck="false" />

                    </div>
                    <div className="h-15 border border-teal-400 bg-[#0b1329] flex justify-start items-center rounded-lg gap-2 p-2">
                        <p className="text-teal-400 font-bold select-none"> To: </p>
                        <input value={toTimezone} onChange={(e) => setToTimezone(e.target.value)} placeholder="Area/Location"  className="flex-1 p-2 bg-transparent text-fuchsia-300 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full content-center" spellCheck="false" />

                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <input type="checkbox" value="subscribe_intent" onChange={(e) => { setIs24Hour(e.target.checked) }} />
                        <p className="text-xs md:text-lg select-none">24 Hour Format</p>

                    </div>
                    <div className="flex justify-center items-center gap-2 text-gray-400 select-none">
                        <p className="text-xs md:text-sm italic">{`Default:-> 12 Hour Format is used.`}</p>

                    </div>
                </div>

            </div>
            <div className="text-white bg-gray-800 p-2 rounded-2xl mt-2 md:mt-0">
                <div className="flex justify-end">

                    <ToolBtn title="Copy" logo={Copy} onClick={copyOutput} hoverColor="hover:text-gray-500" />
                </div>
                <div className="flex overflow-hidden rounded-lg">
                    <div className="flex-1 flex p-2 bg-transparent overflow-y-auto whitespace-pre leading-5 font-mono text-sm">
                        {output.success && output.comparison ? (
                            <div className="space-y-1 grid grid-cols-1 justify-center items-center mt-2 h-89">
                                <div>
                                    <div className="flex justify-between items-center">
                                        <p>Converted Time</p>
                                    </div>
                                    <div className="flex gap-2 items-center justify-start mt-4">
                                        <div className="text-lime-300 text-xl">{output.converted?.datePart}</div>
                                    </div>

                                    <div className="flex gap-2 items-center justify-start">

                                        <div className="text-purple-300 font-bold text-3xl">{output.converted?.timePart}</div>
                                    </div>

                                    <div className="flex gap-2 items-center justify-start text-gray-300">

                                        <div className="font-bold">{output.converted?.timeZoneCode}</div>
                                        <div className="font-bold">{output.converted?.gmtOffset}</div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mt-5">
                                        <p>Other Timezones</p>
                                    </div>
                                    {Object.entries(output.comparison).map(([zone, card]) => (
                                        <div className="gap-2 items-center justify-start mt-4 text-xs" key={zone}>
                                            <div className="text-cyan-300 flex justify-start items-center">
                                                <p>{zone} </p>
                                                <p>{`(${card.gmtOffset}): `}</p>
                                                <p className="text-purple-300">
                                                    {card.formatted}</p>
                                            </div>
                                        </div>
                                    ))}


                                </div>

                            </div>
                        ) : (
                            <span className="text-[#484f58]">No parsed data available...</span>
                        )}
                    </div>

                </div>
            </div>

        </div>
    </div>
}

