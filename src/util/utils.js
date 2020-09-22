
import theme from "../_theme"

export function getBranding(brand) {
    return brand === "working_together" ? theme.orange : (brand === "learning" ? theme.purple : (brand === "leading_change" ? theme.red : theme.darkPurple))
}

/**
 * So theres a really intermittent bug where we get a cross origin error - 
 * it turns out this is actually from JSON.parse() being given [] to parse and it falls over
 * this is a small method to safely parse into json and hopefully we wont see this bug again
 */
export function safeJsonParse(dataToParse) {

    console.log(typeof dataToParse);
    console.log(dataToParse);
    if (typeof dataToParse === 'object' && dataToParse.length === 0 || dataToParse === undefined ) {
        // give it something to parse
        dataToParse = "[]";
    }

    return JSON.parse(dataToParse);

}