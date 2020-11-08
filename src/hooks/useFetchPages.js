import React from 'react';
import { useSWRInfinite } from "swr";

import useFetch from './useFetch';


const useFetchPages = (base_url,
	params = (index) => `page=${index}`, api) => {

	const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
		index =>
			`${base_url}?${params(index + 1)}`,
		api
	);
	return { data, error, mutate, size, setSize, isValidating };
};

export default useFetchPages;