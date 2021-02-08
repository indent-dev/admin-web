import React, { useState } from 'react';
import './App.css';
import {
  Menu,
  Table,
  Layout,
  Alert,
  Input as AntdInput,
  Button,
  Modal,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import useFetchCategory from './useFetchCategory';
import { Category } from './useFetchCategory';

function App() {
  const {
    categories,
    status,
    error,
    createCategory,
    editCategory,
    deleteCategory,
  } = useFetchCategory();

  const [categoryName, setCategoryName] = useState<string>('');

  const [categoryNameEdit, setCategoryNameEdit] = useState<string>('');

  const [categoryIdEdit, setCategoryIdEdit] = useState<string>('');

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [categoryDelete, setCategoryDelete] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };
  const handleAddButtonClick = () => {
    createCategory(categoryName).then(() => {
      setCategoryName('');
    });
  };
  const handleShowModal = (categoryName: string, categoryId: string) => {
    setCategoryNameEdit(categoryName);
    setCategoryIdEdit(categoryId);
    setIsModalVisible(true);
  };
  const handleOk = () => {
    editCategory({ name: categoryNameEdit, id: categoryIdEdit });
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleEditCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryNameEdit(event.target.value);
  };
  const handleDeleteCategory = (id: string) => {
    deleteCategory({ name: categoryDelete, id });
    setCategoryDelete(categoryDelete);
  };
  const colums: ColumnsType<Category> = [
    {
      title: 'No',
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: 'Categories',
      dataIndex: 'name',
    },
    {
      title: 'Edit',
      render: (text, record, index) => {
        const categoryName = categories ? categories[index].name : '';
        const categoryId = categories ? categories[index]._id : '';

        return (
          <Button
            type="primary"
            onClick={() => {
              handleShowModal(categoryName, categoryId);
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (record) => {
        return (
          <Button
            type="primary"
            onClick={() => handleDeleteCategory(record._id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider>
        <Menu mode="inline" theme="dark">
          <Menu.Item>Option 1</Menu.Item>
          <Menu.Item>Option 2</Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header>ini header</Layout.Header>
        <Layout.Content>
          <>
            <div style={{ width: 400, display: 'flex' }}>
              <AntdInput
                placeholder="Create New Category"
                size="middle"
                value={categoryName}
                onChange={handleInputChange}
              />
              <Button type="primary" onClick={handleAddButtonClick}>
                Add Category
              </Button>
            </div>
            {status === 'error' && (
              <Alert
                message="Fetching Failed"
                description={error?.message}
                type="error"
                closable
              />
            )}
            <Table
              columns={colums}
              dataSource={categories}
              loading={status === 'loading'}
            />
            <Modal
              title="Edit Category"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <AntdInput
                aria-label="Edit Category"
                type="text"
                value={categoryNameEdit}
                onChange={handleEditCategory}
              />
            </Modal>
          </>
        </Layout.Content>
        <Layout.Footer>ini footer</Layout.Footer>
      </Layout>
    </Layout>
  );
}
export default App;
