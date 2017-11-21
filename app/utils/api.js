import axios from 'axios';
import { Link } from 'react-router-dom';

const ghApiv3 = 'https://api.github.com/';

const getProfile = (username) => {
  return axios.get(`${ghApiv3}users/${username}`)
  .then((user) => {
    return user.data;
  });
}

const getRepos = (username) => {
  return axios.get(`${ghApiv3}users/${username}/repos`);
}

const getStarCount = (repos) => {
  return repos.data.reduce((total, repo) => {
    return total + repo.stargazers_count;
  }, 0);
}

const calculateScore = (user, repos) => {
  const followers = user.followers;
  const totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

const handleError = (error) => {
  console.warn(error);
  return null;
}

const getUserData = (player) => {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data) => {
    const profile = data[0];
    const repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

const sortPlayers = (players) => {
  return players.sort((a, b) => {
    return a.score - b.score;
  })
}

export default {
  battle: function(players) {
    return axios.all(players.map(getUserData)) //getUserData(profile)
    .then(sortPlayers) //sortPlayers(players)
    .catch(handleError) //handleError(error)
  },
  fetchPopularRepos: function(language) {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

    return axios.get(encodedURI)
    .then(response => {
      return response.data.items;
    });
  }
}
