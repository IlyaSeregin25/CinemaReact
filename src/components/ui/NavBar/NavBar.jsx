import React, { useContext, useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
  Link,
  Divider,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
//import MovieIcon from '@mui/icons-material/Movie';
import { Link as RouterLink } from 'react-router-dom';
import { iconComponents, MOVIE_LISTS, TOP_LISTS } from '../../../constants';
import Search from '../Search';
import { ColorModeContext } from '../../../context/ToggleColorMode';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
const Icon = ({ iconName }) => {
  const IconComponent = iconComponents[iconName];
  return <IconComponent />;
};

function NavBar() {
  console.log();
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const theme = useTheme(); //theme.palette.mode

  const [isOpen, setOpen] = useState(false);

  const trigger = useScrollTrigger({
    target: window,
  });

  const handleDrawerToggle = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Container maxWidth="lg" sx={{ paddingInline: 0 }}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ alignContent: 'end' }}>
              <MenuIcon />
            </IconButton>
            <Drawer open={isOpen} onClose={handleDrawerToggle}>
              <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
                <List>
                  {TOP_LISTS.map(item => (
                    <Link key={item.title} component={RouterLink} to={item.url}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon iconName={item.icon} />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
                <List>
                  {MOVIE_LISTS.map(item => (
                    <Link key={item.title} component={RouterLink} to={item.url}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon iconName={item.icon} />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Box>
            </Drawer>
            <Stack
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap="10px"
              width="100%"
              sx={{ flexWrap: { xs: 'wrap', sm: 'no-wrap' } }}
            >
              <Typography component={RouterLink} to="/" sx={{ color: 'white', textDecoration: 'none' }} variant="h4">
                betflix
              </Typography>
              <Search />
              <IconButton color="inherit" onClick={toggleColorMode}>
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}

export default NavBar;
