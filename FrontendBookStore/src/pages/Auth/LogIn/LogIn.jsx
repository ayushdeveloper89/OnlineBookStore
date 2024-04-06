import { Grid, Typography } from "@mui/material";
import AuthWrapper from "../AuthWrapper";
import LogInForm from "./LogInForm";

const LogIn = () => {
  return (
    <>
      <AuthWrapper>
        <Grid item container xs={12} justifyContent={"center"} alignItems={"center"} style={{ height: "calc(100vh - 70px)", flexDirection: "column" }}>
          <Typography variant="h3" textAlign={"center"} mb={5}>Login</Typography>
          <Grid item xs={6} >
            <LogInForm />
          </Grid>
        </Grid>
      </AuthWrapper>
    </>
  )
}

export default LogIn
