
export interface RgbColor { r: number; g: number; b: number; a: number; }
export interface HslColor { h: number; s: number; l: number; a: number; }
export interface OklchColor { l: number; c: number; h: number; a: number; }

interface ColorDetails {
    hex: string;
    rgba: string;
    rgb: string;
    hsl: string;
    oklch: string;
    isDark: boolean;
    contrastWithWhite: number;
    contrastWithBlack: number;
}

export interface ColorHarmonies {
    name: string,
    colors: string[]
}


export interface ColorScales {
    tints: string[];
    shades: string[];
}

/**
 * ============================================================================
 * PROTECTED BOUNDARY CLAMPS
 * ============================================================================
 */
const clampRGB = (val: number): number => Math.max(0, Math.min(255, Math.round(val)));

const clampAlpha = (val: number | undefined): number =>
    (val === undefined || Number.isNaN(val) || typeof val !== "number") ? 1 : Math.max(0, Math.min(1, val));

const clampHSL = (h: number, s: number, l: number, a?: number) => ({
    h: ((Math.round(h) % 360) + 360) % 360,
    s: Math.max(0, Math.min(100, Math.round(s))),
    l: Math.max(0, Math.min(100, Math.round(l))),
    a: clampAlpha(a)
});

/**
 * ============================================================================
 * DETACHED CORE CONVERSION MATRIX
 * ============================================================================
 */

// --- 1. UNIVERSAL RGB -> HEX CONVERTER ---
export function rgbToHex(inputStr: string): string;
export function rgbToHex(r: number, g: number, b: number, a?: number): string;
export function rgbToHex(first: number | string, g?: number, b?: number, a?: number): string {
    // String Path: Processes raw pasted input values through your universal string interpreter gateway
    if (typeof first === "string") {
        return parseToHex(first);
    }

    // Numbers Path: Direct parameters conversion with strict boundary clamps
    const cleanR = clampRGB(first).toString(16).padStart(2, "0");
    const cleanG = clampRGB(g ?? 0).toString(16).padStart(2, "0");
    const cleanB = clampRGB(b ?? 0).toString(16).padStart(2, "0");
    let hex = `#${cleanR}${cleanG}${cleanB}`;

    const alpha = clampAlpha(a);
    if (alpha < 1) {
        hex += Math.round(alpha * 255).toString(16).padStart(2, "0");
    }
    return hex.toLowerCase();
}

// --- 2. UNIVERSAL RGB -> HSL CONVERTER ---
export function rgbToHsl(inputStr: string): HslColor;
export function rgbToHsl(r: number, g: number, b: number, a?: number): HslColor;
export function rgbToHsl(first: number | string, g?: number, b?: number, a?: number): HslColor {
    // String Path: Converts messy inputs to clear channels objects using your safe hexToRgb parser
    if (typeof first === "string") {
        const rgbData = hexToRgb(first); // This cleanly triggers parseToHex for you internally
        return rgbToHsl(rgbData.r, rgbData.g, rgbData.b, rgbData.a);
    }

    // Numbers Path: Direct parameters conversion with strict boundary clamps
    const cleanR = clampRGB(first) / 255;
    const cleanG = clampRGB(g ?? 0) / 255;
    const cleanB = clampRGB(b ?? 0) / 255;

    const max = Math.max(cleanR, cleanG, cleanB);
    const min = Math.min(cleanR, cleanG, cleanB);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case cleanR: h = (cleanG - cleanB) / d + (cleanG < cleanB ? 6 : 0); break;
            case cleanG: h = (cleanB - cleanR) / d + 2; break;
            case cleanB: h = (cleanR - cleanG) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100), a: clampAlpha(a) };
}

// --- RGB -> OKLCH (Perceptually uniform modern color space approximation) ---
export function rgbToOklch(inputStr: string): OklchColor;
export function rgbToOklch(r: number, g: number, b: number, a?: number): OklchColor;
export function rgbToOklch(first: number | string, g?: number, b?: number, a?: number): OklchColor {
    // String Path: Resolves raw text blocks into an RGB numeric payload using your safe hexToRgb parser
    if (typeof first === "string") {
        const rgbData = hexToRgb(first); // Automatically routes safely through parseToHex under the hood
        return rgbToOklch(rgbData.r, rgbData.g, rgbData.b, rgbData.a);
    }

    // Numbers Path: Continues with your strict parametric computation logic
    // Using the explicitly overloaded numeric fallback matrix path to pull hue, saturation, and lightness coordinates
    const hsl = rgbToHsl(first, g ?? 0, b ?? 0);

    const l = parseFloat((hsl.l / 100).toFixed(3));
    const c = parseFloat(((hsl.s / 100) * 0.4).toFixed(3)); // Linear space chroma approximation bounds

    return { l, c, h: hsl.h, a: clampAlpha(a) };
}

