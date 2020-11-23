import React, { useEffect, useState } from 'react';
import './App.css';
import { Menu, Table, Layout, Alert } from "antd";
import "antd/dist/antd.css";
import { ColumnsType } from 'antd/lib/table';

type Category = {
  name: string
}

function App() {

  const [category, setCategory] = useState<Category[]>([])

  const [error, setError] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)

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

  useEffect(() => {
    setLoading(true)
    fetch("https://product-service-indent.herokuapp.com/category")
      .then(response => response.json())
      .then(json => {
        setCategory(json)
        setLoading(false)
        setError("")
      })
      .catch((error) => {
        setLoading(false)
        setError(error.message)

      })
  }, [])

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
          {error && <Alert
            message="Fetching Failed"
            description={error}
            type="error"
            closable
          />}

          <Table columns={colums} dataSource={category} loading={loading} />
        </Layout.Content>
        <Layout.Footer>ini footer</Layout.Footer>
      </Layout>
    </Layout>
  );
}

export default App;
