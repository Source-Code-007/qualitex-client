import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaClock, FaHome } from "react-icons/fa";
import { Layout, Menu } from "antd";
import moment from "moment";
import logo from "../assets/logo.png";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const DashboardLayout = () => {
  const [time, setTime] = useState(null);
  const navigate = useNavigate();

  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("LTS"));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const items = [getItem("Dashboard", "/dashboard", <FaHome />)];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        breakpoint="lg"
        collapsedWidth="0"
        className="!h-screen !sticky !top-0"
        theme="light"
      >
        <Menu theme="light">
          <div>
            <div className=" flex justify-center mt-5">
              <Link to={"/"}>
                <img
                  src={logo}
                  alt="Qualitex"
                  className="inline-block !w-[150px] h-auto !mt-[8px]"
                />
              </Link>
            </div>
          </div>
        </Menu>

        <div className="demo-logo-vertical" />

        <Menu
          onClick={({ key }) => {
            key ? navigate(key) : navigate("/dashboard");
          }}
          theme="light"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          className="py-6"
          items={items}
        />
      </Sider>

      <Layout
      // style={{
      //   marginLeft: 200,
      // }}
      >
        <Content>
          <div
            style={{
              padding: 0,
              minHeight: 360,
              // background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
