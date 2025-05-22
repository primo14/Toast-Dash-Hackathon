
import { useState,useRef, useEffect } from 'react';
import PageContent from '../Page-Content.module.css'
import Nav from '../../components/Nav'; // Import your Nav component
import'./Search.css'; // Rename the import to avoid conflict
import {APIProvider, Map, AdvancedMarker, Pin, type MapEvent} from '@vis.gl/react-google-maps';
import materials from '../../assets/materials.json';
import materials_categories from '../../assets/materials_category.json';



const Search = () => {

  const [position,setPosition] = useState({lat: 36.778259,  lng: -119.417931});
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<{ distance: number; placeId: string, mainText:string, secondaryText:string }[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');

  const isSearchUpdate = useRef(false);

  const producers =
   [{ name: 'Garment Factory', material: 'Linen scraps',quantity:'500lbs',location: 'Los Angeles,USA', cost: '$300/400lb', latlng: {lat: 34.052635,lng: -118.8436878},distance:"" },
    { name: 'Water Bottle Company', material: 'Paper pulp waste',quantity:'500lbs',location: 'Los Angeles,USA', cost: '$300/500lb' ,latlng: {lat: 34.0543235,lng: -118.24838},distance:""},
    {  name: 'Bob the Builder', material: 'Sawdust (pine, oak, maple, etc.)',quantity:'50lbs',location: 'Los Angeles,USA', cost: '$10/5lb',latlng: {lat: 34.052235,lng: -118.1499838},distance:"" },
    {  name: 'Upa & Co.', material: 'Paper pulp waste',quantity:'50lbs',location: 'Los Angeles,USA', cost: '$10/5lb',latlng: {lat: 34.852775,lng: -118.2436838},distance:"" },
    
    { name: 'Vancouver Garment Factory', material: 'Linen scraps', quantity: '500lbs', location: 'Vancouver, Canada', cost: '$300/400lb', latlng: { lat: 49.282729, lng: -123.120738 }, distance:"" },
    { name: 'BC Water Bottle Company', material: 'Plastic', quantity: '500lbs', location: 'Vancouver, Canada', cost: '$300/500lb', latlng: { lat: 49.283764, lng: -123.115356 },distance:"" },
    { name: 'Builder Bob BC', material: 'Sawdust (pine, oak, maple, etc.)', quantity: '50lbs', location: 'Surrey, Canada', cost: '$10/5lb', latlng: { lat: 49.191347, lng: -122.849012 },distance:"" },
    { name: 'Upa & Co. BC', material: 'Paper pulp waste', quantity: '50lbs', location: 'Richmond, Canada', cost: '$10/5lb', latlng: { lat: 49.166589, lng: -123.133569 },distance:"" },
  
 
  ];
  const [results,setResults] = useState<{ name: string; material: string, quantity:string, location:string, cost:string , latlng:{lat:number,lng:number}}[]>([]);
  
  useEffect(() => {
    // Mark this as a programmatic update
   
    // Reset after the next render cycle
    const timer = setTimeout(() => {
      isSearchUpdate.current = false;
    }, 100);
    return () => clearTimeout(timer);
  }, [isSearchUpdate]);

  
  function calculateDistance(lat1:number, lon1:number, lat2:number, lon2:number, unit = 'km') {
    // Earth's radius in kilometers
    const earthRadius = 6371;
    
    // Convert latitude and longitude from degrees to radians
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    
    // Haversine formula
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = earthRadius * c;
    
    // Convert to miles if specified
    if (unit === 'mi') {
      distance *= 0.621371;
    }
    
    return distance;
  }
  function loadLatLng(mainText:String,secondary_text:String) {
    const endpoint = `/api/geocode/json?address=${encodeURIComponent(
      mainText.split(' ').join('+').concat(secondary_text.split(' ').join('+'))
    )}&key=AIzaSyCNTXqcUhVTRxPdY-R6wvD82uijIGrn0Ew`;
  
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        if (data.results ) {
          console.log('Geocode data:', data.results);
          const lat = data.results[0].geometry.location.lat;
          const lng = data.results[0].geometry.location.lng;
          setSelectedPosition({lat,lng});
          console.log('Position updated:', { lat, lng });
        }
      })
      .catch((error) => {
        console.error('Error fetching autocomplete suggestions:', error);
      });

  }
  async function loadPredictions(input: string, position: google.maps.LatLngLiteral) {
    const endpoint = `/api/autocomplete/json?input=${encodeURIComponent(
      input
    )}&location=${position.lat},${position.lng}&radius=500&key=AIzaSyCNTXqcUhVTRxPdY-R6wvD82uijIGrn0Ew`;
  
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.predictions) {
        setSuggestions(
          data.predictions.map((prediction: any) => ({
            description: prediction.description,
            placeId: prediction.place_id,
            mainText: prediction.structured_formatting.main_text,
            secondaryText: prediction.structured_formatting.secondary_text
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error);
    }
  }

 
 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
    loadPredictions(input,position);
  };
  const handleSuggestionClick = (mainText: string, secondaryText: string) => {
    setSearchInput(mainText);
    loadLatLng(mainText, secondaryText);
    setSuggestions([]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResults([]); // Clear previous results
    if (selectedPosition) {
      setPosition(selectedPosition); // Update the map position
    }
    
  producers.forEach((producer) => {

      if(producer.material === selectedMaterial) {
        setResults((prevResults) => [...prevResults, producer]);
      }
    });
    console.log(results)
  }
const handleCategorySelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedCategory( e.target.value);
  console.log('Selected category:', selectedCategory);
  // You can also filter the results based on the selected category here

}

const handleMaterialSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedMaterial( e.target.value);
  // You can also filter the results based on the selected category here

}
  function handleMapMove(e: MapEvent<unknown>): void {
    isSearchUpdate.current = true; // Mark this as a programmatic update
    const newPosition = e.map.getCenter();
    if(newPosition) {
       setPosition({ lat: newPosition.lat(), lng: newPosition.lng() });
    console.log('Map moved to:', { lat: newPosition.lat(), lng: newPosition.lng() });
    }
   
  }

  return (
    <div className="search-page">
      <Nav /> {/* Use the reusable VerticalNav component */}
      <div className={PageContent['page-content']} >
        <div className={PageContent['page-header']}>
          <h1 className={PageContent['page-title']}>Search for Waste</h1>
          <hr className={PageContent['title-divider']} />
        </div>
        <div className="search-container">
        
          <form className="search-form" onSubmit={handleFormSubmit}>
            <label className="search-label"> Waste Category 
            <select className="search-options" onInput={handleCategorySelected} aria-placeholder='Select Category' defaultValue={'Select Category'} >
              <option value="Select Category" disabled>Select Category</option>
              {materials_categories.categories.map((category:string) => (
                <option  value={category}>
                  {category}
                </option>
              ))}
                
              </select>
            </label>
            <label className="search-label"> Waste Product 
              <select className="search-options" onInput={handleMaterialSelected} aria-placeholder='Select Material' defaultValue={'Select Material'} >
                <option value="Select Material" disabled>Select Material</option>
                {selectedCategory && materials[selectedCategory as keyof typeof materials] && materials[selectedCategory as keyof typeof materials].map((material: string) => (
                  <option value={material} key={material} >
                    {material}
                  </option>
                ))}
              </select>
            </label>
            <label className="search-label">Location
              <input
                type="text"
                className="search-input"
                placeholder="city, state, or zip code"
                value={searchInput}
                onChange={handleInputChange}/> 
          
              
              {suggestions.length > 0 && (
              <ul className="autocomplete-suggestions">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="autocomplete-item" 
                  onClick={() => handleSuggestionClick(suggestion.mainText, suggestion.secondaryText)}
                  >
                    <strong>{suggestion.mainText}</strong>
                    <small> - {suggestion.secondaryText}</small>
                  </li>
                ))}
              </ul>
            )} </label>
            <button type="submit" className="search-button" >           
              Search
            </button>
          </form>
          
          <div className="search-results">
            <div className="map-container">
            
              <APIProvider apiKey={'AIzaSyCNTXqcUhVTRxPdY-R6wvD82uijIGrn0Ew'} onLoad={() => console.log('Maps API has loaded.')}>
              <Map  defaultZoom={8.5} 
              defaultCenter={ position } 
              center = {position} 
              mapId='18c06d07085bfa77372f9448' 
              draggableCursor="grab" 
              onDragend={handleMapMove}
              cameraControl={true} gestureHandling="cooperative" >
                </Map>
                <AdvancedMarker
                  position={position} >
                  <Pin
                    background={'#283818'}
                    borderColor={'#D78B30'}
                    glyphColor={'#FFFFFF'}
                    scale={2}
                    />

                  </AdvancedMarker>
                  {results.map((chat, index) => (
                    <AdvancedMarker
                      key={index}
                      position={chat.latlng}  >
                      <Pin
                        background={'#D78B30'}
                        borderColor={'#D78B30'}
                        glyphColor={'#FFFFFF'}
                        
                        />
                    </AdvancedMarker>
                  ))}
              </APIProvider>
                
            </div>
          
            <ul className="results-list">
              {results.filter((result) => {
                const distance = calculateDistance(
                  position.lat,
                  position.lng,
                  result.latlng.lat,
                  result.latlng.lng
                );
                return distance <= 300; // Only include results within 300km
              }).length === 0 ? (
                <p className="no-results-message">No producers in the area.</p>
              ) : (
                results
                  .filter((result) => {
                    const distance = calculateDistance(
                      position.lat,
                      position.lng,
                      result.latlng.lat,
                      result.latlng.lng
                    );
                    return distance <= 300; // Only include results within 300km
                  })
                  .map((result, index) => {
                    const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
                      const imgElement = e.currentTarget.querySelector('img');
                      if (imgElement) {
                        const currentSrc = imgElement.getAttribute('src');
                        const newSrc =
                          currentSrc === 'src/assets/unopened_bookmark_icon.png'
                            ? 'src/assets/saved_bookmark_icon.png'
                            : 'src/assets/unopened_bookmark_icon.png';
                        imgElement.setAttribute('src', newSrc); // Toggle the icon
                      }
                    };

                    return (
                      <li key={index} className="result-list-item">
                        <img src="/pin.png" alt="Pin" className="chat-list-image" style={{marginTop:'20px'}}/>
                        <div style={{marginLeft: '45px',marginTop:'-30px'}}>
                        <h6 className="chat-list-name">{result.name}</h6>
                        <p className="chat-list-preview">{result.material}</p>
                        <p className="chat-list-preview">{result.location}</p>
                        <p className="chat-list-preview">{result.cost}</p>
                        <div className="results-list-buttons">
                          {/* Image button for messaging */}
                          <button className="results-list-message">
                            <img src="/message_icon.png" alt="Message" className="message-icon" />
                          </button>
                          {/* Image button for saving */}
                          <button className="results-list-save" onClick={handleSaveClick}>
                            <img
                              src="src/assets/unopened_bookmark_icon.png"
                              alt="Unsaved"
                              className="save-icon"
                            />
                          </button>
                        </div>
                        </div>
                        
                      </li>
                    );
                  })
              )}
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Search;

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
