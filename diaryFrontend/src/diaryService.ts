import axios from 'axios';
import { Diary, newDiary } from './type';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
    return axios
        .get<Diary[]>(baseUrl)
        .then(response => response.data)
}

export const createDiary = (object: newDiary) => {
    return axios
        .post<Diary>(baseUrl, object)
        .then(response => response.data)
}

