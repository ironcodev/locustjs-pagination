import { isNumeric } from "locustjs-base";
const validateOptions = options => {
  const result = Object.assign({
    maxPageSize: 500,
    maxVisiblePages: 50,
    defaultPage: 1,
    defaultPageSize: 10,
    defaultVisiblePages: 10
  }, options);
  if (!isNumeric(result.maxPageSize) || result.maxPageSize < 0) {
    result.maxPageSize = 500;
  }
  if (!isNumeric(result.maxVisiblePages) || result.maxVisiblePages < 0) {
    result.maxVisiblePages = 50;
  }
  if (!isNumeric(result.defaultPage) || result.defaultPage < 0) {
    result.defaultPage = 1;
  }
  if (!isNumeric(result.defaultPageSize) || result.defaultPageSize < 0) {
    result.defaultPageSize = 10;
  }
  if (!isNumeric(result.defaultVisiblePages) || result.defaultVisiblePages < 0) {
    result.defaultVisiblePages = 10;
  }
  return result;
};
const pagingCalc = function (page, recordCount, pageSize, visiblePages, options) {
  options = validateOptions(options);
  const result = {
    page: page,
    recordCount: recordCount,
    pageSize: pageSize,
    visiblePages: visiblePages,
    pageCount: 0
  };
  if (!isNumeric(result.page)) {
    result.page = options.defaultPage;
  }
  result.page = parseInt(result.page);
  if (result.page < 1) {
    result.page = options.defaultPage;
  }
  if (!isNumeric(result.pageSize)) {
    result.pageSize = options.defaultPageSize;
  }
  result.pageSize = parseInt(result.pageSize);
  if (result.pageSize < 1 || result.pageSize > options.maxPageSize) {
    result.pageSize = options.defaultPageSize;
  }
  if (!isNumeric(result.recordCount)) {
    result.recordCount = 0;
  }
  result.recordCount = parseInt(result.recordCount);
  if (result.recordCount < 0) {
    result.recordCount = 0;
  }
  result.pageCount = Math.floor(result.recordCount / result.pageSize);
  if (result.recordCount > result.pageCount * result.pageSize) {
    result.pageCount++;
  }
  if (result.page > result.pageCount) {
    result.page = result.pageCount;
  }
  if (!isNumeric(result.visiblePages) || result.visiblePages < 0 || result.visiblePages > options.maxVisiblePages) {
    result.visiblePages = options.defaultVisiblePages;
  }
  result.fromPage = Math.ceil(result.page / result.visiblePages);
  result.fromPage = (result.fromPage - 1) * result.visiblePages + 1;
  result.toPage = result.fromPage + result.visiblePages - 1;
  if (result.toPage > result.pageCount) {
    result.toPage = result.pageCount;
  }
  result.fromRow = (result.page - 1) * result.pageSize + 1;
  if (result.fromRow < 0) {
    result.fromRow = 1;
  }
  result.toRow = result.fromRow + result.pageSize - 1;
  if (result.toRow > result.recordCount) {
    result.toRow = result.recordCount;
  }
  return result;
};
export { pagingCalc };
