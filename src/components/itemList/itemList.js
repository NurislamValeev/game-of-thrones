import React, {Component} from 'react'
import './itemList.css'
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage"

export default class ItemList extends Component {

   state = {
      itemList: null,
      error: false
   }

   componentDidMount() {
      const {getData} = this.props

      getData()
         .then((itemList) => {
            this.setState({
               itemList,
               error: false
            })
         })
         .catch(() => {this.onError()})
   }

   componentDidCatch() {
      this.setState({
         itemList: null,
         error: true
      })
   }

   onError(){
      this.setState({
         itemList: null,
         error: true
      })
   }

   renderItems(arr) {
      return arr.map((item, i) => {
         const {id, name} = item
         const label = this.props.renderItem(item)
         return (
            <li className="list-group-item"
                key={id}
                onClick={() => this.props.onItemSelected(i + 41)}
            >
               {label}
            </li>
         )
      })
   }

   render() {

      const {itemList, error} = this.state

      if (error) {
         return <ErrorMessage/>
      }

      if (!itemList) {
         return <Spinner/>
      }

      const items = this.renderItems(itemList)

      return (
         <ul className="item-list list-group">
            {items}
         </ul>
      )
   }
}