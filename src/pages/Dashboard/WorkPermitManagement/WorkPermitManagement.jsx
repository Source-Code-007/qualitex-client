import {
  Button,
  Empty,
  Input,
  message,
  Popconfirm,
  Row,
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
import sigOne from "../../../assets/sig_1.png";
import sigTwo from "../../../assets/sig_2.png";
import Barcode from "react-barcode";

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
        {[1, 2, 3]?.map((elem, ind) => {
          return (
            <div
              key={ind}
              className={`absolute ${
                elem === 1
                  ? "top-[40vh]"
                  : elem === 2
                  ? "top-[140vh]"
                  : elem === 3
                  ? "top-[240vh]"
                  : elem === 4
                  ? "top-[340vh]"
                  : "top-[440vh]"
              }  flex items-center justify-center pointer-events-none`}
            >
              <img src={logo} alt="" className="opacity-15 w-4/6 mx-auto" />
            </div>
          );
        })}

        <div className="mx-[60px] py-4 space-y-3 !text-[13px]">
          {/* Header */}
          <img src={pdfHeader} alt="Qualitex" className="w-full" />
          <Row justify="end">
            {/* <Barcode
              value={
                printWorkPermit?.barcodeText ||
                `Hello, ${printWorkPermit?.tootajaTeave?.nimi}`
              }
              width={1}
              height={30}
              displayValue={false}
              af
            /> */}
            <Barcode
              value="http://github.com/kciter"
            />
            ,
          </Row>

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
            <strong>2. Töötaja Teave</strong>
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
          {/* 3. Tööandmise Detailid */}
          <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
            <strong>3. Tööandmise Detailid</strong>

            <div className="!space-y-2">
              <p>
                {" "}
                <strong>Ametikoht:</strong> <br /> Õmblusmasinate Operaator
              </p>
              <p>
                <strong>Töö Kirjeldus</strong>:<br />
                {printWorkPermit?.tooandmiseDetailid?.tooKirjeldus}
              </p>
              <br />
              <br />
              <br />
              <br /> <br /> <br /> <br /> <br /> <br /> <br />
              <p>
                <strong>Lepinguperiood:</strong> <br /> Tööleping algab{" "}
                {printWorkPermit?.tooandmiseDetailid?.contractStartDate} ja
                lõpeb {printWorkPermit?.tooandmiseDetailid?.contractEndDate}.
                See periood hõlmab katseperioodi vastavalt ettevõtte
                poliitikale.
              </p>
              <p>
                <strong>Liitumise Kuupäev:</strong>:<br />
                {printWorkPermit?.tootajaTeave?.nimi} alustab tööd{" "}
                {printWorkPermit?.tooandmiseDetailid?.contractStartDate}.
              </p>
              <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
                <strong>Palk ja Kasu:</strong>
                <div className="!pl-4 !ml-4">
                  <ul className="list-disc !space-y-2">
                    <li>
                      <strong>Kuu Palk:</strong>{" "}
                      {printWorkPermit?.tooandmiseDetailid?.palkJaKasu.kuuPalk}
                    </li>
                    <li>
                      <strong>Tervisekindlustus:</strong> Tööandja pakub
                      tervisekindlustust.
                    </li>
                    <li>
                      <strong>Majutus:</strong> Ettevõte pakub töötajale
                      majutust töölepingu kehtivuse ajal.
                    </li>
                  </ul>
                </div>
              </div>
              <p>
                <strong>Tööaeg:</strong>
                <br /> Töötaja töötab 8 tundi päevas ja 6 päeva nädalas.
                Konkreetne tööaeg määratakse vastavalt QUALITEX AS-i
                töökorraldustele ja teatatakse töötajale tööleasumise ajal.
              </p>
            </div>
          </div>
          {/* 4. Tööloa Detailid */}
          <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
            <strong>4. Tööloa Detailid</strong>
            <br />

            <div className="!space-y-2">
              <p>
                {" "}
                <strong>Väljastamise Kuupäev:</strong> <br />
                Tööloa kehtivus algab{" "}
                {printWorkPermit?.tooloaDetailid?.workPermitStartDate}.
              </p>
              <p>
                {" "}
                <strong>Loo Tüüp:</strong> <br />
                See luba on Tööluba, mis lubab{" "}
                {printWorkPermit?.tootajaTeave?.nimi}
                seaduslikult töötada ja viibida Eestis määratud perioodi
                jooksul.
              </p>
              <p>
                {" "}
                <strong>Kehtivusaeg:</strong> <br />
                Tööloa kehtivus on{" "}
                {printWorkPermit?.tooloaDetailid?.workPermitStartDate} kuni{" "}
                {printWorkPermit?.tooloaDetailid?.workPermitEndDate}. See
                periood katab algse tööhõive faasi, eeldades, et kõik
                seaduslikud ja regulatiivsed nõuded on täidetud.
              </p>

              <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
                <strong>Tingimused:</strong>
                <div className="!pl-4 !ml-4">
                  <ul className="list-disc !space-y-2">
                    <li>
                      Töötaja peab järgima kohalikke seadusi,
                      immigratsioonieeskirju ja ettevõtte poliitikaid.
                    </li>
                    <li>
                      Töötaja peab täitma oma tööülesandeid hoolikalt ja järgima
                      QUALITEX AS-i kehtestatud operatiivstandardeid.
                    </li>
                    <li>
                      Tööloa uuendamine ei ole vajalik, kuid tööleping tuleb
                      enne{" "}
                      {printWorkPermit?.tooandmiseDetailid?.contractEndDate}{" "}
                      uuendada, et tagada katkematu tööhõive.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Tööandja Deklaratsioon */}
          <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
            <strong>5. Tööandja Deklaratsioon</strong>
            <br />

            <div className="!space-y-2">
              <p>
                Mina, Kristi Täht, QUALITEX AS-i peadirektor, kinnitan, et see
                tööloa dokument on väljastatud Uzzal Miale ametikohale
                Õmblusmasinate Operaator. See luba on väljastatud esitatud ja
                täpselt täidetud teabe alusel, järgides kohalikke tööõiguse ja
                immigratsioonieeskirju. QUALITEX AS on pühendunud töötaja
                vajalike toetuste, sealhulgas tervisekindlustuse ja majutuse,
                pakkumisele, nagu on määratud töölepingus.
              </p>
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          {/* Signature */}
          <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
            <strong>Allkiri:</strong>
            <br />

            <div className="">
              <img src={sigOne} alt="signature" className="w-[125px] h-auto" />
              <img
                src={sigTwo}
                alt="signature two"
                className="w-[125px] h-auto -mt-[12px] ml-[10px]"
              />
            </div>
          </div>

          {/* 6. Märkused  */}
          <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
            <strong>6. Märkused</strong>
            <br />

            <div className="!space-y-2">
              <p>
                See tööloa dokument on kehtiv 01. augustist 2024 kuni 30.
                septembrini 2024. Töötaja peab järgima kõiki loa tingimusi.
                Tööleping lõpeb 30. oktoobril 2025, ja see tuleb enne määratud
                kuupäeva uuendada, et tagada katkematu tööhõive. Töötaja peaks
                olema teadlik kõigist täiendavatest nõuetest või
                regulatiivsetest muudatustest, mis võivad mõjutada tema tööhõive
                staatust.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkPermit;
