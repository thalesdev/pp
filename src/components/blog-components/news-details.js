import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import newsdetails from '../../data/single-blogdata.json';
import useFetch from '../../hooks/useFetch';
import Comments from './comments';
import ReactTimeAgo from 'react-time-ago';
import { wp_api } from '../../services/api';



const DetailsPlaceHolder = () => (
	<SkeletonTheme color="rgb(233,233,255)">
		<div className="news-details-area mb-5">
			<div className="container">
				<div className="news-details-author-social">
					<div className="row">
						<div className="col-sm-6 mb-4 mg-sm-0">
							<div className="author">
								<Skeleton height={48} width={48} count={1} />
								<p><Skeleton height={30} width={'100%'} count={1} /></p>
								<p><Skeleton height={30} width={100} count={1} />
								</p>
							</div>
						</div>
						<div className="col-sm-6">
							<ul className="social-icon style-two text-sm-right">
								{Array.from(Array(3).keys()).map(i =>
									<li key={i}>
										<Skeleton height={48} width={48} count={1} />
									</li>
								)}
							</ul>
						</div>
					</div>
				</div>
				<div className="row justify-content-center pd-top-70">
					<div className="col-lg-8">
						<div className="news-details-wrap">
							<h3 className="title1">
								<Skeleton height={30} width={'100%'} count={1} />
							</h3>
							<Skeleton height={30} width={'100%'} count={4} />
						</div>
					</div>
				</div>
			</div>
		</div>
	</SkeletonTheme>
);

const NewsDetails = ({ id }) => {

	const { data: post } = useFetch(
		`posts/${id}`,
		wp_api
	);
	const { data: author } = useFetch(
		post ?
			`users/${post.author}`
			: null,
		wp_api
	);

	let data = newsdetails.singlepostdata

	if (!post || !author) {
		return <DetailsPlaceHolder />;
	}

	return (
		<div>
			<div className="news-details-area">
				<div className="container">
					<div className="news-details-author-social">
						<div className="row">
							<div className="col-sm-6 mb-4 mg-sm-0">
								<div className="author">
									<img src={author.avatar_urls["48"]} alt="news" />
									<p>By {author.name}</p>
									<p><ReactTimeAgo
										date={post.date}
										locale="pt" timeStyle="round" />
									</p>
								</div>
							</div>
							<div className="col-sm-6">
								<ul className="social-icon style-two text-sm-right">
									{data.social.map((item, i) =>
										<li key={i}>
											<a className={item.class} href={item.url} target="_blank"><i className={item.icon} /></a>
										</li>
									)}
								</ul>
							</div>
						</div>
					</div>
					<div className="row justify-content-center pd-top-70">
						<div className="col-lg-8">
							<div className="news-details-wrap">
								<h3 className="title1">{post.title.rendered}</h3>
								<div style={{
									width: '100%',
									height: 'auto'
								}} dangerouslySetInnerHTML={{
									__html: post.content.rendered
								}} />
							</div>
							<Comments id={id} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default NewsDetails;
