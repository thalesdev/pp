import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import ProjectDetailsSection from './section-components/project-details';
import RecomandProperties from './section-components/recomand-properties';
import Footer from './global-components/footer';
import { useParams } from 'react-router-dom';
import Stages from './section-components/stages-projects'
import TableProjects from './section-components/table-projects';

const ProjectDetails = () => {
	const { id } = useParams();
	return <div>
		<Navbar />
		<PageHeader headertitle="Detalhes do Projeto" />
		<ProjectDetailsSection id={id} />		       
        <Stages/>
		<TableProjects />
		<RecomandProperties /> 
		<Footer />
	</div>
}

export default ProjectDetails

