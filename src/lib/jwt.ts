import { decodeBase64 } from "./base64"

function decodeBase64UrlPart(part: string) {
    const base64 = part.replace(/-/g, "+").replace(/_/g, "/")
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4)

    const jsonText = decodeBase64(padded)
    return JSON.parse(jsonText)
}

interface JwtResult {
    header: unknown;
    payload: unknown;
    sign: string
}

export function decodeJwt(token: string): JwtResult {
    const parts = token.split(".")
    if (parts.length !== 3) {
        console.log("invalid JWT format")
    }
    const [headerPart, payloadPart, sign] = parts
    const header = decodeBase64UrlPart(headerPart)
    const payload = decodeBase64UrlPart(payloadPart)
    return { header, payload, sign }
}

export function getJwtExpiry(payload: Record<string, unknown> | unknown): Date | null {
    if (!payload || typeof payload !== "object") {
        return null
    }
    const exp = (payload as Record<string, unknown>).exp
    if (typeof exp !== "number") {
        return null
    }
    return new Date(exp * 1000);
}

interface TokenStatus {
    isActive: boolean;
    statusText: string;
    timeLeftTime: string
}

export function checkTokenStatus(expiryDate: Date | null): TokenStatus {
    if (!expiryDate) {
        return {
            isActive: true,
            statusText: "Valid",
            timeLeftTime: "No expiration limit set"
        }
    }
    const now = new Date()
    const diffMs = expiryDate.getTime() - now.getTime()
    const isActive = diffMs > 0

    const statusText = isActive ? "Active" : "Expired"
    const absDiff = Math.abs(diffMs)

    const totalSecs = Math.floor(absDiff / 1000)
    const totalMin = Math.floor(totalSecs / 60)
    const totalHours = Math.floor(totalMin / 60)
    const days = Math.floor(totalHours / 24)

    const hours = totalHours % 24
    const minutes = totalMin % 60

    let timeLeftTime = ""
    if (isActive) {
        if (days > 0) {
            timeLeftTime = `Expires in ${days}d ${hours}h`
        } else if (hours > 0) {
            timeLeftTime = `Expires in ${hours}h ${minutes}m`
        } else {
            timeLeftTime = `Expires in ${minutes}m`
        }
    } else {
        if (days > 0) {
            timeLeftTime = `Expired ${days}d ago`;
        }
        else if (hours > 0){
             timeLeftTime = `Expired ${hours}h ago`;
        }
        else{
             timeLeftTime = `Expired ${minutes}m ago`;
        }
    }
    return {isActive, statusText, timeLeftTime}
}
