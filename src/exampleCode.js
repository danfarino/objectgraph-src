export default `

// reminder: immer is in score as "produce"

const obj1 = {
  sub1: {
    sub2: [5, 6, 7],
    other: {}
  },
  name: "woot"
};

const obj2 = produce(obj1, d => {
  d.sub1.abc = false;
  d.sub1.name = obj1.name;
});

const obj3 = produce(obj2, d => {
  d.sub1.sub2.pop();
});

show(obj1, obj2, obj3);

`;
