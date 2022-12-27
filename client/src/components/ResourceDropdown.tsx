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
import Link from '@mui/material/Link';

interface ResourceDropdownProps {
  title: string;
  content: string;
  resourceLink: string;
}

export default function ResourceDropdown(props: ResourceDropdownProps) {
  const [open, setOpen] = useState(false);
  const { title, content, resourceLink } = props;
  return (
    <Card sx={{ minWidth: 300, border: '1px solid rgba(211,211,211,0.6)' }}>
      <CardHeader
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
              <Button href={resourceLink} variant="text" size="medium">
                Link to Resource
              </Button>
            </Grid>
          </CardContent>
        </Collapse>
      </div>
    </Card>
  );
}
