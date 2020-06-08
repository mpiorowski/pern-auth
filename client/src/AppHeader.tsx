import React from "react";
import { Menu, Layout, Dropdown } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { PhoneOutlined, LogoutOutlined } from "@ant-design/icons";
import avatar from "./img/default-avatar.png";

interface Props {
  logout: () => void;
}

const AppHeader = (props: Props) => {
  let location = useLocation();

  const LeftHeaderMenu = () => {
    return (
      <Menu mode="horizontal" selectedKeys={[location.pathname]}>
        <Menu.Item key="/home">
          <NavLink to="/home">HOME</NavLink>
        </Menu.Item>
        <Menu.Item key="/forum">
          <NavLink to="/forum">FORUM</NavLink>
        </Menu.Item>
      </Menu>
    );
  };

  const RightHeaderMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <NavLink to="/contact">
            <PhoneOutlined /> Kontakt
          </NavLink>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={props.logout}>
          <NavLink to={"/login"}>
            <LogoutOutlined /> Wyloguj się
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <Layout.Header className="app-header">
      <div className={"header-menu left"}>
        <LeftHeaderMenu></LeftHeaderMenu>
      </div>
      <div className={"header-menu right"}>
        <Dropdown
          overlay={RightHeaderMenu}
          placement="bottomRight"
          trigger={["click"]}
          className={"header-dropdown"}
        >
          <div className={"header-dropdown"}>
            <img src={avatar} alt="" className={"avatar"} />
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default AppHeader;
