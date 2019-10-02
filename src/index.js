const check = (str, bracketsConfig) => {
  const symbolMap = new Map();
  const stack = [];
  bracketsConfig.forEach((configPair, i) => {
    if(configPair[0] !== configPair[1]) {
      symbolMap.set(configPair[0], i + 1);
      symbolMap.set(configPair[1], -(i + 1));
    } else {
      symbolMap.set(configPair[1], 0);
    }
  });

  str.split('').forEach((symbol, i) => {
    const symbolValue = symbolMap.get(symbol);
    if (symbolValue > 0) {
      stack.push({
        key: symbol,
        value: symbolValue,
      });
    } else if(symbolValue < 0){
      last = stack.slice(-1)[0] || {};
      if (Math.abs(last.value) === Math.abs(symbolValue)) {
        stack.pop();
      } else {
        stack.push({
          key: symbol,
          value: symbolValue,
        })
      }
    }
    else if(symbolValue === 0) {
      last = stack.slice(-1)[0] || {};
      if(last.key === symbol) {
        stack.pop();
      } else {
        stack.push(
          {
            key: symbol,
            value: symbolValue,
          }
        )
      }
    }
  });
  return stack.length === 0;
}
module.exports = check;

