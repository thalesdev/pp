import React, { useEffect, useLayoutEffect } from 'react';
import Stages from './../section-components/stages-projects';
import TableProjects from './../section-components/table-projects';
import NumberFormat from 'react-number-format';
import { gmaps_key, publicProductionUrl, publicUrl } from '../../configs/environment';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';
import FittedImg from 'react-fitted-img';

const PropertyDetails = ({ id }) => {
	const { data: property } = useFetch(`/propriedade/${id}`, api);

	// const { data, isLoading, isError, handleSubmit } = useForm({
	// 	portalId: '7787185',
	// 	formId: '42e8b30a-c7d7-42e6-a3b0-916db0e7a895'
	// })


	const searchString = (prop) => {
		if (prop) {
			const end = `${prop.bairro.zona.cidade.nome},${prop.bairro.nome},${prop.endereco}`;
			return end.split(' ').join('+');
		}
		return '';
	};

	// useEffect(() => {
	// 	console.log('hubspot', data, isLoading, isError);
	// }, [data, isLoading, isError]);

	useLayoutEffect(() => {
		const { $ } = window;
		if ($ && property) {
			var $pdsCarousel = $('.property-details-slider');
			console.log(property)
			if ($pdsCarousel.length > 0) {
				// $pdsCarousel.trigger('refresh.owl.carousel');
				$pdsCarousel.owlCarousel({
					// loop: true,
					autoplay: false,
					autoPlayTimeout: 1000,
					dots: true,
					nav: true,
					items: 1,
					smartSpeed: 1500,
					navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
				});
			}
		}
	}, [property]);

	if (!property) {
		return <div />;
	}

	return (
		<>
			<div className="property-details-area">
				<div className="bg-gray pd-top-100 pd-bottom-90">
					<div className="container">
						<div className="row">
							<div className="col-xl-9 col-lg-8">
								<div className="property-details-slider">
									{property.imagens.map(image => (
										<div key={image.id} className="item" style={{ width: '100%' }}>
											<div className="thumb">
												<FittedImg src={`${publicProductionUrl}images/${image.arquivo.arquivo}`} alt={"image"}
													width={'auto'} height={450} fit="cover" position="0 50%" />
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
										<form >
											<div className="rld-single-input">
												<input type="text" placeholder="Nome" name="nome" />
											</div>
											<div className="rld-single-input">
												<input type="text" placeholder="Sobrenome" name="sobrenome" />
											</div>
											<div className="rld-single-input">
												<input type="text" placeholder="Email" name="email" />
											</div>
											<div className="rld-single-input">
												<input type="text" placeholder="DDD+Celular" name="celular" />
											</div>
											<div className="rld-single-input">
												<textarea placeholder="Objetivo da Compra" name="objetivo_da_compra" />
											</div>
											<button className="btn btn-yellow" href="#" type="submit">Enviar Mensagem</button>
										</form>

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
								<p>{property.observacoes || 'Nenhuma observação disponivel'}</p>
								<br /><br />
								<h4>Detalhes</h4>
								<p>{property.detalhes || 'Nenhum detalhe disponivel'}</p>
							</div>
							<div className="property-news-single-card style-two border-bottom-yellow">
								<h4>Localização</h4>
								<iframe
									src={`https://www.google.com/maps/embed/v1/place?key=${gmaps_key}&q=${searchString(property)}`}
									style={{ border: 0 }} allowFullScreen />
							</div>						
						</div>
					</div>
				</div>
			</div >
			{
				property && property.propriedade !== 1 &&
				<Stages property={property} />
			}
			<TableProjects property={property} />
		</>
	);
};

export default PropertyDetails;