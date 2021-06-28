import { Container, Row } from "react-bootstrap"
import ItemCard from "./ItemCard"
import styles from "./cardSection.module.css"
import { Link } from "react-router-dom"

const CardSection = (props) => {
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
          {["1", "1", "1", "1", "1"].map((i) => (
            <ItemCard
              name="3310"
              description="asdsadasdasdasdasdasd"
              brand="Nokia"
              price={100}
              category="smartphones"
              _id="1"
            />
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default CardSection
