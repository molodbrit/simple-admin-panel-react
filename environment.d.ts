declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN?: string;
      NODE_ENV: 'development' | 'production';
      BLOG_ADMIN_SERVER_URL: string;
      BLOG_ADMIN_SERVER_APIKEY: string;
    }
  }
}

export {};
