import { Container, Form, Col, Button } from "react-bootstrap"
import { useParams } from "react-router"
import styles from "./newedititem.module.css"
import { useEffect, useState } from "react"

const NewEditItem = (props) => {
  const params = useParams()

  const [addProduct, setAddProduct] = useState(null)
  const [form, setForm] = useState({
    name: "",
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
    }
  }, [addProduct])

  useEffect(() => {
    Object.keys(params).length === 0
      ? setAddProduct(true)
      : setAddProduct(false)
  }, [])

  return (
    <Container>
      <div className={styles.form}>
        <h1 className={styles.heading}>
          {addProduct ? "Add Product" : "Edit Product"}
        </h1>
        <Form>
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
              <Form.Group controlId="name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  placeholder="Mobile phone 3310"
                  value={form.name}
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
          <Button type="submit">Add Product</Button>
        </Form>
      </div>
    </Container>
  )
}

export default NewEditItem
