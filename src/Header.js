import React, { useState } from "react";
import logo from "./imgs/amazon.png";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";
import { auth } from "./Firebase";
import Select from 'react-select';

function Product({ id, title, image, price, rating, imgSize }) {
  


  const [{}, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating
      }
      // Add item to basket
    });
  };}  

function Header() {

  // const [{ basket }] = useStateValue();
  const [{ basket, user }, dispatch] = useStateValue();
  console.log(basket);
  const login = () => {
    if (user) {
      auth.signOut();
    }
  };
  const handleChange = e => {
    setSelectedOption(e);
  }
  const [selectedOption, setSelectedOption] = useState(null);

  return (


    
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="amazon-logo" />
      </Link>


      <Select
      className="header__Selectinputter"
        placeholder="Select Option"
        value={selectedOption} // set selected value
        onChange={handleChange} // assign onChange function
      />

      <div className="header__nav">
        <Link to={!user && "/login"} className="header__link">
          <div onClick={login} className="header__option">
            {/* no href cause this will refresh the page */}
            <span className="header__option1"> Hello {user?.email} </span>
            <span className="header__option2">
              {user ? "Sign out" : "Sign in"}
            </span>
          </div>
        </Link>
        <Link to="/" className="header__link">
          <div className="header__option">
            {/* no href cause this will refresh the page */}
            <span className="header__option1"> Returns </span>
            <span className="header__option2"> Orders </span>
          </div>
        </Link>
        <Link to="/" className="header__link">
          <div className="header__option">
            {/* no href cause this will refresh the page */}
            <span className="header__option1"> Your </span>
            <span className="header__option2"> Prime</span>
          </div>
        </Link>
        <Link className="header__optionBasket" to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon></ShoppingBasketIcon>
            <span className="header__numberBasket"> {basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
