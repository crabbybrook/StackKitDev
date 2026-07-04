const BASE64_REGEX = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
const BASE64_UNPADDED_REGEX = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2,3})?$/;
const BASE64_URL_REGEX = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3}=*)?$/;

export type Charset =
    | 'utf-8'
    | 'ascii'
    | 'iso-8859-1'
    | 'iso-8859-2'
    | 'iso-8859-6'
    | 'iso-8859-15'
    | 'windows-1252'
    | 'utf-16';

interface EncodeOptions {
    urlSafe?: boolean;
    withoutPadding?: boolean;
    charset?: Charset;
}

interface DecodeOptions {
    urlSafe?: boolean;
    charset?: Charset;
}

function bytesToBase64(bytes: Uint8Array): string {
    if (typeof globalThis !== 'undefined' && 'Buffer' in globalThis) {
        return (globalThis as any)['Buffer'].from(bytes).toString('base64');
    }
    let binary = "";
    const len = bytes.length;
    const CHUNK_SIZE = 0x4000;
    for (let i = 0; i < len; i += CHUNK_SIZE) {
        const chunk = bytes.subarray(i, i + CHUNK_SIZE);
        binary += String.fromCharCode.apply(null, chunk as unknown as number[]);
    }
    return btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

function encodeStringToBytes(text: string, charset: Charset): Uint8Array {
    if (charset === 'utf-8') {
        return new TextEncoder().encode(text);
    }

    if (charset === 'utf-16') {
        const bytes = new Uint8Array(text.length * 2);
        const view = new DataView(bytes.buffer);
        for (let i = 0; i < text.length; i++) {
            view.setUint16(i * 2, text.charCodeAt(i), true); 
        }
        return bytes;
    }

    if (typeof globalThis !== 'undefined' && 'Buffer' in globalThis) {
        return Uint8Array.from((globalThis as any)['Buffer'].from(text, charset));
    }
    
    const bytes = new Uint8Array(text.length);
    const isAscii = charset === 'ascii';
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        bytes[i] = isAscii ? (code & 0x7F) : (code > 255 ? 63 : code);
    }
    return bytes;
}

/**
 * Updated Helper: Restores padding safely.
 * Returns null if the padding structure is mathematically corrupted.
 */
function restorePadding(str: string): string | null {
    // CRITICAL FIX: Base64 never allows more than 2 trailing padding characters
    if (/={3,}$/.test(str)) {
        return null;
    }
    
    const cleanStr = str.replace(/=+$/, '');
    const pad = cleanStr.length % 4;
    if (pad === 2) return cleanStr + '==';
    if (pad === 3) return cleanStr + '=';
    if (pad === 1) return null; // A remainder of 1 is mathematically impossible for valid Base64
    return cleanStr;
}

export function encodeBase64(text: string, options: EncodeOptions = {}): string {
    try {
        const { urlSafe = false, withoutPadding = false, charset = 'utf-8' } = options;
        const bytes = encodeStringToBytes(text, charset);
        let base64 = bytesToBase64(bytes);

        if (urlSafe) {
            base64 = base64.replace(/\+/g, '-').replace(/\//g, '_');
        }

        if (withoutPadding || urlSafe) {
            base64 = base64.replace(/=+$/, '');
        }

        return base64;
    } catch (err) {
        return "false";
    }
}

export function isBase64(value: string, urlSafe = false): boolean {
    const trimmed = value.trim();
    if (trimmed.length === 0) return false;

    // Check padding rules before running regex blocks
    const paddedStandard = restorePadding(trimmed);
    if (paddedStandard === null) return false;

    if (urlSafe) {
        if (!BASE64_URL_REGEX.test(trimmed)) return false;
    } else {
        if (!BASE64_REGEX.test(trimmed) && !BASE64_UNPADDED_REGEX.test(trimmed)) {
            return false;
        }
    }

    try {
        // Run standard translation checks
        const standardFormat = urlSafe ? trimmed.replace(/-/g, '+').replace(/_/g, '/') : trimmed;
        const finalCheckStr = restorePadding(standardFormat);
        if (!finalCheckStr) return false;
        
        atob(finalCheckStr);
        return true;
    } catch {
        return false;
    }
}

export function decodeBase64(base64: string, options: DecodeOptions = {}): string {
    try {
        const { urlSafe = false, charset = 'utf-8' } = options;
        
        if (!isBase64(base64, urlSafe)) {
            return "false";
        }

        let normalized = base64.trim();
        if (urlSafe) {
            normalized = normalized.replace(/-/g, '+').replace(/_/g, '/');
        }

        const paddedStr = restorePadding(normalized);
        if (!paddedStr) return "false";

        const bytes = base64ToBytes(paddedStr);
        return new TextDecoder(charset).decode(bytes);
    } catch (err) {
        return "false";
    }
}
