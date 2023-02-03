import axios from 'axios';

export function GetAllUsers() {
    return axios.get('http://localhost:8080/api/users');
}

export function GetUserById(id) {
    return axios.get('http://localhost:8080/api/users/'+id);
}

export function NewUser(user) {
    return axios.post('http://localhost:8080/api/users',user);
}

export function ModUser(id,user) {
    return axios.put('http://localhost:8080/api/users/'+id,user);
}

export function DeleteUser(id) {
    return axios.delete('http://localhost:8080/api/users/'+id);
}

export function ValidateUserLogin(user) {
    return axios.post('http://localhost:8080/api/login', user);
}

export function MailSend(mail) {
    return axios.post('http://localhost:8080/api/login/recovery', mail);
}

export function CodeSend(code) {
    return axios.post('http://localhost:8080/api/login/codeCheck', code);
}

export function ChangePass(pass, id) {
    return axios.put('http://localhost:8080/api/login/changePass/'+id, pass);
}