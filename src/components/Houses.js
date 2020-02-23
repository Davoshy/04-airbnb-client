import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GoogleMap from "google-map-react";
import "../styles/cards.css";
import "../styles/grid.css";
import "../styles/maps.css";
import "../styles/nav.css";
import Thumbnail from "./Thumbnail";

class Houses extends React.Component {
  state = {
    houses: [],
    allhouses: [],
    types: [],
    typeFilter: "allTypes",
    map: {
      key: {
        key: "AIzaSyBKMVj4gaJLU9GTV1zOaWQj7ggKVbXQep0"
      },
      center: {
        lat: -8.652,
        lng: 115.137
      },
      zoom: 14
    }
  };
  componentWillMount() {
    axios
      .get(`${process.env.REACT_APP_API}/houses`)
      .then(res => {
        this.setState({
          houses: res.data,
          allhouses: res.data
        });
      })
      .catch(err => {
        console.log({ err });
      });
  }
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API}/types`)
      .then(res => {
        let array = res.data;
        let types = [];
        array.map(data => types.push(data.name));
        this.setState({
          types: types
        });
        console.log(types);
      })
      .catch(err => {
        console.log({ err });
      });
  }
  searchFilter = e => {
    let dbHouses = this.state.allhouses;
    let currentHouses = this.state.houses;
    let filterHouses = [];
    let word = e.target.value;
    dbHouses.map(house => {
      if (house.region.toLowerCase().includes(word.toLowerCase()) == true) {
        filterHouses.push(house);
      } else if (
        house.city.toLowerCase().includes(word.toLowerCase()) == true
      ) {
        filterHouses.push(house);
      } else if (
        house.title.toLowerCase().includes(word.toLowerCase()) == true
      ) {
        filterHouses.push(house);
      }
    });
    this.setState({
      houses: filterHouses
    });
  };
  typeFilter = e => {
    let dbHouses = this.state.allhouses;
    let currentHouses = this.state.houses;
    let filterHouses = dbHouses.filter(house => {
      return house.type.name == e.target.value;
    });
    if (e.target.value == "allTypes") {
      this.setState({ typeFilter: e.target.value, houses: dbHouses });
    } else {
      this.setState({ typeFilter: e.target.value, houses: filterHouses });
    }
    // if (e.target.value != "allTypes") {
    //   this.setState({ typeFilter: e.target.value, houses: filterHouses });
    // } else {
    //   this.setState({ houses: dbHouses });
    // }
    console.log(filterHouses);
  };

  render() {
    return (
      <>
        <nav>
          <a href="/" className="logo"></a>
          <div className="profile">
            <a href="/plus" className="button">
              <span>Airbnb Plus</span>
            </a>
          </div>
        </nav>
        <div className="filters">
          <select>
            {[...Array(6)].map((e, i) => {
              return <option value="">Min Bedrooms: {1 + i}</option>;
            })}
          </select>
          <select value={this.state.typeFilter} onChange={this.typeFilter}>
            <option value="allTypes">All Types</option>
            {this.state.types.map(type => {
              return <option value={type}>{type}</option>;
            })}
          </select>
          <input type="number" placeholder="max price" />
          <select>
            <option value="price">Lowest Price</option>
            <option value="rating">Highest Rating</option>
          </select>
          <input
            type="text"
            className="search"
            placeholder="Search..."
            onChange={this.searchFilter}
          />
        </div>
        <div className="grid map">
          <div className="grid four large">
            {// List of thumbnails
            this.state.houses.map(house => (
              <Thumbnail key={house.id} house={house} />
            ))}
          </div>
          <div className="map">
            <GoogleMap
              bootstrapURLKeys={this.state.map.key}
              center={this.state.map.center}
              zoom={this.state.map.zoom}
            ></GoogleMap>
          </div>
        </div>
      </>
    );
  }
}

export default Houses;
