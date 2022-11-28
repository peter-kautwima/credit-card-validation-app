import styles from './CardsTable.module.scss';
import { Card } from '../../types';
type TableProps = {
  data: RowData[];
  columns: Column[];
};

type RowData = Card;

export type Column = {
  accessor: keyof RowData;
  label: string;
};

const CardsTable = ({ data, columns }: TableProps) => {
  return (
    <table id="saved-cards" className={styles['my-cards-table']}>
      <thead className={styles.header}>
        {columns.map((column) => (
          <td key={column.accessor} className={styles.headerCell}>
            {column.label}
          </td>
        ))}
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className={styles.row}>
            {Object.keys(row).map((key) => {
              const value = row[key as keyof RowData];
              return <td key={key}>{value}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CardsTable;
