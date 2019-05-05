const calc = require('../ranking_calculator.js');
const leageData = require('../../data/16_17_league_data.json')

describe('Ranking Calculator', () => {

  test('calculator exists', () => {
    expect(calc).toBeTruthy();
  });

  test('generate unique team list', () => {
    const teamList = {
      hull: { name: 'Hull City' }, 
      leicester: { name: 'Leicester City' }, 
      burnley: { name: 'Burnley' },
      swansea: { name: 'Swansea' },
      crystalpalace: { name: 'Crystal Palace' },
      westbrom: { name: 'West Bromwich Albion' },
      everton: { name: 'Everton' },
      tottenham: { name: 'Tottenham Hotspur' },
      middlesbrough: { name: 'Middlesbrough' },
      stoke: { name: 'Stoke City' },
      southampton: { name: 'Southampton' },
      watford: { name: 'Watford' },
      mancity: { name: 'Manchester City' },
      sunderland: { name: 'Sunderland' },
      bournemouth: { name: 'Bournemouth' },
      manutd: { name: 'Manchester United' },
      arsenal: { name: 'Arsenal' },
      liverpool: { name: 'Liverpool' },
      chelsea: { name: 'Chelsea'},
      westham: { name: 'West Ham United' }
    }

    const matchDay1 = leageData.rounds[0].matches;
    expect(calc.generateTeamList(matchDay1)).toEqual(teamList);
  });

});