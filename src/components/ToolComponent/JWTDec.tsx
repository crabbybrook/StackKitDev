import { useEffect } from "react";
import { Clear, Copy, Run, Sample } from "../../Icons/allIcons";
import { checkTokenStatus, decodeJwt, getJwtExpiry } from "../../lib/jwt";
import { useJWT } from "../../store/useJWT";
import ToolBtn from "../ToolBtn";

export default function JWTDec() {
    const header = useJWT((state) => state.header)
    const payload = useJWT((state) => state.payload)
    const sign = useJWT((state) => state.sign)
    const setHeader = useJWT((state) => state.setHeader)
    const setPayload = useJWT((state) => state.setPayload)
    const setSign = useJWT((state) => state.setSign)
    const token = useJWT((state) => state.token)
    const setToken = useJWT((state) => state.setToken)
    const tokenStatus = useJWT((state) => state.tokenStatus)
    const setTokenStatus = useJWT((state) => state.setTokenStatus)
    const expDate = useJWT((state)=> state.expDate)
    const setExpDate = useJWT((state)=> state.setExpDate)
    const setClear = useJWT((state)=> state.setClear)

    const copyText = async(text: string)=> {
        await navigator.clipboard.writeText(text)

    }

    useEffect(()=>{
        setClear()
    }, [])

    const loadSample = () => {
        const sample = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30`
        setToken(sample)
    }

    return <div className="w-full text-white">
        <div className="text-white bg-gray-800  p-2 rounded-xl">
            <div className="flex justify-between items-center">
                <p className="text-white select-none">JWT Token</p>
                <div className="flex justify-between items-center">
                    <ToolBtn title="Copy" logo={Copy} onClick={() => {
                        copyText(token)
                    }} hoverColor="hover:bg-gray-900" />
                    <ToolBtn title="Sample" logo={Sample} onClick={() => {
                        loadSample()
                    }} hoverColor="hover:bg-gray-900" />
                    

                    <ToolBtn title="Run" logo={Run} onClick={() => {
                        const { header, payload, sign } = decodeJwt(token)
                        const expDate = getJwtExpiry(payload)
                        const {isActive, statusText, timeLeftTime} = checkTokenStatus(expDate)
                        if(expDate){
                            setExpDate(expDate)
                        }
                        setTokenStatus({isActive: isActive, statusText: statusText, timeLeftTime: timeLeftTime})
                        setHeader(JSON.stringify(header, null, 2))
                        setPayload(JSON.stringify(payload, null, 2))
                        setSign(sign)
                    }} hoverColor="hover:bg-gray-900" />

                    <ToolBtn title="Clear" logo={Clear} onClick={() => {
                        setClear()
                    }} hoverColor="hover:bg-gray-900" />
                </div>

            </div>

            <div className="flex bg-[#0b1329] overflow-hidden mt-1 rounded-lg h-30">

                <textarea value={token} onChange={(e)=>{setToken(e.target.value)}} className="flex-1 p-2 bg-transparent text-green-500 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full" spellCheck="false" />


            </div>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-start mt-5 gap-2">
            <div className="text-white bg-gray-800  p-2 rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="text-orange-500 select-none">Header</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={() => {
                        copyText(header)
                    }} hoverColor="hover:bg-gray-900" />
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden mt-1 rounded-lg h-30 md:h-85">


                    <textarea value={header} className="flex-1 p-2 bg-transparent text-lime-400 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full" spellCheck="false" readOnly />


                </div>

            </div>
            <div className="text-white bg-gray-800  p-2 rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="text-purple-400 select-none">Payload</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={() => {
                        copyText(payload)
                    }} hoverColor="hover:bg-gray-900" />
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg mt-1 h-30 md:h-85">

                    <textarea value={payload} readOnly className="flex-1 p-2 bg-transparent text-blue-300 resize-none focus:outline-none  overflow-y-auto whitespace-pre leading-5 h-full" spellCheck="false" />


                </div>

            </div>
            <div className="text-white bg-gray-800  p-2 rounded-2xl mt-2 md:mt-0">
                <div className="flex justify-between items-center">
                    <p className="text-blue-300 select-none">Signature</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={() => {
                        copyText(sign)
                    }} hoverColor="hover:bg-gray-900" />
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg mt-1 h-30 md:h-85">

                    <textarea value={sign} readOnly className="flex-1 p-2 bg-transparent text-white resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 min-h-full" />


                </div>
            </div>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
             <div className="text-white bg-gray-800  p-2 rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="text-lime-400 select-none">Expiry Date</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={() => {
                        copyText(JSON.stringify(expDate))
                    }} hoverColor="hover:bg-gray-900" />
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg mt-1 h-30 md:h-85">

                    <textarea value={expDate ? JSON.stringify(expDate): ''} readOnly className="flex-1 p-2 bg-transparent text-orange-300 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full" spellCheck="false" />


                </div>

            </div>
             <div className="text-white bg-gray-800  p-2 rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="text-yellow-200 select-none">Token Status</p>
                    <ToolBtn title="Copy" logo={Copy} onClick={() => {
                        copyText(JSON.stringify(tokenStatus))
                    }} hoverColor="hover:bg-gray-900" />
                </div>

                <div className="flex bg-[#0b1329] overflow-hidden rounded-lg mt-1 h-30 md:h-85">

                    <textarea value={tokenStatus.isActive !== "" ? JSON.stringify(tokenStatus, null, 2): ''} readOnly className="flex-1 p-2 bg-transparent text-purple-400 resize-none focus:outline-none placeholder-[#484f58] overflow-y-auto whitespace-pre leading-5 h-full" spellCheck="false" />


                </div>

            </div>
        </div>

    </div>
}