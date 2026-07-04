interface ReturnedValue {
    ok: boolean,
    value?: Object,
    value2?: string
    error?: string
}


function tryParseJson(input: string) {
    try {
        const ok = true
        const value = JSON.parse(input)
        const returnedValue:ReturnedValue = { ok: ok, value: value }
        return returnedValue
    } catch (err) {
        const ok = false
        const returnedValue:ReturnedValue = { ok: ok, error: "Invalid JSON" }
        return returnedValue

    }
}

export function formatJson(input: string) {
    const checkInput = tryParseJson(input)

    if (checkInput.ok) {
        const parsed = JSON.parse(input)
        const returnedValue: ReturnedValue = {ok:checkInput.ok, value2: JSON.stringify(parsed, null, 2)}
        return returnedValue
    } else {
        return checkInput
    }
}

export function minifyJson(input: string) {
    const checkInput = tryParseJson(input)

    if (checkInput.ok) {
        const parsed = JSON.parse(input)
        const returnedValue: ReturnedValue = {ok: checkInput.ok, value2: JSON.stringify(parsed)}
        return returnedValue
    }else {
        return checkInput
    }
}