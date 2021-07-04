import React, {Component} from 'react'
import GotService from "../../services/gotService"
import './itemList.css'
import Spinner from "../spinner";

export default class ItemList extends Component {

   GotService = new GotService()

   state = {
      charList: null
   }

   componentDidMount() {
      this.GotService.getAllCharacters()
         .then((charList) => {
            this.setState({
               charList
            })
         })
   }

   renderItems(arr) {
      return arr.map((item, i) => {
         return (
            <li className="list-group-item"
                key={i}
                onClick={() => this.props.onCharSelected(41 + i)}
            >
               {item.name}
            </li>
         )
      })
   }

   render() {

      const {charList} = this.state
      if (!charList) {
         return <Spinner/>
      }

      const items = this.renderItems(charList)

      return (
         <ul className="item-list list-group">
            {items}
         </ul>
      )
   }
}