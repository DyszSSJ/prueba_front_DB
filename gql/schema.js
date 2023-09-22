const { gql } = require("apollo-server");

const typeDefs = gql`
  type Company {
    userName: String
    password: String
  }

  type Token {
    token: String
  }

  input LoginCompany {
    userName: String
    password: String
    type: String
  }

  input CompanyInput {
    userName: String
    password: String
  }

  type Employee {
    id: ID
    userName: String
    password: String
    name: String
  }

  input LoginEmployee {
    userName: String
    password: String
    type: String
  }

  input EmployeeInput {
    userName: String!
    password: String!
    name: String!
  }

  input RegisterEmployee {
    idCompany: ID!
    userName: String!
    password: String!
    name: String!
  }

  type Query {
    getEmployees(idCompany: ID!): [Employee]
    getInfoEmployee(userName: String!): Employee
    getCompanies(userName: String!): Company
  }

  type Mutation {
    registerCompany(input: CompanyInput): Company
    companyLogin(input: LoginCompany): Token
    registerEmployee(input: RegisterEmployee): Employee
    employeeLogin(input: LoginEmployee): Token
  }
`;

module.exports = typeDefs;
