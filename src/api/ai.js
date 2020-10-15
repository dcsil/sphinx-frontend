import axios from 'axios';

const AI_URL = 'https://sphinx-model.herokuapp.com';
const defaultConfig = {
    timeout: 5000,
};

export function testFlaskEnv() {
    return axios.get(
        AI_URL,
        {
            mode: 'cors',
            credentials: 'include',
        },
        defaultConfig,
    );
}
