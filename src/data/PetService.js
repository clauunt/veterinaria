import axios from 'axios';

export function GetAllPets() {
    return axios.get('http://localhost:8080/api/pet');
}

export function GetPetById(id) {
    return axios.get('http://localhost:8080/api/pet/'+id);
}
  
export function NewPet(pet) {
    return axios.post('http://localhost:8080/api/pet',pet);
}

export function DeletePet(id,pet) {
    //agregar motivo
    return axios.put('http://localhost:8080/api/pet/delete/'+id,pet);
}

export function ModPets(id,pet) {
    return axios.put('http://localhost:8080/api/pet/'+id,pet);
}
