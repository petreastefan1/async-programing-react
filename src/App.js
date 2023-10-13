
import { useEffect, useState } from "react"
import Spinner from 'react-bootstrap/Spinner';


function App() {



  let [breeds, setBreeds] = useState([]);

  let [image, setImage] = useState("");

  let [selectBreed, setSelectBreed] = useState("");

  useEffect(() => {
    setTimeout(() => {
      getAllBreeds();
    }, 1000)
  }, [])

  let getAllBreeds = () => {

    fetch("https://dog.ceo/api/breeds/list/all")
      .then(data => {
        return data.json();
      })
      .then(res => {
        let aux = [];
        for (let data in res.message) {
          aux.push(data);
        }
        setBreeds(aux);
      })
  }

  let generateImage = (breed) => {

    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then(data => {

        return data.json();
      })
      .then(data => {
        setImage(data.message);
      })


  }


  function BasicExample() {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }



  let handleChange = (event) => {
    let obj = event.target;
    setSelectBreed(obj.value);
    generateImage(obj.value);
  }



  return (
    <>
      <header>
        <h1 class="logo">DoggoSelect</h1>
      </header>
      {
        breeds.length == 0 && (
          BasicExample()
        )
      }
      <div class="container">
        <label for="breeds">Select a Breed</label>
        <select class="u-full-width" id="breeds" onChange={handleChange}>
          {
            breeds.length > 0 && ( breeds.map(breed => <option>{breed}</option>))
          }
        </select>
        <div class="card">
          {
            image != "" && (<img src={image}></img>)
          }
          <p onClick={() => { generateImage(selectBreed) }} >Click to see more!</p>
        </div>
      </div>
    </>
  );
}

export default App;
