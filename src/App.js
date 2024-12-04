import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import Nav from './Component/Nav';
import Foot from './Component/Foot';
import About from './Pages/About';
import HealthyRe from './Pages/HealthyRe';
import Admin from './Pages/Admin';
import ManageCat from './Admin/ManageCat';
import ManageRec from './Admin/ManageRec';
import ViewDish from './Admin/ViewDish';
import AddRec from './Admin/AddRec';
import ViewUser from './Admin/ViewUser';
import ManageRequest from './Admin/ManageRequest';
import ManagePayment from './Admin/ManagePayment';
import AdFeedback from './Admin/AdFeedback';
import Addcart from './Admin/Addcart';
import Update from './Admin/Update';
import Login from './Component/Login';
import Reg from './Component/Reg';
import SingleRec from './Pages/SingleRec';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Status from './Admin/Status';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/About' element={<About/>}></Route>
        <Route path='/Healthy' element={<HealthyRe/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/ManageCat' element={<ManageCat/>}></Route>
        <Route path='/ManageRec' element={<ManageRec/>}></Route>
        <Route path='/ViewDish' element={<ViewDish/>}></Route>
        <Route path='/AddRec' element={<AddRec/>}></Route>
        <Route path='/ViewUser' element={<ViewUser/>}></Route>
        <Route path='/ManageRequest' element={<ManageRequest/>}></Route>
        <Route path='/ManagePayment' element={<ManagePayment/>}></Route>
        <Route path='/AdFeedback' element={<AdFeedback/>}></Route>
        <Route path='/Addcart' element={<Addcart/>}></Route>
        <Route path='/Update/:id' element={<Update/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Reg' element={<Reg/>}></Route>
        <Route path='/singleView/:id' element={<SingleRec/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/Payment' element={<Checkout/>}></Route>
        <Route path='/Status' element={<Status/>}></Route>
          </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
