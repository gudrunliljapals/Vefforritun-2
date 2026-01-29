
/**
 * Passa upp á kommur innan gæsalappa í svörum í csv skrá 
 * 
 * @param {*} line 
 * @returns fields í objects af öllum liðum í csv skránni
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