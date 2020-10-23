import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';
import logo from './images/logo.svg';


class SearchBar extends React.Component {
  state = { term: '' };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.term);
  };

  render() {
    return (
      <div className="search-bar col-12">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <form className="search-bar-form" onSubmit={this.onFormSubmit}>
              <div className="search-bar-body row no-gutters align-items-center">
                  <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><FontAwesomeIcon icon={faSearch} size="lg" color="grey" /></span>
                    </div>
                    <input 
                      className="form-control form-control-lg form-control-borderless" 
                      type="search" 
                      placeholder="Search movies..."
                      value={this.state.term}
                      onChange={e => this.setState({ term: e.target.value })}
                    />
                  </div>
              </div>
          </form>
      </div>
    );
  }
}

export default SearchBar;
