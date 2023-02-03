import axios from 'axios';

export function GetAllProducts() {
    return axios.get('http://localhost:8080/api/product');
}

export function CreateProducts(product) {
    return axios.post('http://localhost:8080/api/product', product);
}

export function ModProducts(id, product) {
    return axios.post('http://localhost:8080/api/product/'+id, product);
}

export function ModStock(id, stock) {
    return axios.post('http://localhost:8080/api/product/'+id, stock);
}

export function DeleteProduct(id) {
    return axios.post('http://localhost:8080/api/product/'+id);
}