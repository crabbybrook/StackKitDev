const csvRegex = /[",\n\r\t]/

function escapeCsvCell(value: unknown){
    const text = value === null || value === undefined ? "" : String(value)
    if(csvRegex.test(text)){
        const formatCsv = `"${text.replace(/"/g, '""')}"` 
        return formatCsv
    }
    return text
}

export function jsonToCsv(inp: string){
    try{
        const input = JSON.parse(inp)
        const rawRows = Array.isArray(input) ? input : [input]
        const rows: Record<string, unknown>[] = rawRows.filter((row)=> row !==null && typeof row === 'object') 
        const headers = Array.from(new Set(rows.flatMap((row)=> Object.keys((row) ?? {}))))
        
        const lines = [
            headers.map(escapeCsvCell).join(","),
            ...rows.map((row)=>
                headers.map((key)=> escapeCsvCell((row)?.[key])).join(","))
        ]
        
        const fullLine = lines.join('\n')
        return {
            ok: true,
            headers, rows, fullLine, 
            rowCount: rows.length,
            columnCount: headers.length
        }
    }catch(err){
        return {
            ok: false,
            msg: err,
            fullLine: "Error"
        }
    }
}

function parseCsv(text: string): string[][] {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentValue = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const next = text[i + 1];

        if (char === '"' && inQuotes && next === '"') {
            currentValue += '"';
            i++;
            continue;
        }
        if (char === '"') {
            inQuotes = !inQuotes;
            continue;
        }
        if (char === "," && !inQuotes) {
            currentRow.push(currentValue);
            currentValue = "";
            continue;
        }
        if ((char === "\n" || char === "\r") && !inQuotes) {
            if (char === "\r" && next === "\n") {
                i++;
            }
            currentRow.push(currentValue);
            rows.push(currentRow);
            currentRow = [];
            currentValue = "";
            continue;
        }
        currentValue += char;
    }

    if (currentRow.length > 0 || currentValue !== "") {
        currentRow.push(currentValue);
        rows.push(currentRow);
    }

    return rows.filter(row => row.some(cell => cell.trim() !== ""));
}

export function csvToJson(csvText: string): Record<string, string>[] {
    const rows = parseCsv(csvText);
    if (rows.length <= 1) return []; 

    const [headers, ...dataRows] = rows;
    const cleanHeaders = headers.map(h => h.trim());

    return dataRows.map(row => {
        const obj: Record<string, string> = {};
        cleanHeaders.forEach((header, index) => {
            obj[header] = row[index] ?? ""; 
        });
        return obj;
    });
}
