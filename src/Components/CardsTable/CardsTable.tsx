import React from "react";
import styles from "./CardsTable.module.scss";
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
  accessor: keyof RowData;
  label: string;
};

const CardsTable = ({ data, columns }: TableProps) => {
  return (
    <table className={styles["my-cards-table"]}>
      <thead className={styles.header}>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor} className={styles.headerCell}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className={styles.row}>
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
