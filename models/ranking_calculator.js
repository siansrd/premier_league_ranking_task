const rankingCalculator = {

  generateTeamList(matches) {
    return matches.reduce((list, {team1, team2}) => {
      list[team1.key] = { name: team1.name, wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 };
      list[team2.key] = { name: team2.name, wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 };
      return list;
    }, {})
  }

}

module.exports = rankingCalculator;