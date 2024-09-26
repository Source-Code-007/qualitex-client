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
import { useEffect, useRef, useState } from "react";
import {
  useDeleteWorkPermitMutation,
  useGetAllWorkPermitQuery,
} from "../../../redux/api/workPermit/workPermitApi";
import WorkPermitDetailsModal from "../../../Components/modal/WorkPermitDetailsModal";
import WorkPermitModal from "../../../Components/modal/WorkPermitModal";
import { useReactToPrint } from "react-to-print";
import WorkPermitPDF from "../../../Components/WorkPermitPDF";

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
            <Popconfirm
              title="View the work permit"
              description="Are you sure to view and download this work permit?"
              onConfirm={() => handlePrint()}
              okText="Yes"
              onClick={() => setPrintWorkPermit(record)}
              cancelText="No"
            >
              <Button type="primary" icon={<DownloadOutlined />}>
                PDF
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Delete the work permit"
              description="Are you sure to delete this work permit?"
              onConfirm={() => handleDeleteWorkPermit(record?._id)} // Update with correct id field
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

  useEffect(() => {
    setPagination({ page: 1, limit: 10 });
  }, [searchTerm]);

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
      <WorkPermitPDF
        printWorkPermit={printWorkPermit}
        printContentRef={printContentRef}
      />
    </div>
  );
};

export default WorkPermit;
