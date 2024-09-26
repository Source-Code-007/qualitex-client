import { Button, Form, Input, message } from "antd";
import Container from "../Components/ui/Container";
import { RiVisaFill } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useLazyGetSingleWorkPermitQuery } from "../redux/api/workPermit/workPermitApi";
import WorkPermitPDF from "../Components/WorkPermitPDF";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [form] = Form.useForm();
  const [getSingleWorkPermit, { data, isLoading }] =
    useLazyGetSingleWorkPermitQuery();

  const handleSubmitId = async ({ lubaNr }) => {
    try {
      const workPermit = await getSingleWorkPermit(lubaNr).unwrap();
      if (workPermit.success) {
        message.success(workPermit.message);
      }
    } catch (e) {
      message.error(e.data?.message);
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

  return (
    <Container>
      {!data ? (
        <div className="my-4 mb-8 !px-[20px] sm:!px-[50px] md:!px-[110px] p-8 rounded-md border border-primary pb-[120px]">
          <div className="flex gap-2 items-center">
            <span className="bg-primary rounded-full text-white text-xl p-2">
              <RiVisaFill />
            </span>
            <h2 className="flex-1 border-b border-primary text-xl text-primary font-semibold">
              Portal of Qualitex
            </h2>
          </div>

          <Form
            form={form}
            layout="vertical"
            className="my-4"
            name="eVisaIdForm"
            //  style={{ maxWidth: 600 }}
            onFinish={handleSubmitId}
            autoComplete="off"
          >
            <Form.Item
              label="Luba Nr"
              name="lubaNr"
              rules={[{ required: true, message: "Please input your lubaNr!" }]}
            >
              <Input
                placeholder="Enter lubaNr here"
                className="w-[200px] rounded-none"
              />
            </Form.Item>

            <Button
              loading={isLoading}
              size="large"
              htmlType="submit"
              type="primary"
              className="primary-btn ml-auto"
            >
              Confirm <FaAngleRight />
            </Button>
          </Form>
        </div>
      ) : (
        <div className="my-4 mb-8 !px-[20px] sm:!px-[50px] md:!px-[110px] p-8 rounded-md border border-primary flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-bold text-xl">
              Your work permit is ready to view!
            </h2>

            <div className="flex gap-2 items-center mt-3">
              <Button
                type="primary"
                onClick={() => {
                  handlePrint();
                }}
                className="!w-[150px] mx-auto"
              >
                Print
              </Button>
            </div>
          </div>

          {/* Component to be print */}
          <WorkPermitPDF
            printWorkPermit={data?.data}
            printContentRef={printContentRef}
          />
        </div>
      )}
    </Container>
  );
};

export default Homepage;
