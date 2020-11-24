import React, { useEffect, useState } from 'react';
import './App.css';
import Input from "./Input"
import { Menu, Table, Layout, Alert, message } from "antd";
import "antd/dist/antd.css";
import { ColumnsType } from 'antd/lib/table';

type Category = {
  name: string
}

function App() {

  const [category, setCategory] = useState<Category[]>([])

  const [error, setError] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)

  const handleAddCategory = (value: string) => {
    setLoading(true)
    fetch("https://product-service-indent.herokuapp.com/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: value })
    })
      .then(response => response.json())
      .then(json => {
        let newCategory: Category[] = [...category, json]
        setCategory(newCategory)
        setLoading(false)
        setError("")
        message.info("Succes Bro")
      })
      .then()
      .catch((error) => {
        setLoading(false)
        setError(error.message)

      })
  }
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
          <>
            {error && <Alert
              message="Fetching Failed"
              description={error}
              type="error"
              closable
            />}
            <Table columns={colums} dataSource={category} loading={loading} />
            <div style={{ width: 400 }}>
              <Input placeholder="Create New Category"
                onSubmit={handleAddCategory}
              />
            </div>
          </>
        </Layout.Content>
        <Layout.Footer>ini footer</Layout.Footer>
      </Layout>
    </Layout>
  );
}

export default App;
