const rankingCalculator = {

  generateTeamList(matches) {
    return matches.reduce((list, {team1, team2}) => {
      list[team1.key] = { name: team1.name };
      list[team2.key] = { name: team2.name };
      return list;
    }, {})
  }

}

module.exports = rankingCalculator;