"use strict";

var Book = require("../models/book");

var Author = require("../models/author");

var Genre = require("../models/genre");

var BookInstance = require("../models/bookinstance");

var async = require("async");

exports.index = function (req, res) {
  // res.send("NOT IMPLEMENTED: Site Home Page");
  async.parallel({
    book_count: function book_count(callback) {
      Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
    },
    book_instance_count: function book_instance_count(callback) {
      BookInstance.countDocuments({}, callback);
    },
    book_instance_available: function book_instance_available(callback) {
      BookInstance.countDocuments({
        status: "Available"
      }, callback);
    },
    author_count: function author_count(callback) {
      Author.countDocuments({}, callback);
    },
    genre_count: function genre_count(callback) {
      Genre.countDocuments({}, callback);
    }
  }, function (err, results) {
    res.render("index", {
      title: "Local Library Home",
      error: err,
      data: results
    });
  });
}; // The async.parallel() method is passed an object with functions for getting the counts for each of our models.
//  These functions are all started at the same time. When all of them have completed the final callback is invoked with
// the counts in the results parameter (or an error).
// Display list of all books.


exports.book_list = function (req, res, next) {
  Book.find({}, "title author") // return only title and author params of book
  .populate("author") // this replaces stored bookid with full author details
  .exec(function (err, results) {
    if (err) {
      return next(err);
    } // succesfull


    res.render("book_list", {
      title: "Book List",
      data: results
    });
  });
}; // Display detail page for a specific book.


exports.book_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: Book detail: " + req.params.id);
}; // Display book create form on GET.


exports.book_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book create GET");
}; // Handle book create on POST.


exports.book_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book create POST");
}; // Display book delete form on GET.


exports.book_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete GET");
}; // Handle book delete on POST.


exports.book_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete POST");
}; // Display book update form on GET.


exports.book_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book update GET");
}; // Handle book update on POST.


exports.book_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book update POST");
};