import { useEffect, useState } from 'react'
import './style.css'
import { getDatabase, ref, set, push, onValue, remove, update  } from "firebase/database";
import { ImCross } from "react-icons/im";
import { TbEdit } from "react-icons/tb";

function App() {
  const db = getDatabase();
  const [text, setText] = useState("")
  let [todoitem, setTodoItem] = useState([])
  let [togolebtn, setTogolBtn] = useState(false)
  let [todoid, setTodoId] = useState()

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
      setText("")
  }

  // firebase Read data operation
  useEffect(()=>{
    const todoRef = ref(db, 'alltodo');
    onValue(todoRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push({...item.val(),id:item.key})
      })
      setTodoItem(arr)
    });
  },[])

// delete operation
let handleDelete = (id) =>{
    remove(ref(db,'alltodo/' + id )).then(()=>{
      console.log("delete hoiice");
    })
}

// Update operation 

let handleUpdate = (item) =>{
  setTodoId(item.id)
  setText(item.todoText)
  setTogolBtn(true)
}

// edite operation
let hendleEdite = (e) =>{
  e.preventDefault()
  update(ref(db, "alltodo/" + todoid), {
    todoText: text,
  })
  setTogolBtn(false)
  setText("")
}

  return (
    <>
      {/*=============== todo part start here ================= */}
        <div className='todo_main'>
          <header>
            <h2>Todo List </h2>
          </header>
            <div>
                <form action="#" method='post'>
                <input onChange={handleForm} value={text} type="text"  placeholder='Enter your text'/>
                {togolebtn
                  ?
                  <button onClick={hendleEdite}>edite</button>
                  :
                  <button onClick={hendleAdd}>add</button>
                }
              </form>
              </div>          
              <div className="contentt">
                <ul className='item_main'>
                  {todoitem.map((item, index)=>(
                    <>
                      <li 
                        key={index.id}>{item.todoText}
                        <button className='button' onClick={()=>handleDelete(item.id)}><ImCross /></button>
                        <button className='button_update' onClick={()=>handleUpdate(item)}><TbEdit /></button>
                      </li> 
                     
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
