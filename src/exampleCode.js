export default `
// Call the "show" function with any objects/values
// that you'd like to graph.

const obj1 = {
  name: 'Dan',
  numbers: [11, 13, 17]
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
