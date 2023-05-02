import { useEffect } from "react";
import { Form, Input, DatePicker, FormInstance, Select } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { AgendaPayloadInterface } from "~/Types/Agenda";
import { dayJsConfigured } from "~/Utils/dayjs";

interface AgendaFormProps {
  form: FormInstance<AgendaPayloadInterface>;
  onFinish?: (values: AgendaPayloadInterface) => void;
  onFinishFailed?: (
    errorInfo: ValidateErrorEntity<AgendaPayloadInterface>
  ) => void;
  initialValues?: Partial<AgendaPayloadInterface>;
  disabled?: boolean;
}

export default function AgendaForm({
  form,
  onFinish,
  onFinishFailed,
  initialValues,
  disabled,
}: AgendaFormProps) {
  const mappedInitialValues = {
    ...initialValues,
    agendaDate: dayJsConfigured(initialValues?.agendaDate),
    djkLetterNumberDate: dayJsConfigured(initialValues?.djkLetterNumberDate),
  };

  useEffect(() => {
    form.setFieldsValue(mappedInitialValues);
  }, [form, mappedInitialValues]);

  return (
    <Form<AgendaPayloadInterface>
      form={form}
      name="basic"
      layout="vertical"
      style={{ maxWidth: "100%" }}
      initialValues={mappedInitialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      disabled={disabled}
    >
      <div
        style={{
          marginTop: 20,
        }}
      >
        <Form.Item
          label="Nama Agenda"
          name="name"
          rules={[{ required: true, message: "Mohon isi nama agenda!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Mohon isi deskripsi agenda!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Tanggal Pelaksanaan"
          name="agendaDate"
          rules={[{ required: true, message: "Mohon isi tanggal agenda!" }]}
        >
          <DatePicker
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Tipe Agenda"
          name="agendaType"
          rules={[{ required: true, message: "Mohon isi tipe agenda!" }]}
        >
          <Select
            style={{ width: "100%" }}
            options={[
              { value: "Event", label: "Event" },
              { value: "Lainnya", label: "Lainnya" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Lokasi"
          name="location"
          rules={[{ required: true, message: "Mohon isi lokasi agenda!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nomor Surat DJK"
          name="djkLetterNumber"
          rules={[{ required: true, message: "Mohon isi nomor DJK!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tanggal Surat DJK"
          name="djkLetterNumberDate"
          rules={[{ required: true, message: "Mohon isi tanggal agenda!" }]}
        >
          <DatePicker
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
      </div>
    </Form>
  );
}
