import { Layout, Menu, theme } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import { MenuList } from "../../pages/ruoter/menu";
import { menu } from "../../pages/ruoter/routes";

const { Content, Footer, Sider } = Layout;
const Dashboard = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Sider breakpoint='lg' collapsedWidth='0'>
                <div className='demo-logo-vertical' />
                <Menu
                    theme='dark'
                    mode='inline'
                    defaultSelectedKeys={["4"]}
                    items={MenuList.map(
                        ({ id, title, path, children, icon }) => {
                            return {
                                key: id,
                                label: (
                                    <Link to={path} className="gap-2 flex">
                                        {icon}
                                        {title}
                                    </Link>
                                ),
                                children: children.map(
                                    ({ title, path, id }) => ({
                                        key: id,
                                        label: <Link to={path}>{title}</Link>,
                                    })
                                ),
                            };
                        }
                    )}
                />
            </Sider>
            <Layout>
                {/* <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                /> */}
                <Content
                    style={{
                        margin: "12px 16px 0",
                    }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 1000,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}>
                        <Routes>
                            {menu.map((item) => (
                                <Route
                                    key={item.id}
                                    path={item.path}
                                    element={item.element}
                                />
                            ))}
                        </Routes>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                    }}></Footer>
            </Layout>
        </Layout>
    );
};
export default Dashboard;
