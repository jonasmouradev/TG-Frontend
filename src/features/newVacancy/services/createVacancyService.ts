// src/features/createJob/services/createJobService.ts
import axios from 'axios';
import { FullJobType } from '../schemas';

export async function createJob(data: Partial<FullJobType>) {
  const response = await axios.post('/jobs', data);
  return response.data;
}
