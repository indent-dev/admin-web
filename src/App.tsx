import React from 'react';
import './App.css';
import { Layout } from 'antd';

function App() {
  return (
    <div className="App">
      <Layout>
        <Layout>
          <Layout.Sider>ini sider</Layout.Sider>
        </Layout>
        <Layout.Header>ini header</Layout.Header>
        <Layout.Content>ini content</Layout.Content>
        <Layout.Footer>ini footer</Layout.Footer>
      </Layout>
    </div>
  );
}

export default App;
