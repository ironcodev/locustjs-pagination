# @locustjs/pagination
This library provides utilities regarding paging and pagination for data grids.

# Install
```
npm i @locustjs/pagination
```

The library contains a `pagingCalc` function that helps calculating paging based on a given recordcount, pagesize and current page.

Example:
```javascript
import { pagingCalc } from 'locustjs-pagination';

const pageSize = 8;
const recordCount = 456;
const currentPage = 20;
const visiblePages = 6;

const paging = pagingCalc(currentPage, recordCount, pageSize, visiblePages);

console.log(paging);
/*
  result:
  {
    fromPage: 19
    fromRow: 153
    page: 20
    pageCount: 57
    pageSize: 8
    recordCount: 456
    toPage: 24
    toRow: 160
    visiblePages: 6
  }
*/
```
