import { bootstrap } from './handlers/http/bootstrap.handler';
import process from 'process';
import { CreateArticleSchedule } from './handlers/schedules/create-article.schedule';

export const handlers = {
  http: {
    bootstrap: bootstrap,
  },
  schedules: {
    createArticle: CreateArticleSchedule,
  },
};

if (process.env.RUN_MODE !== 'serverless') {
  handlers.http.bootstrap();
}
