import { Container, Row } from "react-bootstrap"
import ItemCard from "./ItemCard"
import styles from "./cardSection.module.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { BACKEND_URL } from "../../env.js"

const CardSection = (props) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const response = await fetch(BACKEND_URL + "/products")
    if (response.ok) {
      const data = await response.json()
      setProducts(data)
      console.log(data)
    } else {
      console.log("error occured")
    }
  }

  return (
    <div>
      <div className={`${styles.topbar} d-flex align-items-center`}>
        <Container className="d-flex">
          <Link to="/product/new" className="ml-auto">
            Add New Product
          </Link>
        </Container>
      </div>
      <Container>
        <Row className={styles.itemRow}>
          {products.length !== 0 &&
            products.map((p) => <ItemCard key={p._id} {...p} refresh={fetchProducts} />)}
        </Row>
      </Container>
    </div>
  )
}

export default CardSection