// --- HEX -> RGB/RGBA (Handles 3, 4, 6, and 8 character tokens) ---
export function hexToRgb(hex: string): RgbColor {
    const validatedHex = parseToHex(hex).substring(1); // Strips the leading '#' safely

    const r = parseInt(validatedHex.substring(0, 2), 16);
    const g = parseInt(validatedHex.substring(2, 4), 16);
    const b = parseInt(validatedHex.substring(4, 6), 16);
    let a = 1;

    if (validatedHex.length === 8) {
        a = parseFloat((parseInt(validatedHex.substring(6, 8), 16) / 255).toFixed(2));
    }
    return { r, g, b, a };
}

// --- HEX -> HSL/HSLA (Direct Matrix Pipeline shortcut) ---
export function hexToHsl(hex: string): HslColor {
    const rgb = hexToRgb(hex);
    return rgbToHsl(rgb.r, rgb.g, rgb.b, rgb.a);
}


// --- HSL/HSLA -> HEX ---
function hslToHex(h: number, s: number, l: number, a?: number): string {
    const b = clampHSL(h, s, l, a);
    const hPrime = b.h / 30;
    const sF = b.s / 100;
    const lF = b.l / 100;

    const k = (n: number) => (n + hPrime) % 12;
    const valA = sF * Math.min(lF, 1 - lF);
    const f = (n: number) => lF - valA * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    const toHexStr = (x: number) => clampRGB(x * 255).toString(16).padStart(2, "0");

    let hex = `#${toHexStr(f(0))}${toHexStr(f(8))}${toHexStr(f(4))}`;
    if (b.a < 1) {
        hex += Math.round(b.a * 255).toString(16).padStart(2, "0");
    }
    return hex.toLowerCase();
}

export function parseToHex(input: string): string {
    const clean = input.trim().toLowerCase();
    const named: Record<string, string> = {
        red: "#ff0000", blue: "#0000ff", green: "#008000",
        black: "#000000", white: "#ffffff", transparent: "#00000000"
    };
    if (named[clean]) return named[clean];

    // 1. Process Hex Codes directly (#abc, abc, #aabbcc, aabbccddeeff)
    if (/^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(clean)) {
        const hex = clean.replace("#", "");
        if (hex.length === 3 || hex.length === 4) {
            return "#" + hex.split("").map(c => c + c).join("");
        }
        return "#" + hex;
    }

    // 2. Process RGB/RGBA functional string templates using regex numeric extraction array
    const digits = clean.match(/[\d.]+/g);
    if (clean.startsWith("rgb") && digits && digits.length >= 3) {
        const parse = (str: string, m: number) => str.includes("%") ? Math.round((parseFloat(str) / 100) * m) : parseFloat(str);

        // Inline mapping directly into internal explicit rgb-to-hex utility
        const cleanR = Math.max(0, Math.min(255, Math.round(parse(digits[0], 255)))).toString(16).padStart(2, "0");
        const cleanG = Math.max(0, Math.min(255, Math.round(parse(digits[1], 255)))).toString(16).padStart(2, "0");
        const cleanB = Math.max(0, Math.min(255, Math.round(parse(digits[2], 255)))).toString(16).padStart(2, "0");
        let resultHex = `#${cleanR}${cleanG}${cleanB}`;

        if (digits[3]) {
            const alpha = Math.max(0, Math.min(1, parseFloat(digits[3])));
            if (alpha < 1) resultHex += Math.round(alpha * 255).toString(16).padStart(2, "0");
        }
        return resultHex.toLowerCase();
    }

    // 3. Process HSL/HSLA structural rotational curves
    if (clean.startsWith("hsl") && digits && digits.length >= 3) {
        return hslToHex(parseFloat(digits[0]), parseFloat(digits[1]), parseFloat(digits[2]), digits[3] ? parseFloat(digits[3]) : 1);
    }

    throw new Error("Invalid color pattern string structure sent down to engine.");
}

