// import React, { Fragment, useContext } from "react";
// import Navbar from "../../../components/Navbar";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import { UserContext, ProdContext } from "./../../../index";
// // import RSA encryption with nodejs js encrypt
// // import buffer
// // import { Buffer } from "buffer";

// import { JSEncrypt } from "nodejs-jsencrypt";
// import { Buffer } from "buffer";

// // @ts-ignore
// window.Buffer = Buffer;

// function Checkout() {
//   const user = useContext(UserContext);
//   const prodcontext = useContext(ProdContext);
//   const location = useLocation();
//   const { sales } = location.state;
//   console.log("sales", sales);

//   const checkout = async (event) => {
//     event.preventDefault();

//     // user by email
//     const user_idres = await axios.post("http://localhost:5000/userbyemail", {
//       user,
//     });
//     const user_id = user_idres.data[0].user_id;

//     const res = await axios.post("http://localhost:5000/cart/checkout", {
//       loccart: sales,
//       total: 5136,
//       user_id: user_id,
//     });

//     // localStorage.removeItem("cart");
//     // const res = window.confirm("Are you sure you want to checkout?");

//     // window.location.reload();
//     window.location.href = "/";
//   };

//   const newcheckout = async (event) => {
//     event.preventDefault();
//     // mpesa open api
//     // const res = await axios.post("https://openapi.m-pesa.com/sandbox/ipg/v2/vodafoneGHA/c2bPayment/singleStage/");
//     const res = await axios.get("http://localhost:5000/checkout/mpesaapi");
//     console.log("sessionKey", res);
//   };

//   return (
//     <Fragment>
//       <Navbar />
//       <div>
//         <h1 class="text-center mt-5">Checkout</h1>
//       </div>

//       <div class="row justify-content-center">
//         <button onClick={newcheckout}>New checkout payment mpesa api</button>

//         <div class="col-md-6">
//           {/* <div class="table-responsive">  */}
//           <table class="table mt-5 text-center">
//             <thead>
//               <tr>
//                 <th>Product ID</th>
//                 <th>Quantity</th>
//                 <th>Price</th>
//                 {/* <th>Subtotal</th> */}
//                 {/* <th>Sale total</th>
//         <th>Customer Id</th>
//         <th>View</th>
//         <th>Edit</th>
//         <th>Delete</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {sales.map((sale) => (
//                 <tr>
//                   <td>
//                     {/* {sale.product_id} */}
//                     {prodcontext.map((prod) =>
//                       prod.product_id === sale.product_id
//                         ? prod.product_name
//                         : null
//                     )}
//                   </td>
//                   <td>
//                     <div class="row justify-content-center">
//                       <div class="ml-1 mr-1">{sale.quantity}</div>
//                     </div>
//                   </td>
//                   <td>100</td>
//                   {/* <td>200</td> */}
//                   {/*<td>{sale.user_id}</td> */}
//                   {/* <td>{product.images}</td> */}
//                   {/* <td>
//                     <input type="checkbox" checked={product.shop==true&&"true"}></input>
//                 </td> */}
//                   {/* <td>
//                     <EditProduct product={product}/>
//                 </td> */}
//                   {/* <td> */}
//                   {/* <button class="btn btn-primary"
//                     type="button" onClick={viewSale(sale)}>Open</button> */}
//                   {/* <ViewSaleItems sale={sale}/> */}
//                   {/* </td> */}
//                   {/* <td>
//                     <button class="btn btn-warning"
//                     onClick={() => deleteProduct(sale.sale_id)}>Edit</button>
//                 </td> */}
//                 </tr>
//               ))}
//             </tbody>

//             {/* footer */}
//             <tfoot>
//               <tr>
//                 <td>
//                   <div class="row justify-content-center">
//                     <button class="btn btn-primary" onClick={checkout}>
//                       Checkout
//                     </button>
//                   </div>
//                   {/* <div class="row justify-content-center">
//                     <button class="btn btn-primary" onClick={checkout}>Checkout</button>
//                 </div> */}
//                 </td>
//                 <td></td>
//                 <td>
//                   <div class="row justify-content-center">
//                     <div class="ml-1 mr-1">Total: 5136</div>
//                   </div>
//                 </td>
//               </tr>
//             </tfoot>
//           </table>

//           {/* </div> */}
//         </div>
//       </div>
//     </Fragment>
//   );
// }

// export default Checkout;
