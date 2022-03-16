import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
   constructor(props) {
      super(props);
      this.search = this.search.bind(this);
   }

   search(event) {
      this.props.onChange(event.target.value);
   }

   render() {
      return (
         <div className='SearchBar'>
            <input placeholder='Enter A Song, Album, or Artist' onInput={this.search} />
         </div>
      );
   }
}
