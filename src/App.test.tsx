import React from "react"
import { render, screen } from "@testing-library/react";
import App from "./App"
import userEvent from "@testing-library/user-event"
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  requestGetCategory,
  requestCreateCategory,
  requestDeleteCategory,
  requestEditCategory,
} from './useFetchCategory';

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

  const server = setupServer(
    rest.get(
      'https://product-service-indent.herokuapp.com/category',
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([
            {
              isDeleted: true,
              _id: '5fb75b51a517ff355c71f46f',
              name: 'ATK ',
              createdAt: '2020-11-20T05:59:45.536Z',
              updatedAt: '2020-12-10T08:38:26.570Z',
              __v: 0,
            },
            {
              isDeleted: true,
              _id: '5fba34e11cba4e40c88a2dfd',
              name: 'Peralatan Dapur',
              createdAt: '2020-11-22T09:52:33.682Z',
              updatedAt: '2020-12-10T08:14:49.102Z',
              __v: 0,
            },
          ])
        );
      }
    ),
  
    rest.post(
      'https://product-service-indent.herokuapp.com/category',
      (req, res, ctx) => {
        return res(ctx.json('Yollo'));
      }
    ),
  
    rest.delete(
      'https://product-service-indent.herokuapp.com/category/:id',
      (req, res, ctx) => {
        return res(
          ctx.json({
            name: 'ATK ',
            id: '5fb75b51a517ff355c71f46f',
          })
        );
      }
    ),
  
    rest.put(
      'https://product-service-indent.herokuapp.com/category/:id',
      (req, res, ctx) => {
        return res(
          ctx.json({
            name: 'Perlengkapan Sekolah',
            id: '5fba34e11cba4e40c88a2dfd',
          })
        );
      }
    )
  );

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());


it("Should Just Render The App", async () => {
    render (<App />)

    const input = screen.getByPlaceholderText("Create New Category")
    const value = "Perlengkapan Sekolah"
    userEvent.type(input,value)
    userEvent.click(screen.getByRole("button", { name:"Add Category" }))

      const getCategory = await requestGetCategory();
      expect(getCategory).toEqual([
        {
          isDeleted: true,
          _id: '5fb75b51a517ff355c71f46f',
          name: 'ATK ',
          createdAt: '2020-11-20T05:59:45.536Z',
          updatedAt: '2020-12-10T08:38:26.570Z',
          __v: 0,
        },
        {
          isDeleted: true,
          _id: '5fba34e11cba4e40c88a2dfd',
          name: 'Peralatan Dapur',
          createdAt: '2020-11-22T09:52:33.682Z',
          updatedAt: '2020-12-10T08:14:49.102Z',
          __v: 0,
        },
      ]);
    
      server.use(
        rest.get(
          'https://product-service-indent.herokuapp.com/category',
          (req, res, ctx) => {
            return res(ctx.status(404));
          }
        )
      );
      await expect(requestGetCategory()).rejects.toThrow(Error);

      const postCategory = await requestCreateCategory('Yolloo');
      expect(postCategory).toEqual('Yollo');
      
      const deleteCategory = await requestDeleteCategory({
        name: 'ATK ',
        id: '5fb75b51a517ff355c71f46f',
      });
      expect(deleteCategory).toEqual({
        name: 'ATK ',
        id: '5fb75b51a517ff355c71f46f',
      });


      const editCategory = await requestEditCategory({
        name: 'Perlengkapan Sekolah',
        id: '5fba34e11cba4e40c88a2dfd',
      });
      expect(editCategory).toEqual({
        name: 'Perlengkapan Sekolah',
        id: '5fba34e11cba4e40c88a2dfd',
      });

    userEvent.click(screen.getAllByRole("button", { name:"Edit" })[0])
    userEvent.type(screen.getByRole("textbox", { name: "Edit Category" }),"Yuhuuuu")
    userEvent.click(screen.getByRole("button", { name: "OK" }))

    userEvent.click(screen.getAllByRole("button", { name:"Edit" })[0])
    userEvent.click(screen.getByRole("button", { name: "Cancel" }))

    userEvent.click(screen.getAllByRole("button", { name:"Delete" })[0])


    screen.debug()

  })
