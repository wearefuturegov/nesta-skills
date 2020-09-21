
import theme from "../_theme"

export function getBranding(brand) {
    return brand === "working_together" ? theme.orange : (brand === "learning" ? theme.purple : (brand === "leading_change" ? theme.red : theme.darkPurple))
}