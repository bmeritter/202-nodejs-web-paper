import async from 'async';
import Paper from '../model/paper';
import constant from '../config/constant';

const mapHomeworkToUri = (homework) => {
  return homework.map(({_id}) => {
    return {uri: `homeworks/${_id}`}
  });
};

export default class PaperContorller {
  getAll(req, res, next) {
    async.series({
      totalCount: (done) => {
        Paper.count(done);
      },
      items: (done) => {
        Paper.find({})
          .populate('homeworks')
          .exec((err, docs) => {
            if (err) {
              return next(err);
            }

            let papers = docs.map((doc) => {
              let paper = doc.toJSON();
              let quizzes = mapHomeworkToUri(paper.homeworks);
              paper.homeworks = quizzes;
              return paper;
            });
            done(null, papers);
          })
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.Ok).send(result);
    });
  }

  getOne(req, res, next) {
    Paper.findById(req.params.id)
      .populate('homeworks')
      .exec((err, doc) => {
        if (err) {
          return next(err);
        }
        if (!doc) {
          return res.sendStatus(constant.httpCode.NOT_FOUND);
        }

        let paper = doc.toJSON();
        let quizzes = mapHomeworkToUri(paper.homeworks);
        paper.homeworks = quizzes;

        res.status(constant.httpCode.Ok).send(paper);
      });
  }

  create(req, res, next) {
    Paper.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send(`papers/${doc._id}`);
    })
  }

  delete(req, res, next) {
    Paper.findOneAndRemove(req.params.id, (err, doc) => {
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
    Paper.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
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
