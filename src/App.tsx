import { Space, Layout, ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import AppFooter from "./Components/AppFooter/AppFooter";
import AppHeader from "./Components/AppHeader/AppHeader";
import PageContent from "./Components/PageContent/PageContent";
import SideMenu from "./Components/SideMenu/SideMenu";
// import TableList from "./Components/TableList";

import { localeData } from "./Utils/dayjs";

const { Content, Footer, Header, Sider } = Layout;

function App() {
  return (
    <ConfigProvider locale={localeData}>
      <QueryClientProvider client={new QueryClient()}>
        <div className="App">
          <Layout>
            <Header
              style={{
                backgroundColor: "white",
              }}
            >
              <AppHeader />
            </Header>
            <Layout>
              <Sider
                style={{
                  backgroundColor: "white",
                }}
              >
                <SideMenu />
              </Sider>

              <Content
                style={{
                  padding: "20px",
                  overflow: "auto",
                }}
              >
                <PageContent />
              </Content>
            </Layout>
          </Layout>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
