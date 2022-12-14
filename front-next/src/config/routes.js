const ROUTES = {
  articles: {
    list: `/articles`,
    new: `/articles/new`,
    show: `/articles/[id]`,
    edit: `/articles/[id]/edit`,
  },
  categories: {
    list: `/categories`,
    new: `/categories/new`,
    show: `/categories/[id]`,
    edit: `/categories/[id]/edit`,
  },
  users: {
    list: `/users`,
    new: `/users/new`,
    show: `/users/[id]`,
    edit: `/users/[id]/edit`,
  },
};

export default ROUTES;
