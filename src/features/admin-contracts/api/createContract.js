
import api from '../../../lib/api';

export async function createContract(form) {
    const data = new FormData();
    data.append('user_id', form.user_id);
    data.append('type', form.type);
    data.append('title', form.title);
    if (form.file) data.append('file', form.file);

    const res = await api.post(`/contracts`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res.data;
}