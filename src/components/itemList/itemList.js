import React, {Component} from 'react'
import './itemList.css'
import Spinner from '../spinner'
import GotService from "../../services/gotService"

const ItemList = (props) => {

   const renderItems = (arr) => {
      return arr.map((item) => {
         const {id} = item

         const label = props.renderItem(item)

         return (
            <li
               key={id}
               className="list-group-item"
               onClick={() => props.onItemSelected(id)}>
               {label}
            </li>
         )
      })
   }

   const {data} = props
   const items = renderItems(data)

   return (
      <ul className="item-list list-group">
         {items}
      </ul>
   )
}

const withData = (View, getData) => {
   return class extends Component {

      state = {
         data: null
      }

      componentDidMount() {
         getData()
            .then((data) => {
               this.setState({
                  data
               })
            })
      }

      render() {
         const {data} = this.state

         if (!data) {
            return <Spinner/>
         }

         return <View {...this.props} data={data}/>
      }
   }
}

const {getAllCharacters} = new GotService()
export default withData(ItemList, getAllCharacters)