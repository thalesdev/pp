import React, { Component, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, HashRouter, Route, Switch } from "react-router-dom";
import TimeAgo from 'javascript-time-ago';
import HomeV1 from './components/home-v1';
import Property from './components/property';
import PropertyDetails from './components/property-details';
import About from './components/about';
import Advisor from './components/advisor';
import Error from './components/error';
import News from './components/news';
import NewsDetails from './components/news-details';
import Contact from './components/contact';
import Properties from './components/properties';
import SearchList from './components/search-list';
import pt from 'javascript-time-ago/locale/pt';
import useHubspotChat from './hooks/useHubspotChat';
import ScrollRestoration from './components/scroll-restoration';
import { ToastProvider } from 'react-toast-notifications';

TimeAgo.addDefaultLocale(pt);

const Root = () => {

	const { closeHandler } = useHubspotChat(7787185);

	return (
		<Router>
			<ScrollRestoration />
			<ToastProvider placement="bottom-right">
				<Switch>
					<Route exact path="/" component={HomeV1} />
					<Route path="/property" component={Property} />
					<Route path="/property-details/:id" component={PropertyDetails} />
					<Route path="/about" component={About} />
					<Route path="/advisor" component={Advisor} />
					<Route path="/news" component={News} />
					<Route path="/news-details/:id" component={NewsDetails} />
					<Route path="/contact" component={Contact} />
					<Route path="/properties" component={Properties} />
					<Route path="/search" component={SearchList} />
					<Route component={Error} render={(Component) => <Component closeHandler={closeHandler} />} />
				</Switch>
			</ToastProvider>
		</Router >
	);
}

export default Root;

ReactDOM.render(<Root />, document.getElementById('realdeal'));
