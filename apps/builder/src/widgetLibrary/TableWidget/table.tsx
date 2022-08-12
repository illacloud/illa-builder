import { FC } from "react";
import { Table } from "@illa-design/table";
import { TableWidgetProps, WrappedTableProps } from "@/widgetLibrary/TableWidget/interface";

export const WrappedTable: FC<WrappedTableProps> = (props) => {
  const { data, columns } = props;
  return <Table data={data} columns={columns} w="100%" h="100%" />;
};

export const TableWidget: FC<TableWidgetProps> = (props) => {
  const { originData,columns } = props;
  return <Table data={originData} columns={columns}/>;
};
