import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './hooks/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'

function App() {

  const [inputValue, setInputValue] = useState(getRandomNumber(126))

  const numberRandom = getRandomNumber(126)
  const url = `https://rickandmortyapi.com/api/location/${inputValue || 'hola'}`
  const [ location, getLocation, hasError ] = useFetch(url)

  useEffect(() => {
    getLocation()
  }, [inputValue])

  const inputSearch = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputSearch.current.value.trim())
  }

  return (
    <section>
      <h1 className='titulo'>Rick and Morty app</h1>  
       
          <form onSubmit={handleSubmit}>
           <input ref={inputSearch} type="text"  placeholder="write 1 to 126" />
           <button>Search</button>
          </form>
      
        {
          hasError
             ? <h2>❌ hey! you must provide an id from 1 to 126 😭</h2>
             : <>
              <LocationInfo
               location={location}
            />
              
                {
                  location?.residents.map(url => (
                  <ResidentCard 
                    key={url}
                    url={url}
                   />  
                 ))   
                }                
           </>
        }
        
   </section>       
  )
}

export default App
