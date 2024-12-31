import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Grid, Typography } from '@mui/material';
import HTMLMapper from './HTMLMapper';

interface ResourceDropdownProps {
  title: string;
  content: string | undefined;
  link: string | undefined;
}

export default function ResourceDropdown(props: ResourceDropdownProps) {
  const [open, setOpen] = useState(false);
  const { title, content, link } = props;
  return (
    <Card
      sx={{
        border: '1px solid rgba(211,211,211,0.6)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flex: 1,
      }}
    >
      <CardHeader
        sx={{ width: '100%' }}
        titleTypographyProps={{ variant: 'subtitle1', fontWeight: 600 }}
        title={<HTMLMapper text={title} />}
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
      <div style={{ backgroundColor: 'rgba(211,211,211,0.4)', width: '100%' }}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <CardContent>
            {content ? (
              // eslint-disable-next-line react/no-danger
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              ''
            )}
            {link && link !== '' ? (
              <Grid container justifyContent="flex-end">
                <Button
                  variant="text"
                  size="medium"
                  onClick={() => {
                    const newWindow = window.open(
                      link,
                      '_blank',
                      'noopener,noreferrer',
                    );
                    if (newWindow) {
                      newWindow.opener = null;
                    }
                  }}
                >
                  Learn More
                </Button>
              </Grid>
            ) : (
              <div />
            )}
          </CardContent>
        </Collapse>
      </div>
    </Card>
  );
}
