export default `
const obj1 = {
  name: 'Dan'
};

const obj2 = {
  ...obj1,
  foo: 123
};

const obj3 = obj1;
obj1.name = 'John';
  
show(obj1, obj2, obj3);
`;
