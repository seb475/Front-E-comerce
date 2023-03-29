import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row, ListGroup } from "react-bootstrap";
import { createPurchasesThunk } from "../store/slices/Purchases.slice";


const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rate, setRate] = useState(0);
  const navigate = useNavigate();



  

  useEffect(() => {
   
   
  }, [id]);

  const allproducts = useSelector((state) => state.products);
  const detail2 = allproducts.find((product) => product.id === Number(id));
  const productRelated = allproducts.filter(
    (product) => product.category.name === detail2.category.name
  );


console.log(detail2)


  const addToPurchases = () => {
    const token = localStorage.getItem("token");

    if (token) {
      
      const product = {
        id: detail2.id,
        quantity: rate
      };

      dispatch(createPurchasesThunk(product));
    } else {
 
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>{detail2?.title}</h1>
      <p>By: {detail2?.description}</p>
      <p>{detail2?.price}</p>
      <Button className="mb-3" onClick={addToPurchases}>
        Add To Cart 🛒
      </Button>
      <div className="mb-3">
        <Button onClick={() => setRate(rate - 1)}>-</Button>
        {rate}
        <Button onClick={() => setRate(rate + 1)}>+</Button>
      </div>
      <Row>
        <Col lg={9}>
          <img src={detail2?.productimgs[1]?.url} alt="" />
          <p>{detail2?.description}</p>
          {detail2?.body?.map((p) => (
            <p key={p.id}> {p.paragraph} </p>
          ))}
        </Col>

        <Col lg="3">
          <h3>Releated Products</h3>

          <ListGroup>
            {productRelated?.map((productItem) => (
              <ListGroup.Item key={productItem.id}>
                {productItem.title}
               
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail ;

