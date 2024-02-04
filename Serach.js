// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Results } from "./Table";

// const Search = () => {
//     const [data, setData] = useState([]);
//     const [results, setResults] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("")
//     const [loading, setLoading] = useState(false)
//     const [response, setResponse] = useState(false)
//     // const getData = () => {
//     //   axios.get('https://swapi.dev/api/people/?format=json')
//     //     .then((response) => {
//     //       console.log(response);
//     //       const myData = response.data;
//     //       setData(myData);
//     //     })
//     //     .catch((error) => {
//     //       console.error('Error fetching data:', error);
//     //     });
  
  
//     // };
  
  
//     // useEffect(() => {
//     //   getData();
//     // }, [])
  
//     const searchHandler = async (e) => {
//       e.preventDefault()
//       setResults([]);
//       if (!searchQuery) {
//         return
//       }
//       setResponse(true)
//       setLoading(true)
  
//       try {
//         const response = await axios.get('https://swapi.dev/api/people/?serach-{serachQuery}')
//         const characters = response.data.results;
//         console.log(characters)
//         // await setAttributes(characters)
  
//       } catch (error) {
//         console.error("Error in Searching:", error)
//       }
//     }
  
//     // const setAttributes = async (characters) => {
  
//     //   try {
  
//     //     const promises = characters.map(async (characters) => {
//     //       characters.homeworld = await getHomeworld(characters.homeworld)
//     //       characters.films = await getfilms(characters.films)
//     //     });
//     //     const updatedCharacters = await Promise.all(promises)
//     //     setResults(updatedCharacters)
//     //     setLoading(false);
//     //     if(updatedCharacters.length ===0) {
//     //       setResponse(false)
//     //     }else{
//     //       setResponse(true)
//     //     }
  
//     //   } catch (error) {
  
//     //     console.error("Error in getting attributes:" , error)
  
//     //   }
  
//     // }
  
//     // const getHomeworld = async (homeworld) => {
//     //   try {
  
//     //     const response = await axios.get(homeworld)
//     //     return response.data.name
  
//     //   } catch (error) {
//     //     console.error("Error in Getting Homeworld:", error)
//     //   }
//     // }
  
//     // const getfilms = async (films) => {
//     //   try {
//     //     const response = await axios.get(films)
//     //     return response.data.name
//     //   } catch (error) {
//     //     console.error("Error in Getting Films:", error)
  
//     //   }
  
//     // }
//     return (
//       <>
//         <div>
//           <h3>Star wars</h3>
//         </div>
//         <div>
//           <form onSubmit={searchHandler}>
//             <input placeholder="SearchCharacter" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
//             <button>Search</button>
//           </form>
//           {!response && <p>No Results..</p>}
//           {loading && <p>Searching..</p>}
//           <Results character={results} />
//         </div>
//       </>
//     );
  
// }


// export default Search

import axios from "axios";
import { useEffect, useState } from "react";
import { Results } from "./Table";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@mui/material/Button';
import "../App.css";

const Search = () => {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://swapi.dev/api/people/?format=json');
      const characters = response.data.results;
      setData(characters);
      setError(false); // Reset error state if fetching is successful
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchHandler = async (e) => {
    e.preventDefault();
    setResults([]);
    if (!searchQuery) {
      return;
    }
    setResponse(true);
    setLoading(true);

    try {
      const response = await axios.get(`https://swapi.dev/api/people/?search=${searchQuery}`);
      const characters = response.data.results;
      setResults(characters);
      setLoading(false);
      if (characters.length === 0) {
        setResponse(false);
      } else {
        setResponse(true);
      }
    } catch (error) {
      console.error("Error in Searching:", error);
      setError(true);
    }
  };

  const handleTryAgain = () => {
    setError(false);
    fetchData();
  };

  return (
    <>
      <div>
        <h3>Star wars</h3>
      </div>
      <div>
        <form onSubmit={searchHandler}>
          <input
            placeholder="Search Character"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
          <button>Search</button>
        </form>
        {error && (
          <div>
            <p>Error fetching data. Please try again later.</p>
            <ErrorOutlineIcon />
            <Button variant="contained" onClick={handleTryAgain}>
              Try Again
            </Button>
          </div>
        )}
        {!response && !error && <p>No Results..</p>}
        {loading && !error && <p>Searching..</p>}
        {(!searchQuery && data.length > 0 && !error) && (
          <div>
            <Results character={data} />
          </div>
        )}
        {results.length > 0 && !error && (
          <div>
            <Results character={results} />
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
