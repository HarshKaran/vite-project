import { useCallback, useEffect, useRef, useState } from "react";
import Card from "./components/Card";
function App() {

  const[length,setLength] = useState(8);
  const[numberAllowed , setNumberAllowed] = useState(false);
  const[charAllowed , setCharAllowed] = useState(false);
  const[password , setPassword] = useState("");

  //  **** UseRef Hook  ****
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(
    () => {                                                                      //  ** function **

      let pass = "" 
      let str = "ABCDEFGHIJKU*NOPQRSTUVWXYZabcdefghijk1mnopqrstuvwxyz"
      if(numberAllowed)
        str+="0123456789"
      if(charAllowed)
        str+="~`@#$%^&*?/\|*-+"

      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random()*str.length + 1)
        pass += str.charAt(char);
      }

      setPassword(pass);

    } , [length,numberAllowed,charAllowed,setPassword])                       //  ** Dependency Array **
    
    useEffect(()=>{
      passwordGenerator()
    },[length,numberAllowed,charAllowed,passwordGenerator])

    const copyToClip = useCallback (() =>{
      passwordRef.current?.select()
      passwordRef.current?.setSelectionRange(0,50)
      window.navigator.clipboard.writeText(password);
    } , [password])
    return(
  
    <div className= 'main-area'>
     <h4 style={{color:"white" , fontWeight:"500" , fontSize:"30px"}}> Password Generator</h4>
     <div className='flex shadow rounded-lg overflow-hidden mb-4' >
      <input 
        className="password"
        type="text" value={password}
        style={{textAlign:"center" , width:"100vh"}}
        ref={passwordRef}
        placeholder="Password"
      />
      <button
        onClick={copyToClip} 
        className="btn-copy" style={{fontSize:'15px',paddingTop:"5px" , color:"wheat"}}>copy</button>
      </div>
        <div className='flex text—sm gap-x-2' >
          <div className='flex items—center gap-x—l'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e)=>{setLength(e.target.value)}}
              className="cursor-pointer" />
              <label style={{fontSize:"20px" , color:"black" , paddingLeft:"20px" }}>Length : {length}</label>
          </div>
          <div>
          <input
            className=""
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={()=>{
                setNumberAllowed((prev) => !prev);
              }}
             />
              <label htmlFor="numberInput" style={{fontSize:"20px" , color:"black" , paddingLeft:"20px"}}>Numbers</label>
          </div>
          <div>
          <input
            className=""
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={()=>{
                setCharAllowed((prev) => !prev);
              }}
             />
              <label htmlFor="characterInput" style={{fontSize:"20px" , color:"black" , paddingLeft:"20px"}}>Characters</label>
          </div>
        </div>
      
     </div>
  );










 // *** Chai or  code lecture 6,7,7,9 ***
 // let [value, setValue] = useState(5);

  // const addValue = () => {
  //   // value=value+1;
  //   console.log("clicked", { value });
  //   setValue(++value);
  // }

  // const subValue = () => {
  //   console.log("clicked", { value });
  //   setValue(--value);
  // }
  // let myObj = {
  //   name:"something",
  //   val:56
  // }

  // *********** Implementation  of Use State ***********
  // return (
  //   <>

  //     {/* <h1 className='bg-green-500 text-black p-5 rounded-2xl'>Tailwind test</h1>
  //     <Card username="abcd" btnText="Clicked"/>
  //     <Card username="lmno" btnText="Dab Diye"/> */}

  //     {/* <div>
  //     <h1>Vite + React</h1>
  //     <h2>Counter Value : {value}</h2>
  //     <button onClick={addValue}>Add Value{value}</button>
  //     <br />
  //     <button onClick={subValue}>Remove value{value}</button>
  //     </div> */}
  //   </>
  // )
}

export default App
