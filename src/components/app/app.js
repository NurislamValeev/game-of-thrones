import React, {Component} from 'react'
import {Col, Container, Row} from 'reactstrap'
import Header from '../header'
import RandomChar from '../randomChar'
import ErrorMessage from '../errorMessage'
import {BooksItem, BooksPage, CharacterPage, HousesPage} from '../pages'
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'

import './app.css'


export default class App extends Component {

   state = {
      showRandomChar: true,
      error: false,
      selectedHouse: 20
   };

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
         <Router>
            <div className='app'>
               <Container>
                  <Header/>
               </Container>
               <Container>
                  <Row>
                     <Col lg={{size: 5, offset: 0}}>
                        {char}
                        <button
                           className="toggle-btn"
                           onClick={this.toggleRandomChar}>Toggle random character
                        </button>
                     </Col>
                  </Row>
                  <Route exact path='/'>
                     <Redirect to='/characters'/>
                  </Route>
                  <Route path='/characters' component={CharacterPage}/>
                  <Route path='/books' component={BooksPage} exact/>
                  <Route path='/books/:id' render={({match}) => {
                     const {id} = match.params
                     return <BooksItem bookId={id}/>
                  }}/>
                  <Route path='/houses' component={HousesPage}/>
               </Container>
            </div>
         </Router>
      )
   }
}