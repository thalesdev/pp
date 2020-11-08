import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';
import { publicProductionUrl } from '../../configs/environment';
import NumberFormat from 'react-number-format';


const FirstProject = ({ project }) => (
	<div className="col-lg-6">
		<div className="single-leading-feature">
			<div className="slf-overlay" />
			<div className="thumb">
				<img src={`${publicProductionUrl}/${project.image}`} alt="Projeto" />
			</div>
			<div className="details">
				<h4 className="title readeal-top">
					<Link to={`/property-details/${project.id}`}>
						{project.title}
					</Link>
				</h4>
				<span>A partir de </span>
				<h5 className="price">
					<NumberFormat
						value={project.min_price}
						displayType={'text'}
						thousandSeparator={'.'}
						decimalSeparator={','}
						prefix={'R$'}
					/>
				</h5>
				<span>
					{project.min_rooms &&
						<span className="ml-2">Quartos
						{project.min_rooms === project.max_rooms ?
								` ${project.max_rooms}` :
								` ${project.min_rooms} a ${project.max_rooms}`}
						</span>}
					{typeof project.min_baths !== "undefined" &&
						<span className="ml-2">Banheiros
						{project.min_baths === project.max_baths ?
								` ${project.max_baths}` :
								` ${project.min_baths} a ${project.max_baths}`}
						</span>}
					{typeof project.min_suites !== "undefined" &&
						<span className="ml-2">Suites
						{project.min_suites === project.max_suites ?
								` ${project.max_suites}` :
								` ${project.min_suites} a ${project.max_suites}`}
						</span>}
				</span>
			</div>
		</div>
	</div>
);

const Project = ({ project }) => (
	<div className="col-lg-3 col-sm-6">
		<div className="single-feature">
			<div className="thumb">
				<img src={`${publicProductionUrl}/${project.image}`} alt="Project" />
			</div>
			<div className="details">
				<p className="author">
					<i className="fa fa-user" /> {project.authorname}
				</p>
				<h6 className="title readeal-top">
					<Link to={`/property-details/${project.id}`}>
						{project.title}
					</Link>
				</h6>
				<span>A partir de </span>
				<h6 className="price">
					<NumberFormat
						value={project.min_price}
						displayType={'text'}
						thousandSeparator={'.'}
						decimalSeparator={','}
						prefix={'R$'}
					/>
				</h6>
				<ul className="info-list">
					{typeof project.min_rooms !== "undefined" && (
						<li>
							<i className="fa fa-bed" /> Quartos
							{project.min_rooms === project.max_rooms ?
								` ${project.max_rooms}` :
								` ${project.min_rooms} a ${project.max_rooms}`}
						</li>
					)}
					{typeof project.min_baths !== "undefined" && (
						<li>
							<i className="fa fa-bath" /> Banheiros
							{project.min_baths === project.max_baths ?
								` ${project.max_baths}` :
								` ${project.min_baths} a ${project.max_baths}`}
						</li>
					)}
					{typeof project.min_suites !== "undefined" && (
						<li>
							<i className="fa fa-bath" /> Suites
							{project.min_suites === project.max_suites ?
								` ${project.max_suites}` :
								` ${project.min_suites} a ${project.max_suites}`}
						</li>
					)}
					<li><i className="fa fa-home" />
						Até {project.area} m²
					</li>
				</ul>
				<ul className="contact-list">					
					<li>
						<Link to={`/property-details/${project.id}`}
							className="btn btn-yellow">
							Ver Detalhes
						</Link>
					</li>
				</ul>
			</div>
		</div>
	</div >
);


const FeaturedProject = () => {

	const { data } = useFetch(
		'/projetos-destaques?_limit=12',
		api
	);
	const projects = useMemo(() => {
		if (data) {
			return data.data;
		}
		return [];
	}, [data]);

	const groups = 4;
	const itensPerGroup = 3;

	return (<div className="featured-projects pd-top-60 pd-bottom-70">
		<div className="container">
			<div className="section-title">
				<h2 className="title">
					Projetos em destaque
				</h2>
			</div>
			<div className="featured-slider slider-control-top">
				{projects && Array.from(Array(groups).keys()).map(group => {
					return (
						<div className="item" key={group}>
							<div className="row">
								{projects.slice(
									group * itensPerGroup, (group + 1) * itensPerGroup)
									.map((project, i) => {
										if (i === 0) {
											return <FirstProject key={project.id} project={project} />
										}
										return <Project key={project.id} project={project} />
									})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	</div>
	);
}

export default FeaturedProject