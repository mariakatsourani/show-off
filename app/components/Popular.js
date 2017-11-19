import React from 'react';

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  } 

  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang
    });
  }

  render() {
    var languages = ['All', 'Javascript', 'Java', 'Ruby', 'CSS', 'Python'];
    
    return (
      <ul className="languages">
        {languages.map(lang => {
          return (
            <li 
              style={lang === this.state.selectedLanguage ? { color: '#d0021b'}: null}
              key={lang} 
              onClick={this.updateLanguage.bind(null, lang)}>
                {lang}
            </li>
          )
        })}
      </ul>
    )
  }

}

export default Popular;