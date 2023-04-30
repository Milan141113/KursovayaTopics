import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import Disicrip from './Disicrip';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const [rates, setRates] = useState();


  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then(res => res.json())
      .then((json) => {
        setRates(json.rates);
        console.log(json.rates)
      })
      .catch(err => {
        console.warn(err);
        alert('Не удалось получить данные')
      });
  }, []);

  const onCangeFromPrise = (value) => {
    const price = value /  rates[fromCurrency];
    const result = price * rates[toCurrency];
    
    setToPrice(result);
    setFromPrice(value);
  }

  const onChangeToPrise = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    setFromPrice(result);
    setToPrice(value);
  }

  // useEffect(() => {
  //   onCangeFromPrise(fromPrice);
  // }, [fromCurrency, fromPrice])
  
  // // useEffect(() => {
  // //   onChangeToPrise(toPrice);
  // // }, [toCurrency, toPrice])
  return (
    <div className="App">
      <Disicrip/>
      <Block
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onCangeFromPrise}
      />
      <Block
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToPrise}
      />
    </div>
  );
}

export default App;
