import { Modal, Button, Form, message } from "antd";

import { AgendaPayloadInterface } from "~/Types/Agenda";
import useCreateAgendaMutation from "~/Hooks/AgendaQuery/useCreateAgendaMutation";
import { dayJsConfigured, FORMAT_DATE } from "~/Utils/dayjs";

import { BaseModal } from "~/Types/Modal";
import AgendaForm from "./AgendaForm";

interface CreateAgendaModalFormProps extends BaseModal {}

export default function CreateAgendaModalForm(
  props: CreateAgendaModalFormProps
) {
  // 1. get props dari parent
  const { onCancel, onOk, open } = props;

  // 2. buat ngecreate data pake react query mutation sekaligus didalamnya ada service kita buat ngepost data ke server
  const { mutate, isLoading, isError } = useCreateAgendaMutation();

  // 3. buat form instance
  const [form] = Form.useForm<AgendaPayloadInterface>();

  // 4. buat handler ketika form berhasil di submit
  const onFinish = (values: AgendaPayloadInterface) => {
    // Ini buat nge mapping si tanggalnya jadi timezone Asia/Jakarta
    values.agendaDate = dayJsConfigured(values.agendaDate).format(
      FORMAT_DATE["YYYY-MM-DDTHH:mm:ssZ"]
    );
    values.djkLetterNumberDate = dayJsConfigured(
      values.djkLetterNumberDate
    ).format(FORMAT_DATE["YYYY-MM-DDTHH:mm:ssZ"]);

    // 5. panggil mutation buat ngepost data ke server
    mutate(values, {
      // 6. handle success kalo dari servernya udah berhasil
      onSuccess: () => {
        message.success("Agenda berhasil dibuat");
        form.resetFields();
        onOk && onOk();
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    // 7. handle error kalo dari form nya kena validasi
    console.log("Failed:", errorInfo);
  };

  if (isError) {
    message.error("Uups, ada kesalahan");
  }

  return (
    <Modal
      title="Buat Agenda"
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
          // 8. submit form ketika button di klik
          onClick={() => form.submit()}
          // 9. disable button ketika lagi loading ngepost data ke server
          loading={isLoading}
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
        <AgendaForm
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
      </div>
    </Modal>
  );
}
