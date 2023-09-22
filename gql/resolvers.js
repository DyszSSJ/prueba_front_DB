const companyController = require("../controllers/companyController");
const employeeController = require("../controllers/employeeController");

const resolvers = {
  Query: {
    getEmployees: (_, { idCompany }) =>
      employeeController.getEmployees(idCompany),
    getInfoEmployee: (_, { userName }) =>
      employeeController.getInfoEmployee(userName),
    getCompanies: (_, { userName }) => companyController.getCompanies(userName),
  },
  Mutation: {
    registerCompany: (_, { input }) => companyController.registerCompany(input),
    companyLogin: (_, { input }) => companyController.loginCompany(input),
    registerEmployee: (_, { input }) =>
      employeeController.registerEmployee(input),
    employeeLogin: (_, { input }) => employeeController.loginEmployee(input),
  },
};

module.exports = resolvers;
