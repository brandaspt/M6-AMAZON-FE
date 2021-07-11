import { Form, Container } from "react-bootstrap"

const FilterBar = props => {
  return (
    <Container>
      <h5 className="d-inline-block">Categories:</h5>
      <Form className="d-inline-flex">
        {["Bikes", "TVs", "Smartphones", "Books"].map(cat => (
          <div key={cat} className="mx-3">
            <Form.Check type="checkbox" name={cat} label={cat} value={cat} onChange={e => props.onChange(e)} />
          </div>
        ))}
      </Form>
    </Container>
  )
}
export default FilterBar
