import React from "react";
import axios from 'axios';
import Product from "./Product";
import useAsync from "../customHook/useAsync";
import { API_URL } from "../config/contansts";
import '../scss/Products.scss'
import { useLocation } from 'react-router-dom';

const Products = () => {
  const location = useLocation();
  let userInfo = '';
  try {
    userInfo = location.state.searchData;
  } catch (error) {
    console.log("전부조회"); 
  }

  console.log("userInfo: ", userInfo);

  const getProducts = async () => {
    const endpoint = userInfo ? `/products/search?search=${userInfo}` : '/products';
    try {
      const res = await axios.get(`${API_URL}${endpoint}`);
      console.log(`res(${endpoint}): `, res.data);
      return res.data;
    } catch (error) {
      console.error("API Error: ", error);
      throw error;
    }
  }
  
  const [state ] = useAsync(getProducts, [userInfo]);
  const { loading, data:products, error} = state; //state구조분해 
  if(loading) return <div>로딩중 ......</div>
  if(error) return <div>에러가 발생했습니다.</div>
  if(!products){
    return <div>로딩중입니다.</div>
  }  

  return(
    <>
      <h2>상품 목록</h2>
      <div id="products-list">
        {products.map(product => <Product key = {product.id} product={product} />)}
      </div>
    </>
  )
}

export default Products;