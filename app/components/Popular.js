import React from 'react';
import PropTypes from 'prop-types';
import api from './../utils/api';

function SelectLanguage(props) {
    const languages = ['All', 'Javascript', 'Java', 'Ruby', 'CSS', 'Python'];

    return (
      <ul className="languages">
        {languages.map(lang => {
          return (
            <li 
              style={lang === props.selectedLanguage ? { color: '#d0021b'}: null}
              key={lang} 
              onClick={props.onSelect.bind(null, lang)}>
                {lang}
            </li>
          )
        })}
    </ul>
  )
}

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  } 

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang,
      repos: null
    });

    api.fetchPopularRepos(lang)
    .then(repos => {
      this.setState(() => {
        return {
          repos: repos
        }
      })
    })
  }

  render() {    
    return (
      <div>
        <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage} />
        {JSON.stringify(this.state.repos, null, 2)}
      </div>
    )
  }

}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default Popular;