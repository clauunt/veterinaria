import axios from 'axios';

export function GetAllReason() {
  return axios.get('http://localhost:8080/api/deleteReason');
}

export function GetReasonById(id) {
    return axios.get('http://localhost:8080/api/deleteReason/'+id);
}

export function NewReason(reason) {
    return axios.post('http://localhost:8080/api/deleteReason',reason);
}

export function DeleteReason(id) {
    return axios.delete('http://localhost:8080/api/deleteReason/'+id);
}

export function ModReason(id,reason) {
    return axios.put('http://localhost:8080/api/deleteReason/'+id,reason);
}
