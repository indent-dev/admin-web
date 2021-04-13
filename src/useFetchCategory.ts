import { useMutation, useQuery, useQueryClient } from 'react-query';

export type Category = {
  name: string;
  _id: string;
  isDeleted: boolean;
};

const requestGetCategory = async () => {
  const res = await fetch(`${process.env.REACT_APP_CATEGORY_URL}`);
  return res.json();
};

const requestCreateCategory = async (newCategory: string) => {
  const res = await fetch(`${process.env.REACT_APP_CATEGORY_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: newCategory }),
  });
  const categories = await res.json();
  return categories;
};
const requestEditCategory = async (variable: { name: string; id: string }) => {
  const res = await fetch(
    `${process.env.REACT_APP_CATEGORY_URL}/` + variable.id,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: variable.name }),
    }
  );
  const categories = await res.json();
  return categories;
};
const requestDeleteCategory = async (variable: {
  name: string;
  id: string;
}) => {
  const res = await fetch(
    `${process.env.REACT_APP_CATEGORY_URL}/` + variable.id,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const categories = await res.json();
  return categories;
};
export default function useFetchCategory() {
  const queryClient = useQueryClient();

  const { data, status, error } = useQuery<Category[], Error>(
    'categories',
    requestGetCategory
  );

  const {
    mutateAsync: createCategory,
    status: createCategoryStatus,
  } = useMutation<Category, Error, string>(requestCreateCategory, {
    onSuccess: (data: Category) => {
      queryClient.setQueryData<Category[]>('categories', (current) => [
        ...(current ? current : []),
        data,
      ]);
    },
  });

  const { mutateAsync: editCategory, status: editCategoryStatus } = useMutation<
    Category,
    Error,
    { name: string; id: string }
  >(requestEditCategory, {
    onSuccess: (data) => {
      queryClient.setQueryData<Category[]>('categories', (current) => {
        // const categories = [...(current ? current : [])];
        // const editedCategoryIndex = categories.findIndex((category) => {
        //   return category._id === data._id;
        // });
        // categories[editedCategoryIndex] = {
        //   _id: data._id,
        //   name: data.name,
        //   isDeleted: data.isDeleted,
        // };
        // return categories;
        return (
          current?.map((category) =>
            category._id === data._id ? data : category
          ) ?? []
        );
      });
    },
  });

  const { mutate: deleteCategory, status: deleteCategoryStatus } = useMutation<
    Category,
    Error,
    { name: string; id: string }
  >(requestDeleteCategory, {
    onSuccess: (data) => {
      queryClient.setQueryData<Category[]>('categories', (current) => {
        return (
          current?.filter((category) => {
            return category._id !== data._id;
          }) ?? []
        );
      });
    },
  });

  // () => { 5 }
  // () => { return 5 }
  // () => 5

  const categories = data?.filter((category) => {
    return !category.isDeleted;
  });

  return {
    status,
    categories,
    error,
    createCategory,
    createCategoryStatus,
    editCategory,
    editCategoryStatus,
    deleteCategory,
    deleteCategoryStatus,
  };
}
