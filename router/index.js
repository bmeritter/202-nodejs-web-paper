import homeworks from './routers/homeworks';
import papers from './routers/paper';

export default function (app) {
  app.use('/homeworks', homeworks);
  app.use('/papers', papers);
}