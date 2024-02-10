import { useEffect, useState } from 'react'
import './style.css'
import { getDatabase, ref, set, push, onValue, remove, update  } from "firebase/database";
import { ImCross } from "react-icons/im";
import { TbEdit } from "react-icons/tb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TostyFy from './componant/TostyFy';

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
  }).then(()=>{
    setTogolBtn(false)
    setText("")
  })
}
// all delete opertion

let handleAllCler = (e) =>{
  e.preventDefault()
  remove(ref(db, "alltodo"))
  toast.success('Delete is Success', {
    position: "top-right",
    className:  'tostify',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}


  return (
    <>
      <TostyFy/>
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
                <div>
                  <button onClick={handleAllCler} className='allClear'>all clear</button>
                </div>
              </form>
              </div>          
              <div className="contentt">
                <ul className='item_main'>
                  {
                  todoitem.map((item, index)=>(
                    <li 
                      key={index} data={item}>{item.todoText}
                      <button className='button' onClick={()=>handleDelete(item.id)}><ImCross /></button>
                      <button className='button_update' onClick={()=>handleUpdate(item)}><TbEdit /></button>
                    </li>   
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
