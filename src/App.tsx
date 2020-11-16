import React from 'react';
import './App.css';
import { Layout } from "antd";
import { Menu } from "antd";
import "antd/dist/antd.css";
import { Table } from "antd"
import { ColumnsType } from 'antd/lib/table';

type Category = {
  name: string
}

function App() {

  const colums: ColumnsType<Category> = [
    {
      title: "No",
      render: (text, record, index: number) => {
        return index + 1
      }
    },
    {
      title: "Categories",
      dataIndex: "name",
    },
  ]
  const data: Category[] = [
    {
      name: "Pakaian Pria"
    },
    {
      name: "Komputer & Aksesories"
    },
    {
      name: "Perawatan & Kecantikan"
    },
    {
      name: "Perlengkapan Rumah"
    },
    {
      name: "Elektronik"
    },
  ]

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
        <Layout.Content>
          <Table columns={colums} dataSource={data} />
        </Layout.Content>
        <Layout.Footer>ini footer</Layout.Footer>
      </Layout>
    </Layout>
  );
}

export default App;
