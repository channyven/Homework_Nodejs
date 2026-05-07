export default class BaseModel {            //មានន័យថា Class នេះអាច export ទៅប្រើនៅ file ផ្សេងបាន។
  constructor(name, age) {              //constructor() គឺជា function ពិសេសដែលដំណើរការពេលយើង new Object
    this.name = name;            //យក value ពី parameter name ទៅរក្សាទុកក្នុង object property name
    this.age = age;            //រក្សាទុក age ក្នុង object
  }
}