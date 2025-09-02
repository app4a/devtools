
import React, { useState, useRef } from 'react';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Helper function to convert a single component to a 2-digit hex string
function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

// Helper function to convert RGB to hex
function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getComplementaryColor(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#000000'; // Return black on error

  const r = 255 - rgb.r;
  const g = 255 - rgb.g;
  const b = 255 - rgb.b;

  return rgbToHex(r, g, b);
}

export default function ImageGenerator() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [loading, setLoading] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const previousColors = useRef(null);

  const handleMouseDown = () => {
    // Capture the state at the very beginning of the interaction
    if (!showConfirmation) {
      previousColors.current = { text: textColor, bg: backgroundColor };
    }
  };

  const handleColorInput = (color, type) => {
    if (type === 'text') {
      setTextColor(color);
    } else {
      setBackgroundColor(color);
    }
  };

  const handleTextColorChange = (e) => {
    const newTextColor = e.target.value;
    const suggestedColor = getComplementaryColor(newTextColor);
    setBackgroundColor(suggestedColor);

    setDialogText("We've suggested a complementary background color. Do you want to keep it?");
    setShowConfirmation(true);
  };

  const handleBackgroundColorChange = (e) => {
    setDialogText("Do you want to keep this background color?");
    setShowConfirmation(true);
  };

  const handleAccept = () => {
    previousColors.current = null;
    setShowConfirmation(false);
  };

  const handleDiscard = () => {
    if (previousColors.current) {
      setTextColor(previousColors.current.text);
      setBackgroundColor(previousColors.current.bg);
    }
    previousColors.current = null;
    setShowConfirmation(false);
  };

  const handleColorSwap = () => {
    const tempColor = textColor;
    setTextColor(backgroundColor);
    setBackgroundColor(tempColor);
  };

  const handleClick = async () => {
    setLoading(true);
    setImageUrl('');
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, textColor, backgroundColor }),
      });
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Image Generator
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter Text"
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Grid>
            <Grid item xs={5}>
              <Typography gutterBottom>Text Color</Typography>
              <input
                type="color"
                value={textColor}
                onMouseDown={handleMouseDown}
                onInput={(e) => handleColorInput(e.target.value, 'text')}
                onChange={handleTextColorChange}
                style={{ width: '100%', height: '56px', border: 'none', padding: 0 }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: 'center' }}>
              <IconButton onClick={handleColorSwap} sx={{ mt: 3 }}>
                <SwapHorizIcon />
              </IconButton>
            </Grid>
            <Grid item xs={5}>
              <Typography gutterBottom>Background Color</Typography>
              <input
                type="color"
                value={backgroundColor}
                onMouseDown={handleMouseDown}
                onInput={(e) => handleColorInput(e.target.value, 'background')}
                onChange={handleBackgroundColorChange}
                style={{ width: '100%', height: '56px', border: 'none', padding: 0 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClick}
                disabled={loading || !text}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Generate Image'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        {imageUrl && <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%' }} />}
      </Box>

      <Dialog open={showConfirmation} onClose={handleDiscard}>
        <DialogTitle>Confirm Color</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogText}
          </DialogContentText>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, p: 2, bgcolor: backgroundColor, color: textColor }}>
            Preview Text
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDiscard}>Discard</Button>
          <Button onClick={handleAccept} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
