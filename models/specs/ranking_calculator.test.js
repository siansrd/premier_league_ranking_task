const calc = require('../ranking_calculator.js');
const leagueData = require('../../data/16_17_league_data.json');
const match = leagueData.rounds[0].matches[0];

describe('Ranking Calculator', () => {

  test('calculator exists', () => {
    expect(calc).toBeTruthy();
  });

  test('generate unique team list', () => {
    const teamList = {
      hull: { name: 'Hull City', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }, 
      leicester: { name: 'Leicester City', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }, 
      burnley: { name: 'Burnley', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      swansea: { name: 'Swansea', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      crystalpalace: { name: 'Crystal Palace', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      westbrom: { name: 'West Bromwich Albion', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      everton: { name: 'Everton', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      tottenham: { name: 'Tottenham Hotspur', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      middlesbrough: { name: 'Middlesbrough', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      stoke: { name: 'Stoke City', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      southampton: { name: 'Southampton', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      watford: { name: 'Watford', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      mancity: { name: 'Manchester City', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      sunderland: { name: 'Sunderland', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      bournemouth: { name: 'Bournemouth', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      manutd: { name: 'Manchester United', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      arsenal: { name: 'Arsenal', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      liverpool: { name: 'Liverpool', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      chelsea: { name: 'Chelsea', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      westham: { name: 'West Ham United', wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
    }

    const matchDay1 = leagueData.rounds[0].matches;
    expect(calc.generateTeamList(matchDay1)).toEqual(teamList);
  });

  test('calculate goal differences for a match', () => {
    expect(calc.calculateGoalDifferences(match)).toEqual({ hull: 1, leicester: -1 });
  });

  test('calculate points for a match', () => {
    const pointsScheme = { win: 3, loss: 0, draw: 1};
    expect(calc.calculatePoints(match, pointsScheme)).toEqual({ hull: 3, leicester: 0 });
  });

  test('calculate winner for a match', () => {
    expect(calc.calculateWinner(match)).toEqual({ key: 'hull', name: 'Hull City', code: 'HUL' });
  });

});