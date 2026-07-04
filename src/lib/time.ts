export interface TimestampParserResponse {
    success: boolean;
    date?: Date;
    timestampMs?: number;      // Added: JS millisecond epoch
    timestampSec?: number;     // Added: Unix seconds epoch
    isoString?: string;
    utcString?: string;
    localString?: string;
    localFormatted?: string;
    relativeString?: string;
    detectedPrecision?: "Seconds" | "Milliseconds" | "Microseconds" | "Nanoseconds" | "Date String" | "Explicit Components";
    error?: string;
}

export interface TimezoneFormatterResponse {
    success: boolean;
    formatted?: string;
    error?: string;
}

export interface ExplicitDateComponents {
    year: number;
    month: number; // 1-12 (Human readable style, mapped to 0-11 internally)
    day: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
    timeZone?: string; // Optional target timezone. Defaults to local runtime environment
}

/**
 * Main parsing engine that accepts numeric strings, raw date strings, 
 * or explicit date component structures and generates timestamp representations.
 */

function getRelativeTimeString(date: Date): string {
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const elapsed = date.getTime() - Date.now();

    const divisions = [
        { amount: 60, name: "second" },
        { amount: 60, name: "minute" },
        { amount: 24, name: "hour" },
        { amount: 7, name: "day" },
        { amount: 4.34524, name: "week" },
        { amount: 12, name: "month" },
        { amount: Number.POSITIVE_INFINITY, name: "year" }
    ] as const;

    let diff = elapsed / 1000;
    for (const division of divisions) {
        if (Math.abs(diff) < division.amount) {
            return rtf.format(Math.round(diff), division.name);
        }
        diff /= division.amount;
    }
    return date.toLocaleDateString();
}

export function parseTimeStamp(input: string | ExplicitDateComponents): TimestampParserResponse {
    if (!input) {
        return { success: false, error: "Input container cannot be empty." };
    }

    try {
        let date: Date;
        let precision: TimestampParserResponse["detectedPrecision"] = "Date String";

        // ==========================================
        // BRANCH 1: EXPLICIT COMPONENTS TO TIMESTAMP
        // ==========================================
        if (typeof input === "object") {
            const { year, month, day, hour = 0, minute = 0, second = 0, millisecond = 0, timeZone } = input;

            // Validate basic integer limits
            if (month < 1 || month > 12 || day < 1 || day > 31) {
                return { success: false, error: "Month (1-12) or Day (1-31) parameters are out of range." };
            }

            if (timeZone && timeZone.trim().toUpperCase() !== "UTC") {
                // Parse components inside a specific target timezone using Intl extraction mechanics
                try {
                    const pad = (n: number) => String(n).padStart(2, "0");
                    const isoSimulated = `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}.${String(millisecond).padStart(3, "0")}`;

                    // Create date base line
                    const targetDate = new Date(isoSimulated + "Z");
                    const formatter = new Intl.DateTimeFormat("en-US", {
                        timeZone: timeZone.trim(),
                        year: "numeric", month: "2-digit", day: "2-digit",
                        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
                    });

                    const parts = formatter.formatToParts(targetDate);
                    const partMap = Object.fromEntries(parts.map(p => [p.type, p.value]));

                    const calculatedDate = new Date(Date.UTC(
                        Number(partMap.year), Number(partMap.month) - 1, Number(partMap.day),
                        Number(partMap.hour === "24" ? "00" : partMap.hour), Number(partMap.minute), Number(partMap.second), millisecond
                    ));

                    const offset = targetDate.getTime() - calculatedDate.getTime();
                    date = new Date(targetDate.getTime() + offset);
                } catch {
                    return { success: false, error: `Failed processing explicitly declared timezone: "${timeZone}"` };
                }
            } else if (timeZone?.trim().toUpperCase() === "UTC") {
                // Fallback to direct systemic UTC generation
                date = new Date(Date.UTC(year, month - 1, day, hour, minute, second, millisecond));
            } else {
                // Fallback to local system time generation matrix
                date = new Date(year, month - 1, day, hour, minute, second, millisecond);
            }

            precision = "Explicit Components";
        } else {
            // ==========================================
            // BRANCH 2: STRING PARSING (NUMERIC / RAW TEXT)
            // ==========================================
            const raw = input.trim();
            if (!raw) {
                return { success: false, error: "Input sequence contains only whitespace characters." };
            }

            // Handle pure numbers (Epoch Timestamps)
            if (/^\d+$/.test(raw)) {
                const numDigits = raw.length;
                let msValue = 0;

                if (numDigits <= 10) {
                    msValue = Number(raw) * 1000;
                    precision = "Seconds";
                } else if (numDigits === 13) {
                    msValue = Number(raw);
                    precision = "Milliseconds";
                } else if (numDigits === 16) {
                    msValue = Number(BigInt(raw) / 1000n);
                    precision = "Microseconds";
                } else if (numDigits >= 19) {
                    const bigNum = BigInt(raw);
                    const shiftAmount = BigInt(numDigits - 13);
                    msValue = Number(bigNum / (10n ** shiftAmount));
                    precision = "Nanoseconds";
                } else {
                    msValue = Number(raw.slice(0, 13).padEnd(13, "0"));
                    precision = "Milliseconds";
                }

                date = new Date(msValue);
            } else {
                // Handle complex text formats (ISO, RFC, string dates)
                const cleanedRaw = raw.replace(/,(\s*\d{2}:\d{2})/g, ' $1');

                date = new Date(cleanedRaw);
                precision = "Date String";
            }
        }

        // Final safety check on date instance validity
        if (Number.isNaN(date.getTime())) {
            return { success: false, error: "The resolved value falls outside safe, recordable calendar boundaries." };
        }

        const localFormatter = new Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
            timeStyle: "medium"
        });

        return {
            success: true,
            date,
            timestampMs: date.getTime(),
            timestampSec: Math.floor(date.getTime() / 1000),
            isoString: date.toISOString(),
            utcString: date.toUTCString(),
            localString: date.toString(),
            localFormatted: localFormatter.format(date),
            relativeString: getRelativeTimeString(date),
            detectedPrecision: precision
        };

    } catch (err: any) {
        return {
            success: false,
            error: err?.message || "An fatal validation error halted execution runtime unexpectedly."
        };
    }
}

