import styled from 'styled-components';

export const BairroAutoComplete = styled.ul`
	box-sizing:border-box;
	z-index:999;
	position:absolute;
	top:100%;
	left:0;
	padding:0 !important;
	min-height:25px;
	max-height: 300px;
	min-width:100%;
	background-color:#fff;
	box-shadow:0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
	list-style:none;
	color:#fff;
	overflow-y:auto;
	&::-webkit-scrollbar {
    width: 6px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
  }
  &::-webkit-scrollbar-thumb {
   background:var(--main-color-one);
   border-radius:1ex;
    padding: 8px;
    width: 6px;
    height: 10px;
		border: solid 10px transparent !important;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--main-color-two);
  }
  &::-webkit-scrollbar-button:start:decrement,
  &::-webkit-scrollbar-button:end:increment  {
    display: none;
  }


	li {
		padding: 8px 5px 8px 25px;
		width:100%;
		color: #333;
		cursor:pointer;
		&:hover{
			color:var(--main-color-one);
			background-color: #F0F0F0;
		}
	}
`;

export const NagivationLink = styled.a`
	&.active {
		color:var(--main-color-one);
	}
`;
