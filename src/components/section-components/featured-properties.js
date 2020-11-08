import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import api, { api_test } from '../../services/api';
import useFetch from '../../hooks/useFetch';
import { publicUrl } from '../../configs/environment';
import NumberFormat from 'react-number-format';

const FirstProperty = ({ property }) => (
	<div className="col-xl-6 col-lg-8">
		<div className="single-leading-feature">
			<div className="slf-overlay" />
			<div className="thumb">
				<img src={property.image} alt="Propriedade" />
			</div>
			<div className="details">
				<h4 className="title readeal-top">
					<Link to={`/property-details/${property.id}`}>
						{property.title}
					</Link>
				</h4>
				<span>A partir de </span>
				<h5 className="price">
					<NumberFormat
						value={property.min_price}
						displayType={'text'}
						thousandSeparator={'.'}
						decimalSeparator={','}
						prefix={'R$'}
					/>
				</h5>
				<span>
					{typeof property.min_rooms !== "undefined" &&
						<span className="ml-2">Quartos
						{property.min_rooms === property.max_rooms ?
								` ${property.max_rooms}` :
								` ${property.min_rooms} a ${property.max_rooms}`}
						</span>}
					{typeof property.min_baths !== "undefined" &&
						<span className="ml-2">Banheiros
							{property.min_baths === property.max_baths ?
								` ${property.max_baths}` :
								` ${property.min_baths} a ${property.max_baths}`}
						</span>
					}
					{typeof property.min_suites !== "undefined" &&
						<span className="ml-2">Suites
						{property.min_suites === property.max_suites ?
								` ${property.max_suites}` :
								` ${property.min_suites} a ${property.max_suites}`}
						</span>
					}
					<span className="ml-2">Até {property.max_area} m²</span>
				</span>
			</div>
		</div>
	</div>
);

const Property = ({ property }) => {

	return (
		<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
			<div className="single-feature">
				<div className="thumb">
					<img src="url('+'/assets/img/feature/2.png)" alt="Propriedade" />
				</div>
				<div className="details">
					<p className="author">
						<i className="fa fa-user" /> {property.authorname}
					</p>
					<h6 className="title readeal-top">
						<Link to={`property-details/${property.id}`}>{property.title}</Link>
					</h6>
					<span>A partir de </span>
					<h6 className="price">
						<NumberFormat
							value={property.min_price}
							displayType={'text'}
							thousandSeparator={'.'}
							decimalSeparator={','}
							prefix={'R$'}
						/>
					</h6>
					<ul className="info-list">
						{typeof property.min_rooms !== "undefined" && (
							<li>
								<i className="fa fa-bed" /> Quartos
								{property.min_rooms === property.max_rooms ?
									` ${property.max_rooms}` :
									` ${property.min_rooms} a ${property.max_rooms}`}
							</li>
						)}
						{typeof property.min_baths !== "undefined" && (
							<li>
								<i className="fa fa-bath" /> Banheiros
								{property.min_baths === property.max_baths ?
									` ${property.max_baths}` :
									` ${property.min_baths} a ${property.max_baths}`}
							</li>
						)}
						{typeof property.min_suites !== "undefined" && (
							<li>
								<i className="fa fa-bath" /> Suites
								{property.min_suites === property.max_suites ?
									` ${property.max_suites}` :
									` ${property.min_suites} a ${property.max_suites}`}
							</li>
						)}
						<li>
							<i className="fa fa-house" />
							Até {property.max_area} m²
						</li>
					</ul>
					<ul className="contact-list">

						<li className="readeal-top">
							<Link className="btn btn-yellow" to={`property-details/${property.id}`}>
								Ver Detalhes
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
};





const Featured = (props) => {

	const { data } = useFetch(
		'/propriedades-destaques?limit=11',
		api
	);
	const featuredProjects = useMemo(() => {
		if (data) {
			return data.data;
		}
		return [];
	}, [data]);


	let Customclass = props.Customclass ? props.Customclass : 'pd-top-60';

	return (
		<div className={"featured-area  " + Customclass}>
			<div className="container">
				<div className="section-title text-center">
					<h2 className="title">
						Propriedades em destaque
					</h2>
				</div>
				<div className="row justify-content-center">
					{featuredProjects && featuredProjects.map((property, i) => {
						if (i === 0) {
							return <FirstProperty property={property} key={i} />;
						}
						return <Property property={property} key={i} />;
					})}
				</div>
			</div>
		</div>
	);
}

export default Featured