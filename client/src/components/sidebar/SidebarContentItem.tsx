import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

interface SidebarContentProps {
  title: string;
  definition: string;
}

export default function SidebarContent(props: SidebarContentProps) {
  const { title, definition } = props;
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Definition
          </Typography>
          <Typography variant="body2">{definition}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
