import { Container, Form, Col, Button } from "react-bootstrap"
import { useParams } from "react-router"
import styles from "./newedititem.module.css"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

const NewEditItem = (props) => {
  const params = useParams()
  const history = useHistory()

  const [addProduct, setAddProduct] = useState(null)
  const [file, setFile] = useState(null)
  const [form, setForm] = useState({
    productName: "",
    price: "",
    category: "",
    brand: "",
    description: "",
  })

  const changeForm = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  useEffect(() => {
    if (!addProduct) {
      fetchProduct()
    }
  }, [addProduct])

  const fetchProduct = async () => {
    const response = await fetch(`http://localhost:4444/products/${params.id}`)
    if (response.ok) {
      const data = await response.json()
      setForm(data)
    } else {
      console.log("error fetching product")
    }
  }

  useEffect(() => {
    Object.keys(params).length === 0
      ? setAddProduct(true)
      : setAddProduct(false)
  }, [])

  const putProduct = async () => {
    const response = await fetch(
      `http://localhost:4444/products/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    )
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("error putting product")
    }
  }

  const postProduct = async () => {
    const response = await fetch("http://localhost:4444/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("error posting product")
    }
  }

  const setImg = async (e) => {
    const [file, ...rest] = e.target.files
    const formData = new FormData()
    formData.append("cover", file)
    setFile(formData)
  }

  const postImage = async (id) => {
    const response = await fetch(
      "http://localhost:4444/products/" + id + "/upload",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(file),
      }
    )
  }

  const handlePostPut = async (e) => {
    e.preventDefault()
    let product
    if (addProduct) {
      product = await postProduct()
    } else {
      product = await putProduct()
    }
    console.log(product)
    if (file) {
      await postImage(product._id)
    }
    history.goBack()
  }

  return (
    <Container>
      <div className={styles.form}>
        <h1 className={styles.heading}>
          {addProduct ? "Add Product" : "Edit Product"}
        </h1>
        <Form onSubmit={(e) => handlePostPut(e)}>
          <Form.Row>
            <Col xs={1}>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  className={styles.formPrice}
                  placeholder="19.99"
                  min={0}
                  max={999999}
                  value={form.price}
                  onChange={(e) => changeForm(e)}
                />
              </Form.Group>
            </Col>
            <Col xs={11}>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  placeholder="Mobile phone 3310"
                  value={form.productName}
                  onChange={(e) => changeForm(e)}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  placeholder="Mobile Phones"
                  value={form.category}
                  onChange={(e) => changeForm(e)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  placeholder="Nokia"
                  value={form.brand}
                  onChange={(e) => changeForm(e)}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Control type="file" onChange={(e) => setImg(e)} />
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Something about your product"
              rows={8}
              value={form.description}
              onChange={(e) => changeForm(e)}
            />
          </Form.Group>
          <Button type="submit">
            {addProduct ? "Add Product" : "Edit Product"}
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export default NewEditItem
