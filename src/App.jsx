import { useState } from 'react'
import './style.css'
import { getDatabase, ref, set } from "firebase/database";

function App() {
  const db = getDatabase();
  const [item, setItem] = useState("")

  const handleForm = (e) =>{
      setItem(e.target.value);
  }
  const hendleAdd = (e) =>{
    e.preventDefault();
    set(ref(db, "alltodo"), {
      todoText: item,
    });
    
  }


  return (
    <>
      {/*=============== todo part start here ================= */}
        <div className='todo_main'>
          <header>
            <h2>Todo List </h2>
          </header>
          <form action="#" method='post'>
            <input onChange={handleForm} type="text"  placeholder='Enter your text'/>
            <button onClick={hendleAdd}>add</button>
          </form>
        </div>
      {/*=============== todo part end ======================== */}
    </>
  )
}

export default App
