import { ChangeEvent, MouseEvent, useState } from 'react'
import './App.css'
import { fbConfig } from './firebase/firebase';

function App() {
  fbConfig
  const [minNumber, setMinNumber] = useState('');
  const [maxNumber, setMaxNumber] = useState('');
  const [howManyNumbers, setHowManyNumbers] = useState('');
  const [repeat, setRepeat] = useState(true);
  const [calculated, setCalculated] = useState(false);
  const [message, setMessage] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  
  const [numbersList, setNumbersList] = useState<number[]>([])

  const changeMinNum = (e:ChangeEvent<HTMLInputElement>)=>{
    setMinNumber(e.target.value)
  }
  const changeMaxNum = (e:ChangeEvent<HTMLInputElement>)=>{
    setMaxNumber(e.target.value)
  }
  const changeHowManyNums = (e:ChangeEvent<HTMLInputElement>)=>{
    if (e.target.value != "" && parseInt(e.target.value) < 1  ) {
      setHowManyNumbers('1')
    } else {
      setHowManyNumbers(e.target.value)
    }
  }
  const clearNumbers = ()=>{
    setNumbersList([]);
    setCalculated(false)
  }
  const changeRepeat = (e:ChangeEvent<HTMLInputElement>)=> {
    if (e.target.value === "repeatY") {
      setRepeat(true)
    } else if ("repeatN") {
      setRepeat(false)
    }
  }
  const copyContent = (e:MouseEvent)=>{
    let element = e.target as HTMLSpanElement;
    navigator.clipboard.writeText(element.innerText)
    setMessage(true);
    setTimeout(()=>{
      setMessage(false)
    }, 1000)
  }
  document.addEventListener('scroll' ,()=>{
    scrollMove()
  })
  const scrollMove = () =>{
    setScrollPos(window.scrollY)
  }
  const generateNumList = ()=>{
    if (minNumber === '' || maxNumber === '' || howManyNumbers === '') {
      alert('Please fill the "Min", "Max" and "How Many Numbers" fields before generate!')
    } 
    else if (parseInt(minNumber) >= parseInt(maxNumber)) {
      alert("Min number can't be equal or grater than max number!")
    }
    else if (isNaN(parseInt(minNumber)) || isNaN(parseInt(maxNumber)) || isNaN(parseInt(howManyNumbers))) {
      alert("Please enter valid values!")
    }
    else if (parseInt(howManyNumbers) > 1000) {
      alert("It is not possible to generate more than 1000 numbers.")
    }
    else if (parseInt(minNumber) < -1000000000000 || parseInt(maxNumber) > 1000000000000) {
      alert("Values ​​ bove 1 trillion or below -1 trillion are not allowed.")
    }
    else if (repeat) {
      for (let x = 0; x < parseInt(howManyNumbers); x++) {
        let number = Math.floor(Math.random() * (parseInt(maxNumber) - parseInt(minNumber) + 1)) + parseInt(minNumber);
        numbersList.push(number)
      }
      setCalculated(true)
    }
    else if (!repeat) {
      if (((parseInt(maxNumber) - (parseInt(minNumber)) + 1)) < parseInt(howManyNumbers)){
        alert("The amount of values ​​to draw exceeds the min and max informed.")
      } else {
        for (let x = 0; x < parseInt(howManyNumbers);) {
          let number = Math.floor(Math.random() * (parseInt(maxNumber) - parseInt(minNumber) + 1)) + parseInt(minNumber);
          if (numbersList.indexOf(number) === -1) {
            numbersList.push(number);
            x++;
          }
        }
        setCalculated(true)
      }
    }
  }

  return (
    <div className='container' id='topSite'>
      <header className='headerSite'>
        <h1><a href="/">Numbers List</a></h1>
      </header>
      <main className='mainContent'>
        <div className='inputsArea'>
          <label className='labelNumMin'>
            Min: <input className='numMin' type="number" value={minNumber} onChange={changeMinNum} placeholder='e.g.: 1' />
          </label>
          <label className='labelNumMax'>
            Max: <input className='numMax' type="number" value={maxNumber} onChange={changeMaxNum} placeholder='e.g.: 10' />
          </label>
          <label className='labelhowManyNumbers'>
            How Many Numbers?
            <input type="number" className='howManyNumbers' value={howManyNumbers} onChange={changeHowManyNums} placeholder='Min: 1, Max: 1000' />
          </label>
          <div className='repeatOptionArea'>
            Repeat? 
            <label className='labelRadio'>
              Yes <input type="radio" name="repeat" value={"repeatY"}  onChange={changeRepeat} checked={repeat} />
            </label> 
            <label className='labelRadio'>
              No <input type="radio" name="repeat" value={"repeatN"} onChange={changeRepeat} checked={!repeat}/>
            </label>
            
          </div>
        </div>
        <div className='btnsArea'>
          {!calculated &&
          <button className='generateBtn' onClick={generateNumList}>Generate!</button>
          }
          {calculated &&
          <button className='clearBtn' onClick={clearNumbers}>Clear</button>
          }
        </div>
        {calculated && <div className='showNumbersArea'>
          <h4>Your Numbers are:</h4>
          {numbersList.map((item, index)=>{
            return(<div key={index} className="numberGeneratedPhrase">{`${index + 1}º Number: `}<span onClick={copyContent} className='numberGenerated'>{item}</span></div>)
          })}
          <small className='copyHint'>Hint: Click on number to copy.</small>
        </div>
        }
        {calculated &&
        <button className='clearBtn' onClick={clearNumbers}>Clear</button>
        }
      </main>
      <footer className='footerSite'>
        <small>Created By Guilherme de Paula da Silva</small>
      </footer>
      <div className='messages' hidden={!message}>Number Copied!</div>
      <a className='goToTop' style={{display: scrollPos > 25 ? "flex" : "none" }} href="#topSite">&#129045;</a>
    </div>
  )
}

export default App
