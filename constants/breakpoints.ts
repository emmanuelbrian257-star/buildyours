import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../tailwind.config"

const fullConfig=resolveConfig(tailwindConfig)
export const breakpoints=fullConfig.theme.screens

export const numericBreakpoints=Object.fromEntries(
    Object.entries(breakpoints).map(([key, value])=>[
        key,
        parseInt(value.replace("px",""),10)
    ])
);