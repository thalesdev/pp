import useSWR from 'swr';
import api from '../services/api';

const useFetch = (url, fetcher = api) => {
	const { data, error, mutate } = useSWR(url, async url => {
		let data;
		if (!fetcher) {
			data = fetch(url).then(res => res.json());
		} else {
			data = fetcher.get(url).then(res => res.data);
		}
		return await data;
	});
	return { data, error, mutate };
}

export default useFetch;