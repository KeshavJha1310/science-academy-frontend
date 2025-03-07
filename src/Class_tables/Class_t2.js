import React from 'react'
// import '../App2.css';
const Class_t2 = () => {
    const number_rows = [
        { id: 1, name: 'INR', value1: 10000, value2: 4500, value3: 4500 },

    ];
    
      const calculateTotal = () => {
        let total = 0;
        for (const row of number_rows) {
          total += row.value1 + row.value2 + row.value3;
        }
        return total;
      };
    
  return (
    <div className="table-wrapper">
       <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Installment 1</th>
            <th>Installment 2</th>
            <th>Installment 3</th>
           
          </tr>
        </thead>
        <tbody>
          {number_rows.map((row) => (
            <tr key={row.id}>
              <td>{row.name}/-</td>
              <td>{row.value1}/-</td>
              <td>{row.value2}/-</td>
              <td>{row.value3}/-</td>
             
            </tr>
          ))}
          <tr className="total-row">
            <td>Total</td>
            <td colSpan="3">{calculateTotal()}/-</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Class_t2
