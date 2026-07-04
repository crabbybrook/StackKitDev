export interface RegexMatchResult {
    match: string;
    index: number;
    groups: Record<string, string>;
    captures: string[];
    indices?: [number, number][]; 
}

interface RegexToolResponse {
    success: boolean;
    matches: RegexMatchResult[];
    executionTimeMs: number;
    err?: string;
}

function buildSafeRegex(pattern: string, flags = "g"): RegExp {
    const flagArray = flags.trim().split("");
    const flagSet = new Set<string>(flagArray);

    if (!flagSet.has("g") && !flagSet.has("y")) {
        flagSet.add("g");
    }

    flagSet.add("d");

    if (pattern.includes("\\p{") || pattern.includes("\\P{")) {
        if (!flagSet.has("u") && !flagSet.has("v")) {
            flagSet.add("u"); 
        }
    }

    if (flagSet.has("v") && flagSet.has("u")) {
        flagSet.delete("u");
    }

    const safeFlags = Array.from(flagSet).join("");
    return new RegExp(pattern, safeFlags);
}

export function processRegexTool(
    pattern: string,
    text: string,
    flags = "g"
): RegexToolResponse {
    const startTime = performance.now();

    if (!pattern) {
        return { success: true, matches: [], executionTimeMs: 0 };
    }

    try {
        const regex = buildSafeRegex(pattern, flags);
        const matches: RegexMatchResult[] = [];
        const iterator = text.matchAll(regex);
        const TIMEOUT_LIMIT_MS = 500;

        while (true) {
            if (performance.now() - startTime > TIMEOUT_LIMIT_MS) {
                return {
                    success: false, 
                    executionTimeMs: 0, 
                    matches: [], 
                    err: "Execution timed out. The regular expression is too complex for this input string."
                };
            }

            const next = iterator.next();
            if (next.done) {
                break;
            }
            
            const matchObj = next.value as any; 
            
            matches.push({
                match: matchObj[0],
                index: matchObj.index ?? 0,
                groups: matchObj.groups ? { ...matchObj.groups } : {},
                captures: matchObj.slice(1),
                indices: matchObj.indices ? [...matchObj.indices] : undefined 
            });
        }
        
        return {
            success: true,
            matches,
            executionTimeMs: parseFloat((performance.now() - startTime).toFixed(3))
        };
    } catch (error: any) {
        return {
            success: false,
            matches: [],
            executionTimeMs: parseFloat((performance.now() - startTime).toFixed(3)),
            err: error?.message || "Invalid Regular Expression", 
        };
    }
}
