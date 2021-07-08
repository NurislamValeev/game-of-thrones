import React, {useEffect, useState} from 'react'
import './randomChar.css'
import GotService from "../../services/gotService"
import Spinner from "../spinner"
import ErrorMessage from "../errorMessage"

const RandomChar = (props) => {

   const gotService = new GotService()

   const onCharLoaded = (char) => {
      setChar(char)
      setLoading(false)
   }

   const onError = () => {
      setError(true)
      setLoading(false)
   }

   const updateChar = () => {
      console.log('update')
      const id = Math.floor(Math.random() * 140 + 25)
      gotService.getCharacter(id)
         .then(onCharLoaded)
         .catch(onError)
   }

   const [char, setChar] = useState({})
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)

   useEffect(() => {
      updateChar()
      let timerId = setInterval(updateChar, 1500)

      return () => {
         clearInterval(timerId)
      }
   }, [])

   const errorMessage = error ? <ErrorMessage/> : null
   const spinner = loading ? <Spinner/> : null
   const content = !(loading || error) ? <View char={char}/> : null

   return (
      <div className="random-block rounded">
         {errorMessage}
         {spinner}
         {content}
      </div>
   )

}

export default RandomChar

const View = ({char}) => {
   const {name, gender, born, died, culture} = char

   return (
      <>
         <h4>Random Character: {name}</h4>
         <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
               <span className="term">Gender </span>
               <span>{gender || 'No info'}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
               <span className="term">Born </span>
               <span>{born || 'No info'}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
               <span className="term">Died </span>
               <span>{died || 'No info'}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
               <span className="term">Culture </span>
               <span>{culture || 'No info'}</span>
            </li>
         </ul>
      </>
   )
}