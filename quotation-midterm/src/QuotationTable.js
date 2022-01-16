import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

import { FaTrash } from 'react-icons/fa';


const styles = {
  textCenter: { textAlign: "center" },
  textRight: { textAlign: "right" },
};

function QuotationTable({ data, setDataItems }) {
  const [dataRows, setDataRows] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  
  useEffect(() => {
   
    let sum = 0;
    let discnt = 0;
    
    
    const z = data.map((v, i) => {
      let totalItem = (v.qty*v.ppu);
      let amount = totalItem-v.discount;
      discnt = discnt - v.discount ;
      
      if (totalItem < v.discount){
        amount = 0;
        data.splice(i,1);
        setDataItems([...data]);
        alert("Invalid discount please enter discount less than" + totalItem);
      
      }
      
      sum += amount;
      
     
      
      
      return (
        
        <tr key={i}>
          <td><FaTrash onClick={() => deleteClick(i)}/></td>
          <td style={styles.textCenter}>{v.qty}</td>
          <td>{v.item}</td>
          <td style={styles.textRight}>{numberWithCommas(v.ppu)}</td>
          <td style={{textAlign: 'right', color:'red'}}>{-Math.abs(v.discount)}</td>
          <td style={styles.textRight}>{numberWithCommas(amount)}</td>
        </tr>
      );
    });

    setDataRows(z);
    setTotalPrice(sum);
    
    setTotalDiscount(discnt);
  }, [data]);

  const deleteClick = (i) => {
    data.splice(i,1)
    setDataItems([...data])
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const clearTable = () => {
    setDataItems([]);
    setDataRows([]);
  };

  
  return (
    <Container>
      <Row>
        <Col>
          <h1>Quotation</h1>
        </Col>
        <Col style={styles.textRight}>
          <Button onClick={clearTable} style={{backgroundColor:'#0F4C81'}}variant="dark">
            Clear
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr style={{color:'#ffff',backgroundColor:'#0F4C81'}}>
            <th></th>
            <th style={{textAlign:'center'}}>Qty</th>
            <th style={{textAlign:'center'}}>Item</th>
            <th style={{textAlign:'center'}}>Price/Unit</th>
            <th style={{textAlign:'center'}}>Discount</th>
            <th style={{textAlign:'center'}}>Amount</th>
          </tr>
        </thead>
        <tbody style={{borderRadius:"10px"}}>{dataRows}</tbody>
        <tfoot>
          <tr>
            <th colSpan={3}></th>
            <th style={styles.textCenter}>Total</th>
            <th style={{textAlign:'right',color: 'red'}}>{numberWithCommas(totalDiscount)}</th>
            <th style={styles.textRight}>{numberWithCommas(totalPrice)}</th>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

export default QuotationTable;