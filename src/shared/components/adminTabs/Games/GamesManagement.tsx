import { Button, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GamesService from '../../../../services/games.service';
import { NormalGame } from '../../../types/game';
import GameField from './GameField';
import { EmptyGame } from '../../../models/game';

function GamesManagement() {
  const [games, setGames] = useState<NormalGame[]>([]);

  useEffect(() => {
    getAllGames();
  }, []);

  const getAllGames = () => {
    GamesService.get()
      .then((response) => {
        setGames(response);
      })
      .catch((error) => console.error(error));
  };

  const addNewGame = () => {
    GamesService.insert(EmptyGame)
      .then((response) => {
        setGames([
          ...games,
          {
            ...EmptyGame,
            id: response.id
          }
        ]);
      })
      .catch((error) => console.error(error));
  };

  const deleteGame = (item: NormalGame) => {
    setGames([...games.filter((game) => game !== item)]);
    GamesService.remove(item.id)
      .then(() => {
        getAllGames();
      })
      .catch((error) => console.error(error));
  };

  const handleFieldChange = (newText: string, item: NormalGame) => {
    setGames([
      ...games.map((game) => {
        if (game === item) {
          return {
            ...game,
            name: newText
          };
        }
        return game;
      })
    ]);
  };

  const handleGameQuestionsCapacityChange = (newValue: number, item: NormalGame) => {
    if (isNaN(newValue)) newValue = 5;
    setGames([
      ...games.map((game) => {
        if (game === item) {
          return {
            ...game,
            questionsCapacity: newValue
          };
        }
        return game;
      })
    ]);
  };

  const handleGameUpdate = () => {
    games.map((game) => {
      if (game.name == '') {
        GamesService.remove(game.id);
      }
    });
    let names = [];
    let k = 0;
    for (let game of games) {
      names[k] = game.name;
      k++;
    }
    games.map((game) => {
      GamesService.update(game.id, game).catch((error) => console.error(error));
    });
  };

  return (
    <Container>
      <Grid container spacing={2} sx={{ width: 1 / 2 }}>
        {games.length > 0 &&
          games.map((game) => (
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '30px' }}>
              <GameField
                name={game.name}
                changeText={(text: string) => handleFieldChange(text, game)}
                label={'Nume joc'}
              />
              <GameField
                name={game?.questionsCapacity?.toString() || '5'}
                changeText={(text: string) =>
                  handleGameQuestionsCapacityChange(parseInt(text), game)
                }
                label={'Capacitate joc'}
              />
              <Grid item xs={4} sx={{ width: 1 }}>
                <Button variant="outlined" color="error" onClick={() => deleteGame(game)}>
                  Delete
                </Button>
              </Grid>
            </div>
          ))}
        <Grid item xs={8}>
          <Button variant="outlined" onClick={() => addNewGame()}>
            Adauga un joc nou
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" onClick={() => handleGameUpdate()}>
            Salveaza
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GamesManagement;
