import ability from "./ability"
import classes from "./classes"
import common from "./common"
import link from "./link"
import servers from "./servers"
import union from "./union"

let merged = {};
[
    ability,
    common,
    classes,
    link,
    servers,
    union,
].forEach(json => Object.keys(json).forEach(key => merged[key] = json[key]))

export default merged