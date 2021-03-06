import ability from "./ability"
import classes from "./classes"
import common from "./common"
import items from "./items"
import link from "./link"
import servers from "./servers"
import union from "./union"

let merged = {};
[
    ability,
    classes,
    common,
    items,
    link,
    servers,
    union,
].forEach(json => Object.keys(json).forEach(key => merged[key] = json[key]))

export default merged