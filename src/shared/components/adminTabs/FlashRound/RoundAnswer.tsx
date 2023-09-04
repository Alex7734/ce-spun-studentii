import { Container, Grid, TextField, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

const RoundAnswer = (props: any) => {
  const { updateFields } = props;

  const [answer, setAnswer] = useState<string>('');
  const [points, setPoints] = useState<number>();

  useEffect(() => {
    if (props.answer) {
      setAnswer(props.answer);
    }
    if (props.points && !isNaN(parseInt(props.points))) {
      setPoints(props.points);
    }
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Raspuns"
            variant="standard"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              updateFields({ answer: e.target.value, points: points });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Puncte"
            variant="standard"
            value={points}
            onChange={(e) => {
              if (!isNaN(parseInt(e.target.value))) {
                setPoints(parseInt(e.target.value));
                updateFields({
                  answer: answer,
                  points: parseInt(e.target.value),
                });
              }
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoundAnswer;
