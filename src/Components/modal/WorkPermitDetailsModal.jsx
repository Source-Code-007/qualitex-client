/* eslint-disable react/prop-types */
import { Modal } from "antd";
import moment from "moment";

const WorkPermitDetailsModal = ({
  detailsModalVisible,
  setDetailsModalVisible,
  workPermitData,
}) => {
  if (!workPermitData) {
    return null; // Return null if no work permit data is provided
  }

  const { lubaNr, tootajaTeave, tooandmiseDetailid, tooloaDetailid } =
    workPermitData || {};

  return (
    <Modal
      open={detailsModalVisible}
      onCancel={() => {
        setDetailsModalVisible(false);
      }}
      className="p-6 bg-white rounded-lg my-scrollbar max-h-[80vh] overflow-y-scroll"
      width={1000}
      footer={null}
    >
      <h3 className="text-xl font-semibold mb-4">Work Permit Details</h3>
      <p className="text-gray-800">
        <strong>Luba Number:</strong> {lubaNr}
      </p>

      {/* Employee Information Section */}
      <div className="mb-6">
        <h4 className="text-2xl font-semibold mb-4">Employee Information</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <strong className="block text-gray-800">Name:</strong>
            <p className="text-gray-600">{tootajaTeave.nimi}</p>
          </div>
          <div>
            <strong className="block text-gray-800">Father{"'"}s Name:</strong>
            <p className="text-gray-600">{tootajaTeave.isaNimi}</p>
          </div>
          <div>
            <strong className="block text-gray-800">Mother{"'"}s Name:</strong>
            <p className="text-gray-600">{tootajaTeave.emainimi}</p>
          </div>
          <div>
            <strong className="block text-gray-800">Date of Birth:</strong>
            <p className="text-gray-600">
              {tootajaTeave.sunnipaev}
            </p>
          </div>
          <div>
            <strong className="block text-gray-800">Passport Number:</strong>
            <p className="text-gray-600">{tootajaTeave.passiNumber}</p>
          </div>
          <div>
            <strong className="block text-gray-800">Permanent Address:</strong>
            <p className="text-gray-600">{tootajaTeave.pusivAadress}</p>
          </div>
          <div>
            <strong className="block text-gray-800">Email:</strong>
            <p className="text-gray-600">{tootajaTeave.ePost}</p>
          </div>
        </div>
      </div>

      {/* Employment Details Section */}
      <div className="mb-6">
        <h4 className="text-2xl font-semibold mb-4">Employment Details</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <strong className="block text-gray-800">Position:</strong>
            <p className="text-gray-600">{tooandmiseDetailid.ametikoht}</p>
          </div>
          <div>
            <strong className="block text-gray-800">Job Description:</strong>
            <p className="text-gray-600">{tooandmiseDetailid.tooKirjeldus}</p>
          </div>
          <div>
            <strong className="block text-gray-800">
              Contract Start Date:
            </strong>
            <p className="text-gray-600">
              {tooandmiseDetailid.contractStartDate}
            </p>
          </div>
          <div>
            <strong className="block text-gray-800">Contract End Date:</strong>
            <p className="text-gray-600">
              {tooandmiseDetailid.contractEndDate}
            </p>
          </div>
          <div>
            <strong className="block text-gray-800">Monthly Salary:</strong>
            <p className="text-gray-600">
              {tooandmiseDetailid.palkJaKasu.kuuPalk}
            </p>
          </div>
        </div>
      </div>

      {/* Work Permit Details Section */}
      <div className="mb-6">
        <h4 className="text-2xl font-semibold mb-4">Work Permit Details</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <strong className="block text-gray-800">
              Work Permit Start Date:
            </strong>
            <p className="text-gray-600">
              {moment(tooloaDetailid.workPermitStartDate).format("DD-MM-YYYY")}
            </p>
          </div>
          <div>
            <strong className="block text-gray-800">
              Work Permit End Date:
            </strong>
            <p className="text-gray-600">
              {moment(tooloaDetailid.workPermitEndDate).format("DD-MM-YYYY")}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WorkPermitDetailsModal