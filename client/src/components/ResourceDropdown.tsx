import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Grid, Typography } from '@mui/material';

interface ResourceDropdownProps {
  title: string;
  content: string;
}

export default function ResourceDropdown(props: ResourceDropdownProps) {
  const [open, setOpen] = useState(false);
  const { title, content } = props;
  return (
    <Card
      sx={{
        border: '1px solid rgba(211,211,211,0.6)',
        width: '50vw',
      }}
    >
      <CardHeader
        titleTypographyProps={{ variant: 'subtitle1', fontWeight: 600 }}
        title={title}
        action={
          <IconButton
            onClick={() => setOpen(!open)}
            aria-label="expand"
            size="small"
          >
            {open ? (
              <KeyboardArrowUpIcon color="primary" />
            ) : (
              <KeyboardArrowDownIcon color="primary" />
            )}
          </IconButton>
        }
      />
      <div style={{ backgroundColor: 'rgba(211,211,211,0.4)' }}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>{content}</Typography>
            <Grid container justifyContent="flex-end">
              <Button variant="text" size="medium">
                Learn More
              </Button>
            </Grid>
          </CardContent>
        </Collapse>
      </div>
    </Card>
  );
}
