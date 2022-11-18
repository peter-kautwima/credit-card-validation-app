import React from "react";
import styles from "./CardsTable.module.scss";
import { Card } from "../../types";
type TableProps = {
  data: RowData[];
  columns: Column[];
};

type RowData = Card;

type Column = {
  accessor: keyof RowData;
  label: string;
};

const CardsTable = ({ data, columns }: TableProps) => {
  return (
    <div className={styles["my-cards-table"]}>
      <div className={styles.header}>
        {columns.map((column) => (
          <div key={column.accessor} className={styles.headerCell}>
            {column.label}
          </div>
        ))}
      </div>
      {data.map((row) => (
        <div key={row.id} className={styles.row}>
          {Object.keys(row).map((key) => {
            const value = row[key as keyof RowData];
            return <div>{value}</div>;
          })}
        </div>
      ))}
    </div>
  );
};

export default CardsTable;
