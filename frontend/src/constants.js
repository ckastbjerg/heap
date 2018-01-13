export const ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:1234'
    : 'https://heap-backend.now.sh';
