const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2];
const outputFile = path.join(__dirname, 'src', 'data', 'cod-penal-data.ts');

const content = fs.readFileSync(inputFile, 'utf-8');

const lines = content.split('\n').map(l => l.trim().replace(/^"|"$/g, '')); // remove quotes

let articles = [];
let currentCategory = '';
let currentCategoryLabel = '';
let currentArticle = null;

const catMap = {
    '1': { id: 'contra-persoanei', label: 'Contra Persoanelor' },
    '2': { id: 'ordine-publica', label: 'Ordinea Publica' },
    '3': { id: 'convietuire-sociala', label: 'Convietuire Sociala' },
    '4': { id: 'moralitate-publica', label: 'Moralitate Publica' },
    '5': { id: 'contra-proprietatii', label: 'Contra Proprietatilor' },
    '6': { id: 'justitie', label: 'Impotriva Justitiei' },
    '7': { id: 'arme', label: 'Controlul Armelor' },
    '8': { id: 'contraventii-rutiere', label: 'Contraventii Rutiere' },
    '9': { id: 'infractiuni-rutiere', label: 'Infractiuni Rutiere' }
};

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const capMatch = line.match(/^CAP\.\s*(\d+)\s*\[(.*?)\]:/);
    if (capMatch) {
        const catNum = capMatch[1];
        if (catMap[catNum]) {
            currentCategory = catMap[catNum].id;
            currentCategoryLabel = catMap[catNum].label;
        } else {
            currentCategory = 'diverse';
            currentCategoryLabel = capMatch[2];
        }
        continue;
    }

    const artMatch = line.match(/^\((\d+)\)([A-Z0-9A-Za-z]+)\.\s*(.*)/);
    if (artMatch) {
        if (currentArticle) articles.push(currentArticle);
        
        currentArticle = {
            id: `(${artMatch[1]})${artMatch[2]}`,
            category: currentCategory,
            categoryLabel: currentCategoryLabel,
            title: artMatch[3].trim(),
            description: '',
            amenda: '',
            inchisoare: ''
        };
        continue;
    }

    if (currentArticle) {
        if (line.startsWith('- Sentinta:')) {
            currentArticle.inchisoare = line.replace('- Sentinta:', '').trim();
        } else if (line.startsWith('- Amenda:')) {
            currentArticle.amenda = line.replace('- Amenda:', '').trim();
        } else if (line !== '^' && !line.startsWith('- Daca ati comis')) {
            if (!currentArticle.inchisoare && !currentArticle.amenda) {
                currentArticle.description += (currentArticle.description ? ' ' : '') + line;
            }
        } else if (line === '^') {
            currentArticle.description = "Identic cu prevederile anterioare pentru clasa specifica.";
        }
    }
}

if (currentArticle) articles.push(currentArticle);

// Format as TS module
const tsCode = `export type LawArticle = {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  amenda: string;
  inchisoare: string;
};

export const articlesData: LawArticle[] = ${JSON.stringify(articles, null, 2)};
`;

fs.mkdirSync(path.join(__dirname, 'src', 'data'), { recursive: true });
fs.writeFileSync(outputFile, tsCode, 'utf-8');
console.log('Done writing ' + articles.length + ' articles to ' + outputFile);
