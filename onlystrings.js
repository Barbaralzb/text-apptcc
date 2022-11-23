import * as textAgenda from './text/agendaText.js'
import * as textDashboard from './text/dashboardText.js'
import * as textFormulaire from './text/formulaireText.js'
import * as textApp from './text/applicacionText.js'
import * as textFormulaireBackend from './text/echelles-backend.js'
import * as textDashboardBackend from './text/dashboard-backend.js'
import * as textAgendaBackend from './text/agenda-backend.js'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');

const files = [textAgenda,textDashboard, textFormulaire, textApp, textFormulaireBackend, textDashboardBackend, textAgendaBackend]

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
};


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

// strings uniques
const unique = Array.from(new Set(AllValues));
if(AllValues.length === unique.length) {
    console.log(`Array doesn't contain duplicates.`);
} else {
    console.log(`Array contains duplicates.`);
}

// strings repete
const set = new Set(AllValues);
const duplicatesko = AllValues.filter(item => {
    if (set.has(item)) {
        set.delete(item);
    } else {
        return item;
    }
});
const duplicates = Array.from(new Set(duplicatesko))




//console.log('Strings duplicated', duplicates.length)
console.log('Total Strings : ', AllValues.length)
console.log('Total constants : ', ArrAllConstants(files).length)

// Those should have the same length to be sure every const is a string
console.log('All values are strings ? : ', ArrAllConstants(files).length === AllValues.length   ? true : false)
console.log('Uniques : ', unique.length)
console.log('duplicates : ', duplicates.length)

fs.writeFileSync('export/duplicates.js',duplicates.join(`\n`), console.log('Strings duplicates ecris dans le file duplicate.js'))
fs.writeFileSync('export/uniques.js',unique.join(`\n`), console.log('Strings uniques ecris dans le file uniques.js'))