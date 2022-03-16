import './Playlist.css';
import React from 'react';
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {
   constructor(props) {
      super(props);
      this.handleNameChange = this.handleNameChange.bind(this);
   }

   handleNameChange(event) {
      const name = event.target.value;
      this.props.onNameChange(name);
   }

   render() {
      return (
         <div className='Playlist'>
            <input defaultValue='New Playlist' onChange={this.handleNameChange} />
            <TrackList tracks={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove} />
            <button className='Playlist-save' onClick={this.props.onSave}>
               SAVE TO SPOTIFY
            </button>
         </div>
      );
   }
}
