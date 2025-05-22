import { useState, type FormEvent } from "react";
import Nav from '../../components/Nav';
import PageContent from '../Page-Content.module.css'
import "./My_Listings.css"; // Import your CSS file for styling
const My_Listings = () => {
  const [newSearch, setSearch] = useState('');
  const listing_paper1 = {
    'Type of waste': 'Paper Pulp',
    'Company_Name': 'EcoPaper Mills',
    'Location': 'Portland',
    'Quantity': '300lbs',
    'Price': '12lb/$',
    'Additional Notes': 'Clean, post-consumer paper pulp waste'
  };
  const listing_paper2 = {
    'Type of waste': 'Paper Pulp',
    'Company_Name': 'Green Sheets',
    'Location': 'Denver',
    'Quantity': '150lbs',
    'Price': '11lb/$',
    'Additional Notes': 'Mixed office paper pulp'
  };
  const listing_paper3 = {
    'Type of waste': 'Paper Pulp',
    'Company_Name': 'RecycleRight',
    'Location': 'Boston',
    'Quantity': '200lbs',
    'Price': '10lb/$',
    'Additional Notes': 'Shredded and pulped newspaper'
  };
  const listing_plastic1 = {
    'Type of waste': 'Plastic',
    'Company_Name': 'Waste Out',
    'Location': 'New York',
    'Quantity': '100lbs',
    'Price': '10lb/$',
    'Additional Notes': 'Plastic waste from factory'
  };
  const listing_plastic2 = {
    'Type of waste': 'Plastic',
    'Company_Name': 'PlastiCycle',
    'Location': 'Chicago',
    'Quantity': '250lbs',
    'Price': '9lb/$',
    'Additional Notes': 'Assorted plastic bottles and containers'
  };
  const listing_example = {
    'Type of waste': 'Organic',
    'Company_Name': 'Compost Crew',
    'Location': 'Seattle',
    'Quantity': '500lbs',
    'Price': '2lb/$',
    'Additional Notes': 'Food scraps and yard waste'
  };

  const [savedListings, setSavedListings] = useState([
    listing_paper1,
    listing_paper2,
    listing_paper3,
    listing_plastic1,
    listing_plastic2,
    listing_example
  ]);

  function handleSendMessage(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="my-listing-page"> 
      <Nav />
      <div className={PageContent['page-content']}>
        <div className={PageContent['page-header']}>
          <h1 className={PageContent['page-title']}>Saved Listings</h1>
          <hr className={PageContent['title-divider']} />
        </div>
        
        <div className="saved-container">
          <div style={{ width:'100%',height:'5vh',display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <form className="search" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Search Listing..."
                  value={newSearch}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="chat-send-button">
                  Search
                </button>
              </form>
              <button className="add_listing" onClick={() => setSavedListings([...savedListings, listing_example])}>
                <img src="src/assets/add_icon.svg" alt="Add Listing" style={{height:'3vh',flexGrow:'100'}} />
              </button>
        </div>
         
          <div className="saved-listings">
            <ul className="saved-list">
              {savedListings.map((listing, index) => (
                <li key={index} className="saved-list-item">
                  <div className="list-item-header">
                    <p className="listing-title">{listing["Type of waste"]}</p>
                     <button className="delete-button" onClick={() => setSavedListings(savedListings.filter((_, i) => i !== index))}>
                     <img src="src/assets/close.svg" alt="Close" className="close-icon" />
                     </button>
                  </div>
                  <div className = "column">
                    <p className="listing-location">{listing["Company_Name"]}, {listing.Location}</p>
                  <p className="listing-price"><b>Qty: </b>{listing.Quantity} </p>
                  <p className="listing-price"><b>Price: </b>{listing.Price}</p>
                  </div>
                  <div className = "column">

                   
                    <h6> Additional Notes</h6>
                     <p >{listing["Additional Notes"]}</p>
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

export default My_Listings;