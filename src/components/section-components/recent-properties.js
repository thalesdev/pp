import React, { useMemo } from 'react';
import NumberFormat from 'react-number-format';
// import sectiondata from '../../data/sections.json';
import { Link } from 'react-router-dom';
import { publicProductionUrl } from '../../configs/environment';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';


const Property = ({ property }) => (
	<div className="col-lg-3 col-sm-6">
		<div className="single-feature">
			<div className="thumb">
				<img src={`${publicProductionUrl}/${property.image}`} alt="img" />
			</div>
			<div className="details">
				<p className="author"><i className="fa fa-user" />
					{property.authorname}
				</p>
				<h6 className="title  readeal-top">
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
						<i className="fa fa-home" />
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
);


const RecentProperties = () => {

	const { data } = useFetch('/mais-recentes', api);
	const properties = useMemo(() => {
		if (data) {
			return data.data;
		}
		return [];
	}, [data]);

	return (<div className="properties-area pd-top-92">
		<div className="container">
			<div className="section-title">
				<h2 className="title">Adicionados Recentemente</h2>
				<Link className="btn-view-all" to={"/properties"}>
					Ver Todas
				</Link>
			</div>
			<div className="row">
				{properties.map(property =>
					<Property key={property.id} property={property} />
				)}
			</div>
		</div>
	</div>
	);
};

export default RecentProperties;