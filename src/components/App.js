import React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {

  state = { apikey: "XXXXXXXX", results: [], showSearch: true};

  onSearchSubmit = async term => {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: { apikey: this.state.apikey, s: term }
    });

    this.setState({ results: response.data.Search });
  }

  toggleSearch = () => {
    this.setState({showSearch: !this.state.showSearch});
  }

  render() {
    return (
      <div className="container">
        {(() => {
          if (this.state.showSearch === true) {
            return (
              <div>
                <SearchBar onSubmit={this.onSearchSubmit} />
              </div>
            );
          }
        })()}
        <SearchResults results={this.state.results} onEmptyClick={this.onSearchSubmit} onSearchToggle={this.toggleSearch} apikey={this.state.apikey} />
      </div>
    );
  }
}

export default App;
