"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pagingCalc = void 0;

var _locustjsBase = require("locustjs-base");

var pagingCalc = function pagingCalc(page, recordCount, pageSize, visiblePages, options) {
  var _options = Object.assign({
    maxPageSize: 500,
    maxVisiblePages: 50,
    defaultPage: 1,
    defaultPageSize: 10,
    defaultVisiblePages: 10
  }, options);

  if (!(0, _locustjsBase.isNumeric)(_options.maxPageSize) || _options.maxPageSize < 0) {
    _options.maxPageSize = 500;
  }

  if (!(0, _locustjsBase.isNumeric)(_options.maxVisiblePages) || _options.maxVisiblePages < 0) {
    _options.maxVisiblePages = 50;
  }

  if (!(0, _locustjsBase.isNumeric)(_options.defaultPage) || _options.defaultPage < 0) {
    _options.defaultPage = 1;
  }

  if (!(0, _locustjsBase.isNumeric)(_options.defaultPageSize) || _options.defaultPageSize < 0) {
    _options.defaultPageSize = 10;
  }

  if (!(0, _locustjsBase.isNumeric)(_options.defaultVisiblePages) || _options.defaultVisiblePages < 0) {
    _options.defaultVisiblePages = 10;
  }

  var result = {
    page: page,
    recordCount: recordCount,
    pageSize: pageSize,
    visiblePages: visiblePages,
    pageCount: 0
  };

  if (!(0, _locustjsBase.isNumeric)(result.page)) {
    result.page = _options.defaultPage;
  }

  result.page = parseInt(result.page);

  if (result.page < 1) {
    result.page = _options.defaultPage;
  }

  if (!(0, _locustjsBase.isNumeric)(result.pageSize)) {
    result.pageSize = _options.defaultPageSize;
  }

  result.pageSize = parseInt(result.pageSize);

  if (result.pageSize < 1 || result.pageSize > _options.maxPageSize) {
    result.pageSize = _options.defaultPageSize;
  }

  if (!(0, _locustjsBase.isNumeric)(result.recordCount)) {
    result.recordCount = 0;
  }

  result.recordCount = parseInt(result.recordCount);

  if (result.recordCount < 0) {
    result.recordCount = 0;
  }

  result.pageCount = Math.floor(result.recordCount / result.pageSize);

  if (result.pageCount == 0) {
    result.pageCount = 1;
  }

  if (result.recordCount > result.pageCount * result.pageSize) {
    result.pageCount++;
  }

  if (result.pageCount > 0 && result.page > result.pageCount) {
    result.page = result.pageCount;
  }

  if (!(0, _locustjsBase.isNumeric)(result.visiblePages) || result.visiblePages < 0 || result.visiblePages > _options.maxVisiblePages) {
    result.visiblePages = _options.defaultVisiblePages;
  }

  result.fromPage = Math.ceil(result.page / result.visiblePages);
  result.fromPage = (result.fromPage - 1) * result.visiblePages + 1;
  result.toPage = result.fromPage + result.visiblePages - 1;

  if (result.toPage > result.pageCount) {
    result.toPage = result.pageCount;
  }

  result.fromRow = (result.page - 1) * result.pageSize + 1;
  result.toRow = result.fromRow + result.pageSize - 1;

  if (result.toRow > result.recordCount) {
    result.toRow = result.recordCount;
  }

  return result;
};

exports.pagingCalc = pagingCalc;