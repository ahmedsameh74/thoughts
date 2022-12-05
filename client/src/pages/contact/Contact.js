import React, {  useState } from "react";
import './Contact.css'
// import { useParams } from "react-router-dom";
// import { useAuthContext } from "../../hooks/useAuthContext";


const Contact = ({profile}) => {
  // const {user} = useAuthContext()
  // const {username} = useParams()
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')

  console.log(profile)
  
  // useEffect(() => {
  //   if(user){
  //     setEmail(user.email)
  //   }
  // }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !subject) {
      console.log('error')
      return
    }
    const res = await fetch(`/api/contact/message/${profile.userName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, subject})
    });
    const data = await res.json();
    console.log(data)
  }




  return <form className="contact" onSubmit={handleSubmit}>
    <h3>Contact the author</h3>
    <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">From</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} value={email}/>
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Subject</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"onChange={e => setSubject(e.target.value)}/>
</div>
<button className="contact-btn">Send</button>
  </form>;
};

export default Contact;
