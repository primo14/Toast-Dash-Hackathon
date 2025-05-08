
import { useState } from 'react';
import Nav from '../components/Nav';
import './Search.css'; // Create a CSS file for styling
import {APIProvider, Map} from '@vis.gl/react-google-maps';
const Search = () => {
const [results] = useState([
    { name: 'Garment Factory', material: 'Textiles',quantity:'500lbs',location: 'Los Angelos,USA', cost: '$300/400lb' },
    { name: 'Water Bottle Company', material: 'Plastic',quantity:'500lbs',location: 'Los Angelos,USA', cost: '$300/500lb' },
    {  name: 'Bob the Builder', material: 'Sawdust',quantity:'50lbs',location: 'Los Angelos,USA', cost: '$10/5lb' },
    {  name: 'Upa & Co.', material: 'Paper',quantity:'50lbs',location: 'Los Angelos,USA', cost: '$10/5lb' },
  ]);

  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<{ description: string }[]>([]);

  const fetchSuggestions = async (input: string) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    const apiKey = 'AIzaSyCNTXqcUhVTRxPdY-R6wvD82uijIGrn0Ew'; // Replace with your API key
    const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.predictions) {
        setSuggestions(data.predictions);
      }
    } catch ( error ) {
      console.error('Error fetching autocomplete suggestions:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
    fetchSuggestions(input);
  };


  return (
    <div className="search-page">
      <Nav /> {/* Use the reusable VerticalNav component */}
      <div className="page-content"> 
        <div className="search-header">
          <h1 className="search-title">Search for Waste</h1>
          <hr color='black' ></hr>
        </div>
      <div className="search-container">
       
        <form className="search-form">
          <label className="search-label"> Waste Category 
          <select className="search-options">
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
              <option value="food">Food</option>
            </select>
          </label>
          <label className="search-label"> Waste Product 
          <select className="search-options">
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
              <option value="food">Food</option>
            </select>
          </label>
            <label className="search-label">Waste Product
            <input
              type="text"
              className="search-input"
              placeholder="city, state, or zip code"
              value={searchInput}
              onChange={handleInputChange}
            /> </label>
            
          
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        {suggestions.length > 0 && (
            <ul className="autocomplete-suggestions">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="autocomplete-item">
                  {suggestion.description}
                  </li>
              ))}
            </ul>
          )}
        <div className="search-results">
          <div className="map-container">
           
            <APIProvider apiKey={'AIzaSyCNTXqcUhVTRxPdY-R6wvD82uijIGrn0Ew'} onLoad={() => console.log('Maps API has loaded.')}>
             <Map  defaultZoom={13} defaultCenter={ { lat: -33.860664, lng: 151.208138 } } mapId='DEMO_MAP_ID'  >
              </Map>
            </APIProvider>
              
          </div>
         
          <ul className="results-list">
          {results.map((chat, index) => (
            <li key={index} className="chat-list-item">
              <h6 className="chat-list-name">{chat.name}</h6>
              <p className="chat-list-preview">{chat.material}</p>
              <p className="chat-list-preview">{chat.location}</p>
              <p className="chat-list-preview">{chat.cost}</p>
              <div className='results-list-buttons'> 
                <button className="results-list-button">s</button>
                <button className="results-list-button">n</button>
              </div>
            </li>
          ))}
         </ul>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default Search;