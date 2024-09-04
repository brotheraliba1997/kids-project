const allRoles = {
  // user: [],
  admin: ['getUsers', 'manageUsers', 'getCategories', 'manageCategories', 'getLanguages', 'manageLanguage', 'getPrograms', 'manageProgram', "getSubcription"],
  parent: ['getCategories', 'getPrograms', 'getSubcription'],
  teacher: ['getCategories', 'getPrograms'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
