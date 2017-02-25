import async from 'async';
import Homework from '../model/homework';
import Paper from '../model/paper';
import constant from '../config/constant';

export default class HomeworkContorller {
  getAll(req, res, next) {
    async.series({
      totalCount: (done) => {
        Homework.count(done);
      },
      items: (done) => {
        Homework.find(done);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.Ok).send(result);
    });
  }

  getOne(req, res, next) {
    Homework.findById(req.params.id, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.status(constant.httpCode.Ok).send(doc);
    });
  }

  create(req, res, next) {
    Homework.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send(`homeworks/${doc._id}`);
    })
  }

  delete(req, res, next) {
    async.waterfall([
      (done) => {
        Paper.findOne({homeworks: req.params.id}, (err, doc) => {
          if (err) {
            return next(err);
          }
          if (doc) {
            return done(true, null);
          }
          return done(null, doc);
        });
      },
      (doc, done) => {
        Homework.findByAndRemove(req.params.id, done);
      }
    ], (err, doc) => {
      if (err === true) {
        return res.sendStatus(constant.httpCode.BAD_REQUEST);
      }
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }

  update(req, res, next) {
    Homework.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}
