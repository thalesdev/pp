import React, { Component } from 'react';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
class PropertiesByCities extends Component {


	render() {

		let publicUrl = process.env.PUBLIC_URL + '/'
		let imagealt = 'image'
		let data = sectiondata.propertiesbycities

		const inlineStyle = {
			backgroundImage: 'url(' + '/assets/img/bg/2.png)'
		}

		return <div className="city-intro-area pd-bottom-70" style={inlineStyle}>
			{/* city area start */}
			<div className="city-area pd-top-92">
				<div className="container">
					<div className="section-title text-center">
						<h2 className="title">{data.title}</h2>
					</div>
					<div className="city-filter-area row">
						<div className="city-sizer col-1" />

						{data.items.map((item, i) =>
							<div key={i} className={"rld-city-item " + item.class}>
								<div className={"single-city " + item.sectionclass}>
									<div className="sc-overlay" />
									<div className="thumb">
										<img src={item.image} alt={imagealt} />
									</div>
									<div className="details">
										<h5 className="title"><Link to={item.url}>{item.city}</Link></h5>
										<p>{item.content}</p>
									</div>
								</div>
							</div>
						)}

					</div>
				</div>
			</div>
			{/* city area end */}
			{/* intro area start */}
			<div className="intro-area pd-top-70">
				<div className="container">
					<div className="row">
						{data.intro.map((item, i) =>
							<div key={i} className="col-md col-sm-6-6">
								<a href={item.url} className={"single-intro-media media " + item.class}>
									<div className="media-left">
										<img src={item.icon} alt={imagealt} />
									</div>
									<div className="media-body">
										<h4>{item.title}</h4>
										<p>{item.content}</p>
									</div>
								</a>
							</div>

						)}

					</div>
				</div>
			</div>
			{/* intro area start */}
		</div>


	}
}

export default PropertiesByCities