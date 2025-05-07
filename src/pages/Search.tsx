
import Nav from '../components/Nav';
import './Search.css'; // Create a CSS file for styling
import {APIProvider, Map} from '@vis.gl/react-google-maps';
const Search = () => {
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
            
            /> </label>
            
          
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        <div className="search-results">
          <div className="map-container">
           
            <APIProvider apiKey={'AIzaSyCNTXqcUhVTRxPdY-R6wvD82uijIGrn0Ew'} onLoad={() => console.log('Maps API has loaded.')}>
             <Map  defaultZoom={13} defaultCenter={ { lat: -33.860664, lng: 151.208138 } } mapId='DEMO_MAP_ID'  >
              </Map>
            </APIProvider>
              
          </div>
          <div className="results-list">
            <ul>
              <li>Result 1</li>
              <li>Result 2</li>
              <li>Result 3</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default Search;