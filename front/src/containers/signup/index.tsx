'use client';

import {TimeHTMLAttributes, useState} from 'react';
import {useRouter} from 'next/navigation';
import {format} from 'date-fns';

import Header from '@/components/Header'
import * as styles from './index.css'
import KakaoMap from '@/components/KakaoMap'

import WeddingDatepicker from "@/containers/signup/WeddingDatepicker";
import InputBox from "@/components/InputBox";
import InvitationMessage from "@/containers/signup/InvitationMessage";
import Button from '@/components/Button/index'
import useModal from '@/hooks/useModal'

import WeddingImageUpload from "@/containers/signup/WeddingImageUpload";
import {userInfoStore} from "@/store/store";

const x = new Date()
const weekDay: string[] = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
const day: string = weekDay[x.getDay()]

const Signup = () => {
  const [groomName, setGroomName] = useState<string>('');
  const [brideName, setBrideName] = useState<string>('');
  const [groomContact, setGroomContact] = useState<string>('');
  const [brideContact, setBrideContact] = useState<string>('');
  const [weddingDate, setWeddingDate] = useState<Date>(new Date());
  const [weddingDay, setWeddingDay] = useState<string>(day);
  const [weddingTime, setWeddingTime] = useState({hour: '12', minute: '00'});
  const [weddingLocation, setWeddingLocation] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [greeting, setGreeting] = useState<string>(
    '우리의 사랑이 꽃피는 순간\n\n서로의 마음을 확인하며\n\n약속의 말을 건넵니다.\n\n이 행복을 여러분과 나누고 싶어\n\n여러분을 초대합니다.'
  );
  const [groomFather, setGroomFather] = useState<string>('');
  const [groomMother, setGroomMother] = useState<string>('');
  const [brideFather, setBrideFather] = useState<string>('');
  const [brideMother, setBrideMother] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);

  const router = useRouter();
  const userCode = userInfoStore((state) => state.userCode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {Modal, openModal, closeModal} = useModal();

  // POST 요청 함수
  const handleSubmit = async () => {
    const formattedDate: string = format(weddingDate, "yyyy-MM-dd");
    const formattedTime: string = `${weddingTime.hour}:${weddingTime.minute}`
    const formData = new FormData();
    images.forEach(image => {
      formData.append('imgUrl', image);
    });
    formData.append('groomName', groomName);
    formData.append('brideName', brideName);
    formData.append('groomContact', groomContact);
    formData.append('brideContact', brideContact);
    formData.append('WeddingDate', formattedDate);
    formData.append('WeddingDay', weddingDay);
    formData.append('WeddingTime', formattedTime);
    formData.append('weddingLocation', weddingLocation);
    formData.append('email', email);
    formData.append('greeting', greeting);
    formData.append('groomFather', groomFather);
    formData.append('groomMother', groomMother);
    formData.append('brideFather', brideFather);
    formData.append('brideMother', brideMother);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: formData, // FormData 사용시 'Content-Type': 'multipart/form-data' 헤더는 자동으로 설정됨
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // 요청 성공 처리
      console.log('Submission successful');
      router.push(`/home/${userCode}`);
    } catch (error) {
      // 에러 처리
      console.error('Submission failed', error);
    }
  };
  const handleSetGroomName = (name: string) => {
    setGroomName(name);
  };
  const handleSetBrideName = (name: string) => {
    setBrideName(name);
  };
  const handleSetGroomContact = (contact: string) => {
    setGroomContact(contact);
  };
  const handleSetBrideContact = (contact: string) => {
    setBrideContact(contact);
  };
  const handleSetWeddingDate = (selectedDate: Date) => {
    setWeddingDate(selectedDate);
  };
  const handleSetWeddingDay = (day: string) => {
    setWeddingDay(day);
  };
  const handleSetWeddingTime = (selectedTime: { hour: string, minute: string }) => {
    setWeddingTime(selectedTime);
  };
  const handleSetWeddingLocation = (location: string) => {
    setWeddingLocation(location);
  };
  const handleSetEmail = (mail: string) => {
    setEmail(mail);
  };
  const handleSetGreeting = (content: string) => {
    setGreeting(content);
  };
  const handleSetGroomFather = (name: string) => {
    setGroomFather(name);
  };
  const handleSetGroomMother = (name: string) => {
    setGroomMother(name);
  };
  const handleSetBrideFather = (name: string) => {
    setBrideFather(name);
  };
  const handleSetBrideMother = (name: string) => {
    setBrideMother(name);
  };

  const handleLocationSelect = (location: string) => {
    setWeddingLocation(location);
    setIsModalOpen(false); // 장소 선택 시 모달 닫기
  };
  const handleSetImages = (image: File[]) => {
    setImages(image);
  };

  const openKakaoMapSearch = async () => {
    openModal()
  };
  console.log(userCode)
  return (
    <>
      <Header title={'개인 정보 입력'} hasPrevious/>
      <main className={styles.signupWrapper}>
        <div>
          <InputBox
            inputBoxHeader='신랑 이름'
            value={groomName}
            placeholder='신랑 이름을 입력하세요.'
            asterisk={true}
            onValueChange={handleSetGroomName}
          />
        </div>
        <div>
          <InputBox
            inputBoxHeader='신랑 아버지 이름'
            value={groomFather}
            placeholder='신랑 아버지 이름을 입력하세요.'
            onValueChange={handleSetGroomFather}
          />
        </div>
        <div>
          <InputBox
            inputBoxHeader='신랑 어머니 이름'
            value={groomMother}
            placeholder='신랑 어머니 이름을 입력하세요.'
            onValueChange={handleSetGroomMother}
          />
        </div>
        <div>
          <InputBox
            inputBoxHeader='신부 이름'
            value={brideName}
            placeholder='신부 이름을 입력하세요.'
            asterisk={true}
            onValueChange={handleSetBrideName}
          />
        </div>
        <div>
          <InputBox
            inputBoxHeader='신부 아버지 이름'
            value={brideFather}
            placeholder='신부 아버지 이름을 입력하세요.'
            onValueChange={handleSetBrideFather}
          />
        </div>
        <div>
          <InputBox
            inputBoxHeader='신부 어머니 이름'
            value={brideMother}
            placeholder='신부 어머니 이름을 입력하세요.'
            onValueChange={handleSetBrideMother}
          />
        </div>
        <div>
          <InputBox
            inputBoxHeader='신랑 연락처'
            value={groomContact}
            placeholder='신랑 연락처를 입력하세요.'
            asterisk={true}
            onValueChange={handleSetGroomContact}
          />
        </div>
        <div>
          <InputBox
            inputBoxHeader='신부 연락처'
            value={brideContact}
            placeholder='신부 연락처를 입력하세요.'
            asterisk={true}
            onValueChange={handleSetBrideContact}
          />
        </div>
        <div>
          <InvitationMessage onGreetingChange={handleSetGreeting}/>
        </div>
        <div>
          <InputBox
            inputBoxHeader='이메일 주소'
            value={email}
            placeholder='이메일 주소를 입력하세요.'
            asterisk={true}
            onValueChange={handleSetEmail}
            button={{
              text: '인증',
              // 추후에 인증 메일 보내는 함수 작성
              onClick: () => {
              },
              type: 'button',
              size: 'small'
            }}
          />
        </div>
        <div>
          {/*TODO: 인증번호가 일치하면 safeGreen 색깔로 안내 문구 뜨게 만들기*/}
          {/*TODO: 인증번호는 추후에 입력값 받을 수 있도록 처리*/}
          <InputBox
            inputBoxHeader='인증 번호 입력'
            value=''
            placeholder='인증 번호를 입력해주세요.'
            asterisk={true}
          />
        </div>
        <div className={styles.weddingDatePickerContainer}>
          <div>
            결혼식 일자 선택
            <span className={styles.asteriskStyle}>*</span>
          </div>
          <div>
            <WeddingDatepicker
              onDateChange={handleSetWeddingDate}
              onTimeChange={handleSetWeddingTime}
              onDayChange={handleSetWeddingDay}
            />
          </div>
        </div>
        <div>
          <InputBox
            inputBoxHeader='결혼식 장소 선택'
            value={weddingLocation}
            placeholder='결혼식 장소를 선택해주세요.'
            asterisk={true}
            onValueChange={handleSetWeddingLocation}
            button={{
              text: '검색',
              onClick: () => {
                openKakaoMapSearch()
              },
              type: 'button',
              size: 'small'
            }}
          />
        </div>
        <div>
          <WeddingImageUpload/>
        </div>
        <div>
          <Button
            onClick={handleSubmit}
            type='button'
          >회원 가입 완료</Button>
        </div>
        <Modal>
          <>
            <KakaoMap setWeddingLocation={setWeddingLocation}/>
            <input type="text" value={weddingLocation} readOnly/>
          </>
        </Modal>
      </main>
    </>
  )
}

export default Signup;