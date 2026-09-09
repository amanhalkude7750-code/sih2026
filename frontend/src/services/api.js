/**
 * Core API Client Adapter
 * 
 * Implements REST contract handling for Land Governance APIs:
 * - Expected success response: { success: true, data: ... }
 * - Expected error response:   { success: false, error: { code: '...', message: '...' } }
 * - Network failure and timeout resiliency
 */

import { ENV } from '../config/env.js';

export class ApiClient {
  constructor() {
    this.baseUrl = ENV.API_BASE_URL;
    this.timeout = ENV.API_TIMEOUT_MS;
  }

  /**
   * Generic request handler with timeout, structured contract parsing, and error mapping
   */
  async request(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const rawJson = await response.json().catch(() => null);

      // Handle HTTP error statuses (4xx, 5xx)
      if (!response.ok) {
        const errorInfo = rawJson?.error || {};
        const error = new Error(
          errorInfo.message || `HTTP Error ${response.status}: ${response.statusText}`
        );
        error.code = errorInfo.code || (response.status === 404 ? 'RESOURCE_NOT_FOUND' : `HTTP_${response.status}`);
        error.status = response.status;
        error.data = rawJson;
        throw error;
      }

      // Handle backend API Contract format { success, data, error }
      if (rawJson && typeof rawJson === 'object') {
        if (rawJson.success === false) {
          const errorInfo = rawJson.error || {};
          const error = new Error(errorInfo.message || 'Land governance API operation failed');
          error.code = errorInfo.code || 'API_ERROR';
          error.status = 400;
          error.data = rawJson;
          throw error;
        }

        // Standardized contract { success: true, data: ... }
        if ('success' in rawJson && 'data' in rawJson) {
          return rawJson;
        }

        // Return wrapped response if server returned raw data object
        return {
          success: true,
          data: rawJson,
        };
      }

      return {
        success: true,
        data: rawJson,
      };
    } catch (err) {
      clearTimeout(timeoutId);

      // Handle timeout
      if (err.name === 'AbortError') {
        const timeoutErr = new Error(`Request timed out after ${this.timeout}ms`);
        timeoutErr.code = 'TIMEOUT';
        timeoutErr.isNetworkError = true;
        throw timeoutErr;
      }

      // Handle Network Connection Refused / Offline / CORS failure
      if (err instanceof TypeError && (err.message.includes('fetch') || err.message.includes('NetworkError'))) {
        const netErr = new Error(`Unable to connect to land governance API at ${url}`);
        netErr.code = 'NETWORK_FAILURE';
        netErr.isNetworkError = true;
        netErr.originalError = err;
        throw netErr;
      }

      throw err;
    }
  }

  get(endpoint, params = {}) {
    // Filter out undefined/null/empty params
    const cleanParams = Object.entries(params).reduce((acc, [k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        acc[k] = v;
      }
      return acc;
    }, {});

    const query = new URLSearchParams(cleanParams).toString();
    const fullEndpoint = query ? `${endpoint}?${query}` : endpoint;
    return this.request(fullEndpoint, { method: 'GET' });
  }

  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient();
