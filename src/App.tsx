import React, { useEffect, useState } from 'react';
import './App.css';
import { Menu, Table, Layout, Alert, message, Input as AntdInput, Button } from "antd";
import "antd/dist/antd.css";
import { ColumnsType } from 'antd/lib/table';
import useFetchCategory from "./useFetchCategory"

type Category = {
  name: string
}

function App() {

  const { categories, error, loading, createCategory } = useFetchCategory()

  const [categoryName, setCategoryName] = useState("")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }

  const handleAddButtonClick = () => {
    createCategory(categoryName)
      .then(() => {
        setCategoryName("")
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
            <div style={{ width: 400, display: "flex" }}>
              <AntdInput
                placeholder="Create New Category"
                size="middle"
                value={categoryName}
                onChange={handleInputChange}
              />
              <Button type="primary" onClick={handleAddButtonClick}>Add Category</Button>
            </div>
            {error && <Alert
              message="Fetching Failed"
              description={error}
              type="error"
              closable
            />}
            <Table columns={colums} dataSource={categories} loading={loading} />
          </>
        </Layout.Content>
        <Layout.Footer>ini footer</Layout.Footer>
      </Layout>
    </Layout>
  );
}

export default App;
