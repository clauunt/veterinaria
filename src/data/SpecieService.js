import axios from 'axios';

export function GetAllSpecies() {
  return axios.get('http://localhost:8080/api/specie');
}

export function GetSpeciesById(id) {
    return axios.get('http://localhost:8080/api/specie/'+id);
}

export function NewSpecie(specie) {
    return axios.post('http://localhost:8080/api/specie',specie);
}

export function DeleteSpecie(id) {
    return axios.delete('http://localhost:8080/api/specie/'+id);
}

export function ModSpecie(id,specie) {
    return axios.put('http://localhost:8080/api/specie/'+id,specie);
}
