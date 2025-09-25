import { Counter } from '../stores/countdownStore';

const API_BASE_URL = 'http://localhost:3001/api';

export interface CreateCounterData {
  name: string;
  targetDate: string;
  description?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Lấy tất cả counters
  async getCounters(): Promise<Counter[]> {
    return this.request<Counter[]>('/counters');
  }

  // Tạo counter mới
  async createCounter(data: CreateCounterData): Promise<Counter> {
    return this.request<Counter>('/counters', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Cập nhật counter
  async updateCounter(id: string, data: Partial<CreateCounterData>): Promise<Counter> {
    return this.request<Counter>(`/counters/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Xóa counter
  async deleteCounter(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/counters/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();