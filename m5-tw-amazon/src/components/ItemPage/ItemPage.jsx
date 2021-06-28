import { Container, Row, Col, Card } from "react-bootstrap"
import { useRouteMatch } from "react-router"
import styles from "./itempage.module.css"

const ItemPage = (props) => {
  const match = useRouteMatch()

  return (
    <Container>
      <Row className={styles.itemRow}>
        <Col xs={12} md={6} className={styles.imgCol}>
          <img
            src="https://www.image-engineering.de/content/library/technotes/2018_03_05/Formate_Video.jpg"
            alt=""
          />
        </Col>
        <Col xs={12} md={6}>
          <h3>
            Colgate Max White One Whitening Toothpaste, 5 Pack of Cavity
            Protection Fluoride Formula for Whiter Teeth, Bulk/Value Set - 5 x
            75 ml
          </h3>
          <div className="d-flex justify-content-between pr-3">
            <div>Brand: Nokia</div>
            <div>Category: Smartphones</div>
          </div>
          <div>Price: 100$</div>
          <div>
            Some very long deeeeeeeeeeeeeeeee eeeeeeeeeeee eeeeeeee
            eeeeeeeeeeeeeeeeeeee eeeeee eeeeeeeeeeescription nnnnnnnnnnnn
            nnnnnnnnnn nnnnnnnnnnnnnnn nnnnnnnnnn nnnnnnnnn
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <h2 className="text-center mt-3">Reviews</h2>
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ItemPage

const ReviewCard = (props) => {
  return (
    <Card className={styles.reviewCard}>
      <Card.Body className="d-flex">
        <div>This is some text within a card body.</div>
        <div className="ml-auto">Rate: 4/5</div>
      </Card.Body>
    </Card>
  )
}
