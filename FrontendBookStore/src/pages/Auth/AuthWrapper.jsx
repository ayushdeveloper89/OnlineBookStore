import { Grid } from "@mui/material";
import authImage from '../../assets/authImage.jpg';
import { useSelector } from 'react-redux';

const AuthWrapper = ({ children }) => {
    const { mobileView } = useSelector((state) => state.appStatus);
    return (
        <Grid container style={{  backgroundColor: "aliceblue" }}>
            {!mobileView ? <Grid item xs={6}>
                <img src={authImage} alt="" style={{ width: "100%", height: "calc(100vh - 70px)" }} />
            </Grid> : null}
            <Grid item xs={mobileView ? 12 : 6} >
                {children}
            </Grid>
        </Grid>
    )
}

export default AuthWrapper
