import async from 'async';
import Homework from '../model/homework';

export default class HomeContorller {
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
      return res.status(200).send(result);
    });
  }

  getOne(req, res, next) {
    Homework.findById(req.params.id, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }
      res.status(200).send(doc);
    });
  }

  create(req, res, next) {
    Homework.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(201).send(`homeworks/${doc._id}`);
    })
  }

  delete(req, res, next) {
    Homework.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }
      return res.sendStatus(204);
    });
  }

  update(req, res, next) {
    Homework.findByIdAndUpdate(req.params.id, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }
      return res.sendStatus(204);
    });
  }


}
