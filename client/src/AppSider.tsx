import React from "react";
import { Menu, Layout } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";

interface Props {}

const AppSider: React.FC<Props> = (props: Props) => (
  <Layout.Sider
    collapsible
    //   collapsed={this.state.collapsed}
    //   onCollapse={this.onCollapse}
    className="app-sider"
  >
    <div className="logo" />
    <Menu defaultSelectedKeys={["1"]} mode="inline">
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

export default AppSider;
