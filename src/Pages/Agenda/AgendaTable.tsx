import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Divider,
  Card,
  Row,
  Col,
  Button,
  Space,
  message,
  Popconfirm,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import Datatable from "~/Components/Datatable";
import CreateAgendaModalForm from "~/Components/Agenda/CreateAgendaModalForm";
import EditAgendaModalForm from "~/Components/Agenda/EditAgendaModalForm";
import DetailAgendaModalForm from "~/Components/Agenda/DetailAgendaModalForm";

import useGetAgendaListQuery from "~/Hooks/AgendaQuery/useGetAgendaListQuery";
import useDeleteAgenda from "~/Hooks/AgendaQuery/useDeleteAgenda";

import { AgendaInterface } from "~/Types/Agenda";

import { dateFormatter } from "~/Utils/date-formatter";
import { Navigate, useNavigate } from "react-router-dom";

function AgendaTable() {
  // 1. Ini buat nampung state dari search
  const [search, setSearch] = useState<string | undefined>(undefined);

  // 2. Ini buat nampung state dari modal create
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [selectedAgendaId, setSelectedAgendaId] = useState<string>("");

  // 3. Ini buat ngefetch data dari API
  const { data, isLoading, isError, error } = useGetAgendaListQuery(search);

  const deleteAgenda = useDeleteAgenda();

  function onDeleteAgenda(id: string) {
    deleteAgenda.mutate(id, {
      onSuccess: () => message.success("Berhasil hapus agenda"),
      onError: () => message.error("Gagal hapus agenda"),
    });
  }

  function onOpenEditModal(id: string) {
    setOpenEditModal(true);
    setSelectedAgendaId(id);
  }

  function onOpenDetailModal(id: string) {
    setOpenDetailModal(true);
    setSelectedAgendaId(id);
  }

  // 4. Ini buat ngecek apakah ada error
  if (isError) {
    return <p>{error.message || "Error"}</p>;
  }

  // 5. Ini buat ngerender data dari API dari hasil mapping
  const dataSource = data?.data?.$values || [];

  return (
    <>
      <Card title="List Agenda">
        <Row justify="space-between">
          <Col>
            <Input.Search
              allowClear
              placeholder="Nama"
              // 6. Ini buat ngehandle ketika ada perubahan dari search
              onSearch={(val) => setSearch(val)}
              style={{ width: 200 }}
            />
          </Col>
          <Col>
            <Button onClick={() => setOpenCreateModal(true)}>
              Tambah Agenda
            </Button>
          </Col>
        </Row>

        <Divider />

        <Datatable<AgendaInterface>
          // 7. Ini buat ngedefinisiin kolom apa aja yang mau ditampilkan sesuai interface nya, eg: AgendaInterface
          columns={[
            {
              title: "Nama",
              dataIndex: "name",
              width: 150,
              // 8. Ini buat ngedefinisiin kolom apa aja yang mau di sort, harus nyertain properti sortDirections sama sorter
              sortDirections: ["descend", "ascend"],
              sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
              title: "Deskripsi",
              dataIndex: "description",
              width: 150,
              sortDirections: ["descend", "ascend"],
              sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
              title: "Tipe Agenda",
              dataIndex: "agendaType",
              width: 150,
              sortDirections: ["descend", "ascend"],
              sorter: (a, b) => a.agendaType.localeCompare(b.name),
            },
            {
              title: "Waktu",
              dataIndex: "agendaDate",
              width: 150,
              render: (value) =>
                dateFormatter(value, {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }),
            },
            {
              title: "Lokasi",
              dataIndex: "location",
              width: 150,
              sortDirections: ["descend", "ascend"],
              sorter: (a, b) => a.location.localeCompare(b.name),
            },
            {
              title: "No. Surat DJK",
              dataIndex: "djkLetterNumber",
              width: 150,
              sortDirections: ["descend", "ascend"],
              sorter: (a, b) => a.djkLetterNumber.localeCompare(b.name),
            },
            {
              title: "Tanggal Surat DJK",
              dataIndex: "djkLetterNumberDate",
              width: 150,
              // 9. Ini buat ngecustom render dari kolom, klo mau ngecustom render harus nyertain properti render
              render(value) {
                return dateFormatter(value, {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                });
              },
            },
            {
              key: "action",
              title: "Action",
              width: 150,
              // 9. Ini buat ngecustom render dari kolom, klo mau ngecustom render harus nyertain properti render
              render(__, record) {
                return (
                  <Space wrap>
                    <Link to={`/partisipan/${record.id}`}>
                      <Button
                        htmlType="button"
                        type="dashed"
                        icon={<TeamOutlined />}
                        shape="circle"
                      />
                    </Link>
                    <Button
                      type="dashed"
                      icon={<EyeOutlined />}
                      shape="circle"
                      onClick={() => onOpenDetailModal(record.id)}
                    />
                    <Button
                      type="dashed"
                      icon={<EditOutlined />}
                      shape="circle"
                      onClick={() => onOpenEditModal(record.id)}
                    />

                    <Popconfirm
                      title="Hapus Agenda"
                      description="Anda yakin untuk menghapus agenda ini?"
                      onConfirm={() => onDeleteAgenda(record.id)}
                      okText="Ya"
                      cancelText="Tidak"
                    >
                      <Button
                        type="dashed"
                        icon={<DeleteOutlined />}
                        shape="circle"
                      />
                    </Popconfirm>
                  </Space>
                );
              },
            },
          ]}
          // 10. Jangan lupa dataSource nya diisi dari variable dataSource
          dataSource={dataSource}
          // 11. Ini buat ngeset posisi scroll dari table
          scroll={{ y: 800, x: 1500 }}
          rowKey={(record) => record.id || "agenda"}
          // 12. Ini nampilin loading klo lagi loading
          loading={isLoading}
        />
      </Card>

      <CreateAgendaModalForm
        // 13. Ini buat nampilin modal create klo state nya true
        open={openCreateModal}
        // 14. Ini buat ngehandle ketika modal create di close
        onCancel={() => setOpenCreateModal(false)}
        // 15. Ini buat ngehandle ketika modal create di submit
        onOk={() => setOpenCreateModal(false)}
      />

      <EditAgendaModalForm
        open={openEditModal}
        selectedAgendaId={selectedAgendaId}
        onCancel={() => setOpenEditModal(false)}
        onOk={() => setOpenEditModal(false)}
      />

      <DetailAgendaModalForm
        open={openDetailModal}
        selectedAgendaId={selectedAgendaId}
        onCancel={() => setOpenDetailModal(false)}
        onOk={() => setOpenDetailModal(false)}
      />
    </>
  );
}

export default AgendaTable;
