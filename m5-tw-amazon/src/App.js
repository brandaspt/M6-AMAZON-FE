import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import CardSection from "./components/CardSection/CardSection"
import MyNavbar from "./components/Navbar/MyNavbar"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ItemPage from "./components/ItemPage/ItemPage"
import NewEditItem from "./components/NewEditItem/NewEditItem"

function App() {
  return (
    <Router>
      <MyNavbar />
      <Switch>
        <Route path="/product/new" exact>
          <NewEditItem />
        </Route>
        <Route path="/product/edit/:id" exact>
          <NewEditItem />
        </Route>
        <Route path="/product/:id" exact>
          <ItemPage />
        </Route>
        <Route path="/" exact>
          <CardSection />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
