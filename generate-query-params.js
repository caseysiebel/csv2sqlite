const columns = [
  'First Name',
  'Middle Initial',
  'Last Name',
  'Street Address',
  'Email',
  'Zip Code',
  'Joined Date',
  'UUID'
];

module.exports = (rows) => {
  let queryColumns = '';
  let queryValues = '';
  const numRows = rows.length;
  rows.forEach((row, i) => {
    let rowValue = '';
    columns.forEach((column, j) => {
      // Only keep truthy values
      // filter null columns
      if(row[column]) {
        rowValue += `'${ row[column] }'`;
        // comma delimited columns in row 
        if (j !== columns.length - 1) {
          rowValue += ', ';
        }
        // Filter out template columns based on missing columns
        if (i === 0) {
          queryColumns += `'${ column }'`;
          // comma delimited queryColumn string
          if (j !== columns.length - 1) {
            queryColumns += ', ';
          }
        }
      }
    });
    queryValues += `(${ rowValue })`;
    // comma delimited rows in value sql string
    if (i !== numRows - 1) {
      queryValues += ', ';
    }
  })
  return [ queryColumns, queryValues ];
}
