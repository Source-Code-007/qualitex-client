import {
  Button,
  Empty,
  Input,
  message,
  Popconfirm,
  Skeleton,
  Table,
} from "antd";
import {
  DeleteFilled,
  DownloadOutlined,
  EditFilled,
  EyeFilled,
} from "@ant-design/icons";
import { useRef, useState } from "react";
import {
  useDeleteWorkPermitMutation,
  useGetAllWorkPermitQuery,
} from "../../../redux/api/workPermit/workPermitApi";
import WorkPermitDetailsModal from "../../../Components/modal/WorkPermitDetailsModal";
import WorkPermitModal from "../../../Components/modal/WorkPermitModal";
import { useReactToPrint } from "react-to-print";
import pdfHeader from "../../../assets/pdfHeader.png";
import logo from "../../../assets/logo.png";

const WorkPermit = () => {
  const { Search } = Input;
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [searchTerm, setSearchTerm] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [editingWorkPermit, setEditingWorkPermit] = useState(null);
  const [printWorkPermit, setPrintWorkPermit] = useState(null);
  const {
    data: workPermits,
    isLoading: isLoadingWorkPermits,
    isFetching,
  } = useGetAllWorkPermitQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
  ]);
  const [deleteWorkPermit] = useDeleteWorkPermitMutation();
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState(null);

  const columns = [
    {
      title: "Luba Nr",
      dataIndex: "lubaNr",
    },
    {
      title: "Name",
      dataIndex: ["tootajaTeave", "nimi"],
    },
    {
      title: "Position",
      dataIndex: ["tooandmiseDetailid", "ametikoht"],
    },
    {
      title: "Contract Start Date",
      dataIndex: ["tooandmiseDetailid", "contractStartDate"],
      render: (text) => text,
    },
    {
      title: "Contract End Date",
      dataIndex: ["tooandmiseDetailid", "contractEndDate"],
      render: (text) => text,
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <div className="flex gap-2">
            <Button
              type="default"
              icon={<EyeFilled />}
              onClick={() => {
                setDetailsModalVisible(true);
                setEditingWorkPermit(record);
              }}
            >
              Details
            </Button>
            <Button
              type="default"
              icon={<EditFilled />}
              onClick={() => {
                setModalVisible(true);
                setEditingWorkPermit(record);
              }}
            >
              Edit
            </Button>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => {
                setPrintWorkPermit(record);
                handlePrint();
              }} //TODO:  need to show the print modal
            >
              PDF
            </Button>
            <Popconfirm
              title="Delete the work permit"
              description="Are you sure to delete this work permit?"
              onConfirm={() => handleDeleteWorkPermit(record.id)} // Update with correct id field
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteFilled />}
                loading={isLoadingDeleteId === record.id} // Update with correct id field
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleDeleteWorkPermit = async (id) => {
    setIsLoadingDeleteId(id);
    try {
      const result = await deleteWorkPermit(id).unwrap();
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e) {
      message.error(
        e?.data?.message || e.message || "Failed to delete work permit"
      );
    } finally {
      setIsLoadingDeleteId(null);
    }
  };

  const printContentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printContentRef.current,
    documentTitle: `qualitex-work-permit-${new Date().getTime()}`,
    // onBeforePrint: () => {console.log("before printing...");},
    // onAfterPrint: () => {console.log("after printing...");},
    removeAfterPrint: false,
  });

  console.log(printWorkPermit, "printWordPermit");

  return (
    <div className="p-8">
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Work Permits</h2>
        <Search
          placeholder="Search work permit by name or luba number"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px]"
        />
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add Work Permit
        </Button>
      </div>

      {isLoadingWorkPermits ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : workPermits?.meta?.total === 0 ? (
        <div className="h-[70vh] flex items-center justify-center">
          <Empty description="No work permits found!" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={workPermits?.data}
          loading={isLoadingWorkPermits || isFetching}
          pagination={{
            position: ["bottomCenter"],
            total: workPermits?.meta?.total,
            current: pagination.page,
            pageSize: pagination.limit,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}

      {/* View details work permit modal */}
      <WorkPermitDetailsModal
        detailsModalVisible={detailsModalVisible}
        setDetailsModalVisible={setDetailsModalVisible}
        workPermitData={editingWorkPermit}
      />

      {/* Create and update work permit modal */}
      <WorkPermitModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setEditingWorkPermit={setEditingWorkPermit}
        editingWorkPermit={editingWorkPermit}
      />

      {/* Component to be printed */}
      <div
        className={`bg-white min-h-screen text-black print-content-font relative`}
        id="printContent"
        ref={printContentRef}
      >
        {/* Watermark */}
        {[1, 2, 3, 4, 5]?.map((elem, ind) => {
          return (
            <div
              key={ind}
              className={`absolute ${
                elem === 1
                  ? "top-1/2 -translate-y-1/2"
                  : elem === 2
                  ? "top-[140vh]"
                  : elem === 3
                  ? "top-[240vh]"
                  : elem === 4
                  ? "top-[340vh]"
                  : "top-[440vh]"
              }  flex items-center justify-center pointer-events-none`}
            >
              <img src={logo} alt="" className="opacity-25 w-4/6 mx-auto" />
            </div>
          );
        })}
        <div className="mx-[60px] py-4 space-y-3 !text-[13px]">
          {/* Header */}
          <img src={pdfHeader} alt="Qualitex" className="w-full" />

          {/* Sub header */}
          <div className="my-4">
            <strong>Tööloa Dokument</strong>
            <p>
              <strong>Luba nr:</strong> WP-2024-7897-XYZ
            </p>
          </div>

          {/* Company data */}
          <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
            <strong>1. Tööandja Teave</strong>
            <div className="!pl-4 !ml-4">
              <ul className="list-disc !space-y-2">
                <li>
                  <strong>Ettevõtte Nimi:</strong> QUALITEX AS
                </li>
                <li>
                  <strong>Tunnusnumber:</strong> EE100129399
                </li>
                <li>
                  <strong>Aadress:</strong> Pärnu maakond, Tori vald, Sindi
                  linn, Pärnu mnt 50, 86703
                </li>
                <li>
                  <strong>Kontaktisik:</strong> Kristi Täht
                </li>
                <li>
                  <strong>Amet:</strong> Peadirektor (CEO)
                </li>
                <li>
                  <strong>E-post:</strong> kristi@qualitext.eu
                </li>
                <li>
                  <strong>Telefon:</strong> +372 5834 7790
                </li>
              </ul>
            </div>
          </div>

          {/* Employee data */}
          <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
            <strong>1. Töötaja Teave</strong>
            <div className="!pl-4 !ml-4">
              <ul className="list-disc !space-y-2">
                <li>
                  <strong>Nimi:</strong> {printWorkPermit?.tootajaTeave?.nimi}
                </li>
                <li>
                  <strong>Isa Nimi:</strong>{" "}
                  {printWorkPermit?.tootajaTeave?.isaNimi}
                </li>
                <li>
                  <strong>Emainimi:</strong>{" "}
                  {printWorkPermit?.tootajaTeave?.emainimi}
                </li>
                <li>
                  <strong>Sünnipäev:</strong>{" "}
                  {printWorkPermit?.tootajaTeave?.sunnipaev}
                </li>
                <li>
                  <strong>Passi Number:</strong>{" "}
                  {printWorkPermit?.tootajaTeave?.passiNumber}
                </li>
                <li>
                  <strong>Püsiv Aadress:</strong>{" "}
                  {printWorkPermit?.tootajaTeave?.pusivAadress}
                </li>
                <li>
                  <strong>E-post:</strong>{" "}
                  {printWorkPermit?.tootajaTeave?.ePost}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkPermit;
