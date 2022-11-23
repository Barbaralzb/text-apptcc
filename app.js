import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const fs = require('fs')

// -> Import files from the text folder
import * as textAgenda from './text/agendaText.js'
//import * as textDashboard from './text/dashboardText.js'
// import * as textFormulaire from './text/formulaireText.js'
//import * as textApp from './text/applicacionText.js'


// -> Create Array with all the texts imports
const files = [textAgenda]


const getAllStrings = (arg) => {
    if (typeof arg === "string") {
        return [arg];
    }
    if (typeof arg !== "object" || !arg) {
        return [];
    }
    return Object.keys(arg).reduce((acc, key) => {
        return (
            [...acc, ...getAllStrings(arg[key])]);
    }, []);
}


const getValues = (files) => {
    let array =  []
    for ( let i = 0; i <= files.length ; i++ ) {
        array.push(getAllStrings(files[i]))
    }
    let concatArr = [].concat.apply([], array);
    return concatArr
}

const ArrAllConstants = (files) => {
    let array =  []
    for ( let i = 0; i < files.length ; i++ ) {
        array.push(...Object.entries(files[i]))
    }
    return array
}

const AllValues = getValues(files)

// -> strings uniques
const unique = Array.from(new Set(AllValues));
if(AllValues.length === unique.length) {
    console.log(`Array doesn't contain duplicates`);
} else {
    console.log(`Array contains duplicates`);
}

// -> strings repete
const set = new Set(AllValues);
const duplicatesko = AllValues.filter(item => {
    if (set.has(item)) {
        set.delete(item);
    } else {
        return item;
    }
});
const duplicates = Array.from(new Set(duplicatesko))


console.log('Total Constants (export const CONSTANT) : ', ArrAllConstants(files).length)
console.log('Total Only the Strings : ', AllValues.length)
console.log('All Constants are Strings (text without special characters) ? : ', ArrAllConstants(files).length === AllValues.length   ? true : false)


console.log('Strings Uniques : ', unique.length)
fs.writeFileSync('export/stringsUniques.js',unique.join(`\n`), console.log(`-> Sont prints dans le file stringsUniques.js`))

console.log('Strings Duplicates : ', duplicates.length)
fs.writeFileSync('export/stringsDuplicates.js',duplicates.join(`\n`), console.log(`-> Sont prints dans le file stringsDuplicates.js`))



const templateConstant = (list) => list.map((el, index) => `export const ${el[0]} = "${el[1]}"`)

// -> Ici c'est les constantes où sans les strings que se repetes
const ConstantsUniques = ArrAllConstants(files).filter(item => !duplicates.includes(item[1]))
console.log('Constants avec seulement les Strings Uniques : ', ConstantsUniques.length)
fs.writeFileSync('export/constantsAvecStringsUnique.js',templateConstant(ConstantsUniques).join(`\n`), console.log(`-> Sont print dans le file constantsAvecStringsUnique.js`))


// -> Ici c'est les constantes où le string se repete
const ConstantsDuplicated = ArrAllConstants(files).filter(item => duplicates.includes(item[1]))
console.log('Constants avec seulement les Strings Duplicated : ', ConstantsDuplicated.length)
fs.writeFileSync('export/constantsAvecStringsDuplicated.js',templateConstant(ConstantsDuplicated).join(`\n`), console.log(`-> Sont print dans le file constantsAvecStringsDuplicated.js`))


