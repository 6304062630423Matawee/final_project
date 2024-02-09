import "./product.css";
import React from 'react'
import Axios from 'axios'
import Button from '@mui/material/Button';
import { Delete, Edit, Add, Close } from "@mui/icons-material"
import { useState, useEffect } from 'react';
import Model from 'react-modal'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';






export default function Product() {


    const [visible, setvisible] = useState(false)
    const [product_img, setproduct_img] = useState("");
    const [product_name, setproduct_name] = useState("");
    const [product_type, setproduct_type] = useState("");
    const [product_brand, setproduct_brand] = useState("");
    const [product_detail, setproduct_detail] = useState("");
    const [product_price, setproduct_price] = useState(0);
    const [product_number, setproduct_number] = useState(0);
    const [productList, setproductList] = useState([]);


    const getproduct = () => {
        Axios.get('http://localhost:3001/product').then((response) => {
            setproductList(response.data);
        });

    }



    useEffect(() => {
        getproduct();
    }, []);

    const addProduct = () => {
        if (product_name == "" || product_img == "" || product_type == "" || product_brand == "" || product_detail == "" || product_price == "" || product_number == "") {

        } else {
            Axios.post("http://localhost:3001/create", {
                product_img: product_img.split("\\").pop(),
                product_name: product_name,
                product_type: product_type,
                product_brand: product_brand,
                product_detail: product_detail,
                product_price: product_price,
                product_number: product_number,
            }).then(() => {

                setproductList([
                    ...productList,
                    {
                        product_img: product_img.split("\\").pop(),
                        product_name: product_name,
                        product_type: product_type,
                        product_brand: product_brand,
                        product_detail: product_detail,
                        product_price: product_price,
                        product_number: product_number,
                    },
                ]);
            });
        }
    };

    const deleteproduct = (product_id) => {
        Axios.delete(`http://localhost:3001/delete/${product_id}`).then((response) => {
            setproductList(
                productList.filter((val) => {
                    return val.product_id != product_id;
                })
            )
        })

    }


    const editProduct = () => {
        Axios.post("http://localhost:3001/edit", {
            product_img: product_img,
            product_name: product_name,
            product_type: product_type,
            product_brand: product_brand,
            product_detail: product_detail,
            product_price: product_price,
            product_number: product_number,
        }).then(() => {
            setproductList([
                ...productList,
                {
                    product_img: product_img,
                    product_name: product_name,
                    product_type: product_type,
                    product_brand: product_brand,
                    product_detail: product_detail,
                    product_price: product_price,
                    product_number: product_number,
                },
            ]);
        });
    };






    return (




        <div >
            <h3>Product manage</h3>
            {/* <img src={require('../../picture/Manual chompoo.png').default} height={500} width={500}/> */}
            
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>IMG</th>
                        <th>Type</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Number</th>
                    </tr>
                </thead>
                <tbody>
                    {productList.map((val, key) => {
                        return (
                            <tr>
                                <td>{val.product_id}</td>
                                <td>{val.product_name}</td>
                                <td>{val.product_img}</td>
                                <td>{val.product_type}</td>
                                <td>{val.product_brand}</td>
                                <td>{val.product_price}</td>
                                <td>{val.product_number}</td>
                                <button type="button" class="btn btn-dark" onClick={() => { setvisible(true); setvisible(val.product_id); }}><Edit /></button>
                                <button type="button" class="btn btn-danger" variant="outlined" color="error" onClick={() => { deleteproduct(val.product_id) }}><Delete /></button>

                            </tr>
                        )

                    })}

                </tbody>
            </table>

            <p className='add' onClick={() => setvisible(true)}> <Add />ADD</p>



            {/* <Model isOpen={visible}>
            <h1>ADD Product</h1>
            <p className='close' onClick={()=>setvisible(false)}><Close /></p>
            <form className='form' action="">
                <div className='block1'>
                <div>
                <p>Product picture</p>
                    <input type="file" id="myFile" name="filename" onChange={(event) => {setproduct_img(event.target.value)} }></input>
                </div>
                <div>
                <p>Product Name</p>
                <TextField id="outlined-basic" label="Product NAME" variant="outlined" onChange={(event) => {setproduct_name(event.target.value)} } />
                </div>
                <div>
                <p>Product Type</p>
                    <select  onChange={(event) => {setproduct_type(event.target.value)} }>
                        <option value={"แอร์ติดผนัง"}>แอร์ติดผนัง</option>
                        <option value={"แอร์แขวน"}>แอร์แขวน</option>
                        <option value={"สี่ทิศทาง"}>สี่ทิศทาง</option>
                        <option value={"แอร์ตั้งพื้น"}>แอร์ตั้งพื้น</option>
                    </select>
                </div>
                <div>
                <p>Product Brand</p>
                <TextField id="outlined-basic" label="Product Brand" variant="outlined" onChange={(event) => {setproduct_brand(event.target.value)} }/>
                </div>
                </div>
                <div className='block2'>
                
                <div>
                <p>Product detail</p>
                <TextField id="outlined-basic" label="Product detail" variant="outlined" onChange={(event) => {setproduct_detail(event.target.value)} }/>
                </div>
                <div>
                <p>Product price</p>
                <TextField id="outlined-basic" label="Product price" variant="outlined" onChange={(event) => {setproduct_price(event.target.value)} }/>
                </div>
                <div>
                <p>Product Number</p>
                <TextField id="outlined-basic" label="Product number" variant="outlined" onChange={(event) => {setproduct_number(event.target.value)} }/>
                </div>
                </div>
                
              
            </form>
            <button onClick={addProduct}>add</button>

        </Model> */}


            <Model id='Model' isOpen={visible}>
                <h1>ADD product<p className='close' onClick={() => setvisible(false)}><Close /></p></h1>
                <hr></hr>

                <form>
                    <div>
                        <p>Product picture</p>
                        <input required type="file" id="myFile" name="filename" onChange={(event) => { setproduct_img(event.target.value) }}></input>
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">Product Name</label>
                        <input required type="text" class="form-control" id="formGroupExampleInput2" placeholder="" onChange={(event) => { setproduct_name(event.target.value) }}></input>
                    </div>
                    <div>
                        <p>Product Type</p>
                        <select required onChange={(event) => { setproduct_type(event.target.value) }}>
                            <option value="">เลือกประเภท</option>
                            <option value={"แอร์ติดผนัง"}>แอร์ติดผนัง</option>
                            <option value={"แอร์แขวน"} >แอร์แขวน</option>
                            <option value={"สี่ทิศทาง"}>สี่ทิศทาง</option>
                            <option value={"แอร์ตั้งพื้น"}>แอร์ตั้งพื้น</option>
                        </select>
                    </div>
                    <div>
                        <p>Product Brand</p>
                        <select required onChange={(event) => { setproduct_brand(event.target.value) }}>
                            <option selected value="">ระบุยี่ห้อ</option>
                            <option value={"A"}>A</option>
                            <option value={"B"}>B</option>
                            <option value={"C"}>C</option>
                            <option value={"D"}>D</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">Product Detail</label>
                        <input required type="text" class="form-control" id="formGroupExampleInput2" placeholder=""onChange={(event) => { setproduct_detail(event.target.value) }}></input>
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">Product Price</label>
                        <input required type="text" class="form-control" id="formGroupExampleInput2" placeholder="" onChange={(event) => { setproduct_price(event.target.value) }}></input>
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">Product Number</label>
                        <input required type="text" class="form-control" id="formGroupExampleInput2" placeholder="" onChange={(event) => {setproduct_number(event.target.value) }}></input>
                    </div>
                    <br></br>
                    <button  onClick={addProduct} class="btn btn-primary" type="submit">ADD</button>

                </form>

             

            </Model>




        </div>


    )
}
