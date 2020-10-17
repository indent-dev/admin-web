import React from 'react';
import './App.css';
import { Layout } from "antd";
import { Menu } from "antd";
import "antd/dist/antd.css";

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider>
        <Menu
          mode="inline"
          theme="dark"
        >
          <Menu.Item>Option 1</Menu.Item>
          <Menu.Item>Option 2</Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header>ini header</Layout.Header>
        <Layout.Content>ini content</Layout.Content>
        <Layout.Footer>ini footer</Layout.Footer>
      </Layout>
    </Layout>
  );
}

export default App;
