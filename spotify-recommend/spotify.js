var getFromApi = function(endpoint, query) {
    const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
    return fetch(url).then(function(response) {
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }
        return response.json();
    });
};


var artist;
var getArtist = function(name) {
    const query = {
    q: name,
    limit: 1,
    type: 'artist'
	};
	return getFromApi('balls', query).then(response => {
		artist = response.artists.items[0];
		return artist;
	}).catch(err => {console.log(err)})
};


//Promise.resolve(getFromApi).then