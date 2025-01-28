class APIFeatures {
  constructor(model, query, queryStr) {
    this.model = model; // The Mongoose model
    this.query = query; // The Mongoose query object
    this.queryStr = queryStr; // The request query string
  }

  // Filter method to apply query parameters filtering
  filter() {
    const queryObj = { ...this.queryStr };

    // Excluded fields that should not be used in filtering
    const excludedFields = ["page", "sort", "limit", "field", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering (e.g., gt, lt, gte, lte)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // Search method to apply search functionality
  search() {
    if (this.queryStr.search && this.queryStr.search.trim() !== "") {
      const escapedSearch = this.queryStr.search.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );
      const searchRegex = new RegExp(escapedSearch, "i");

      // Apply search on fields: title, category, subcategory
      const searchQuery = {
        $or: [{ title: { $regex: searchRegex } }],
      };

      this.query = this.query.find(searchQuery);
    }
    return this;
  }

  // Sort method to apply sorting by fields
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      // Default sort by creation date
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  // Pagination method to handle page, limit, and skip
  paginate(totalCount) {
    const page = this.queryStr.page * 1 || 1; // Current page, default to 1
    const limit = this.queryStr.limit * 1 || 32; // Limit per page, default to 32
    const skip = (page - 1) * limit; // Documents to skip

    if (this.queryStr.page) {
      if (totalCount <= skip) throw new Error("Page does not exist");
    }

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
