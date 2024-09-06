import { Button, Form, message, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  useCreateWorkPermitMutation,
  useUpdateWorkPermitMutation,
} from "../../redux/api/workPermit/workPermitApi";
import MyInp from "../ui/form/MyInp";

const WorkPermitModal = ({
  modalVisible,
  setModalVisible,
  editingWorkPermit,
  setEditingWorkPermit,
}) => {
  const [form] = Form.useForm();

  const [createWorkPermit, { isLoading: isLoadingCreateWorkPermit }] =
    useCreateWorkPermitMutation();
  const [updateWorkPermit, { isLoading: isLoadingUpdateWorkPermit }] =
    useUpdateWorkPermitMutation();

  useEffect(() => {
    if (editingWorkPermit) {
      form.setFieldsValue({
        ...editingWorkPermit,
      });
    }
  }, [form, editingWorkPermit]);

  const handleCreateWorkPermit = async (values) => {
    try {
      const result = await createWorkPermit(values).unwrap();
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
      setModalVisible(false);
      setEditingWorkPermit(null);
      form.resetFields();
    } catch (e) {
      message.error(
        e?.data?.message || e?.message || "Failed to add work permit"
      );
    }
  };

  const handleUpdateWorkPermit = async (values) => {
    try {
      const res = await updateWorkPermit({
        ...values,
        _id: editingWorkPermit?._id,
      }).unwrap();
      if (res?.success) {
        message.success(res?.message);
      } else {
        message.error(res?.message);
      }
      setModalVisible(false);
      setEditingWorkPermit(null);
      form.resetFields();
    } catch (error) {
      message.error(
        error?.data?.message || error?.message || "Failed to update work permit"
      );
    }
  };

  return (
    <Modal
      open={modalVisible}
      onCancel={() => {
        form.resetFields();
        setEditingWorkPermit(null);
        setModalVisible(false);
      }}
      width={1400}
      className="p-6 bg-white rounded-lg my-scrollbar max-h-[80vh] overflow-y-scroll"
      footer={null}
    >
      <h2 className="font-bold text-xl mb-4">
        {editingWorkPermit ? "Update Work Permit" : "Add Work Permit"}
      </h2>

      <Form
        layout="vertical"
        form={form}
        onFinish={
          editingWorkPermit ? handleUpdateWorkPermit : handleCreateWorkPermit
        }
      >
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Header</h3>
          <MyInp
            name={"barcodeText"}
            rules={[{ required: true, message: "Please input barcode text!" }]}
            label="Barcode text"
            placeholder="Enter barcode text"
            type="textarea"
            size="large"
          />
        </div>
        {/* Employee Information */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Employee Information</h3>
          <div className="flex flex-wrap gap-4">
            <MyInp
              name={["tootajaTeave", "nimi"]}
              rules={[
                { required: true, message: "Please input employee name!" },
              ]}
              label="Employee Name (Nimi)"
              placeholder="Enter employee name"
              type="text"
              size="large"
            />
            <MyInp
              name={["tootajaTeave", "isaNimi"]}
              rules={[
                { required: true, message: "Please input father's name!" },
              ]}
              label="Father's Name (Isa Nimi)"
              placeholder="Enter father's name"
              type="text"
              size="large"
            />
            <MyInp
              name={["tootajaTeave", "emainimi"]}
              rules={[
                { required: true, message: "Please input mother's name!" },
              ]}
              label="Mother's Name (Ema Nimi)"
              placeholder="Enter mother's name"
              type="text"
              size="large"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <MyInp
              name={["tootajaTeave", "sunnipaev"]}
              rules={[
                { required: true, message: "Please input date of birth!" },
              ]}
              label="Date of Birth (Sünnipäev)"
              placeholder="Enter date of birth"
              type="string"
              size="large"
            />
            <MyInp
              name={["tootajaTeave", "passiNumber"]}
              rules={[
                { required: true, message: "Please input passport number!" },
              ]}
              label="Passport Number (Passi Number)"
              placeholder="Enter passport number"
              type="text"
              size="large"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <MyInp
              name={["tootajaTeave", "pusivAadress"]}
              rules={[
                { required: true, message: "Please input permanent address!" },
              ]}
              label="Permanent Address (Püsiv Aadress)"
              placeholder="Enter permanent address"
              type="text"
              size="large"
            />
            <MyInp
              name={["tootajaTeave", "ePost"]}
              rules={[{ required: true, message: "Please input email!" }]}
              label="Email (E-post)"
              placeholder="Enter email"
              type="email"
              size="large"
            />
          </div>
        </div>

        {/* Employment Details */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Employment Details</h3>

          <div className="flex flex-wrap gap-4">
            <MyInp
              name={["tooandmiseDetailid", "tooKirjeldus"]}
              rules={[
                { required: true, message: "Please input job description!" },
              ]}
              label="Job Description (Töö Kirjeldus)"
              placeholder="Enter job description"
              type="textarea"
              size="large"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <MyInp
              name={["tooandmiseDetailid", "ametikoht"]}
              rules={[{ required: true, message: "Please input position!" }]}
              label="Position (Ametikoht)"
              placeholder="Enter position"
              type="text"
              size="large"
            />
            <MyInp
              name={["tooandmiseDetailid", "palkJaKasu", "kuuPalk"]}
              rules={[
                { required: true, message: "Please input monthly salary!" },
              ]}
              label="Monthly Salary (Kuu Palk)"
              placeholder="Enter monthly salary"
              type="text"
              size="large"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <MyInp
              name={["tooandmiseDetailid", "contractStartDate"]}
              rules={[
                {
                  required: true,
                  message: "Please input contract start date!",
                },
              ]}
              label="Contract Start Date (Lepingu Alguskuupäev)"
              placeholder="Enter contract start date"
              type="string"
              size="large"
            />
            <MyInp
              name={["tooandmiseDetailid", "contractEndDate"]}
              rules={[
                { required: true, message: "Please input contract end date!" },
              ]}
              label="Contract End Date (Lepingu Lõppkuupäev)"
              placeholder="Enter contract end date"
              type="string"
              size="large"
            />
          </div>
        </div>

        {/* Work Permit Details */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Work Permit Details</h3>
          <div className="flex flex-wrap gap-4">
            <MyInp
              name={["tooloaDetailid", "workPermitStartDate"]}
              rules={[
                {
                  required: true,
                  message: "Please input work permit start date!",
                },
              ]}
              label="Work Permit Start Date (Tööluba Alguskuupäev)"
              placeholder="Enter work permit start date"
              type="string"
              size="large"
            />
            <MyInp
              name={["tooloaDetailid", "workPermitEndDate"]}
              rules={[
                {
                  required: true,
                  message: "Please input work permit end date!",
                },
              ]}
              label="Work Permit End Date (Tööluba Lõppkuupäev)"
              placeholder="Enter work permit end date"
              type="string"
              size="large"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoadingCreateWorkPermit || isLoadingUpdateWorkPermit}
          >
            {editingWorkPermit ? "Update Work Permit" : "Add Work Permit"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default WorkPermitModal;
