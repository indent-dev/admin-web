import { queryCache, useMutation, useQuery } from 'react-query';

export type Category = {
  name: string;
  _id: string;
  isDeleted: boolean;
};

const requestGetCategory = async () => {
  const res = await fetch(
    'https://product-service-indent.herokuapp.com/category'
  );
  return res.json();
};

const requestCreateCategory = async (newCategory: string) => {
  const res = await fetch(
    'https://product-service-indent.herokuapp.com/category',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newCategory }),
    }
  );
  const categories = await res.json();
  return categories;
};
const requestEditCategory = async (variable: { name: string; id: string }) => {
  const res = await fetch(
    'https://product-service-indent.herokuapp.com/category/' + variable.id,
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
    'https://product-service-indent.herokuapp.com/category/' + variable.id,
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
  const { data, status, error } = useQuery<Category[], Error>(
    'categories',
    requestGetCategory
  );

  const [createCategory] = useMutation<Category, Error, string>(
    requestCreateCategory,
    {
      onSuccess: (newCategory) => {
        queryCache.setQueryData<Category[]>('categories', (current) => [
          ...(current ? current : []),
          newCategory,
        ]);
      },
    }
  );

  const [editCategory] = useMutation<
    Category,
    Error,
    { name: string; id: string }
  >(requestEditCategory, {
    onSuccess: (newCategory) => {
      queryCache.setQueryData<Category[]>('categories', (current) => {
        const categories = [...(current ? current : [])];
        const editedCategoryIndex = categories.findIndex((category) => {
          return category._id === newCategory._id;
        });
        categories[editedCategoryIndex] = {
          _id: newCategory._id,
          name: newCategory.name,
          isDeleted: newCategory.isDeleted,
        };
        return categories;
      });
    },
  });

  const  [deleteCategory] = useMutation<
    Category,
    Error,
    { name: string; id: string }
  >(requestDeleteCategory, {
    onMutate: (deletedCategory) => {
      const prevCategory = queryCache.getQueryData<Category[]>('categories');
      const updatedCategory = [...(prevCategory ? prevCategory : [])];
      const removeCategory = updatedCategory.filter(
        (eachCategory) => eachCategory._id !== deletedCategory.id
      );
      queryCache.setQueryData<Category[]>('categories', removeCategory);
      return () =>
        queryCache.setQueryData<Category[]>(
          'categories',
          prevCategory ? prevCategory : []
        );
    },    
    onSettled: (data, error, deletedCategory) => {
      queryCache.removeQueries(['categories', deletedCategory.id]);
      queryCache.refetchQueries('categories');
    },
  });

  const categories = data?.filter((category) => {
    return !category.isDeleted;
  });

  return {
    status,
    categories,
    error,
    createCategory,
    editCategory,
    deleteCategory,
  };
}

export {
  requestGetCategory,
  requestCreateCategory,
  requestDeleteCategory,
  requestEditCategory,
};
