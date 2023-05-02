import {
  Input,
  Button,
  Card,
  Col,
  Divider,
  message,
  Row,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import { SetStateAction, useState } from "react";
import Datatable from "~/Components/Datatable";
import useDeleteAgendaParticipant from "~/Hooks/AgendaPartisipanQuery/useDeleteAgendaParcipant";
import useGetAgendaParticipantListQuery from "~/Hooks/AgendaPartisipanQuery/useGetAgendaParticipantListQuery";
import { AgendaParticipantInterface } from "~/Types/AgendaParticipant";

function ParticipantTable() {
  const [search, setSearch] = useState<string | undefined>(undefined);
  // useParams buat dapeting id dari url, contoh: /partisipan/1
  const params = useParams();
  // Ini buat dapetin id dari url
  const { id: agendaId } = params as { id?: string };

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [selectedAgendaId, setSelectedAgendaId] = useState<string>("");

  const { data, isLoading, isError, error } = useGetAgendaParticipantListQuery(
    agendaId,
    search
  );

  const deleteAgendaParticipant = useDeleteAgendaParticipant();

  function onDeleteAgendaParticipant(id: string) {
    deleteAgendaParticipant.mutate(id, {
      onSuccess: () => message.success("Berhasil Menghapus Partisipan"),
      onError: () => message.error("Gagal Hapus Partisipan"),
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

  const dataSource = data?.data?.$values || [];

  return (
    <>
      <Card title="List Partisipan">
        <Row justify="space-between">
          <Col>
            <Input.Search
              allowClear
              placeholder="Nama Partisipan"
              onSearch={(val: SetStateAction<string | undefined>) =>
                setSearch(val)
              }
              style={{ width: 200 }}
            />
          </Col>
          <Col>
            <Button onClick={() => setOpenCreateModal(true)}>
              Tambah Partisipan
            </Button>
          </Col>
        </Row>

        <Divider />

        <Datatable<AgendaParticipantInterface>
          columns={[
            {
              title: "Nama",
              dataIndex: "name",
              width: 150,

              sortDirections: ["descend", "ascend"],
              sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
              title: "Address",
              dataIndex: "address",
              width: 150,

              sortDirections: ["descend", "ascend"],
              sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
              title: "NIK",
              dataIndex: "nik",
              width: 150,
            },
            {
              title: "Tanggal Lahir",
              dataIndex: "birthDate",
              width: 150,
            },
            {
              title: "Tempat Lahir",
              dataIndex: "birthPlace",
              width: 150,
            },
            {
              title: "Photo",
              dataIndex: "photo",
              width: 150,
            },
            {
              title: "AgendaId",
              dataIndex: "agendaId",
              width: 150,
            },
            {
              title: "Tipe Peserta",
              dataIndex: "participantType",
              width: 150,
            },
            {
              title: "Gelar Peserta",
              dataIndex: "participantTitle",
              width: 150,
            },
            {
              title: "Agenda",
              dataIndex: "agenda",
              width: 150,
            },
            {
              title: "Tanggal Pembuatan",
              dataIndex: "createdDate",
              width: 150,
            },
            {
              title: "Dibuat Oleh",
              dataIndex: "createdBy",
              width: 150,
            },
            {
              title: "Tanggal Modified",
              dataIndex: "modifiedDate",
              width: 150,
            },
            {
              title: "Diedit Oleh",
              dataIndex: "modifiedDate",
              width: 150,
            },
          ]}
          dataSource={dataSource}
          scroll={{ y: 800, x: 1500 }}
          rowKey={(record) => record.id || "agendapartisipan"}
          loading={isLoading}
        />
      </Card>
    </>
  );
}

export default ParticipantTable;