interface ConvertedTimezoneDetails {
    formatted: string;       
    datePart: string;        
    timePart: string;        
    timeZoneCode: string;    
    gmtOffset: string;       
}

interface AdvancedTimezoneResponse {
    success: boolean;
    converted?: ConvertedTimezoneDetails;
    comparisons?: Record<string, ConvertedTimezoneDetails>;
    error?: string;
}

// Global lookup map to normalize common city names or abbreviations into standard IANA identifiers
const TIMEZONE_MAP: Record<string, string> = {
    "london": "Europe/London",
    "bst": "Europe/London",
    "gmt": "Europe/London",
    "new york": "America/New_York",
    "nyc": "America/New_York",
    "est": "America/New_York",
    "edt": "America/New_York",
    "sydney": "Australia/Sydney",
    "tokyo": "Asia/Tokyo",
    "paris": "Europe/Paris",
    "dubai": "Asia/Dubai",
    "kolkata": "Asia/Kolkata",
    "calcutta": "Asia/Kolkata",
    "ist": "Asia/Kolkata",
    "los angeles": "America/Los_Angeles",
    "la": "America/Los_Angeles",
    "pst": "America/Los_Angeles",
    "pdt": "America/Los_Angeles",
    "chicago": "America/Chicago",
    "singapore": "Asia/Singapore",
    "cairo": "Africa/Cairo"
};

// Large pool of fallback global timezones to pull random comparisons from
const GLOBAL_TIMEZONE_POOL = [
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
    "Australia/Sydney",
    "Europe/Paris",
    "Asia/Dubai",
    "Asia/Kolkata",
    "America/Los_Angeles",
    "America/Chicago",
    "Africa/Cairo",
    "Asia/Singapore",
    "America/Sao_Paulo",
    "Europe/Berlin",
    "Africa/Johannesburg",
    "Pacific/Auckland"
];

/**
 * Normalizes input strings like "London" or "Tokyo" into standard IANA identifiers.
 */
function normalizeTimezone(tzInput: string): string {
    const clean = tzInput.trim().toLowerCase();
    return TIMEZONE_MAP[clean] || tzInput; // Fallback to original text if not found in map
}

/**
 * Combines date/time strings belonging to an origin timezone, converts them into 
 * a UTC timestamp, and structures the converted output for the target timezone 
 * alongside 3 completely random, non-duplicating alternative world timezones.
 */
