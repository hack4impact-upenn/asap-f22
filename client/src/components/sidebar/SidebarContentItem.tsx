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
  link: string;
}

const drawerWidth = 260;

export default function SidebarContent(props: SidebarContentProps) {
  const { title, definition, link } = props;
  return (
    <Box>
      <Card variant="outlined" sx={{ maxWidth: drawerWidth, overflow: 'auto' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Definition
          </Typography>
          <Typography variant="body2">{definition}</Typography>
        </CardContent>
        {link && link !== '' ? (
          <CardActions>
            <Button size="small" href={link} target="_blank">
              Learn More
            </Button>
          </CardActions>
        ) : null}
      </Card>
    </Box>
  );
}
