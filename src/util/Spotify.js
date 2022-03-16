const clientID = '9a572964d96e45849fab2910815e3fd8';
const redirectURI = 'https://mendelgordon-jamming.netlify.com/';
const api = 'https://api.spotify.com/v1/';
let token;

const Spotify = {
   getAccessToken() {
      if (token) {
         return token;
      }

      const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

      if (tokenMatch && expiresInMatch) {
         token = tokenMatch[1];
         const expiresIn = Number(expiresInMatch[1]);
         window.setTimeout(() => (token = ''), expiresIn * 1000);
         window.history.pushState('Access Token', null, '/');
         return token;
      } else {
         window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      }
   },

   search(term) {
      const token = this.getAccessToken();
      const items = arr =>
         arr.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
         }));
      return fetch(`${api}search?type=track&q=${term}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
         .then(response => response.json())
         .then(arr => {
            if (arr.tracks) {
               return items(arr);
            } else {
               return [];
            }
         });
   },

   async savePlaylist(playlistName, trackURIs) {
      if (!playlistName || !trackURIs) {
         return;
      }
      const token = Spotify.getAccessToken();
      const headers = {
         Authorization: `Bearer ${token}`,
      };
      let userID;
      const response = await fetch(`${api}me`, {
         headers,
      });
      const data = await response.json();
      userID = data.id;
      const response_1 = await fetch(`${api}users/${userID}/playlists`, {
         headers,
         method: 'POST',
         body: JSON.stringify({
            name: playlistName,
         }),
      });
      const data_1 = await response_1.json();
      const playlistID = data_1.id;
      return await fetch(`${api}playlists/${playlistID}/tracks`, {
         headers,
         method: 'POST',
         body: JSON.stringify({
            uris: trackURIs,
         }),
      });
   },
};

export default Spotify;
