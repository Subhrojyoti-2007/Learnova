const run = async () => {
  const res = await fetch('http://localhost:3000/api/test');
  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
};
run();
