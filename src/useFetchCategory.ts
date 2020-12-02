import { queryCache, useMutation, useQuery } from 'react-query';

type Category = {
  name: string;
};

const requestGetCategory = async () => {
  const res = await fetch(
    'https://product-service-indent.herokuapp.com/category'
  );
  return res.json();
};

async function requestCreateCategory (newCategory:string) {
  const response = await fetch ('https://product-service-indent.herokuapp.com/category', {
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name:newCategory})
  })
  const categories = await response.json()
  return categories

}
export default function useFetchCategory() {
  const { data: categories, status, error } = useQuery<Category[], Error>(
    'categories',
    requestGetCategory
  );

  const [createCategory] = useMutation<Category, Error, string>(requestCreateCategory, {
    onSuccess: (newCategory) => {
       queryCache.setQueryData<Category[]>("categories", (current) => [
        ...(current ? current : []),
        newCategory
      ])
      },
  })
  return { status, categories, error, createCategory};
}
