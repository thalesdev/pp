import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import FittedImg from 'react-fitted-img';

import useFetch from '../../hooks/useFetch';
import { wp_api } from '../../services/api';


const PostImagePlaceHolder = () => (
	<SkeletonTheme >
		<center>
			<Skeleton height={250} width={'100%'} count={1} />
		</center>
	</SkeletonTheme>
);

const PostsPlaceHolder = () => (
	<div className="col-lg-6 mb-5">
		<SkeletonTheme >
			<Skeleton height={250} width={'100%'} count={1} />
			<Skeleton height={25} width={'100%'} count={3} />
		</SkeletonTheme>
	</div>
);

const Post = ({ post, getAuthor }) => {
	const { data: img_data } = useFetch(
		`media?parent=${post.id}`,
		wp_api
	);
	const image = useMemo(() => {
		if (img_data) {
			if (img_data.length) {
				const {
					source_url,
				} = img_data[0].media_details.sizes.full;

				return { fetched: true, src: source_url };
			} else {
				return { fetched: false };
			}
		}
		return null;
	}, [img_data]);

	return (
		<div className="col-lg-6">
			<div className="single-news">
				<div className="thumb">
					{!image ? <PostImagePlaceHolder /> :
						<center>
							{image.fetched ?
								<FittedImg src={image.src} alt={"image"}
									width={665} height={332} fit="cover" position="0 50%" /> :
								<div style={{
									width: 665,
									height: 332,
									backgroundColor: "#BCBCBC"
								}} />
							}
						</center>
					}
				</div>
				<div className="details">
					<h4>
						<Link to={`/news-details/${post.id}`}>
							{post.title.rendered}
						</Link>
					</h4>
					<p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
					<div className="author">
						<img
							src={getAuthor(post.author) &&
								getAuthor(post.author).avatar_urls["48"]}
							alt="profile" />
						<span>
							By {getAuthor(post.author) && getAuthor(post.author).name}
						</span>
						<span className="date">
							<ReactTimeAgo
								date={post.date}
								locale="pt" timeStyle="round" />
						</span>
					</div>
				</div>
			</div>
		</div >
	);
};




const PostList = ({ searchTerm }) => {
	const { data: postsList } = useFetch(
		'/posts',
		wp_api
	);
	const { data: authors } = useFetch(
		'/users',
		wp_api
	);

	const posts = useMemo(() => {
		if (postsList) {
			if (searchTerm) {
				return postsList.filter(
					post =>
						post.title.rendered.search(searchTerm) !== -1 ||
						post.excerpt.rendered.search(searchTerm) !== -1
				);
			}
			return postsList;
		}
		return null;
	}, [searchTerm, postsList]);

	const getAuthor = (id) => authors[id - 1];

	return (
		<div>
			<div className="property-news-area pd-top-100 pd-bottom-70">
				<div className="container">
					<div className="row">
						{!posts && !authors && Array.from(Array(6).keys()).map(
							placeholder => <PostsPlaceHolder key={placeholder} />
						)}
						{posts && authors && posts.map(post => <Post
							key={post.id}
							post={post}
							getAuthor={getAuthor} />
						)}
					</div>
				</div>
			</div>
		</div>
	)

};

export default PostList;
