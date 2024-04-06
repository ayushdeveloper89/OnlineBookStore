import { Grid, Typography } from "@mui/material";
import AuthWrapper from "../AuthWrapper";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <>
      <AuthWrapper>
        <Grid item container xs={12} justifyContent={"center"} alignItems={"center"} style={{ height: "calc(100vh - 70px)" }}>
          <Typography variant="h3" textAlign={"center"}>Signup Form</Typography>
          <Grid item xs={10} >
            <SignupForm />
          </Grid>
        </Grid>
      </AuthWrapper>
    </>
  )
}

export default Signup
