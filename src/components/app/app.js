import React, {Component} from 'react'
import {Col, Container, Row} from 'reactstrap'
import Header from '../header'
import RandomChar from '../randomChar'
import CharacterPage from "../characterPage"
import ItemList from "../itemList"
import CharDetails from "../charDetails"
import GotService from "../../services/gotService"
import ErrorMessage from "../errorMessage";

export default class App extends Component {
   GotService = new GotService();

   state = {
      selectedChar: null,
      showRandomChar: true,
      error: false,
   }

   componentDidCatch() {
      console.log('error')
      this.setState({
         error: true
      })
   }

   toggleRandomChar = () => {
      this.setState((state) => {
         return {
            showRandomChar: !state.showRandomChar
         }
      })
   }


   render() {
      const char = this.state.showRandomChar ? <RandomChar/> : null

      if (this.state.error) {
         return <ErrorMessage/>
      }

      return (
         <>
            <Container>
               <Header/>
            </Container>
            <Container>
               <Row>
                  <Col lg={{size: 5, offset: 0}}>
                     {char}
                  </Col>
               </Row>
               <button onClick={this.toggleRandomChar} className='btn btn-primary mb-5'>Toggle random character</button>
               <CharacterPage/>
               <Row>
                  <Col md='6'>
                     <ItemList onCharSelected={this.onCharSelected}
                               getData={this.GotService.getAllBooks}
                               renderItem={(item) => item.name}/>
                  </Col>
                  <Col md='6'>
                     <CharDetails charId={this.state.selectedChar}/>
                  </Col>
               </Row>
               <Row>
                  <Col md='6'>
                     <ItemList onCharSelected={this.onCharSelected}
                               getData={this.GotService.getAllHouses}
                               renderItem={(item) => item.name}/>
                  </Col>
                  <Col md='6'>
                     <CharDetails charId={this.state.selectedChar}/>
                  </Col>
               </Row>
            </Container>
         </>
      )
   }
}
