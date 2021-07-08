import React, {useEffect, useState} from 'react'
import './itemList.css'
import Spinner from '../spinner'

const ItemList = (props) => {

   const [itemList, setItemList] = useState([])

   useEffect(() => {
      props.getData()
         .then((data) => {
            setItemList(data)
         })
   }, [])

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

   if (!itemList) {
      return <Spinner/>
   }

   const items = renderItems(itemList)

   return (
      <ul className="item-list list-group">
         {items}
      </ul>
   )
}

export default ItemList