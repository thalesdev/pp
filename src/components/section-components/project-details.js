import React, { Component, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { publicProductionUrl, publicUrl } from '../../configs/environment';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';

const ProjectDetails = ({ id }) => {
	const { data: property } = useFetch(`/propriedade/${id}`, api);
	let imagealt = 'image'

	useEffect(() => {
		if (window.$) {
			var $pdsCarousel = window.$('.property-details-slider');
			if ($pdsCarousel.length > 0) {
				$pdsCarousel.owlCarousel({
					loop: true,
					autoplay: false,
					autoPlayTimeout: 1000,
					dots: true,
					nav: true,
					smartSpeed: 1500,
					navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
					items: 1,
				});
			}
		}
	}, [property]);

	if (!property) {
		return <div> </div>;
	}

	return (
		<div className="property-details-area">
			<div className="bg-gray pd-top-100 pd-bottom-90">
				<div className="container">
					<div className="row">
						<div className="col-xl-9 col-lg-8">
							<div className="property-details-slider">
								{property.imagens.map(image => (
									<div key={image.id} className="item">
										<div className="thumb">
											<img
												src={`${publicProductionUrl}images/${image.arquivo.arquivo}`}
												alt="Propriedade" />
										</div>
									</div>
								))}
							</div>
							<div className="property-details-slider-info">
								<h3>
									<span>
										<NumberFormat
											value={property.min_price}
											displayType={'text'}
											thousandSeparator={'.'}
											decimalSeparator={','}
											prefix={'R$'}
											renderText={(value) => <strong>{value}</strong>}
										/> a <NumberFormat
											value={property.max_price}
											displayType={'text'}
											thousandSeparator={'.'}
											decimalSeparator={','}
											renderText={(value) => <strong>{value}</strong>}
											prefix={'R$'}
										/></span>
									{property.title}
								</h3>
							</div>
						</div>
						<div className="col-xl-3 col-lg-4">
							<div className="widget widget-owner-info mt-lg-0 mt-5">
								<div className="contact">
									<h6>Tenho Interesse</h6>
									<div className="rld-single-input">
										<input type="text" placeholder="Nome Completo" />
									</div>
									<div className="rld-single-input">
										<input type="text" placeholder="Email" />
									</div>
									<div className="rld-single-input">
										<input type="text" placeholder="Mensagem" />
									</div>
									<a className="btn btn-yellow" href="#">Enviar Mensagem</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row pd-top-90">
					<div className="col-lg-9">
						<div className="property-info mb-5">
							<div className="row">
								<div className="col-md-3 col-sm-6">
									<div className="single-property-info">
										<h5>Quartos</h5>
										<p>
											<i className="fa fa-bed" />
											{property.min_rooms === property.max_rooms ?
												` ${property.max_rooms}` :
												` ${property.min_rooms} a ${property.max_rooms}`}
										</p>
									</div>
								</div>
								<div className="col-md-3 col-sm-6">
									<div className="single-property-info">
										<h5>Banheiros</h5>
										<p>
											<i className="fa fa-bath" />
											{property.min_baths === property.max_baths ?
												` ${property.max_baths}` :
												` ${property.min_baths} a ${property.max_baths}`}
										</p>
									</div>
								</div>
								<div className="col-md-3 col-sm-6">
									<div className="single-property-info">
										<h5>Area</h5>
										<p>
											<i className="fa fa-home" />
											{property.min_area === property.max_area ?
												` ${property.max_area}` :
												` ${property.min_area} a ${property.max_area}`} m²
											</p>
									</div>
								</div>
								<div className="col-md-3 col-sm-6">
									<div className="single-property-info">
										<h5>Estacionamento</h5>
										<p>
											<i className="fa fa-car" />
											{property.min_garages === property.max_garages ?
												` ${property.max_garages}` :
												` ${property.min_garages} a ${property.max_garages}`}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="property-news-single-card style-two border-bottom-yellow">
							<h4>Observações</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In bibendum elit magna, ut placerat nunc tempus vel. Donec vitae dictum ligula. Phasellus congue maximus eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse potenti. Suspendisse sollicitudin posuere nunc et vehicula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas aliquam vitae quam at sodales. </p>

						</div>
						<div className="property-news-single-card style-two border-bottom-yellow">
							<h4>Localização</h4>
							<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5621.1629504770535!2d-122.43633647504856!3d37.748515859182696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1578304196576!5m2!1sen!2sbd" style={{ border: 0 }} allowFullScreen />
						</div>
						<div className="property-news-single-card border-bottom-yellow">
							<h4>Facilidades</h4>
							<div className="row">
								<div className="col-sm-4">
									<ul className="rld-list-style mb-3 mb-sm-0">
										<li><i className="fa fa-check" /> Área Recreativa</li>
										<li><i className="fa fa-check" /> Pátio</li>
										<li><i className="fa fa-check" /> Piscina</li>
										<li><i className="fa fa-check" /> Quadra Esportiva</li>
										<li><i className="fa fa-check" /> Lareira</li>
									</ul>
								</div>
								<div className="col-sm-4">
									<ul className="rld-list-style mb-3 mb-sm-0">
										<li><i className="fa fa-check" /> Sacada</li>
										<li><i className="fa fa-check" /> Segurança</li>
										<li><i className="fa fa-check" /> Deck</li>
										<li><i className="fa fa-check" /> Academia</li>
										<li><i className="fa fa-check" /> Sala de Jogos</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="property-news-single-card border-bottom-yellow pb-3">
							<h4>Facts and Features</h4>
							<div className="row">
								<div className="col-md-3 col-sm-6">
									<div className="single-floor-list media">
										<div className="media-left">
											<i className="fa fa-bed" />
										</div>
										<div className="media-body">
											<h6>Living Room</h6>
											<p>20 x 16 sq feet</p>
										</div>
									</div>
								</div>
								<div className="col-md-3 col-sm-6">
									<div className="single-floor-list media">
										<div className="media-left">
											<i className="fa fa-car" />
										</div>
										<div className="media-body">
											<h6>Garage</h6>
											<p>20 x 16 sq feet</p>
										</div>
									</div>
								</div>
								<div className="col-md-3 col-sm-6">
									<div className="single-floor-list media">
										<div className="media-left">
											<img src={"/assets/img/icons/7.png"} alt={imagealt} />
										</div>
										<div className="media-body">
											<h6>Dining Area</h6>
											<p>20 x 16 sq feet</p>
										</div>
									</div>
								</div>
								<div className="col-md-3 col-sm-6">
									<div className="single-floor-list media">
										<div className="media-left">
											<img src={"/assets/img/icons/7.png"} alt={imagealt} />
										</div>
										<div className="media-body">
											<h6>Dining Area</h6>
											<p>20 x 16 sq feet</p>
										</div>
									</div>
								</div>
								<div className="col-md-3 col-sm-6">
									<div className="single-floor-list media">
										<div className="media-left">
											<i className="fa fa-bed" />
										</div>
										<div className="media-body">
											<h6>Bedroom</h6>
											<p>20 x 16 sq feet</p>
										</div>
									</div>
								</div>
								<div className="col-md-3 col-sm-6">
									<div className="single-floor-list media">
										<div className="media-left">
											<i className="fa fa-bath" />
										</div>
										<div className="media-body">
											<h6>Bathroom</h6>
											<p>20 x 16 sq feet</p>
										</div>
									</div>
								</div>
								<div className="col-md-3 col-sm-6">
									<div className="single-floor-list media">
										<div className="media-left">
											<img src={"/assets/img/icons/17.png"} alt={imagealt} />
										</div>
										<div className="media-body">
											<h6>Gym Area</h6>
											<p>20 x 16 sq feet</p>
										</div>
									</div>
								</div>
								<div className="col-md-3 col-sm-6">
									<div className="single-floor-list media">
										<div className="media-left">
											<img src={"/assets/img/icons/17.png"} alt={imagealt} />
										</div>
										<div className="media-body">
											<h6>Gym Area</h6>
											<p>20 x 16 sq feet</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="property-news-single-card border-bottom-yellow mb-0">
							<h4>3D Gallery</h4>
							<div className="thumb">
								<img src={"/assets/img/others/11.png"} alt={imagealt} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	);
};

export default ProjectDetails