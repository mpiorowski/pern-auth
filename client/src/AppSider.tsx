import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useState } from "react";
import bearLogoGrey from "./img/bear-logo-grey.png";

// interface Props {}

const AppSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("siderCollapsed") === "true" || false
  );

  const onCollapse = (collapsed: boolean) => {
    localStorage.setItem("siderCollapsed", collapsed.toString());
    setCollapsed(collapsed);
  };

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      // defaultCollapsed={true}
      onCollapse={onCollapse}
      className="app-sider"
    >
      <img className={"logo"} src={bearLogoGrey} alt="" />
      <Menu defaultSelectedKeys={["1"]} mode="inline" theme={"light"}>
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />} />
      </Menu>
    </Layout.Sider>
  );
};

export default AppSider;
