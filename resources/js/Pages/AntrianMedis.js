import React from "react";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useFilters,
} from "react-table";
import { InertiaLink } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import Table from "@/Components/Table";
import { formatDate } from "@/Utilities/misc";

export default function AntrianMedis(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "No",
        accessor: (row, index) => index + 1,
      },
      {
        id: "tanggal",
        Header: "Tanggal",
        accessor: (row) => {
          return `${formatDate(row.nomor_antrian.tanggal)}`;
        },
        filter: (rows, id, filterValue) => {
          return rows.filter(
            (row) =>
              filterValue.length <= 0 ||
              !filterValue ||
              formatDate(filterValue).includes(row.values[id])
          );
        },
        Cell: (tableInstance) => {
          return (
            <>
              {formatDate(tableInstance.row.original.nomor_antrian.tanggal)} •{" "}
              {tableInstance.row.original.waktu}
            </>
          );
        },
      },
      {
        Header: "Nama Pasien",
        accessor: "pasien.nama",
        Cell: (tableInstance) => {
          return (
            <a
              href={route("pasien.show", tableInstance.row.original.pasien.id)}
              method="post"
              target="_blank"
              className="flex gap-4 items-center w-full text-xs text-blue-700 hover:underline"
            >
              {tableInstance.row.original.pasien.nama}
            </a>
          );
        },
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: props.antrian,
      defaultColumn: columns,
      initialState: {
        pageSize: 7,
        filters: [
          {
            id: "tanggal",
            value: formatDate(new Date()),
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    usePagination
  );

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
    >
      <div className="py-8">
        <Table
          tableInstance={tableInstance}
          customEditIcon="periksa.svg"
          editURL={`/pemeriksaan`}
          handleDelete={() => {}}
          withDateSearch={true}
          withDetailButton={false}
          withDelete={false}
        />
      </div>
    </Authenticated>
  );
}
