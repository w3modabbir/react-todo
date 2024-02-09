import { useEffect, useState } from 'react'
import './style.css'
import { getDatabase, ref, set, push, onValue  } from "firebase/database";
import { ImCross } from "react-icons/im";

function App() {
  const db = getDatabase();
  const [text, setText] = useState("")
  let [todoitem, setTodoItem] = useState([])

  const handleForm = (e) =>{
    setText(e.target.value);
  }

  // firebase warite data operaton 
    const hendleAdd = (e) =>{
      e.preventDefault();
      if(text !==''){
        set(push(ref(db, "alltodo")), {
          todoText: text, 
      }); 
      }
  }

  // firebase Read data operation
  useEffect(()=>{
    const todoRef = ref(db, 'alltodo');
      onValue(todoRef, (snapshot) => {
        let arr = []
        snapshot.forEach((item)=>{
          arr.push(item.val())
        })
        setTodoItem(arr)
    });
  },[])


  return (
    <>
      {/*=============== todo part start here ================= */}
        <div className='todo_main'>
          <header>
            <h2>Todo List </h2>
          </header>
            <div>
              <form action="#" method='post'>
              <input onChange={handleForm} type="text"  placeholder='Enter your text'/>
              <button onClick={hendleAdd}>add</button>
            </form>
            </div>
                   
          <div className="contentt">
            <ul>
              {todoitem.map((item, index)=>(
                <>
                  <li key={index}>{item.todoText}</li> 
                  <button><ImCross /></button>
                </>
              ))

              }
            </ul>
        </div>
        </div>
      {/*=============== todo part end ======================== */}
    </>
  )
}

export default App
