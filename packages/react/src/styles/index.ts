import { colors, fontSizes, fontWeights, fonts, lineHeights, radii, space } from "@gabriel-ignite-ui-new-02/tokens";
import { createStitches, defaultThemeMap } from "@stitches/react";

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({

    themeMap: {
        ...defaultThemeMap,
        height: 'space', //quero que utilize em height o token space
        width: 'space',
    },

    theme: {
        colors: colors,
        fontSizes: fontSizes,
        fontWeights: fontWeights,
        fonts: fonts,
        lineHeights: lineHeights,
        radii: radii,
        space: space
    } //variáveis que vou utilizar dentro do thema
})