import CustomNavBar from '../CustomNavBar/CustomNavBar.jsx';
import { Outlet } from 'react-router-dom';

const Mainlayout = () => {
  return (
    <>
      <CustomNavBar />
      <Outlet />
    </>
  )
}

export default Mainlayout
