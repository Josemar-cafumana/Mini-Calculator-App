import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';
import { useState } from 'react';

export default function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [current, setCurrent] = useState(0);
  const [clearDisplay, setClearDisplay] = useState(false);
  const [currentOperation, setCurrentOperation] = useState(null);
  const [values, setValues] = useState([0, 0]);

  addDigit = (n) => {
    const clearDisplayCurrent = displayValue === '0' || clearDisplay

    if(n === '.' && !clearDisplayCurrent && displayValue.includes('.')) {
      return;
    }

    const currentValue = clearDisplayCurrent ? '' : displayValue;

    const currentDisplayValue = currentValue + n
    setDisplayValue(currentDisplayValue);
    setClearDisplay(false)

    if(n !== '.'){
      const newValue = parseFloat(currentDisplayValue)
      const currentvalues = [...values];
      currentvalues[current] = newValue;
      setValues(currentvalues)
    }
    
  }

  clearMemory = () => {
    setDisplayValue('0');
    setCurrent(0);
    setClearDisplay(false);
    setCurrentOperation(null);
    setValues([0, 0]);
  }

  setOperation = (operation) => {
      if(current === 0){
        setCurrentOperation(operation)
        setCurrent(1)
        setClearDisplay(true)
      } else{
        const equals = currentOperation === '='
        const currentValues = [...values]

        

        try{
          currentValues[0] = 
          eval(`${currentValues[0]} ${currentOperation} ${currentValues[1]}`)
        }  catch (e) {
          currentValues[0] = values[0]
        }
        //currentValues[1] = 0
        ///console.warn("123",currentValues)
        setDisplayValue(`${currentValues[0]}`)
        setCurrentOperation(equals ? null : operation)
        setCurrent(equals ? 0 : 1)
        setClearDisplay(true)
        currentValues[1] = 0
        setValues([currentValues[0], 0])

        console.warn(values, "1hdhdh")
       
      }
  }

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}> 
<Button label='AC' triple onClick={this.clearMemory} />
          <Button label='/' operation onClick={this.setOperation} />
          <Button label='7' onClick={this.addDigit} />
          <Button label='8' onClick={this.addDigit} />
          <Button label='9' onClick={this.addDigit} />
          <Button label='*' operation  onClick={this.setOperation} />
          <Button label='4' onClick={this.addDigit} />
          <Button label='5' onClick={this.addDigit} />
          <Button label='6' onClick={this.addDigit} />
          <Button label='-' operation onClick={this.setOperation} />
          <Button label='1' onClick={this.addDigit} />
          <Button label='2' onClick={this.addDigit} />
          <Button label='3' onClick={this.addDigit} />
          <Button label='+' operation onClick={this.setOperation} />
          <Button label='0' double  onClick={this.addDigit} />
          <Button label='.' onClick={this.addDigit} />
          <Button label='=' operation onClick={this.setOperation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
