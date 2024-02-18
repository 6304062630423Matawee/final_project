
import Sidebar from "./component/sidebar/Sidebar";
import Product from "./pages/product/Product";
import Employee from "./pages/employee/Employee";
import Quotation from "./pages/quotation/Quotation";
import Editproduct from "./pages/product/Editproduct";
import SignUp from "./pages/Login/SignUp";
import Calendar from "./pages/calender/Calendar";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {



  return (
    <div className="m-main" >

      <BrowserRouter>


        <Routes>
          <Route>

            <Route path="SignUp" element={<SignUp />} />
            <Route path="Quotation" element={
              <>
                <Sidebar />
                <Quotation />
                
              
              </>
            } />
            <Route path="Product" element={
              <>
                <Sidebar />
                <Product />
              
              </>
            } />
            <Route path="Employee" element={
              <>
                <Sidebar />
                <Employee />
                
              
              </>
            } />
             <Route path="Calendar" element={
              <>
                <Sidebar />
                <Calendar />
              
              </>
            } />
        
            

       

            <Route path="/Editproduct/:product_id" element={<Editproduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
