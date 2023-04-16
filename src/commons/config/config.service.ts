import process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'mongodb',
    host: String(process.env.DB_HOST),
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_NAME),
    autoLoadEntities: true,
    synchronize: false,
  },
  google: {
    customSearch: {
      auth: String(process.env.GOOGLE_CUSTOM_SEARCH_AUTH),
      cx: String(process.env.GOOGLE_CUSTOM_SEARCH_CX),
    },
  },
  openIa: {
    apiKey: String(process.env.OPEN_IA_API_KEY),
    organization: String(process.env.OPEN_IA_ORGANIZATION),
  },
});
