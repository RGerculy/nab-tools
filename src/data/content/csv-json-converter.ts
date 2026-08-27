import type { ToolContent } from './types';

export const csvJsonConverterContent: ToolContent = {
  slug: 'csv-json-converter',
  intro: ['Convert CSV rows to a readable JSON array or turn an array of JSON objects back into CSV. The parser handles quoted commas, escaped quotes, headers, and uneven rows.', 'This is useful for moving data between spreadsheets and APIs without sending the file to a server.'],
  sections: [
    { heading: 'CSV and JSON solve different problems', paragraphs: ['CSV is a compact table format: each row is a record and each column is a field. JSON can represent the same table, but also supports nested objects, arrays, booleans, and numbers. CSV is convenient for spreadsheets; JSON is convenient for applications.'] },
    { heading: 'Quoted fields matter', paragraphs: ['A CSV value containing a comma, line break, or double quote must be quoted. A quote inside a quoted value is written as two double quotes. A reliable parser must track whether it is inside quotes before treating a comma or newline as a separator.'] },
    { heading: 'Headers and data types', paragraphs: ['When CSV is converted to JSON, the first row can become object keys. CSV itself has no universal type system, so values such as 42 and true arrive as strings unless your application converts them after parsing.'], tip: 'Use stable, unique column names in the first row. Empty or duplicated headers make downstream JSON harder to use.' },
  ],
  faqs: [
    { q: 'Can CSV contain commas inside a value?', a: 'Yes. Put the value in double quotes, such as "London, UK". A quoted double quote is written as two double quotes.' },
    { q: 'Does CSV to JSON convert numbers automatically?', a: 'No. CSV has no standard type information, so this tool preserves cell values as strings.' },
    { q: 'What shape does CSV become in JSON?', a: 'A CSV table becomes an array of objects, using the first row as property names when the header option is enabled.' },
    { q: 'Does the converter upload my data?', a: 'No. Parsing and conversion run entirely in the browser.' },
  ],
  relatedSlugs: ['json-formatter', 'base64-tool', 'markdown-to-html'],
};
