import React from 'react';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const getHintText = (rating) => {
  // TODO 確認 hint 文字
  switch (rating) {
    case 1:
      return '完全無法使用';
    case 2:
      return '不方便使用';
    case 3:
      return '可以使用，些微損毀';
    case 4:
      return '能使用';
    case 5:
      return '方便使用';
    default:
      return '';
  }
};

function AccessibilitySelect() {
  const [rating, setRating] = React.useState(0);

  return (
    <div>
      <Box display="flex" justifyContent="center" mt={1}>
        <Rating
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          size="large"
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body2">
          不能使用
        </Typography>
        <Typography variant="body2">
          方便使用
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="subtitle1" align="center" color="primary">
          {getHintText(rating)}
        </Typography>
      </Box>
    </div>
  );
}

export default AccessibilitySelect;
