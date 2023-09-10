const Guide = require("./Guide");

const allGuideService = async (query) => {
  try {
    const { q, page, limit, sort } = query || {};

    const searchQuery = {};
    const sortOptions = {};
    const paginationOptions = {};

    if (q) {
      searchQuery.title = { $regex: q, $options: "i" };
    }

    // Pagination
    const itemsPerPage = parseInt(limit) || 3;
    const currentPage = parseInt(page) || 1;
    const offset = parseInt(page.offset) || 0;
    const requestedLimit = parseInt(page.limit) || itemsPerPage;

    paginationOptions.skip = offset;
    paginationOptions.limit = requestedLimit;

    // Sorting
    if (sort && sort.by) {
      if (
        sort.by === "title" ||
        sort.by === "content" ||
        sort.by === "notify"
      ) {
        sortOptions[sort.by] = sort.order === "desc" ? -1 : 1;
      }
    }

    const guide = await Guide.find(searchQuery)
      .sort(sortOptions)
      .skip(paginationOptions.skip)
      .limit(paginationOptions.limit)
      .lean()
      .exec();

    const totalGuide = await Guide.countDocuments(searchQuery);

    return {
      guide,
      total: totalGuide,
      offset: paginationOptions.skip,
      limit: paginationOptions.limit,
    };
  } catch (error) {
    // Handle any potential errors that might occur during the query.
    throw error;
  }
};

module.exports = allGuideService;
