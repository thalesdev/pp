import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
// import sectiondata from '../../data/sections.json';
// import parse from 'html-react-parser';
import { Link, useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';
import { kFormatter } from '../../helpers/formatters';
import NumberFormat from 'react-number-format';
import useDebounce from '../../hooks/useDebounce';
import { BairroAutoComplete, NagivationLink } from './properties-grid/styles';

import { publicProductionUrl } from '../../configs/environment';


const FILTERS = {
	rooms: [
		{ max: null, min: 1, label: '1 Quarto' },
		{ max: null, min: 2, label: '2 + Quartos' },
		{ max: null, min: 3, label: '3 + Quartos' },
		{ max: null, min: 4, label: '4 + Quartos' },
	],
	tipos: [],
	baths: [
		{ min: null, max: null, label: 'Não Filtrar' },
		{ min: 1, max: 2, label: '1-2' },
		{ min: 2, max: 3, label: '2-3' },
		{ min: 3, max: 4, label: '3-4' },
		{ min: 4, max: null, label: '4+' },
	],
	suites: [
		{ min: null, max: null, label: 'Não Filtrar' },
		{ min: 1, max: 2, label: '1-2' },
		{ min: 2, max: 3, label: '2-3' },
		{ min: 3, max: 4, label: '3-4' },
		{ min: 4, max: null, label: '4+' },
	],
	garages: [
		{ min: null, max: null, label: 'Não Filtrar' },
		{ min: 1, max: 2, label: '1-2' },
		{ min: 2, max: 3, label: '2-3' },
		{ min: 3, max: 4, label: '3-4' },
		{ min: 4, max: null, label: '4+' },
	],
};



const SearchList = () => {

	const location = useLocation();

	const { data: tiposData } = useFetch('tipos-imovel', api);

	const { data: bairrosData } = useFetch('bairros', api);

	const { data: slidersData } = useFetch('limites-sliders', api);




	const [availableFilters, setAvailableFilters] = useState(FILTERS);
	const [filters, setFilters] = useState({
		rooms: 0,
		baths: 0,
		suites: 0,
		garages: 0,
		price: null,
		size: null,
		tipo: null,
		...(location.filters ?? {})
	});
	const makeFilterString = () => {
		if (filters) {
			return Array.from(Object.entries(filters)).map(([key, value]) => {
				if (key === "size" || key === "price") {
					if (value !== null) {
						return key === 'size' ? `min_size=${value}` : `min_price=${value}`;
					}
				}
				else if (key === "bairro") {
					if (value !== null)
						return `bairro=${value}`;
				}
				else if (key === "tipo") {
					if (value !== null && value >= 0)
						return `tipo=${value}`;
				}
				else {
					const filter = availableFilters[key][value];
					const fields = [];
					if (filter) {
						if (filter.min !== null) {
							fields.push(
								`min_${key}=${filter.min}`
							);
						}
						if (filter.max !== null) {
							fields.push(
								`max_${key}=${filter.max}`
							);
						}
					}
					return fields.join('&');
				}
			}).filter(el => el).join('&');
		}
	};
	const [searchBairro, setSearchBairro] = useState('');
	const [filterString, setFilterString] = useState(location.filters ? makeFilterString() : '');
	const [showFilterBairro, setShowFilterBairro] = useState(true);
	const [page, setPage] = useState(1);




	const { data: propertyData } = useFetch(
		`/busca-propriedades?page=${page}${filterString ? `&${filterString}` : ``}`,
		api
	);

	const tiposRef = useRef(null);
	const roomsRef = useRef(null);
	const bathsRef = useRef(null);
	const suitesRef = useRef(null);
	const garagesRef = useRef(null);
	const locationRef = useRef(null);

	const filteredBairroDebounce = useDebounce(searchBairro, 500);

	const filteredBairros = useMemo(() => {
		if (filteredBairroDebounce && availableFilters && availableFilters['bairros']) {
			setShowFilterBairro(true);
			return availableFilters['bairros']
				.filter(bairro =>
					bairro.label.toLowerCase().search(filteredBairroDebounce.toLowerCase()) !== -1);
		}
		setShowFilterBairro(false);
		return null;

	}, [filteredBairroDebounce, availableFilters]);




	const handleFilter = (e) => {
		if (e)
			e.preventDefault();
		setFilterString(makeFilterString());
	};

	useEffect(() => {
		if (tiposData && tiposData.data)
			setAvailableFilters(avFilters => ({
				...avFilters,
				tipos: tiposData.data
			}))
	}, [tiposData]);
	useEffect(() => {
		if (bairrosData && bairrosData)
			setAvailableFilters(avFilters => ({
				...avFilters,
				bairros: bairrosData.map((bairro) => ({
					id: bairro.id,
					label: `${bairro.nome}, ${bairro.zona.cidade.nome}`
				}))
			}))
	}, [bairrosData]);
	useEffect(() => {
		const { $ } = window;
		if (tiposRef.current) {
			$(tiposRef.current).change('change', (e) => {
				if (e.target.value) {
					const value = Number(e.target.value);
					setFilters(filters => ({ ...filters, tipo: value }));
				}
			})
		}
		if (roomsRef.current) {
			$(roomsRef.current).change('change', (e) => {
				if (e.target.value) {
					const value = Number(e.target.value);
					setFilters(filters => ({ ...filters, rooms: value }));
				}
			})
		}
		if (bathsRef.current) {
			$(bathsRef.current).change('change', (e) => {
				if (e.target.value) {
					const value = Number(e.target.value);
					setFilters(filters => ({ ...filters, baths: value }));
				}
			})
		}
		if (suitesRef.current) {
			$(suitesRef.current).change('change', (e) => {
				if (e.target.value) {
					const value = Number(e.target.value);
					setFilters(filters => ({ ...filters, suites: value }));
				}
			})
		}
		if (garagesRef.current) {
			$(garagesRef.current).change('change', (e) => {
				if (e.target.value) {
					const value = Number(e.target.value);
					setFilters(filters => ({ ...filters, garages: value }));
				}
			})
		}
	}, [tiposRef, roomsRef, garagesRef, bathsRef, suitesRef]);
	useLayoutEffect(() => {
		if (window.$ && slidersData) {
			const { $ } = window;
			const handlePrice = $(".ui-slider-handle-price");
			$(".rld-price-slider").slider({
				range: "min",
				value: filters['price'] ?? slidersData.min_price,
				min: slidersData.min_price,
				max: slidersData.max_price,
				create: function () {
					handlePrice.text(kFormatter($(this).slider("value")));
				},
				slide: function (event, ui) {
					setFilters(filters => ({ ...filters, price: Number(ui.value) }))
					handlePrice.text(kFormatter(Number(ui.value)));
				}
			});
			const handleArea = $(".ui-slider-handle-size");

			$(".rld-size-slider").slider({
				range: "min",
				value: filters['size'] ?? slidersData.min_size,
				min: slidersData.min_size,
				max: slidersData.max_size,
				create: function () {
					handleArea.text($(this).slider("value"));
				},
				slide: function (event, ui) {
					setFilters(filters => ({ ...filters, size: Number(ui.value) }))
					handleArea.text(ui.value);
				}
			});
		}
	}, [filters, slidersData]);
	useLayoutEffect(() => {
		const $ = window.$;
		if ($('.single-select').length) {
			$('.single-select').niceSelect();
		}
	}, []);
	useLayoutEffect(() => {
		const $ = window.$;
		if ($('.single-select').length) {
			$('.single-select').niceSelect('update');
		}
	}, [tiposData, bairrosData, slidersData]);


	let imagealt = 'image'


	return (
		<div className="search-page-wrap pd-top-100 pd-bottom-70">
			<div className="search-container">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-3 col-lg-4 sitebar">
							<h6 className="filter-title mb-4"><img className="mr-3" src={"assets/img/icons/18.png"} alt={imagealt} />Filter</h6>
							<form className="widget widget-sidebar-search-wrap">
								<div className="widget-sidebar-search">
									<div className="widget-sidebar-item-wrap rld-single-input left-icon">
										<input type="text" placeholder="Localização"
											ref={locationRef}
											onChange={e => setSearchBairro(e.target.value)}
											onBlur={e => {
												e.preventDefault();
												return setTimeout(() => setShowFilterBairro(false), 200);
											}}
											onFocus={e => {
												if (filteredBairros && !showFilterBairro) {
													setShowFilterBairro(true);
												}
											}} />
										{filteredBairros && showFilterBairro &&
											<BairroAutoComplete >
												{filteredBairros.map(bairro => (
													<li key={bairro.id}
														onClick={(e) => {
															setFilters(filters => ({ ...filters, bairro: bairro.id }));
															if (locationRef.current) {

																locationRef.current.value = bairro.label;
															}
															setShowFilterBairro(false);
														}}>
														{bairro.label}
													</li>
												))}
											</BairroAutoComplete>}
									</div>
									<div className="widget-sidebar-item-wrap rld-single-select">
										<select className="select single-select" ref={tiposRef}>
											<option>Selecione</option>
											{availableFilters['tipos'] && availableFilters['tipos'].map((filter, i) => (
												<option value={i} key={i}>{filter.descricao}</option>
											))}
										</select>
									</div>
									<div className="widget-sidebar-item-wrap rld-price-slider-wrap">
										<div className="title">Qualer Preço</div>
										<div className="price">
											<span>
												<NumberFormat
													value={slidersData && (slidersData.min_price ?? 0)}
													displayType={'text'}
													thousandSeparator={'.'}
													decimalSeparator={','}
													prefix={'R$'}
												/>
											</span>
											<span className="float-right">
												<NumberFormat
													value={slidersData && (slidersData.max_price ?? 0)}
													displayType={'text'}
													thousandSeparator={'.'}
													decimalSeparator={','}
													prefix={'R$'}
												/>
											</span>
										</div>
										<div className="rld-price-slider">
											<div className="ui-slider-handle-price ui-slider-handle" />
										</div>
									</div>
									<div className="widget-sidebar-item-wrap rld-price-slider-wrap">
										<div className="title">Tamanho</div>
										<div className="price">
											<span>
												{slidersData && (slidersData.min_size ?? 0)}m²
											</span>
											<span className="float-right">
												{slidersData && (slidersData.max_size ?? 0)}m²
											</span>
										</div>
										<div className="rld-size-slider">
											<div className="ui-slider-handle-size ui-slider-handle" />
										</div>
									</div>
									<div className="widget-sidebar-item-wrap rld-single-select-wrap">
										<div className="title d-inline-block float-left mb-0 pt-2">Quartos</div>
										<div className="rld-single-select d-inline-block float-right">
											<select className="select single-select" ref={roomsRef}>
												<option>Não Filtrar</option>
												{availableFilters['rooms'].map((filter, i) => (
													<option value={i} key={i}>{filter.label}</option>
												))}
											</select>
										</div>
									</div>
									<div className="widget-sidebar-item-wrap rld-single-select-wrap">
										<div className="title d-inline-block float-left mb-0 pt-2">Banheiros</div>
										<div className="rld-single-select d-inline-block float-right">
											<select className="select single-select" ref={bathsRef}>
												{availableFilters['baths'].map((filter, i) => (
													<option value={i} key={i}>{filter.label}</option>
												))}
											</select>
										</div>
									</div>
									<div className="widget-sidebar-item-wrap rld-single-select-wrap">
										<div className="title d-inline-block float-left mb-0 pt-2">Suites</div>
										<div className="rld-single-select d-inline-block float-right">
											<select className="select single-select" ref={suitesRef}>
												{availableFilters['suites'].map((filter, i) => (
													<option value={i} key={i}>{filter.label}</option>
												))}
											</select>
										</div>
									</div>

									<div className="widget-sidebar-item-wrap rld-single-select-wrap mb-0">
										<div className="title d-inline-block float-left mb-0 pt-2">Vaga</div>
										<div className="rld-single-select d-inline-block float-right">
											<select className="select single-select" ref={garagesRef}>
												{availableFilters['garages'].map((filter, i) => (
													<option value={i} key={i} >{filter.label}</option>
												))}
											</select>
										</div>
									</div>
								</div>
								<div className="btn-wrap text-center">
									<button className="btn btn-yellow" onClick={handleFilter}>
										<span className="left"><i className="fa fa-search" /></span>
										Buscar
										</button>
								</div>
							</form>
						</div>
						<div className="col-xl-8 col-lg-8">
							<div className="row mb-3">
								<div className="col-md-9 col-sm-8">
									<h6 className="filter-title mt-3 mb-lg-0">
										{propertyData && (propertyData.total ?? 0)} Propriedades
									</h6>
								</div>
								{/* <div className="col-md-3 col-sm-4">
									<div className="rld-single-select">
										<select className="select single-select">
											<option value={1}>Tile View</option>
											<option value={2}>Tile View 1</option>
											<option value={3}>Tile View 2</option>
											<option value={3}>Tile View 3</option>
										</select>
									</div>
								</div>
							 */}
							</div>

							{propertyData && propertyData.data.map(property =>
								<div key={property.id} className="single-feature style-two">
									<div className="thumb">
										<img src={`${publicProductionUrl}/${property.image}`} alt="img" />
									</div>
									<div className="details">
										<div className="details-wrap">
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
													<i className="fa fa-home" />
														Até {property.max_area} m²
													</li>
											</ul>

											<ul className="contact-list">
												{/* <li><a className="phone" href="#"><i className="fa fa-phone" /></a></li>
												<li><a className="message" href="#"><img src={"/assets/img/icons/8.png"} alt="img" /></a></li> */}
												<li className="readeal-top">
													<Link className="btn btn-yellow" to={`property-details/${property.id}`}>
														Ver Detalhes
														</Link>
												</li>
											</ul>
										</div>
									</div>
								</div>
							)}

						</div>
						<div className="col-xl-8 col-lg-8">
							{propertyData && propertyData.links &&
								<div className="row justify-content-center">
									{propertyData.links.map(link => (
										<NagivationLink key={link.label} href="#"
											className={`p-3 ${link.active ? 'active' : ''}`}
											onClick={(e) => {
												e.preventDefault();
												if (typeof link.label === "number") {
													setPage(link.label);
												} else if (link.label === "Previous" || link.label === "Next") {
													const slice = link.label === "Next" ? 1 : -1;
													if (link.url) {
														setPage(page + slice);
													}
												}
											}}>
											{(link.label === "Previous" || link.label === "Next") ?
												(link.label === "Previous" ? "Anterior" : "Próximo") : link.label}
										</NagivationLink>
									))}
								</div>}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchList;