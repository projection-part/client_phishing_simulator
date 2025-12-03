import * as React from 'react';
import AddEmployee from './AddEmployee';
import SendPhishingEmail from './SendPhishingEmail';
import EmployeeList from './EmployeeList';
import TotalEmployee from './TotalEmployee';
import Logout from './Logout';
import EmployeeCount from './EmployeeCount';
import TotalClickedChart from './ClickedCount';
import TotalClicked from "./TotalClicked";
import ClickedPercentageChart from './ClickedPercentageChart';
import AnalyticsClickedPercentageChart from './AnalyticsClickPercentageChart';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

//icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import AdsClickIcon from '@mui/icons-material/AdsClick';


const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedContent, setSelectedContent] = React.useState('Analytics');
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleListItemClick = (item) => {
    setSelectedContent(item);
    setMobileOpen(false);
  };
  const menuItems = [
    { text: 'Analytics', icon: <AnalyticsIcon />},
    { text: 'Total Employees', icon: <GroupWorkIcon />},
    { text: 'Total Clicked', icon: <AdsClickIcon />},
    //{ text: 'Admin Dashboard', icon: <DashboardIcon />},
    { text: 'Add employee', icon: <AddIcon />},
    { text: 'Send email', icon: <EmailIcon />},
    { text: 'Employee list', icon: <PeopleIcon />}
  ];
  const drawer = (
    <div style={{background:'#024a4a', color:'white', minHeight: '100vh'}}>
      <Typography variant="h5" sx={{ my: 2, ml:5 }}>
        Dashboard
      </Typography>
      
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(item.text)}
              selected={selectedContent === item.text}
              >
              <ListItemIcon sx={{color: 'white'}}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(text)}
              selected={selectedContent === text}
              >
              <ListItemIcon>
              <LogoutIcon sx={{color: 'white'}} />
              </ListItemIcon>
              <ListItemText primary={<Logout />} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const renderContent = () => {
    switch (selectedContent) {
      case 'Analytics':
        return <AnalyticsClickedPercentageChart />;
        case 'Total Employees':
        return <TotalEmployee />;
        case 'Total Clicked':
        return <TotalClicked />;
      /*case 'Admin Dashboard':
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          <div style={{ flex: '1 1 300px', minWidth: '300px' }}>
              <ClickedPercentageChart />
          </div>
          <div style={{ flex: '1 1 300px', minWidth: '300px' }}>
              <EmployeeCount />
          </div>
          <div style={{ flex: '1 1 600px', minWidth: '600px' }}>
              <TotalClickedChart />
          </div>
      </div>
        );*/
      case 'Add employee':
        return <AddEmployee />;
      case 'Send email':
        return <SendPhishingEmail />;
      case 'Employee list':
        return <EmployeeList />;
      case 'Logout':
        return null;
      default:
        return <Typography variant="h4">lkgdsj</Typography>;
    }
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
      color='#b9b7b7ff'
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          Phishing attack Simulator
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)`, } }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
