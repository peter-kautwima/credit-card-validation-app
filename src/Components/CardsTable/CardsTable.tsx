import React from "react";

type TableProps = {
  data: RowData[];
  columns: Column[];
};

type RowData = {
  id: string;
  name: string;
  country: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
};

type Column = {
  accessor: string;
  label: string;
};

const CardsTable = ({ data, columns }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.accessor}>{row[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CardsTable;
