import React from "react";
import axios from "axios";

class Favorites extends React.Component {
  state = {
    houses: []
  };
  componentWillMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/houses?plus=true`)
      .then(res => {
        this.setState({ houses: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
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
        <div className="narrow">
          <div className="grid four large">
            {// List of thumbnails
            this.state.houses.map(house => (
              <a
                className="card link"
                href={`/houses/${house._id}`}
                key={house._id}
              >
                <div className="image"></div>
                <div className="content">
                  <small className="meta">
                    {house.type.name} • {house.bedrooms} Bedrooms
                  </small>
                  <h2>{house.title}</h2>
                  <small className="location">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>
                      {house.city}, {house.region}
                    </span>
                  </small>
                  <span className="price">${house.price}/night</span>
                  <span className="rating">
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Favorites;
