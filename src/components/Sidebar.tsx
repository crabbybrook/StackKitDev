import { Clock, CsvTable, Hex, House, Json, JSONFile, Key, Link, Lock, Regex, Rgb, Tick, Timezone } from "../Icons/allIcons";
import { useMenuOpen } from "../store/useMenuOpen";
import MiniContent from "./MiniContent";
import MiniSidebar from "./MiniSidebar";


export default function Sidebar() {
    const setJsonToolsOpen = useMenuOpen((state) => state.setJsonToolsOpen)
    const setEncodeToolsOpen = useMenuOpen((state) => state.setEncodeToolsOpen)
    const setRegexToolsOpen = useMenuOpen((state) => state.setRegexToolsOpen)
    const setTimeToolsOpen = useMenuOpen((state) => state.setTimeToolsOpen)
    const setColorToolsOpen = useMenuOpen((state) => state.setColorToolsOpen)
    const jsonTools = useMenuOpen((state) => state.jsonTools)
    const encodeTools = useMenuOpen((state) => state.encodeTools)
    const regexTools = useMenuOpen((state) => state.regexTools)
    const timeTools = useMenuOpen((state) => state.timeTools)
    const colorTools = useMenuOpen((state) => state.colorTools)

    return <div className="block select-none">
        <div className="p-2">
            <a className="flex justify-start items-center gap-2 cursor-pointer hover:bg-blue-600 p-2 rounded-lg" href="/" data-astro-prefetch>
                <div className="text-blue-400"><House size="md" /></div>
                <p className="text-white text-xs sm:text-xl font-bold">Home</p>
            </a>
            <div className="text-xs sm:text-lg">
                <div className="items-center cursor-pointer hover:bg-blue-600 p-2 rounded-lg" onClick={() => {
                    setJsonToolsOpen(!jsonTools)
                }}  >
                    <MiniSidebar title="JSON Tools" changeChevon={jsonTools} />

                </div>
                {jsonTools && <div className="flex flex-col p-2 gap-3">
                    <a href='/json-formatter' data-astro-prefetch>
                    
                    <MiniContent logo={<Json size="md" />} title="JSON Formatter" color="text-green-400" />
                    
                    </a>

                    <a href='/json-to-csv'data-astro-prefetch>
                    <MiniContent logo={<CsvTable size="md" />} title="JSON to CSV" color="text-green-400"/>
                    </a>

                    <a href='/csv-to-json' data-astro-prefetch>
                    <MiniContent logo={<JSONFile size="md" />} title="CSV to JSON" color="text-green-400"  />
                    </a>
                    </div>
                }
                <div className="items-center cursor-pointer hover:bg-blue-600 p-2 rounded-lg" onClick={() => {
                    setEncodeToolsOpen(!encodeTools)
                }}  >
                    <MiniSidebar title="Encoding Tools" changeChevon={encodeTools} />

                </div>
                {encodeTools && <div className="flex flex-col p-2 gap-3">


                    <a href= '/base64-encode-decode' data-astro-prefetch>
                    <MiniContent logo={<Lock size="md" />} title="Base64 Encode / Decode" color="text-purple-400"/>
                    </a>

                    <a href='/url-encode-decode' data-astro-prefetch >
                    <MiniContent logo={<Link size="md" />} title="URL Encode / Decode" color="text-purple-400"/>
                    </a>

                    <a href='/jwt-decoder' data-astro-prefetch>
                    <MiniContent logo={<Key size="md" />} title="JWT Decoder" color="text-purple-400"/>
                    </a>
                </div>
                }
                <div className="items-center cursor-pointer hover:bg-blue-600 p-2 rounded-lg" onClick={() => {
                    setRegexToolsOpen(!regexTools)
                }}  >
                    <MiniSidebar title="Text / Regex Tools" changeChevon={regexTools} />

                </div>
                {regexTools && <div className="flex flex-col p-2 gap-3">

                    <a href='/regex-tester' data-astro-prefetch>
                    <MiniContent logo={<Regex size="md" />} title="Regex Tester" color="text-orange-400" />
                    </a>
                </div>
                }
                <div  className="items-center cursor-pointer hover:bg-blue-600 p-2 rounded-lg" onClick={() => {
                    setTimeToolsOpen(!timeTools)
                }}  >
                    <MiniSidebar title="Time Tools" changeChevon={timeTools} />

                </div>
                {timeTools && <div className="flex flex-col p-2 gap-3">

                    <a href='/timestamp-converter' data-astro-prefetch>
                    <MiniContent logo={<Clock size="md" />} title="Timestamp Converter" color="text-yellow-400"  />
                    </a>
                    <a href='/timezone-converter' data-astro-prefetch>
                    <MiniContent logo={<Timezone size="md" />} title="Timezone Converter" color="text-yellow-400" />
                    </a>
                </div>
                }
                <div className="items-center cursor-pointer hover:bg-blue-600 p-2 rounded-lg" onClick={() => {
                    setColorToolsOpen(!colorTools)
                }}  >
                    <MiniSidebar title="Color Tools" changeChevon={colorTools} />

                </div>
                {colorTools && <div className="flex flex-col p-2 gap-3">

                    <a href='/hex-to-rgb' data-astro-prefetch>
                    <MiniContent logo={<Rgb size="md" />} title="HEX to RGB Converter" color="text-pink-400"  />
                    </a>
                    <a href='/rgb-to-hex' data-astro-prefetch>
                    <MiniContent logo={<Hex size="md" />} title="RGB to HEX Converter" color="text-pink-400" />
                    </a>
                </div>
                }

            </div>
        </div>
    </div>
}