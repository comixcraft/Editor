// ===================================================
// ********** Primitive type definition
/**
 * @typedef {string} name
 * name is a type string that can't be null
 */
/**
 * @typedef {number} positiveNumber
 * positiveNumber is a type number that can't be negative
 */
/**
 * @typedef {positiveNumber} id
 * id is a type positiveNumber that can only be integer
 */

/**
 * @typedef {number} percentage
 * percentage is a type number that is between 0 and 1
 */

// ===================================================
// ********** Comic
/**
 * @typedef {Object} Comic
 * @property {name} projectname
 * @property {name | null} title
 * @property {name | null} creatorname
 * @property {page[]} pages
 * page is another typedef
 */

// ===================================================
// ********** Page
/**
 * @typedef {Object} page
 * @property {strip[]} strips
 * strip is another typedef
 */

// ===================================================
// ********** Strip
/**
 * @typedef {Object} strip
 * @property {panel[]} panels
 * @property {positiveNumber} height
 * panel is another typedef
 * create a subtype for number (no negative values)
 */

//===================================================
// ********** Panel
/**
 * @typedef {Object} panel
 * @property {string} border
 * @property {Map<Id:Element>} elements
 * @property {positiveNumber} width
 * Element is another typedef
 */

// ===================================================
// ********** Element
/**
 * @typedef {Object} Element
 * @property {Position} position
 * @property {Asset | Text} type
 * @property {Boolean} isFocused
 * @property {number} rotation
 * @property {Boolean} isMirrored
 * @property {positiveNumber} width
 * @property {positiveNumber} height
 */

// ===================================================
// ********** Position
/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 */

// ===================================================
// ********** Asset
/**
 * @typedef {Object} Asset
 * @property {string} path
 * @property {id} id
 * page is another typedef
 */

// ===================================================
// ********** Text
/**
 * @typedef {Object} Text
 * @property {string} content
 * @property {positiveNumber} fontSize
 * @property {"Roboto" | "Helvetica" | ...} fontFamily
 * @property {"bold" | "italic"} fontWeight
 */
