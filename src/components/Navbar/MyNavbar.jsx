import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap"
import styles from "./mynavbar.module.css"
import { Link } from "react-router-dom"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { GiHamburgerMenu } from "react-icons/gi"
import { BsSearch } from "react-icons/bs"

const subNavBtns = [
  "Best Sellers",
  "Prime Video",
  "New Releases",
  "Customer Service",
  "Prime",
  "Gift Ideas",
  "Books",
  "Vouchers",
  "Home & Garden",
  "Fashion",
  "Electronics",
  "Gift Cards & Top Up",
  "PC",
  "PC & Video Games",
]

const MyNavbar = props => {
  return (
    <div>
      <Navbar variant="dark" className={styles.navbar}>
        <Navbar.Brand as={Link} to="/" className="d-flex">
          <img className={styles.logo} src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
          <div className={styles.logoText}>.co.uk</div>
        </Navbar.Brand>
        <div className={`${styles.addressBlock} d-flex`}>
          <div className="d-flex align-items-center">
            <HiOutlineLocationMarker size="25px" />
          </div>
          <div>
            <p>Hello</p>
            <p>Select your address</p>
          </div>
        </div>
        <Form inline className={styles.searchForm}>
          <FormControl type="text" placeholder="Search" className="w-100" />
          <Button variant="outline-info">
            <BsSearch size="20px" />
          </Button>
        </Form>
        <div className={styles.flag}>
          <img src="https://cdn.britannica.com/25/4825-004-F1975B92/Flag-United-Kingdom.jpg" alt="" />
        </div>
        <div className={styles.account}>
          <div>Hello, Sign in</div>
          <div>Account & Lists</div>
        </div>
        <div className={styles.account}>
          <div>Returns</div>
          <div>& Orders</div>
        </div>
        <div className={styles.account}>
          <div>Basket</div>
        </div>
      </Navbar>
      <SubNav />
    </div>
  )
}

export default MyNavbar

const SubNavBtn = props => (
  <a className={`${styles.navLinkBtn} my-auto mx-2 ${props.className}`} href="/">
    {props.text}
  </a>
)

const SubNav = props => {
  return (
    <div className={styles.subnav}>
      <div className="d-flex">
        <Nav.Link bsPrefix={styles.subnavBurger}>
          <div className="d-flex align-items-center">
            <GiHamburgerMenu size="22px" />
            <span>All</span>
          </div>
        </Nav.Link>
        <div className="d-flex align-items-center mr-auto">
          {subNavBtns.map((text, idx) => (
            <SubNavBtn
              key={idx}
              text={text}
              className={`d-none ${idx > 4 && idx < 8 && "d-md-block"} ${idx >= 8 && idx < 13 && "d-lg-block"}`}
            />
          ))}
        </div>
        <div className={styles.imgBlock}>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/02/Gateway/NPA/Deals_SWM._CB485930216_.png" alt="" />
        </div>
      </div>
    </div>
  )
}
