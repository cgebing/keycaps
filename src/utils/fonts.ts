import {fetchJson} from './fetch'

const googleFontsApiKey = 'AIzaSyC_qiV7i7okgMWv1klOV5jdLJJ4Mod2Ifk';

export interface Font {
    family: string
    category: string
    kind: string
    version: string
    lastModified: string
    files: any[],
    variants: any[]
}

let fonts = null

export const fetchFonts = async (): Promise<Font[]> => {
    if (!fonts) {
        fonts = await fetchJson(`https://www.googleapis.com/webfonts/v1/webfonts?key=${googleFontsApiKey}&sort=popularity`)
    }
    return fonts.items
}

export const loadFont = async (fontFamily, fontVariant, fontId) => {
    const font = fonts.items.find(font => font.family === fontFamily)
    const fontFace = new FontFace(fontId, `url(${font.files[fontVariant]})`)
    document.fonts.add(await fontFace.load())
}
