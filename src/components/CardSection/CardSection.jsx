import { Container, Row } from "react-bootstrap"
import ItemCard from "./ItemCard"
import styles from "./cardSection.module.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { BACKEND_URL } from "../../env.js"
import FilterBar from "../FilterBar/FilterBar"
import { useCallback } from "react"

const CardSection = props => {
  const [products, setProducts] = useState([])
  const [catQuery, setCatQuery] = useState([])
  const handleChange = e => {
    if (e.currentTarget.checked) {
      setCatQuery([...catQuery, e.currentTarget.value])
    } else {
      setCatQuery([...catQuery].filter(item => item !== e.currentTarget.value))
    }
  }

  const fetchProducts = useCallback(async () => {
    const query = catQuery.length ? `?category=${catQuery.join(",")}` : ""
    const response = await fetch(BACKEND_URL + `/products${query}`)
    if (response.ok) {
      const data = await response.json()
      setProducts(data.products)
    } else {
      console.log("error occured")
    }
  }, [catQuery])

  useEffect(() => {
    fetchProducts()
  }, [catQuery, fetchProducts])

  return (
    <div>
      <div className={`${styles.topbar} d-flex align-items-center`}>
        <Container className="d-flex">
          <Link to="/product/new" className="ml-auto">
            Add New Product
          </Link>
        </Container>
      </div>
      <FilterBar onChange={handleChange} />
      <Container>
        <Row className={styles.itemRow}>
          {products.length !== 0 && products.map(p => <ItemCard key={p._id} {...p} refresh={fetchProducts} />)}
        </Row>
      </Container>
    </div>
  )
}

export default CardSection
