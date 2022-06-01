import {computed, reactive, watch} from 'vue'
import {fetchJson} from './fetch'
import {fetchFonts, loadFont} from './fonts'

export interface State {
    keyboard: {
        rows: []
        fontFamily: string
        fontVariant: string
    },
    fonts: [
        {
            family: string,
            variants: string[]
        }
    ]
}

const createStore = () => {
    const state: State = reactive(
        {
            keyboard: {
                rows: [],
                fontFamily: '',
                fontVariant: '',
            },
            fonts: {

            },
            outerOutline: true,
            innerOutline: true,
            selected: null,
            keycaps: {
                Keycap1u1x: {
                    areas: 1,
                    outer: {
                        style: {
                            width: '18.2mm',
                            height: '18.2mm',
                        }
                    },
                    inner: {
                        style: {
                            width: '15.95mm',
                            height: '15.95mm',
                            gridTemplateColumns: '1fr',
                            gridTemplateRows: '1fr',
                        }
                    }
                },
                Keycap1u4x: {
                    areas: 4,
                    outer: {
                        style: {
                            width: '18.2mm',
                            height: '18.2mm',
                        }
                    },
                    inner: {
                        style: {
                            width: '15.95mm',
                            height: '15.95mm',
                            gridTemplateColumns: '1fr 1fr',
                            gridTemplateRows: '1fr 1fr',
                        }
                    }
                }
            }
        }
    )

    const currentFont = () => {
        if (state.keyboard.fontFamily && state.keyboard.fontVariant) {
            return state.keyboard.fontFamily + '-' + state.keyboard.fontVariant
        }
        return null
    }

    watch(
        currentFont,
        async (fontId) => {
            await loadFont(state.keyboard.fontFamily, state.keyboard.fontVariant, fontId)
        }
    )

    return {
        state,
        currentFont,
        async fetchKeyboard() {
            const keyboard = await fetchJson('keyboard.json')
            state.keyboard.rows.splice(0, keyboard.rows.length, ...keyboard.rows)
            state.keyboard.fontFamily = keyboard.fontFamily
            state.keyboard.fontVariant = keyboard.fontVariant
        },
        async fetchFonts() {
            const fonts = await fetchFonts()
            for (const font of fonts) {
                state.fonts[font.family] = font
            }
            // state.fonts.splice(0, fonts.length, ...fonts)
        },
        json() {
            return JSON.stringify(state.keyboard, null, 4)
        }
    }
}

export {
    createStore
}
