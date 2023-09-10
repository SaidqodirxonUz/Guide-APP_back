const User = require("./User");

const allUser = async (query) => {
  try {
    const { q, sort, filters, page, limit } = query || {};

    const searchQuery = {};
    const sortOptions = {};
    const paginationOptions = {};

    // Search
    if (q) {
      const nameQuery = {
        $or: [
          { first_name: { $regex: q, $options: "i" } },
          { last_name: { $regex: q, $options: "i" } },
        ],
      };
      searchQuery.$and = [nameQuery];
    }

    // Filtering
    if (filters && filters.role) {
      searchQuery.role = filters.role;
    }

    // Sorting
    if (sort && sort.by) {
      sortOptions[sort.by] = sort.order === "desc" ? -1 : 1;
    }

    // Pagination
    const itemsPerPage = parseInt(limit) || 3;
    const currentPage = parseInt(page) || 1;
    const offset = parseInt(page.offset) || 0;
    const requestedLimit = parseInt(page.limit) || itemsPerPage;

    paginationOptions.skip = offset;
    paginationOptions.limit = requestedLimit;

    const data = await User.find(searchQuery)
      .sort(sortOptions)
      .skip(paginationOptions.skip)
      .limit(paginationOptions.limit)
      .lean()
      .exec();

    const totalUser = await User.countDocuments(searchQuery);

    return {
      data,
      pageInfo: {
        total: totalUser,
        offset: paginationOptions.skip,
        limit: paginationOptions.limit,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = allUser;
