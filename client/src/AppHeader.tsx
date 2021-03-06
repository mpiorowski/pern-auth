import React from "react";
import { Menu, Layout, Dropdown } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { PhoneOutlined, LogoutOutlined } from "@ant-design/icons";
import avatar from "./img/default-avatar.png";

interface Props {
  logout: () => void;
}

const AppHeader: React.FC<Props> = (props: Props) => {
  const location = useLocation();

  const LeftHeaderMenu = () => (
    <Menu mode="horizontal" selectedKeys={[location.pathname]}>
      <Menu.Item key="/home">
        <NavLink to="/home">CHARTS</NavLink>
      </Menu.Item>
      <Menu.Item key="/product">
        <NavLink to="/product">PRODUCT</NavLink>
      </Menu.Item>
      <Menu.Item key="/forum">
        <NavLink to="/forum">ATRRIBUTES</NavLink>
      </Menu.Item>
    </Menu>
  );

  const RightHeaderMenu = () => (
    <Menu>
      <Menu.Item>
        <NavLink to="/contact">
          <PhoneOutlined /> Contact
        </NavLink>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={props.logout}>
        <NavLink to="/login">
          <LogoutOutlined /> Log out
        </NavLink>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout.Header className="app-header">
      <div className="header-menu left">
        <LeftHeaderMenu />
      </div>
      <div className="header-menu right">
        <Dropdown overlay={RightHeaderMenu} placement="bottomRight" trigger={["click"]} className="header-dropdown">
          <div className="header-dropdown">
            <img src={avatar} alt="" className="avatar" />
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default AppHeader;
