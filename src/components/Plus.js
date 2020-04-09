import React from 'react'
import axios from 'axios'
import Thumbnail from './Thumbnail'
import Nav from './Nav'
class Favorites extends React.Component {
	state = {
		houses: []
	}
	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API}/houses?plus=true`)
			.then(res => {
				this.setState({ houses: res.data })
			})
			.catch(err => {
				console.log(err)
			})
	}
	render() {
		return (
			<>
				<div>
					<Nav />
				</div>
				<div className="narrow">
					<div className="grid four large">
						{// List of thumbnails
						this.state.houses.map(house => (
							<Thumbnail house={house} onHover={() => {}} />
						))}
					</div>
				</div>
			</>
		)
	}
}

export default Favorites
