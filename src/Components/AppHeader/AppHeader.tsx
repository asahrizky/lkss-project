import { BellFilled, UserOutlined } from "@ant-design/icons";
function AppHeader() {
  return (
    <div className="header">
      <div className="iconHeader">
        <BellFilled style={{ fontSize: 20 }} />
        <div className="iconUser">
          <UserOutlined style={{ fontSize: 20 }} />
          <p>UserName</p>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
