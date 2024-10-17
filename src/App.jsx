import { useState,useCallback, useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [password,setpassword]= useState('');
  const [isNumber,setIsnumber]= useState(false);
  const[ischar,setIschar]= useState(false)

  const passeordRef = useRef(null);
  const CopytoCLikBoard=()=>{
    window.navigator.clipboard.writeText(password)
    passeordRef.current?.select(0,33)
  }





  const passwordGenerator = useCallback(() => {
    
    let pass = '';
    let str = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z";
    let result = str.replace(/\s+/g, ''); // Remove spaces from the string
  
    if (isNumber) result += "0123456789"; // Concatenate numbers if allowed
    if (ischar) result += "@#$%^&*()??_+"; // Concatenate special characters if allowed
  
    for (let index = 0; index < length; index++) {
      const char = Math.floor(Math.random() * result.length); // Get random index in bounds
      pass += result.charAt(char); // Append the random character to the password
    }
  
    setpassword(pass); // Update the password state
  
  }, [length, isNumber, ischar]); // Remove 'password' from dependencies
  
  useEffect(() => {
    passwordGenerator();
  }, [length, isNumber, ischar]); // Remove 'password' from dependencies here too
  

  return (
    <>

    <input type="text" value={password} readOnly ref={passeordRef}/>
    <input type="range"  min={6} max={100} value={length} onChange={(e)=>setLength(e.target.value)}/>
    <button onClick={CopytoCLikBoard}>Copy</button>
    <label>Length:{length}</label>
    <input type="checkbox"  defaultChecked={isNumber} onChange={()=>{setIsnumber((prev)=>!prev)}}/>
    <label>AddNumber:{isNumber}</label>

    <input type="checkbox"  defaultChecked={ischar} onChange={()=>{setIschar((prev)=>!prev)}}/>
    <label>ischar:{ischar}</label>

    
    </>
  )
}

export default App
