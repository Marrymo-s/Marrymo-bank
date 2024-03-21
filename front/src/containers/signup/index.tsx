import Header from '@/components/Header'
import * as styles from './index.css'
// import useInput from '@/hooks/useInput'  // 훅 제작하기
import {useState} from 'react'

const Signup = () => {
  return (
    <>
      <Header title={'개인 정보 입력'} hasPrevious/>
      <main className={styles.signupWrapper}>
        <>
          회원가입 페이지
        </>
      </main>
    </>
//   const userid = useInput('')
//   const username = useInput('')
//   const password = useInput('')
//   const userphone = useInput('')
//
//   const [passwordCheck, setPasswordCheck] = useState('')
//   const [passwordError, setPasswordError] = useState(false)
//
//
//   const handlePassword = (e) => {
//     const {value} = {...e.target}
//     setPasswordError(password.value !== value) //같으면 false 다르면 true
//     setPasswordCheck(value)
//
//   }
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password.value !== passwordCheck) {
//       setPasswordError(true)
//       return 0;
//     } else {
//       setPasswordError(false)
//     }
//
//     if (!term) {
//       setTermError(true)
//       return 0;
//     }
//     console.log(userid.value, password.value,)
//   }
//
//
//   const [term, setTerm] = useState(false) //약관 동의여부
//   const [termError, setTermError] = useState(false)
//
//   const handleTerm = e => {
//     console.log('handleTerm들어옴')
//     setTermError(e.target.checked !== true) //체크가 뜨면
//     //true !==true  =>false 문
//     //false
//     setTerm(e.target.checked)
//   }
//
//   return (
//     <div>
//       <Header title={'개인 정보 입력'} hasPrevious/>
//       <form onSubmit={handleSubmit}>
//         <input type="text" {...userid} placeholder="아이디를 입력해주세요"/>
//         <input type="text" {...username} placeholder="이름를 입력해주세요"/>
//         <input type="password" {...password} placeholder="비밀번호를 입력해주세요"/>
//         <input type="password" value={passwordCheck} onChange={handlePassword} placeholder="비밀번호를 다시 입력해주세요"/>
//         {passwordError && <div style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</div>}
//
//         {/* {true && 이거실행됨} {false && "이거 실행 안됨"} */}
//         <input type="text" {...userphone} placeholder="전화번호를 입력해주세요"/> <br/>
//         <label htmlFor="term">약관동의여부</label><input id="term" type="checkbox" checked={term} onChange={handleTerm}/><br/>
//         {termError && <div style={{color: 'red'}}>약관에 동의하라구...</div>}
//         <button type="submit">회원가입</button>
//       </form>
//     </div>
  )
}

export default Signup;