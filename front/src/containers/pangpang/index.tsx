'use client';

import InputBox from '@/components/InputBox'


const Pangpang = () => {
  const handleButtonClick = () => {
    console.log('버튼이 눌렸다');
    // Add your button click handling logic here
  };
  return (
    <>
      <main>
        <div>Input Box 예시</div>
        <div>
          <InputBox
            inputBoxHeader='신랑 이름'
            placeholder='신랑 이름을 입력하세요.'
            asterisk={true}/>
        </div>
        <div>
          <InputBox
            inputBoxHeader='신랑 아버지 이름'
            placeholder='신랑 아버지 이름을 입력하세요.'/>
        </div>
        <div>
          <InputBox
            inputBoxHeader='신랑 어머니 이름'
            placeholder='신랑 어머니 이름을 입력하세요.'/>
        </div>
        <div>
          <InputBox
            inputBoxHeader='신부 이름'
            placeholder='신부 이름을 입력하세요.'/>
        </div>
        <div><InputBox
          inputBoxHeader='이메일 주소'
          placeholder='이메일 주소를 입력하세요.'
          asterisk={true}
          // 버튼은 아래와 같이 'text', 'onClick', 'type'이 있어야 에러가 나지 않아요
          button={{
            text: '인증',
            onClick: handleButtonClick,
            type: 'button',
            size: 'small'
          }}
        /></div>
      </main>
    </>
  )
}

export default Pangpang;