// --- Generates high-density diagnostics and parsed string representations ---
export function getColorDetails(input: string): ColorDetails {
    const hexWithAlpha = parseToHex(input);
    const rgb = hexToRgb(hexWithAlpha);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const oklch = rgbToOklch(rgb.r, rgb.g, rgb.b);
    const baseHex = hexWithAlpha.substring(0, 7);

    // Official W3C WCAG relative luminance evaluation
    const getLuminance = (h: string): number => {
        const cRgb = hexToRgb(h);
        const tf = (v: number) => (v / 255) <= 0.03928 ? (v / 255) / 12.92 : Math.pow(((v / 255) + 0.055) / 1.055, 2.4);
        return tf(cRgb.r) * 0.2126 + tf(cRgb.g) * 0.7152 + tf(cRgb.b) * 0.0722;
    };

    const l1 = getLuminance(baseHex) + 0.05;
    const contrastWhite = parseFloat((Math.max(l1, 1.05) / Math.min(l1, 1.05)).toFixed(2));
    const contrastBlack = parseFloat((Math.max(l1, 0.05) / Math.min(l1, 0.05)).toFixed(2));

    return {
        hex: hexWithAlpha,
        rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`,
        rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        oklch: `oklch(${oklch.l} ${oklch.c} ${oklch.h} / ${oklch.a}}`,
        isDark: contrastWhite > contrastBlack,
        contrastWithWhite: contrastWhite,
        contrastWithBlack: contrastBlack
    };
}


// --- Generates a proportional array layout of shades and tints ---
export function generateScales(hex: string, steps = 5): ColorScales {
    let rgb: { r: number; g: number; b: number };

    // Check if the string contains comma-separated RGB values
    if (hex.includes(',') || hex.startsWith('rgb')) {
        // Extract numbers using a regular expression
        const matches = hex.match(/\d+/g);
        if (!matches || matches.length < 3) {
            throw new Error("Invalid RGB string format");
        }
        rgb = {
            r: parseInt(matches[0], 10),
            g: parseInt(matches[1], 10),
            b: parseInt(matches[2], 10)
        };
    } else {
        // Fallback to your existing Hex parser
        rgb = hexToRgb(hex);
    }
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const tints: string[] = [];
    const shades: string[] = [];

    for (let i = 1; i <= steps; i++) {
        tints.push(hslToHex(hsl.h, hsl.s, hsl.l + ((100 - hsl.l) * (i / (steps + 1)))));
        shades.push(hslToHex(hsl.h, hsl.s, hsl.l * (1 - (i / (steps + 1)))));
    }

    return { tints, shades: shades };
}

export function generateAdvancedHarmonies(hex: string): ColorHarmonies[] {
    const sanitizedHex = hex.startsWith('#') ? hex : `#${hex}`;
    const rgb = hexToRgb(sanitizedHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    // Safely handles negative degree shifts and floating decimals
    const rotate = (deg: number) => Math.round(((hsl.h + deg) % 360 + 360) % 360);

    return [
        { 
            name: "Analogous", 
            colors: [hslToHex(rotate(30), hsl.s, hsl.l), sanitizedHex, hslToHex(rotate(-30), hsl.s, hsl.l)] 
        }, 
        { 
            name: "Complementary", 
            colors: [sanitizedHex, hslToHex(rotate(180), hsl.s, hsl.l)] 
        }, 
        { 
            name: "Double Split Complementary", 
            colors: [
                sanitizedHex,
                hslToHex(rotate(30), hsl.s, hsl.l),
                hslToHex(rotate(150), hsl.s, hsl.l),
                hslToHex(rotate(210), hsl.s, hsl.l)
            ] 
        },
        { 
            name: "Rectangle", 
            colors: [sanitizedHex, hslToHex(rotate(60), hsl.s, hsl.l), hslToHex(rotate(180), hsl.s, hsl.l), hslToHex(rotate(240), hsl.s, hsl.l)] 
        }, 
        { 
            name: "Split Complementary", 
            colors: [sanitizedHex, hslToHex(rotate(150), hsl.s, hsl.l), hslToHex(rotate(210), hsl.s, hsl.l)] 
        }, 
        { 
            name: "Tetradic", 
            colors: [sanitizedHex, hslToHex(rotate(90), hsl.s, hsl.l), hslToHex(rotate(180), hsl.s, hsl.l), hslToHex(rotate(270), hsl.s, hsl.l)] 
        },
        { 
            name: "Triadic", 
            colors: [sanitizedHex, hslToHex(rotate(120), hsl.s, hsl.l), hslToHex(rotate(240), hsl.s, hsl.l)] 
        }
    ];
}