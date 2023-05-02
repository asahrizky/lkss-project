import { Menu } from "antd";
import { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  IdcardOutlined,
  FileOutlined,
  BankOutlined,
  DatabaseOutlined,
  ContainerOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <Menu
      mode="inline"
      onClick={(item) => {
        navigate(item.key);
      }}
      items={[
        {
          label: "Dashboard",
          icon: <AppstoreOutlined />,
          key: "/",
        },

        {
          label: "Agenda",
          icon: <CalendarOutlined />,
          key: "/agenda",
        },
        {
          label: "Pendaftaran",
          icon: <IdcardOutlined />,
          key: "/pendaftaran",
        },
        {
          label: "Permohonan",
          icon: <FileOutlined />,
          key: "/permohonan",
          children: [
            {
              label: "Data Peserta",
              key: "/datapeserta",
            },
            {
              label: "Persiapan Uji",
              key: "/persiapanuji",
            },
            {
              label: "Input Hasil Uji",
              key: "/inputhasil",
            },
            {
              label: "Cetak Sertifikat",
              key: "/cetaksertifikat",
            },
          ],
        },
        // {
        //   label: "Laporan",
        //   icon: <ContainerOutlined />,
        //   key: "/",
        // },
        // {
        //   label: "Master Data",
        //   icon: <DatabaseOutlined />,
        //   key: "/",
        // },
        // {
        //   label: "Bank Soal",
        //   icon: <BankOutlined />,
        //   key: "/",
        // },
        // {
        //   label: "Matrix Uji Kompetensi",

        //   key: "/",
        // },
      ]}
    />
  );
}

export default SideMenu;
