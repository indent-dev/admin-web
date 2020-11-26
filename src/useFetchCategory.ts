import { useState, useEffect } from "react"
import { message } from "antd"


type Category = {
    name: string
}

export default function useFetchCategory() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    function createCategory(categoryName: string) {
        setLoading(true)
        return new Promise((resolve, reject) => {
            fetch("https://product-service-indent.herokuapp.com/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: categoryName })
            })
                .then(response => response.json())
                .then(json => {
                    let newCategory: Category[] = [...categories, json]
                    setCategories(newCategory)
                    setLoading(false)
                    setError("")
                    message.info("Succes Bro")
                })
                .then(resolve)
                .catch((error) => {
                    setLoading(false)
                    setError(error.message)
                    message.error(error.message)
                    reject()
                })
        })

    }
    useEffect(() => {
        setLoading(true)
        fetch("https://product-service-indent.herokuapp.com/category")
            .then(response => response.json())
            .then(json => {
                setCategories(json)
                setLoading(false)
                setError("")
            })
            .catch((error) => {
                setLoading(false)
                setError(error.message)
            })
    }, [])

    return { categories, loading, error, createCategory }
}