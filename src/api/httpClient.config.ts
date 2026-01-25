import axios, { type AxiosInstance, type AxiosRequestConfig, type InternalAxiosRequestConfig, type AxiosError } from 'axios';
<<<<<<< HEAD
=======
import type { ApiErrorResponse } from '../types/api.types';
>>>>>>> 9590e4f209acff68db4dc49b898d6d75cc29b111

/**
 * Configuración base de la instancia de axios
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const REQUEST_TIMEOUT_MS = 30000; // 30 segundos

/**
<<<<<<< HEAD
=======
 * Variable para almacenar el token CSRF en memoria
 */
let csrfToken: string | null = null;

/**
 * Obtiene el token CSRF del servidor
 */
const fetchCsrfToken = async (): Promise<string> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/csrf-token`, {
      withCredentials: true,
    });
    csrfToken = response.data.token || response.data.csrfToken;
    return csrfToken || '';
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};

/**
>>>>>>> 9590e4f209acff68db4dc49b898d6d75cc29b111
 * Crea y configura una instancia de axios con interceptors de seguridad
 */
const createAxiosInstance = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: REQUEST_TIMEOUT_MS,
    headers: {
      'Content-Type': 'application/json',
    },
<<<<<<< HEAD
  });

  // Interceptor de solicitud - añade token de autenticación si existe
  axiosInstance.interceptors.request.use(
    (requestConfig: InternalAxiosRequestConfig) => {
      // Obtener token del localStorage
      const authToken = localStorage.getItem('authToken');
      
      if (authToken && requestConfig.headers) {
        requestConfig.headers.Authorization = `Bearer ${authToken}`;
      }

      // Añadir timestamp para evitar caché
=======
    withCredentials: true, // Permite enviar cookies en peticiones cross-origin
  });

  // Interceptor de solicitud - añade token CSRF a peticiones que lo requieren
  axiosInstance.interceptors.request.use(
    async (requestConfig: InternalAxiosRequestConfig) => {
      // Las cookies (incluyendo __Host-psifi.x-csrf-token) se envían automáticamente
      // gracias a withCredentials: true
      
      // Rutas que NO requieren token CSRF en el header
      const CSRF_EXCLUDED_ROUTES = ['/auth/login', '/auth/register', '/csrf-token'];
      const requiresCsrf = !CSRF_EXCLUDED_ROUTES.some(route => requestConfig.url?.includes(route));
      
      // Métodos que requieren token CSRF
      const METHODS_REQUIRING_CSRF = ['POST', 'PUT', 'PATCH', 'DELETE'];
      const methodRequiresCsrf = METHODS_REQUIRING_CSRF.includes(requestConfig.method?.toUpperCase() || '');

      // Obtener y añadir token CSRF si es necesario
      if (requiresCsrf && methodRequiresCsrf) {
        if (!csrfToken) {
          await fetchCsrfToken();
        }
        if (csrfToken && requestConfig.headers) {
          requestConfig.headers['x-csrf-token'] = csrfToken;
        }
      }

      // Añadir timestamp para evitar caché en peticiones GET
>>>>>>> 9590e4f209acff68db4dc49b898d6d75cc29b111
      if (requestConfig.method === 'get') {
        requestConfig.params = {
          ...requestConfig.params,
          _t: Date.now(),
        };
      }

      return requestConfig;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor de respuesta - maneja errores globalmente
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        switch (error.response.status) {
          case 401:
<<<<<<< HEAD
            // Token expirado o no válido - limpiar localStorage y redirigir a login
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            window.location.href = '/login';
            break;
          case 403:
            // Acceso prohibido
            console.error('Acceso prohibido a este recurso');
            break;
          case 404:
            // Recurso no encontrado
            console.error('Recurso no encontrado');
=======
            // No autenticado - redirigir a login
            // Las cookies se limpian automáticamente desde el servidor
            window.location.href = '/login';
            break;
          case 403: {
            // Acceso prohibido o token CSRF inválido/faltante
            console.error('Access forbidden to this resource');
            // Si es error CSRF, intentar obtener un nuevo token
            const errorData = error.response.data as ApiErrorResponse;
            if (errorData?.code === 'EBADCSRFTOKEN' || errorData?.message?.includes('CSRF')) {
              console.warn('Invalid CSRF token, fetching new one...');
              csrfToken = null; // Resetear token
              fetchCsrfToken().catch(err => console.error('Failed to refresh CSRF token:', err));
            }
            break;
          }
          case 404:
            // Recurso no encontrado
            console.error('Resource not found');
>>>>>>> 9590e4f209acff68db4dc49b898d6d75cc29b111
            break;
          case 500:
          case 502:
          case 503:
            // Error del servidor
<<<<<<< HEAD
            console.error('Error del servidor. Por favor, inténtelo más tarde');
            break;
          default:
            console.error('Error en la petición:', error.response.data);
        }
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor');
      } else {
        // Algo sucedió al configurar la solicitud
        console.error('Error al configurar la petición:', error.message);
=======
            console.error('Server error. Please try again later');
            break;
          default:
            console.error('Request error:', error.response.data);
        }
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error('No response received from server');
      } else {
        // Algo sucedió al configurar la solicitud
        console.error('Error setting up the request:', error.message);
>>>>>>> 9590e4f209acff68db4dc49b898d6d75cc29b111
      }
      
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

/**
 * Instancia configurada de axios para uso global
 */
export const apiClient = createAxiosInstance();

/**
<<<<<<< HEAD
=======
 * Función para obtener el token CSRF (útil para inicialización)
 * Se llama automáticamente en la primera petición que lo requiera
 */
export const initializeCsrfToken = fetchCsrfToken;

/**
>>>>>>> 9590e4f209acff68db4dc49b898d6d75cc29b111
 * Función helper para crear configuración personalizada de axios
 */
export const createConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config?.headers,
    },
  };
};

/**
 * Sanitiza los datos de entrada para prevenir inyección de código
 */
export { sanitizeData } from './dataSanitizer';

export default apiClient;
