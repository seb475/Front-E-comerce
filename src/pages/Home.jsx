import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk, filterCategoriesThunk,filterByTermThunk} from "../store/slices/products.slice";
import { useEffect, useState } from "react";
import { Row, Col, Button, Card,InputGroup,Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
 const[searchValue,setSearchValue] = useState("")
  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get("https://e-comerce-8pno.onrender.com/categories")
      .then((resp) => setCategories(resp.data))
      .catch((error) => console.error(error));
  }, []);


  const filterByTerm = () => {
    dispatch(filterByTermThunk(searchValue));
  };

console.log(products)
  return (
  
    <div>
  <h3>Home</h3>

  
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="primary"
         onClick={() => dispatch(filterCategoriesThunk(category.id))}
        >
          {category.name}
        </Button>
      ))}
      <Button variant="dark" onClick={() => dispatch(getProductsThunk())}>
     All-The-Products
      </Button>

      <Row>
        <Col>
          <InputGroup className="my-3">
            <Form.Control
              placeholder="Product"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <InputGroup.Text
              id="basic-addon1"
              as={Button}
              onClick={filterByTerm}
            >
              🔍
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
   

      <Row xs={1} md={2} lg={3}>
        {products?.map((productsItem) => (
          <Col key={productsItem.id}>
            <Card className="card-product">
            <div className="img-wrapper">
              <Card.Img
                variant="top"
                src={productsItem.productimgs[1]?.url}
                style={{ height: 250, objectFit: "contain" }}
              />
                 <img
                  className="cover-img"
                  src={productsItem.productimgs[0]?.url}
                  
                  alt=""
                />
                
            </div>
              <Card.Body>
                <Card.Title >{productsItem.price}</Card.Title>
                <Card.Text>{productsItem.title}</Card.Text>
                <Button className="btn-d"  variant="primary" as={Link} to={`/products/${productsItem.id}`}>
                Detail
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <br />
      <p className="academlo">
      Created in 👨🏽‍💻 <a className="ac" href="https://www.academlo.com/" target="_blank"> Academlo </a> 
    </p>
    </div>
  );
};

export default Home;