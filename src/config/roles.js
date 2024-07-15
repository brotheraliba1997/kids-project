const allRoles = {
  // user: [],
  admin: ['getUsers', 'manageUsers', 'getCategories', 'manageCategories', 'getLanguages', 'manageLanguage'],
  parent: ['getCategories'],
  teacher: ['getCategories'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
