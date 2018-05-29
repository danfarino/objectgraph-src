export default `
const obj1 = {
  name: 'Dan'
};

show(obj1);

const obj2 = {
  ...obj1,
  foo: 123
};

show(obj2);

const obj3 = obj1;
obj3.name = 'John';
  
show(obj3);
`;
