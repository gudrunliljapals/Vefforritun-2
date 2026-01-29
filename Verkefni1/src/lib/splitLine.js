
/**
 * Breytir CSV línu í fields
 * 
 * Meðhöndlar kommu vesesnið úr spurningaleiks CSV skjalinu 
 * -> hundsa kommur inn í ""  
 * -> auka "" innan strengja fields eru breytt í "
 * 
 * @param {string} line - lína úr CSV skjali
 * @returns {string[]} array með parsed field gildum frá CSV línunni
 */

export function splitLine(line) {
    const fields = [];
    let curQuote = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const ch = line[i];

        if (ch === '"') {
            if (inQuotes && line[i + 1] === '"') {
                curQuote += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
            continue;
        }

        if (ch === "," && !inQuotes) {
            fields.push(curQuote); 
            curQuote = "";
            continue;
        }

        curQuote += ch;
    }

    fields.push(curQuote);

    return fields;
}