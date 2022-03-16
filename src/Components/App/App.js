import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

export class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         searchResults: [],
         playlistName: `New Playlist`,
         playlistTracks: [],
      };
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
   }

   addTrack(track) {
      if (!this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
         const newPlaylist = this.state.playlistTracks.slice();
         newPlaylist.push(track);
         this.setState({
            playlistTracks: newPlaylist,
         });
      }
   }

   removeTrack(track) {
      const newPlaylist = this.state.playlistTracks.slice();
      const index = newPlaylist.findIndex(savedTrack => savedTrack.id === track.id);
      if (index !== -1) {
         newPlaylist.splice(index, 1);
         this.setState({
            playlistTracks: newPlaylist,
         });
      }
   }

   updatePlaylistName(name) {
      this.setState({
         playlistName: name,
      });
   }

   savePlaylist() {
      const trackURIs = this.state.playlistTracks.map(track => track.uri);
      Spotify.savePlaylist(this.state.playlistName, trackURIs);
      this.updatePlaylistName(`New Playlist`);
      this.setState({
         playlistTracks: [],
      });
   }

   search(term) {
      Spotify.search(term).then(searchResults => {
         this.setState({
            searchResults: searchResults,
         });
      });
   }

   componentDidMount() {
      this.search('Hello');
   }

   render() {
      return (
         <div>
            <h1>
               Ja<span className='highlight'>mmm</span>ing
            </h1>
            <div className='App'>
               <SearchBar onChange={this.search} />
               <div className='App-playlist'>
                  <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
                  <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
               </div>
            </div>
         </div>
      );
   }
}
