import React, { Component } from 'react';
import sectiondata from '../../data/sections.json';

const StagesProject = ({ property }) => {

	let publicUrl = process.env.PUBLIC_URL + '/'
	let imagealt = 'image'
	let data = sectiondata.aboutus
	const classByStep = (step) => property ? property.etapa_construcao >= step ? 'active' : '' : '';

	return (
		<div className="about-area pd-bottom-90">
			<div className="container">
				<div className="section-title text-left">
					<h2 className="title"> Estágios Obra </h2>
				</div>
				<div className="row">
					<div className="col-lg-12 mb-4 mb-lg-0">
						<div className="bs-stepper">
							<div className="bs-stepper-header" role="tablist">
								<div className={`step ${classByStep(1)}`}>
									<span className="bs-stepper-circle">.</span>
									<span className="bs-stepper-label"><h4>Na Planta</h4></span>
								</div>
								<div className="line"></div>
								<div className={`step ${classByStep(2)}`}>
									<span className="bs-stepper-circle">.</span>
									<span className="bs-stepper-label"><h4>Em Contrução</h4></span>
								</div>
								<div className="line"></div>
								<div className={`step ${classByStep(3)}`}>
									<span className="bs-stepper-circle">.</span>
									<span className="bs-stepper-label"><h4>Pronto</h4></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StagesProject