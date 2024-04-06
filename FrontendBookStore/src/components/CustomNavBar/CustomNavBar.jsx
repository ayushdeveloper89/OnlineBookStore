import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logInStatus } from '../../store/reducers/logIn.js';
import { Icon } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

const CustomNavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies(['accessToken']);
    // const [, , removeCookieRefresh] = useCookies(['refreshToken']);
    const { logIn } = useSelector((state) => state.logIn);
    const { userName } = useSelector((state) => state.userInfo);
    const { userRole } = useSelector((state) => state.userInfo);
    const { cartArr } = useSelector((state) => state.cart);

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        removeCookie("accessToken");
        // removeCookieRefresh('refreshToken')
        dispatch(logInStatus({ status: false }));
    }

    const handleManageBook = () => {
        handleCloseUserMenu()
        navigate('/admin/managebooks')
    }
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ color: "white", textDecoration: "none", margin: "0 10px" }}>
                            Dashboard
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant={'h5'} textAlign="center">Online Book Store</Typography>
                    </Box>
                    {logIn ?
                        <Box sx={{ flexGrow: 1 }} textAlign="end">
                            <span style={{ position: 'relative', top: '3px', right: '25px' }}>
                            <Link to="/cart" style={{ color: "white", textDecoration: "none", margin: "0 10px" }}>
                                
                                <Badge badgeContent={`${cartArr.length}`} color="error">
                                    <ShoppingCartIcon sx={{ color: 'white' }} fontSize={'large'} />
                                </Badge>
                            </Link>
                            </span>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* {settings.map((setting) => ( */}
                                <MenuItem key={"My Account"} >
                                    <Typography textAlign="center">{`Welcome ${userName.toUpperCase()}`}</Typography>
                                </MenuItem>
                                {userRole === "appAdmin" ? <MenuItem key={"Manage Books"} onClick={handleManageBook}>
                                    <Typography textAlign="center">{"Manage Books"}</Typography>
                                </MenuItem> : null}
                                <MenuItem key={"Logout"} onClick={handleLogOut}>
                                    <Typography textAlign="center">{"Logout"}</Typography>
                                </MenuItem>
                                {/* ))} */}
                            </Menu>
                        </Box>
                        : <Box sx={{ flexGrow: 1 }} textAlign="end">
                            <Link to="/auth/login" style={{ color: "white", textDecoration: "none", margin: "0 10px" }}>
                                LOGIN
                            </Link>
                            <Link to="/auth/signup" style={{ color: "white", textDecoration: "none", margin: "0 10px" }}>
                                SIGNUP
                            </Link>
                        </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default CustomNavBar
