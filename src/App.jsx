import { useCallback, useEffect, useState ,useRef} from 'react'
import './App.css'

function App() {

  const [length,setlength]=useState(6)
  const [numberallow,setnumberallow]=useState(false)
  const [charallow,setcharallow]=useState(false)
  const[pass,setpass]=useState("")

  const passwordRef = useRef(null)
  const generatepass=useCallback(()=>{

  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  let char="!@#$%&*"
  let number="0123456789"

  let newpass=""
  if(numberallow) str+=number
  if(charallow) str+=char
  for(let i=0;i<length;i++){
    let rando=Math.floor(Math.random()*str.length)
    newpass+=str.charAt(rando)
  }
  setpass(newpass)
  },[numberallow,charallow,length])


  const copyfunctionality=useCallback(()=>{
    if(passwordRef.current){
      passwordRef.current.select()
      passwordRef.current.setSelectionRange(0,100)
      navigator.clipboard.writeText(pass)
    }
  },[pass])


  
  useEffect(()=>{
    generatepass()
  },[generatepass])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800 rounded-2xl p-10 shadow-lg w-full max-w-xl text-center">
        
        <h1 className="text-3xl font-bold text-white mb-8">
          Password Generator
        </h1>

        <div className="flex items-center bg-gray-700 rounded-xl overflow-hidden shadow-md mb-8">
          <input
            type="text"
            className="flex-1 bg-transparent text-white text-lg px-4 py-4 outline-none placeholder-gray-400"
            placeholder="Password"
            readOnly
            ref={passwordRef}
            value={pass}
          />
          <button className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white px-6 py-4 text-lg font-medium transition-all cursor-pointer" onClick={copyfunctionality}>
            Copy
          </button>
        </div>

        <div className="flex items-center gap-4 text-white mb-4">
          <input
            type="range"
            className="w-2/3 accent-blue-500 cursor-pointer"
            min={6}
            max={100}
            value={length}
    
            onChange={(e)=>{
              setlength(e.target.value)
            }}
          />
          <span className="text-lg font-medium">Length: {length}</span>
        </div>

        <div className="flex flex-col items-start gap-3 text-white">
          <label className="flex items-center gap-3 ">
            <input type="checkbox" 
            className="w-5 h-5 accent-blue-500"
            checked={numberallow}
            onChange={()=>{
              setnumberallow(prev=>!prev)
            }}
            
            />
            Number
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" 
            checked={charallow}
            onChange={()=>{
              setcharallow(prev=>!prev)
            }}
            className="w-5 h-5 accent-blue-500" />
            Character
          </label>
        </div>
      </div>
    </div>
  )
}

export default App
