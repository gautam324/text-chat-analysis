import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Grid } from '@material-ui/core';

const TextInput = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [sentiment, setSentiment] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/analyze', { text });

   
      setSummary(response.data.summary || '');
      setSentiment(response.data.sentiment || []);
      setKeywords(response.data.keywords || []);
    } catch (error) {
      console.error('Error analyzing text:', error);
      
    }
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>Text Analysis</Typography>
      <TextField
        multiline
        minRows={4}
        variant="outlined"
        fullWidth
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here..."
        style={{ marginBottom: '20px' }}
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Analyze
          </Button>
        </Grid>
        {summary && (
          <Grid item xs={12}>
            <Typography variant="h6">Summary</Typography>
            <TextField
              multiline
              minRows={4}
              variant="outlined"
              fullWidth
              value={summary}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        )}
        {sentiment.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6">Sentiment</Typography>
            <TextField
              multiline
              minRows={2}
              variant="outlined"
              fullWidth
              value={formatSentiment(sentiment)}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        )}
        {keywords.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6">Keywords</Typography>
            <TextField
              multiline
              minRows={2}
              variant="outlined"
              fullWidth
              value={keywords.map((item) => item.summary_text).join(', ')}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

const formatSentiment = (sentiment) => {
  try {
    return sentiment.map((item) => `${item.label}: ${item.score.toFixed(4)}`).join(', ');
  } catch (error) {
    console.error('Error formatting sentiment:', error);
    return '';
  }
};

export default TextInput;
