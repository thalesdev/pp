import React from 'react';
import { useForm } from 'react-hubspot';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Footer from './global-components/footer';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useToasts } from 'react-toast-notifications';


const Contact = () => {

	const { addToast } = useToasts();

	const { data, isLoading, isError, handleSubmit, } = useForm({
		portalId: '7787185',
		formId: '013fd0e0-3355-4240-b30c-cb8f8121ca84'
	});

	const [state, setState] = useState({
		pending: false,
		err: false,
		completed: false
	});

	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const phoneRef = useRef(null);
	const messageRef = useRef(null);
	const formRef = useRef(null);

	const handleWrapSubmit = (e) => {
		e.preventDefault();
		// validar os fields
		if ((nameRef.current && nameRef.current.value &&
			emailRef.current && emailRef.current.value &&
			phoneRef.current && phoneRef.current.value &&
			messageRef.current && messageRef.current.value) && !state.pending) {
			setState(oldState => ({ ...oldState, pending: true, err: false, completed: false }));
			handleSubmit(e);
		} else {
			setState({ pending: false, err: true, completed: false });
			addToast('Todos campos devem ser preenchidos!', { appearance: 'error', autoDismiss: true })
		}
	};


	const clearFields = () => {
		if (formRef.current) {
			formRef.current.reset();
		}
	}


	useEffect(() => {
		if (!isLoading && state.pending) {
			setState({
				pending: false,
				err: isError,
				completed: !isError
			});

			addToast(!isError ?
				'Contato efetuado com sucesso, aguarde uma resposta.' : 'Erro ao enviar contato, tente novamente.', {
				appearance: isError ? 'error' : 'success', autoDismiss: true
			});
			if (!isError) {
				clearFields();
			}

		}
	}, [isLoading, isError, state, data, addToast]);

	return (
		<div>
			<Navbar />
			<PageHeader headertitle="Fale Conosco" />
			<div className="contact-area pd-top-100 pd-bottom-65">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="contact-page-map">
								<iframe className="w-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.04885732365!2d-46.87549682439666!3d-23.68153145233917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2zU8OjbyBQYXVsbywgU1A!5e0!3m2!1spt-BR!2sbr!4v1603504397255!5m2!1spt-BR!2sbr" style={{ border: 0 }} allowFullScreen />
							</div>
						</div>
						<div className="col-lg-4">
							<form className="contact-form-wrap contact-form-bg" ref={formRef} onSubmit={handleWrapSubmit}>
								<h4>Fale Conosco</h4>
								<div className="rld-single-input">
									<input type="text" placeholder="Nome" name="firstname" ref={nameRef} />
								</div>
								<div className="rld-single-input">
									<input type="text" placeholder="Email" name="email" ref={emailRef} />
								</div>
								<div className="rld-single-input">
									<input type="text" placeholder="Telefone" name="phone" ref={phoneRef} />
								</div>
								<div className="rld-single-input">
									<textarea rows={10} placeholder="Mensagem" name="message" ref={messageRef} />
								</div>
								<div className="btn-wrap text-center">
									<button className="btn btn-yellow">
										{!state.pending ? 'Enviar' : 'Enviando...'}
									</button>
								</div>
							</form>
						</div>
					</div>
					<div className="row pd-top-92">
						<div className="col-xl-3 col-sm-6">
							<div className="single-contact-info">
								<p><i className="fa fa-phone" />Ligue para nós</p>
								<h5>+55 (11) 4255-1156</h5>
							</div>
						</div>
						<div className="col-xl-4 col-sm-7">
							<div className="single-contact-info">
								<p><i className="fa fa-envelope" />Mande um Email</p>
								<h5>contato@primeproperties.com.br</h5>
							</div>
						</div>
						<div className="col-xl-3 col-sm-6">
							<div className="single-contact-info">
								<p><i className="fa fa-phone" />Localização</p>
								<h5>São Paulo, Brasil</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Contact

