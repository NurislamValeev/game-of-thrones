import React, {useState} from 'react'
import {Col, Container, Row} from 'reactstrap'
import Header from '../header'
import RandomChar from '../randomChar'
import ItemList from '../itemList'
import CharDetails from '../charDetails'

const App = () => {
   const [visible, setVisible] = useState(true)
   const [selectedChar, setSelectedChar] = useState(130)

   const toggleRandomChar = () => {
      setVisible(prev => !prev)
   }

   const onCharSelected = (id) => {
      setSelectedChar(id)
      console.log(selectedChar)

   }

   return (
      <>
         <Container>
            <Header/>
         </Container>
         <Container>
            <Row>
               <Col lg={{size: 5, offset: 0}}>
                  {visible ? <RandomChar/> : null}
               </Col>
            </Row>
            <button onClick={toggleRandomChar} className='btn btn-primary mb-5'>Toggle random character</button>
            <Row>
               <Col md='6'>
                  <ItemList onCharSelected={onCharSelected}/>
               </Col>
               <Col md='6'>
                  <CharDetails charId={selectedChar}/>
               </Col>
            </Row>
         </Container>
      </>
   )
}

export default App;