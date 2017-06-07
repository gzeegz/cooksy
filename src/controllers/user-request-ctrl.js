var db = require('../models');

var userRequestInclude = [
  {
    model: db.User,
    as: 'user',
    attributes: { exclude: ['password'] }
  },
  {
    model: db.Request,
    as: 'request',
    include: [
      {
        model: db.Meal,
        as: 'meal',
        include: [
          {
            model: db.Chef,
            as: 'chef',
            attributes: { exclude: ['password', 'address'] }
          }
        ]
      }
    ]
  }
];

exports.getRequest = function(id) {
  return db.UserRequest.findById(id, {
    include: userRequestInclude
  });
};

exports.getUserRequests = function(userId) {
  return db.UserRequest.findAll({
    where: { id: userId },
    include: userRequestInclude
  });
};

exports.createRequest = function(request) {
  return db.UserRequest.create(request)
    .then(function(req) {
      return db.UserRequest.findById(req.id, {
        include: userRequestInclude
      });
    });
};
