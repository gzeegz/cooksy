var db = require('../models');

var mealReviewInclude = [
  {
    model: db.User,
    as: 'user',
    attributes: {
      exclude: ['password']
    }
  },
  {
    model: db.Meal,
    as: 'meal'
  }
];

exports.getReview = function(id) {
  return db.MealReview.findById(id, {
    include: mealReviewInclude
  });
};

exports.createReview = function(mealId, userId, payload) {
  return db.MealReview.create({
    rating: payload.rating,
    title: payload.title,
    review: payload.review,
    mealId: mealId,
    userId: userId
  }).then(function(review) {
    return db.MealReview.findById(review.id, {
      include: mealReviewInclude
    });
  });
};

exports.getUserReviews = function(userId) {
  return db.MealReview.findAll({
    where: { userId: userId },
    include: mealReviewInclude
  });
};

exports.updateReview = function(reviewId, payload) {
  return db.MealReview.findById(reviewId)
    .then(function(review) {
      return review.update(payload);
    })
    .then(function() {
      return db.MealReview.findById(reviewId, {
        include: mealReviewInclude
      });
    });
};

exports.deleteReview = function(reviewId) {
  return db.MealReview.findById(reviewId)
    .then(function(review) {
      if (review) {
        review.destroy();
      }
      return review;
    })
    .then(function() {
      return db.MealReview.findById(reviewId, {
        include: mealReviewInclude
      });
    });
};
