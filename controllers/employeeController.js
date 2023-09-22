const Employee = require("../model/employee");
const Company = require("../model/company");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function registerEmployee(input) {
  try {
    const newEmployee = input;
    newEmployee.userName = newEmployee.userName.toLowerCase();

    const { userName, password, idCompany } = newEmployee;

    const userExists = await Employee.findOne({ userName: userName });
    const findCompany = await Company.findById(idCompany);
    if (!mongoose.Types.ObjectId.isValid(idCompany))
      throw new Error("Debe ingresar un id válido");
    if (!findCompany) throw new Error("La empresa no existe");
    if (userExists) throw new Error("El empleado ya existe");

    //  encrypt password
    const salt = await bcrypt.genSalt(10);
    newEmployee.password = await bcrypt.hash(password, salt);
    const employees = new Employee(input);
    findCompany.employees.push(employees._id);
    await Promise.all([employees.save(), findCompany.save()]);
    return employees;
  } catch (error) {
    console.log(error);
  }
}

async function loginEmployee(input) {
  const { userName, password } = input;

  const userFound = await Employee.findOne({
    userName: userName.toLowerCase(),
  });
  if (!userFound) throw new Error("Error al encontrar el usuario");

  const passwordSuccess = await bcrypt.compare(password, userFound.password);
  if (!passwordSuccess) throw new Error("Error en la contraseña");

  return {
    token: createToken(userFound, process.env.secret),
  };
}

function createToken(user, secret) {
  const { id, userName, name, type } = user;

  const payload = {
    id,
    userName,
    name,
    type,
  };
  return jwt.sign(payload, secret);
}

async function getEmployees(idCompany) {
  const findComapy = await Company.findById(idCompany)
    .populate("employees")
    .sort({ createdAt: -1 });
  return findComapy.employees;
}

async function getInfoEmployee(userName) {
  const findEmployee = await Employee.findOne({
    userName: userName.toLowerCase(),
  });
  return findEmployee;
}

// const findComapy = await Company.findById(idCompany).populate("employees").sort({createdAt: -1})

module.exports = {
  registerEmployee,
  loginEmployee,
  getEmployees,
  getInfoEmployee,
};
