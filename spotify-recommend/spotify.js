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
	return getFromApi('search', query).then(response => {
		artist = response.artists.items[0];
        artist_id = artist.id;
		const related_artists_endpoint = `artists/${artist_id}/related-artists`;
        return getFromApi(related_artists_endpoint, query);
	}).then(response => {
        let top_tracks_endpoint; // = `artists/${artist_id}/top-tracks`;
        const allPromises = response.artists.forEach(artist => {
            top_tracks_endpoint = `artists/${artist.id}/top-tracks`
            return getFromApi(top_tracks_endpoint, query);
        });
        setTimeout(function() {
            console.log(allPromises);
        }, 3000)
        return allPromises;
    }).then(response => {
        const allPromise = Promise.all(response)
        console.log(allPromise);
        return allPromise;
    }).then(response => {
        response.forEach(promise => {
            artist.tracks = response.tracks
        });
        return artist;
    })
};



//https://api.spotify.com/v1/artists/{id}/related-artists