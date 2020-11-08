import React, { useEffect, useMemo, useRef, useState } from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import sectiondata from '../../data/sections.json';
import useDebounce from '../../hooks/useDebounce';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';
import { BairroAutoComplete } from './properties-grid/styles';

const FILTERS = {
	rooms: [
		{ max: null, min: 1, label: '1 Quarto' },
		{ max: null, min: 2, label: '2 + Quartos' },
		{ max: null, min: 3, label: '3 + Quartos' },
		{ max: null, min: 4, label: '4 + Quartos' },
	],
	tipos: [],
};



const BannerV2 = () => {

	const { data: tiposData } = useFetch('/tipos-imovel', api);

	const { data: bairrosData } = useFetch('bairros', api);

	// const { data: slidersData } = useFetch('/limites-sliders', api);

	const [searchBairro, setSearchBairro] = useState('');
	const filteredBairroDebounce = useDebounce(searchBairro, 500);
	const [showFilterBairro, setShowFilterBairro] = useState(true);

	const [availableFilters, setAvailableFilters] = useState(FILTERS);

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

	const tiposRef = useRef(null);
	const roomsRef = useRef(null);
	const locationRef = useRef(null);


	const [filters, setFilters] = useState({
		rooms: -1,
		tipo: -1
	})

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
		const $ = window.$;
		if ($('.single-select').length) {
			$('.single-select').niceSelect();
		}
	}, []);

	useEffect(() => {
		const $ = window.$;
		if ($('.single-select').length) {
			$('.single-select').niceSelect('update');
		}
	}, [tiposData, availableFilters]);

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
	}, [tiposRef, roomsRef]);

	let publicUrl = process.env.PUBLIC_URL + '/'
	let data = sectiondata.banner

	const inlineStyle = {
		backgroundImage: 'url(' + 'assets/img/banner/1.jpg)'
	}
	return (
		<div>
			{/* banner area start */}
			<div className="banner-area jarallax" style={inlineStyle}>
				<div className="container">
					<div className="banner-inner-wrap">
						<div className="row">
							<div className="col-12">
								<div className="banner-inner">
									<h5 className="sub-title">{data.subtitle}</h5>
									<h1 className="title">{data.title1} <br /> {data.title2}</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* banner area end */}
			{/* main search area end */}
			<div className="main-search-area">
				<div className="container">
					<div className="banner-search-wrap">
						<ul className="nav nav-tabs rld-banner-tab">
							<li className="nav-item">
								<a className="nav-link active" data-toggle="tab" href="#tabs_1">Imóveis à venda</a>
							</li>
						</ul>
						<div className="tab-content">
							<div className="tab-pane fade show active" id="tabs_1">
								<div className="rld-main-search">
									<div className="row">
										<div className="col-xl-4 col-lg-6 col-md-6">
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
										</div>
										<div className="col-xl-2 col-lg-6 col-md-6">
											<div className="rld-single-select">
												<select className="select single-select"
													ref={tiposRef}>
													<option>
														{availableFilters['tipos'] ? 'Propriedades' : 'Carregando..'}
													</option>
													{availableFilters['tipos'].map((filter, i) => (
														<option value={i} key={i}>
															{filter.descricao}
														</option>
													))}

												</select>
											</div>
										</div>
										<div className="col-xl-2 col-lg-4 col-md-4">
											<div className="rld-single-select">
												<select className="select single-select"
													ref={roomsRef}>
													<option >Quartos</option>
													{availableFilters['rooms'].map((filter, i) => (
														<option value={i} key={i}>
															{filter.label}
														</option>
													))}
												</select>
											</div>
										</div>
										<div className="col-xl-2 col-lg-4 col-md-4">
											<Link className="btn btn-yellow" to={{
												pathname: "/search",
												filters: filters
											}}>Buscar</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* main search area end */}
		</div>
	);

}

export default BannerV2