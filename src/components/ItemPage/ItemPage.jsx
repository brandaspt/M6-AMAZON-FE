import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"
import { useRouteMatch } from "react-router"
import styles from "./itempage.module.css"
import { useCallback, useEffect, useState } from "react"
import { BACKEND_URL } from "../../env.js"

const ItemPage = props => {
  const match = useRouteMatch()

  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState(null)

  const fetchProduct = useCallback(async () => {
    const response = await fetch(`${BACKEND_URL}/products/${match.params.id}`)
    if (response.ok) {
      const data = await response.json()
      setProduct(data)
    } else {
      console.log("error fetching product")
    }
  }, [match.params.id])

  const fetchReviews = useCallback(async () => {
    const response = await fetch(`${BACKEND_URL}/reviews/${match.params.id}`)
    if (response.ok) {
      const data = await response.json()
      setReviews(data)
    } else {
      console.log("error fetching product")
    }
  }, [match.params.id])

  useEffect(() => {
    fetchProduct()
    fetchReviews()
  }, [fetchProduct, fetchReviews])

  const deleteReview = async revId => {
    const response = await fetch(`${BACKEND_URL}/reviews/${revId}`, {
      method: "DELETE",
    })
    if (response.ok) {
      await fetchReviews()
      console.log("ok")
    } else {
      console.log("error fetching product")
    }
  }

  return (
    <Container>
      {product && (
        <>
          <Row className={styles.itemRow}>
            <Col xs={12} md={6} className={styles.imgCol}>
              <img
                src={
                  product.imageURL
                    ? product.imageURL
                    : "https://www.image-engineering.de/content/library/technotes/2018_03_05/Formate_Video.jpg"
                }
                alt=""
              />
            </Col>
            <Col xs={12} md={6}>
              <h3>{product.productName}</h3>
              <div className="d-flex justify-content-between pr-3">
                <div>Brand: {product.brand}</div>
                <div>Category: {product.category}</div>
              </div>
              <div>Price: {product.price}$</div>
              <div>{product.description}</div>
            </Col>
          </Row>
          <Row className={styles.comments}>
            <Col>
              <div>
                <h2 className="text-center mt-3">Reviews</h2>
                {reviews?.reviews && reviews.reviews.map(r => <ReviewCard key={r._id} {...r} delete={id => deleteReview(id)} />)}
                <AddReview productId={product._id} refresh={fetchReviews} />
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default ItemPage

const ReviewCard = props => {
  return (
    <Card className={styles.reviewCard} onClick={() => props.delete(props._id)}>
      <Card.Body className="d-flex">
        <div>{props.comment}</div>
        <div className="ml-auto">Rate: {props.rate}/5</div>
      </Card.Body>
    </Card>
  )
}

const AddReview = props => {
  const [comment, setComment] = useState({ comment: "", rate: 1 })

  const changeData = e => {
    setComment({ ...comment, [e.target.id]: e.target.value })
  }

  const postReview = async () => {
    const response = await fetch(`${BACKEND_URL}/reviews/${props.productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    })
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      props.refresh()
    } else {
      console.log("error posting review")
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await postReview()
  }

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Row className={styles.addCommRow}>
        <Col xs={12} md={9}>
          <Form.Control placeholder="Your comment" id="comment" value={comment.comment} onChange={e => changeData(e)} />
        </Col>
        <Col xs={6} md={1}>
          <Form.Control type="number" id="rate" placeholder={1} min={1} max={5} value={comment.rate} onChange={e => changeData(e)} />
        </Col>
        <Col xs={6} md={2} className="d-flex justify-content-end">
          <Button type="submit">Add Comment</Button>
        </Col>
      </Row>
    </Form>
  )
}
