import { Col, Card, Button } from "react-bootstrap"
import styles from "./cardSection.module.css"
import { Link, useHistory } from "react-router-dom"
import BtnEditDelete from "./../BtnsEditDelete/BtnEditDelete"

const ItemCard = (props) => {
  const urlHistory = useHistory()

  const deleteItem = async () => {
    const response = await fetch(
      `http://localhost:4444/products/${props._id}`,
      {
        method: "DELETE",
      }
    )
    if (response.ok) {
      props.refresh()
    } else {
      console.log("error deleting")
    }
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Link to={`/product/${props._id}`} className={styles.cardLink}>
        <Card className={styles.card}>
          <Card.Img
            variant="top"
            src={
              props.cover
                ? props.cover
                : "https://m.media-amazon.com/images/I/71-6UDNkL4L._AC_UL480_FMwebp_QL65_.jpg"
            }
          />
          <Card.Body>
            <Card.Title className={styles.cardTitle}>
              <span>{props.brand}</span> {props.productName}
            </Card.Title>
            <Card.Text className={styles.cardCategory}>
              <span>Category:</span> {props.category}
            </Card.Text>
            <Card.Text className={styles.desc}>{props.description}</Card.Text>
            <div className="d-flex">
              <Card.Text className={styles.cardPrice}>
                $ {props.price}
              </Card.Text>
              <BtnEditDelete
                pushRight
                type="edit"
                callback={(e) => {
                  e.preventDefault()
                  urlHistory.push(`/product/edit/${props._id}`)
                }}
              />
              <BtnEditDelete
                type="delete"
                callback={(e) => {
                  e.preventDefault()
                  deleteItem()
                }}
              />
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  )
}

export default ItemCard