export function convertBetweenTimezones(
    dateStr: string, 
    timeStr: string, 
    fromTimeZone: string,
    toTimeZone: string,
    is24Hour: boolean
): AdvancedTimezoneResponse {
    const cleanDate = dateStr.trim();
    const cleanTime = timeStr.trim();
    
    // Step 1: Normalize user inputs (Transforms "london" -> "Europe/London")
    const originTz = normalizeTimezone(fromTimeZone || "UTC");
    const targetTz = normalizeTimezone(toTimeZone || "UTC");

    if (!cleanDate || !cleanTime) {
        return { success: false, error: "Missing date or time inputs." };
    }

    try {
        const standardTime = cleanTime.split(':').length === 2 ? `${cleanTime}:00` : cleanTime;
        
        // Validate date/time structural layout
        if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanDate) || !/^\d{2}:\d{2}:\d{2}$/.test(standardTime)) {
            return { success: false, error: "Invalid date or time format parameters." };
        }

        // Validate timezones via built-in Intl check
        new Intl.DateTimeFormat("en-US", { timeZone: originTz });
        new Intl.DateTimeFormat("en-US", { timeZone: targetTz });

        // Step 2: Resolve local clock numbers inside the origin timezone into an absolute UTC Date
        const absoluteUtcDate = resolveToUtc(cleanDate, standardTime, originTz);

        // Step 3: Format the primary converted result
        const convertedResult = formatInTimezone(absoluteUtcDate, targetTz, is24Hour);
        if (!convertedResult) {
            return { success: false, error: "Failed to compile target timezone data." };
        }

        // Step 4: FILTER OUT the target timezone from the random pool to guarantee no duplication
        const targetTzNormalized = targetTz.toLowerCase();
        const filteredPool = GLOBAL_TIMEZONE_POOL.filter(tz => tz.toLowerCase() !== targetTzNormalized);
        
        // Randomly shuffle the pool and grab exactly 3 unique timezones
        const selectedComparisons = filteredPool.sort(() => 0.5 - Math.random()).slice(0, 3);

        const comparisons: Record<string, ConvertedTimezoneDetails> = {};
        for (const tz of selectedComparisons) {
            const formattedExtra = formatInTimezone(absoluteUtcDate, tz, is24Hour);
            if (formattedExtra) {
                comparisons[tz] = formattedExtra;
            }
        }

        return {
            success: true,
            converted: convertedResult,
            comparisons: comparisons
        };

    } catch (e) {
        return { success: false, error: `Unsupported timezone or invalid input parameters.` };
    }
}

/**
 * Helper to turn a specific Wall Clock time inside an origin timezone into a proper absolute UTC Date instance.
 */
function resolveToUtc(dateStr: string, timeStr: string, originTz: string): Date {
    const baseDate = new Date(`${dateStr}T${timeStr}Z`);
    let absoluteCorrectDate = baseDate;

    const options: Intl.DateTimeFormatOptions = {
        timeZone: originTz,
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hourCycle: 'h23'
    };

    // Refinement loop to bypass DST shifts, offsets, and overlaps smoothly
    for (let i = 0; i < 3; i++) {
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(absoluteCorrectDate);
        const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
        
        const currentWallClock = new Date(Date.UTC(
            parseInt(map.year, 10),
            parseInt(map.month, 10) - 1,
            parseInt(map.day, 10),
            parseInt(map.hour, 10),
            parseInt(map.minute, 10),
            parseInt(map.second, 10)
        ));

        const targetWallClock = new Date(Date.UTC(
            ...dateStr.split('-').map(Number) as [number, number, number],
            ...timeStr.split(':').map(Number) as [number, number, number]
        ));
        targetWallClock.setUTCMonth(targetWallClock.getUTCMonth() - 1);

        const drift = targetWallClock.getTime() - currentWallClock.getTime();
        if (drift === 0) break; 
        absoluteCorrectDate = new Date(absoluteCorrectDate.getTime() + drift);
    }
    return absoluteCorrectDate;
}

/**
 * Helper to build the customized output object for any given timezone
 */
function formatInTimezone(date: Date, timeZone: string, is24Hour: boolean): ConvertedTimezoneDetails | null {
    try {
        const clockOptions = is24Hour ? { hourCycle: "h23" as const } : { hour12: true as const };

        const mainFormatter = new Intl.DateTimeFormat("en-GB", {
            year: "numeric", month: "short", day: "2-digit",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
            timeZone: timeZone, ...clockOptions
        });

        const dateFormatter = new Intl.DateTimeFormat("en-GB", { 
            year: "numeric", month: "short", day: "2-digit", timeZone: timeZone 
        });
        
        const timeFormatter = new Intl.DateTimeFormat("en-GB", { 
            hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: timeZone, ...clockOptions
        });

        let tzCode = timeZone;
        if (timeZone.includes('/')) {
            tzCode = timeZone.split('/').pop()!.replace(/_/g, ' ');
        }

        const longMetaFormatter = new Intl.DateTimeFormat("en-US", {
            timeZone: timeZone,
            timeZoneName: "longOffset"
        });
        const longParts = longMetaFormatter.formatToParts(date);
        const gmtOffset = longParts.find(p => p.type === "timeZoneName")?.value || "GMT+0";

        const cleanSpaces = (str: string) => str.replace(/[\u202f\u00a0]/g, " ");

        return {
            formatted: cleanSpaces(mainFormatter.format(date)),
            datePart: cleanSpaces(dateFormatter.format(date)),
            timePart: cleanSpaces(timeFormatter.format(date)),
            timeZoneCode: tzCode,
            gmtOffset: gmtOffset 
        };
    } catch {
        return null;
    }
}



