import { useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

interface DatatableProps<T = Record<string, any>> extends TableProps<T> {}

function Datatable<T extends Record<string, any> = Record<string, any>>({
  dataSource,
  columns,
  ...rest
}: DatatableProps<T>) {
  return <Table columns={columns} dataSource={dataSource} {...rest} />;
}

export default Datatable;
