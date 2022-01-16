import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import QuotationTable from "./QuotationTable";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useLocalStorage from 'react-localstorage-hook'
import { FaBullseye } from "react-icons/fa";

function App() {

  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  //const [dataItems, setDataItems] = useState([]);
  const [dataItems, setDataItems] = useLocalStorage("dataItems",[]);
 
  const dummyProductList = [
    { id: "p001", name: 'Burger', price: 259 },
    { id: "p002", name: "French Fries", price: 80 },
    { id: "p003", name: "Ice Cream", price: 20 },
    { id: "p004", name: "Coca Cola", price: 35 },
  ];

  const addItem = () => {
  
    if (itemRef.current.value == "") {
      alert("Item name is empty");
      
      return;  
         
    } 

    // if (dataItems.length > 0){
    //   dataItems.forEach((obj) => {
        
    //     if ( product.name == obj.item && ppuRef.current.value == obj.ppu){
    //         //dataItems.push({ ...obj })
    //       // obj.discount -= discountRef.current.value;
    //       // obj.qty += qtyRef.current.value ;
    //       //dataItems.push(itemObj);
          
    //       obj.discount =  parseInt(obj.discount) - (-discountRef.current.value);
    //       return false;
    //       //dataItems.obj = parseInt(obj.qty) + parseInt(qtyRef.current.value);
    //        //setDataItems([...obj])
    //       //throw console.error("break");
    //       //dataItems[obj].push(obj)
    //       //setDataItems(obj)
        
        
    //     }
    //     return false;
        
    //   });
      
    
    // }
    // if (true){
     
    //   dataItems.push(itemObj)
    //   //return true;

    // }
    
    
    
   

    const pid = itemRef.current.value;
    const product = dummyProductList.find((e) => e.id === pid);

    var itemObj = {
      pid: pid,
      item: product.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      discount: discountRef.current.value,

      
    }; 

    

     dataItems.push(itemObj);
     setDataItems([...dataItems]);  
  
  };

  const productChange = (e) => {
    const pid = itemRef.current.value;
    const product = dummyProductList.find((e) => e.id === pid);
    ppuRef.current.value = product.price
  }

  const options = dummyProductList.map((v) => {
    return <option value={v.id}>{v.name}</option>;
  });

  return (
    <Container style={{marginTop:'50px'}}>
      <Row>
        <Col xs={5} style={{ backgroundColor: "#9FB7CD", borderRadius:"10px" }}>
          <Form>
            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label >Item</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={itemRef}
                onChange={productChange}
              >
                {options}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price Per Unit"
                ref={ppuRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formQauntity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" placeholder="Quantity" ref={qtyRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" placeholder="Discount" ref={discountRef} />
            </Form.Group>


            <Button variant="outline-dark" onClick={addItem}>
              Add
            </Button>
          </Form>
        </Col>
        <Col>
          <QuotationTable data={dataItems} setDataItems={setDataItems} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
