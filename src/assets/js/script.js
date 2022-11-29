let allow2DecPlace = function(e){
  let [dec, frac] = e.value.split('.');
  console.log(`Decimal : ${dec}`);
  console.log(`Fraction: ${frac}`);
  if(frac){
    frac = frac.substr(0, 2);
    e.value = dec + '.' + frac;
  }
}

let fix2DecPlace = function(e){
  let [dec, frac] = e.value.split('.');
  console.log(`Decimal : ${dec}`);
  console.log(`Fraction: ${frac}`);
  dec = dec === '' ? '0' : dec;
  frac = frac ? frac + '00' : '00';
  frac = frac.substr(0, 2);
  e.value = dec + '.' + frac;
}