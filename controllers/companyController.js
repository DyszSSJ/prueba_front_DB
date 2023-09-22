const Company = require("../model/company");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createToken(user, secret) {
  const { id, userName, type } = user;

  const payload = {
    id,
    userName,
    type,
  };
  return jwt.sign(payload, secret);
}

function registerCompany(input) {
  const newCompany = input;
  newCompany.userName = newCompany.userName.toLowerCase();

  const { userName, password } = newCompany;

  const userExists = Company.findOne({ userName: userName });
  if (!userExists) throw new Error("El usuario ya existe");

  //   encrypt password
  const salt = bcryptjs.genSaltSync(10);
  newCompany.password = bcryptjs.hashSync(password, salt);

  try {
    const companys = new Company(input);
    companys.save();
    return companys;
  } catch (error) {
    console.log(error);
  }
}

async function loginCompany(input) {
  const { userName, password } = input;

  const userFound = await Company.findOne({ userName: userName.toLowerCase() });
  if (!userFound) throw new Error("Error al encontrar el usuario");

  const passwordSuccess = await bcryptjs.compare(password, userFound.password);
  if (!passwordSuccess) throw new Error("Error en la contraseña");

  return {
    token: createToken(userFound, process.env.secret),
  };
}

async function getCompanies(userName) {
  const companies = await Company.findOne({ userName: userName });
  if (!companies) throw new Error("No se encontraron empresas");
  return companies;
}

module.exports = {
  registerCompany,
  loginCompany,
  getCompanies,
};
