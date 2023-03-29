import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";
import getConfig from "../utils/getConfig";

const SideBar = ({ show, handleClose }) => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios
      .get("https://e-comerce-8pno.onrender.com/cart", getConfig())
      .then((resp) => {
        setPurchases(resp.data);
        console.log(resp.data);
      })
      .catch((error) => console.error(error));
  }, [show]);

  const checkoutCart = () => {
    axios
      .post("https://e-comerce-8pno.onrender.com/purchases",
        {
          street: "Green St. 1456",
          colony: "Southwest",
          zipCode: 12345,
          city: "USA",
          references: "Some references"
        },
        getConfig()
      )
      .then((resp) => setPurchases([]))
      .catch((error) => console.error(error));
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement={"end"}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {purchases.length !== 0 ? (
          purchases?.map((product) => <h5 key={product?.title}>{product?.title}</h5>)
        ) : (
          <h2>No hay productos seleccionados</h2>
        )}

        <Button onClick={checkoutCart} disabled={purchases.length === 0}>
          Checkout
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;