import { Modal, Button, Form, Spin, message } from "antd";

import { FC } from "react";

import { AgendaPayloadInterface } from "~/Types/Agenda";
import AgendaForm from "./AgendaForm";

import useGetAgendaDetailQuery from "~/Hooks/AgendaQuery/useGetAgendaDetailQuery";
import useCreateAgendaMutation from "~/Hooks/AgendaQuery/useUpdateAgenda";

import { BaseModal } from "~/Types/Modal";
import { dayJsConfigured, FORMAT_DATE } from "~/Utils/dayjs";

interface EditAgendaModalFormProps extends BaseModal {
  selectedAgendaId: string;
}

const EditAgendaModalForm: FC<EditAgendaModalFormProps> = (props) => {
  const { onCancel, onOk, open, selectedAgendaId } = props;

  const agendaDetailQuery = useGetAgendaDetailQuery(selectedAgendaId);
  const updateAgendaMutation = useCreateAgendaMutation(selectedAgendaId);

  const [form] = Form.useForm<AgendaPayloadInterface>();

  const onFinish = (values: AgendaPayloadInterface) => {
    values.agendaDate = dayJsConfigured(values.agendaDate).format(
      FORMAT_DATE["YYYY-MM-DDTHH:mm:ssZ"]
    );

    values.djkLetterNumberDate = dayJsConfigured(
      values.djkLetterNumberDate
    ).format(FORMAT_DATE["YYYY-MM-DDTHH:mm:ssZ"]);

    updateAgendaMutation.mutate(values, {
      onSuccess: () => {
        message.success("Agenda berhasil di update");
        form.resetFields();
        onOk && onOk();
      },
    });
  };

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
        <Button
          key="submit"
          type="primary"
          onClick={() => form.submit()}
          loading={updateAgendaMutation.isLoading}
        >
          Submit
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
            initialValues={agendaDetailQuery.data?.data}
            form={form}
            onFinish={onFinish}
          />
        )}
      </div>
    </Modal>
  );
};

export default EditAgendaModalForm;
