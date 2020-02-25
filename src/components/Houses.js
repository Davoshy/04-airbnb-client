import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GoogleMap from "google-map-react";
import "../styles/cards.css";
import "../styles/grid.css";
import "../styles/maps.css";
import Thumbnail from "./Thumbnail";
import Pin from "./Pin";
import Nav from "./Nav";

class Houses extends React.Component {
  state = {
    houses: [],
    allhouses: [],
    types: [],
    typeFilter: "allTypes",
    minbedrooms: 0,
    maxprice: 100000,
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
  // filters

  typeFilter = e => {
    let dbHouses = this.state.allhouses;
    let currentHouses = this.state.houses;
    let filterHouses = dbHouses.filter(house => {
      return house.type.name == e.target.value;
    });
    if (e.target.value == "allTypes") {
      this.setState({ typeFilter: e.target.value, houses: dbHouses }, () =>
        this.applyFilter()
      );
    } else {
      this.setState({ typeFilter: e.target.value, houses: filterHouses }, () =>
        this.applyFilter()
      );
    }
  };

  setBedrooms = e => {
    let numBedrooms = e.target.value;
    this.setState({ minbedrooms: numBedrooms }, () => this.applyFilter());
  };

  setPrice = e => {
    let maxprice = e.target.value;
    this.setState({ maxprice }, () => this.applyFilter());
  };

  applyFilter = () => {
    let filterHouses = [];
    this.state.allhouses.forEach(house => {
      if (
        house.bedrooms > this.state.minbedrooms &&
        house.price < Number(this.state.maxprice) &&
        (house.type.name == this.state.typeFilter ||
          this.state.typeFilter == "allTypes")
      ) {
        filterHouses.push(house);
      }
    });
    this.setState({ houses: filterHouses });
  };

  //Google Maps Pins on hover

  houseHover = id => {
    let currentHouses = this.state.houses;
    currentHouses.map(house => {
      house.selected = false;
      return house;
    });
    let a = currentHouses.find(house => house._id == id);
    a.selected = true;
    this.setState({
      houses: currentHouses
    });
  };

  render() {
    return (
      <>
        <div>
          <Nav />
        </div>

        <div className="filters">
          {/* Bedrooms */}
          <select value={this.state.bedrooms} onChange={this.setBedrooms}>
            {[...Array(6)].map((e, i) => {
              return <option value={i + 1}>Min Bedrooms: {1 + i}</option>;
            })}
          </select>
          {/* Room Types */}
          <select value={this.state.typeFilter} onChange={this.typeFilter}>
            <option value="allTypes">All Types</option>
            {this.state.types.map(type => {
              return <option value={type}>{type}</option>;
            })}
          </select>
          {/*Price Range*/}
          <input
            type="number"
            placeholder="max price"
            onChange={this.setPrice}
          />
          <select>
            <option value="price">Lowest Price</option>
            <option value="rating">Highest Rating</option>
          </select>
          {/* Search Filter */}
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
              <Thumbnail
                onHover={this.houseHover}
                key={house.id}
                house={house}
              />
            ))}
          </div>
          <div className="map">
            {/*List of Pins */}
            <GoogleMap
              bootstrapURLKeys={this.state.map.key}
              center={this.state.map.center}
              zoom={this.state.map.zoom}
            >
              {this.state.houses.map(house => {
                return (
                  <Pin
                    key={house.id}
                    house={house}
                    lat={house.lat}
                    lng={house.lng}
                  ></Pin>
                );
              })}
            </GoogleMap>
          </div>
        </div>
      </>
    );
  }
}

export default Houses;
