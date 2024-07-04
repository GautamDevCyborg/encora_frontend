import React from 'react';

const UsersTable = () => {
  const TableData = [
    { name: 'user1', plants: 181370, other: 2, uploads: 181372 },
    { name: 'user2', plants: 1602, other: 0, uploads: 1602 },
    { name: 'user 3', plants: 1594, other: 1, uploads: 1595 },
    { name: 'user 4', plants: 1415, other: 0, uploads: 1415 },
    { name: 'user 5', plants: 999, other: 0, uploads: 999 },
    { name: 'user 6', plants: 146, other: 0, uploads: 146 },
    { name: 'user 7', plants: 123, other: 0, uploads: 123 },
    { name: 'user 8', plants: 19, other: 0, uploads: 19 },
    { name: 'user 9', plants: 14, other: 0, uploads: 14 },
    { name: 'user 10', plants: 13, other: 0, uploads: 13 },
    { name: 'user 11', plants: 12, other: 0, uploads: 12 },
    { name: 'user 12', plants: 11, other: 0, uploads: 11 },
    { name: 'user 13', plants: 8, other: 0, uploads: 8 },
    { name: 'user 14', plants: 8, other: 0, uploads: 8 },
    { name: 'user 15', plants: 8, other: 0, uploads: 8 },
  ];

  // Function to calculate totals
  const calculateTotals = (TableData) => {
    let totalPlants = 0;
    let totalOther = 0;
    let totalUploads = 0;
    TableData.forEach(row => {
      totalPlants += row.plants;
      totalOther += row.other;
      totalUploads += row.uploads;
    });
    return { name: 'Total', plants: totalPlants, other: totalOther, uploads: totalUploads };
  };

  // Add the total row to the TableData
  const totalRow = calculateTotals(TableData);
  const dataWithTotal = [...TableData, totalRow];

  // Inline styles
  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyles = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  };

  const tdStyles = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const trStyles = {
    cursor: 'pointer',
  };

  const totalRowStyles = {
    fontWeight: 'bold',
  };

  const aStyles = {
    color: '#007bff',
    textDecoration: 'none',
  };

  const aHoverStyles = {
    textDecoration: 'underline',
  };

return (
    <div style={{padding:"50px 100px 50px 100px",alignContent:"center"}}>
      <h1 style={{textAlign:"center"}}>By Users</h1>
      <p style={{textAlign:"center"}}>By clicking on the user name, you can reach user profile</p>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Name</th>
            <th style={thStyles}>Plants</th>
            <th style={thStyles}>Other</th>
            <th style={thStyles}>Uploads</th>
          </tr>
        </thead>
        <tbody>
          {dataWithTotal.map((row, index) => (
            <tr key={index} style={row.name !== 'Total' ? trStyles : totalRowStyles}>
              <td style={tdStyles}>
                {row.name === 'Total' ? (
                  <span style={{color:'black'}}>{row.name}</span>
                ) : (
                  <a
                    href="/"
                    style={aStyles}
                    onMouseOver={(e) => (e.target.style.textDecoration = aHoverStyles.textDecoration)}
                    onMouseOut={(e) => (e.target.style.textDecoration = aStyles.textDecoration)}
                    onClick={() => alert(`You clicked on ${row.name}`)}
                  >
                    {row.name}
                  </a>
                )}
              </td>
              <td style={tdStyles}>{row.plants}</td>
              <td style={tdStyles}>{row.other}</td>
              <td style={tdStyles}>{row.uploads}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

