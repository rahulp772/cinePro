module.exports = class Features {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      let queryObj = { ...this.queryString };
      const exclude = ["page", "limit", "sort", "fields"];
      exclude.forEach((el) => delete queryObj[el]);
  
      let queryStr = JSON.stringify(queryObj);
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
    }
  
    sort() {
      if (this.queryString.sort) {
        const sortResult = this.queryString.sort.split(",").join(" ");
        this.query = this.query.sort(sortResult);
      } else {
        this.query = this.query.sort("-addedAt");
      }
      return this;
    }
  
    fields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(",").join(" ");
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select("");
      }
      return this;
    }
  
    paginate() {
      const page = this.queryString.page || 1;
      const limiter = this.queryString.limit || 5;
      const skipVal = (page - 1) * limiter;
      this.query = this.query.skip(skipVal).limit(limiter);
      return this;
    }
  }
  