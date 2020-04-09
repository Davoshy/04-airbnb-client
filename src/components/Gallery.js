import React from 'react'
import axios from 'axios'

class Gallery extends React.Component {
	state = {
		images: [],
		selectedImage: ''
	}
	componentWillReceiveProps(props) {
		this.setState(
			{
				images: props.house.images,
				selectedImage: props.house.images[0]
			},
			() => console.log(this.state.selectedImage)
		)
	}
	selectMain = e => {
		this.setState({
			selectedImage: e
		})
	}
	render() {
		return (
			<div className="gallery">
				<div
					className="image-main"
					style={{ backgroundImage: `url(${this.state.selectedImage})` }}
				></div>
				<div className="previews">
					{this.props.house.images.map((image, i) => (
						<div
							onClick={e => this.selectMain(image)}
							className="preview"
							key={i}
							style={{ backgroundImage: `url(${image})` }}
						></div>
					))}
				</div>
			</div>
		)
	}
}

export default Gallery
