import { Modal, Form, Button, Spin } from "antd";

import { FC } from "react";

import AgendaForm from "./AgendaForm";
import { AgendaPayloadInterface } from "~/Types/Agenda";

import useGetAgendaDetailQuery from "~/Hooks/AgendaQuery/useGetAgendaDetailQuery";

import { BaseModal } from "~/Types/Modal";

interface DetailAgendaModalFormProps extends BaseModal {
  selectedAgendaId: string;
}

const DetailAgendaModalForm: FC<DetailAgendaModalFormProps> = (props) => {
  const { onCancel, onOk, open, selectedAgendaId } = props;

  const [form] = Form.useForm<AgendaPayloadInterface>();

  const agendaDetailQuery = useGetAgendaDetailQuery(selectedAgendaId);

  return (
    <Modal
      title="Edit Agenda"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={720}
      destroyOnClose
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
      ]}
    >
      <div
        style={{
          marginTop: 20,
        }}
      >
        {agendaDetailQuery.isLoading || agendaDetailQuery.isFetching ? (
          <Spin spinning tip="Loading..." />
        ) : (
          <AgendaForm
            form={form}
            initialValues={agendaDetailQuery.data?.data}
            disabled
          />
        )}
      </div>
    </Modal>
  );
};

export default DetailAgendaModalForm;
