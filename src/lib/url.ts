export interface UrlConversion {
    success: boolean;
    result: string;
    error?: string;
}

export function safeEncodeUrl(text: string): UrlConversion {
    if (text === null || text === undefined || text === "") {
        return { success: true, result: "" };
    }

    try {
        
        const safeText = typeof text.toWellFormed === 'function' 
            ? text.toWellFormed() 
            : text;

        const encoded = encodeURIComponent(safeText);
        return {
            success: true,
            result: encoded
        };
    } catch (err) {
        return {
            success: false,
            result: "",
            error: "Failed to encode string due to an irrecoverable syntax violation.",
        };
    }
}

export function safeDecodeUrl(text: string): UrlConversion {
    if (text === null || text === undefined || text === "") {
        return { success: true, result: "" };
    }

    try {
        const normalizedText = text.replace(/\+/g, " ");
        const decoded = decodeURIComponent(normalizedText);
        
        return {
            success: true,
            result: decoded
        };
    } catch (err) {
        return {
            success: false,
            result: "",
            error: "Malformed URL data payload. Please check your percentage (%) sequence formatting.",
        };
    }
}
