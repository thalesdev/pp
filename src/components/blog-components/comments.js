import React, { useRef, useState } from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import useFetch from '../../hooks/useFetch';
import { wp_api } from '../../services/api';

export const CommentPlaceHolder = () => (
	<SkeletonTheme >
		<div className={`single-comment-wrap mb-3`}>
			<div className="thumb">
				<Skeleton height={48} width={48} count={1} />
			</div>
			<div className="content">
				<h4 className="title">
					<Skeleton height={30} width={'100%'} count={1} />
				</h4>
				<Skeleton height={30} width={'100%'} count={2} />
			</div>
		</div>
	</SkeletonTheme>
);


const Comment = ({ comment, comments, handleReply, level = 0 }) => {
	const lf = level % 5;
	const radius = 80;

	const handleCommentReply = (event) => {
		event.preventDefault();
		handleReply(comment.id);
	};

	const nestedComments =
		(comments.filter(reply => reply.parent === comment.id) || [])
			.map(comment => {
				return (
					<Comment
						key={comment.id}
						comment={comment}
						comments={comments}
						handleReply={handleReply}
						level={level + 1} />
				);
			})

	return (
		<>
			<div className={`single-comment-wrap mb-3`}
				style={{
					paddingTop: 15,
					paddingBottom: 15,
					paddingLeft: 20,
					marginLeft: (radius * lf) - 20,
					borderLeft: lf > 0 ? '1px solid #ccc' : 0,
					background: comment.id >= 0 ? 'white' : '#ebebeb'
				}}>
				<div className="thumb">
					<img src={comment.author_avatar_urls["48"]} alt={"autor"} />
				</div>
				<div className="content">
					<h4 className="title">{comment.author_name}</h4>
					<div dangerouslySetInnerHTML={{
						__html: comment.content.rendered
					}} />
					{comment.id >= 0 &&
						<a href="#" className="reply" onClick={handleCommentReply}>
							Responder
					</a>}
				</div>
			</div>
			{ nestedComments}
		</>
	);
}


const Comments = ({ id }) => {

	const { data: replies, mutate } = useFetch(
		`comments?post=${id}`,
		wp_api
	);
	const [parent, setParent] = useState(0);
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const messageRef = useRef(null);

	const sendComment = async (event) => {
		event.preventDefault();
		if (messageRef.current && nameRef.current && emailRef.current) {
			const { value: messageVal } = messageRef.current;
			const { value: nameVal } = nameRef.current;
			const { value: emailVal } = emailRef.current;
			if (emailVal && nameVal && messageVal) {
				const payload = {
					author: null,
					author_email: emailVal,
					author_name: nameVal,
					content: messageVal,
					post: id,
					parent: parent
				};
				const optmist_id = -1 + (-999 + 1) * Math.random();

				const comment = {
					id: optmist_id,
					author_name: nameVal,
					content: { rendered: messageVal },
					post: id,
					parent: parent,
					author_avatar_urls: {
						"48":
							"https://secure.gravatar.com/avatar/0c0e2d7a1d795bc49006131d16f79d2b?s=120&d=mm&r=g"
					}
				};

				emailRef.current.value = "";
				nameRef.current.value = "";
				messageRef.current.value = "";

				const newReplies = [...replies, comment];
				mutate(newReplies, false);
				try {
					const data = await wp_api.post(`/comments`, payload);
				} catch {
					mutate(replies.filter(reply => reply.id !== optmist_id));
					// mostrar erro na tela
				}
				setParent(0);
			}
		}
	};

	const handleReply = (parentId) => {
		setParent(parentId);
		if (nameRef.current) {
			nameRef.current.focus();
		}
	}

	return (
		<div>
			<div className="comments-area">
				<h4 className="comments-title">
					{replies && `Comentários (${replies.length})`}
					{!replies && <Skeleton height={30} width={'100%'} count={1} />}
				</h4>
				<ul className="comment-list">
					{!replies && Array.from(Array(3).keys()).map(i => (
						<li key={i}>
							<CommentPlaceHolder />
						</li>
					))}
					{replies && replies.filter(comment => comment.parent === 0)
						.map(comment => (
							<li key={comment.id}>
								<Comment
									comment={comment}
									comments={replies}
									handleReply={handleReply} />
							</li>
						))
					}
				</ul>
			</div>

			<div className="blog-comment-area pd-bottom-100">
				<form className="rld-comment-form">
					<h4 className="single-page-small-title">Escreva um Comentario.</h4>
					<div className="row">
						<div className="col-lg-6 col-md-6">
							<div className="rld-single-input">
								<input type="text" placeholder="Nome" ref={nameRef} />
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
							<div className="rld-single-input">
								<input type="text" placeholder="Email" ref={emailRef} />
							</div>
						</div>
						<div className="col-lg-12">
							<div className="rld-single-input">
								<textarea rows={10} placeholder="Mensagem"
									defaultValue={""} ref={messageRef} />
							</div>
						</div>
						<div className="col-12">
							<a className="btn btn-yellow" href="#" onClick={sendComment}>
								Enviar Comentario
							</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	)

};

export default Comments;
