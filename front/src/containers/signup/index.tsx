'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {addDays, format} from 'date-fns';

import Header from '@/components/Header';
import * as styles from './index.css';
import KakaoMap from '@/components/KakaoMap';

import WeddingDatepicker from '@/containers/signup/WeddingDatepicker';
import InputBox from '@/components/InputBox';
import InvitationMessage from '@/containers/signup/InvitationMessage';
import Button from '@/components/Button/index';
import useModal from '@/hooks/useModal';

// import WeddingImageUpload from '@/containers/signup/WeddingImageUpload';
import {userInfoStore} from '@/store/useUserInfo';

const today = new Date();
const weekDay: string[] = ['일', '월', '화', '수', '목', '금', '토'];
const fullDayName: string = weekDay[today.getDay()];
const initialDayName = fullDayName.substring(0, 1);

const Signup = () => {
  const [groomName, setGroomName] = useState<string>('');
  const [brideName, setBrideName] = useState<string>('');
  const [groomContact, setGroomContact] = useState<string>('');
  const [brideContact, setBrideContact] = useState<string>('');
  const [weddingDate, setWeddingDate] = useState<Date>(addDays(new Date(), 1));
  const [weddingDay, setWeddingDay] = useState<string>(initialDayName);
  const [weddingTime, setWeddingTime] = useState({hour: '12', minute: '00'});
  const [weddingLocation, setWeddingLocation] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailVerification, setEmailVerification] = useState<string>('');
  const [greeting, setGreeting] = useState<string>(
    '우리의 사랑이 꽃피는 순간\n\n서로의 마음을 확인하며\n\n약속의 말을 건넵니다.\n\n이 행복을 여러분과 나누고 싶어\n\n여러분을 초대합니다.',
  );
  const [groomFather, setGroomFather] = useState<string>('');
  const [groomMother, setGroomMother] = useState<string>('');
  const [brideFather, setBrideFather] = useState<string>('');
  const [brideMother, setBrideMother] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);

  const router = useRouter();
  const userCode = userInfoStore((state) => state.userCode);
  const {Modal, openModal, closeModal} = useModal();

  // POST 요청 함수
  const handleSubmit = async () => {
    const formattedDate: string = format(weddingDate, 'yyyy-MM-dd');
    const formattedTime: string = `${weddingTime.hour}:${weddingTime.minute}:00`;
    const formData = new FormData();
    images.forEach(image => {
      formData.append('imgUrl', image);
    });
    formData.append('groomName', groomName);
    formData.append('brideName', brideName);
    formData.append('groomContact', groomContact);
    formData.append('brideContact', brideContact);
    formData.append('weddingDate', formattedDate);
    formData.append('weddingDay', weddingDay);
    formData.append('weddingTime', formattedTime);
    formData.append('location', weddingLocation);
    formData.append('email', email);
    formData.append('greeting', greeting);
    formData.append('groomFather', groomFather);
    formData.append('groomMother', groomMother);
    formData.append('brideFather', brideFather);
    formData.append('brideMother', brideMother);

    try {
      const response = await fetch('/users', {
        method: 'POST',
        body: formData,
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

  const setUserCode = userInfoStore(state => state.setUserCode);

  useEffect(() => {
    const fetchUserCode = async () => {
      // fetchInstance 함수를 사용하여 userCode를 가져옴
      const response = await fetch('/users/usercode');
      if (!response.ok) {
        throw new Error('떼잉 ');
      }
      const userCodeText = await response.text();
      console.log(userCodeText);
      setUserCode(userCodeText);
    };
    fetchUserCode();
  }, [setUserCode]);

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
  const handleSetWeddingDay = (selectedDay: string) => {
    setWeddingDay(selectedDay);
  };
  const handleSetWeddingTime = (selectedTime: {hour: string, minute: string}) => {
    setWeddingTime(selectedTime);
  };
  const handleSetWeddingLocation = (location: string) => {
    setWeddingLocation(location);
  };
  const handleSetEmail = (mail: string) => {
    setEmail(mail);
  };

  const handleSetEmailVerification = (verification: string) => {
    setEmailVerification(verification);
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

  const handleSetImages = (image: File[]) => {
    setImages(image);
  };

  const openKakaoMapSearch = () => {
    openModal();
  };

  // 필수값이 입력되었는지 확인하는 부분
  const [isGroomNameValid, setIsGroomNameValid] = useState(false);
  const [isBrideNameValid, setIsBrideNameValid] = useState(false);
  const [isGroomContactValid, setIsGroomContactValid] = useState(false);
  const [isBrideContactValid, setIsBrideContactValid] = useState(false);
  // 초대 문구는 기본 값이 주어지므로 true
  const [isGreetingValid, setIsGreetingValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailVerificationValid, setIsEmailVerificationValid] = useState(false);
  const [isWeddingLocationValid, setIsWeddingLocationValid] = useState(false);
  const [checkValidation, setCheckValidation] = useState<boolean>(false);

  // 유효성 검사 코드
  const isValidateName = (value: string) => {
    // 유효성 검사: 한국어 2 ~ 19자, 영어 4 ~ 38자
    const isValid = /^[\uac00-\ud7a3 ]{2,19}$|^[A-Za-z ]{4,38}$/.test(value);
    return isValid ? undefined : '이름은 한글 2~19자, 영문 4~38자(공백 포함)까지 가능해요.';
  };

  // 이메일 유효성 검사
  const isValidateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return isValid ? undefined : '유효한 이메일 주소를 입력해주세요.';
  };
  // 이메일 인증 유효성 검사
  // TODO: 인증번호 일치 여부 로직 구현(월)
  const isValidateEmailVerification = (value: string) => {
    // 입력 값이 있으면 true 반환
    return value.trim() !== '' ? undefined : '인증 번호를 입력해주세요.';
  };

  // 연락처 유효성 검사
  const isValidateContact = (value: string) => {
    const isValid = /^\d{10,11}$/.test(value);
    return isValid ? undefined : '유효한 연락처를 입력해주세요. (10-11자리 숫자)';
  };

  // 결혼식 장소가 입력되었는지 확인하는 유효성 검사 함수
  const isValidateWeddingLocation = (value: string) => {
    // 입력 값이 있으면 true 반환
    return value.trim() !== '' ? undefined : ' ';
  };

  useEffect(() => {
    // 유효성 검사 함수 호출
    const groomNameValid = isValidateName(groomName) === undefined;
    const brideNameValid = isValidateName(brideName) === undefined;
    const groomContactValid = isValidateContact(groomContact) === undefined;
    const brideContactValid = isValidateContact(brideContact) === undefined;
    const emailValid = isValidateEmail(email) === undefined;
    const emailVerificationValid = isValidateEmailVerification(emailVerification) === undefined;
    const weddingLocationValid = isValidateWeddingLocation(weddingLocation) === undefined;

    // 모든 입력 필드의 유효성 검사 결과 업데이트
    setIsGroomNameValid(groomNameValid);
    setIsBrideNameValid(brideNameValid);
    setIsGroomContactValid(groomContactValid);
    setIsBrideContactValid(brideContactValid);
    setIsEmailValid(emailValid);
    setIsEmailVerificationValid(emailVerificationValid);
    setIsWeddingLocationValid(weddingLocationValid);

    // 모든 검사를 통과했는지 종합하여 checkValidation 상태 업데이트
    const allValid = groomNameValid && brideNameValid && groomContactValid && brideContactValid && emailValid && emailVerificationValid && weddingLocationValid;
    setCheckValidation(allValid);
  }, [groomName, brideName, groomContact, brideContact, email, emailVerification, weddingLocation]);

  return (
    <>
      <Header title={'개인 정보 입력'} hasPrevious />
      <main className={styles.signupWrapper}>
        <div>
          {/*TODO: 이름, 연락처 받는 건 별도의 tsx 파일에서 관리 - 리팩토링 시*/}
          <InputBox
            inputBoxHeader="신랑 이름"
            value={groomName}
            placeholder="신랑 이름을 입력하세요."
            asterisk={true}
            onValueChange={handleSetGroomName}
            validate={isValidateName}
            onValidationPassed={() => setIsGroomNameValid(true)}
          />
        </div>
        <div>
          <InputBox
            inputBoxHeader="신랑 아버지 이름"
            value={groomFather}
            placeholder="신랑 아버지 이름을 입력하세요."
            onValueChange={handleSetGroomFather}
            validate={isValidateName}
          />
        </div>
        <div>
          <InputBox
            inputBoxHeader="신랑 어머니 이름"
            value={groomMother}
            placeholder="신랑 어머니 이름을 입력하세요."
            onValueChange={handleSetGroomMother}
            validate={isValidateName}
          />
        </div>
        <div>
          <InputBox
            inputBoxHeader="신부 이름"
            value={brideName}
            placeholder="신부 이름을 입력하세요."
            asterisk={true}
            onValueChange={handleSetBrideName}
            validate={isValidateName}
            onValidationPassed={() => setIsBrideNameValid(true)}
          />
        </div>
        <div>
          <InputBox
            inputBoxHeader="신부 아버지 이름"
            value={brideFather}
            placeholder="신부 아버지 이름을 입력하세요."
            onValueChange={handleSetBrideFather}
            validate={isValidateName}
          />
        </div>
        <div>
          <InputBox
            inputBoxHeader="신부 어머니 이름"
            value={brideMother}
            placeholder="신부 어머니 이름을 입력하세요."
            onValueChange={handleSetBrideMother}
            validate={isValidateName}
          />
        </div>
        <div>
          <InputBox
            inputBoxHeader="신랑 연락처"
            value={groomContact}
            placeholder="신랑 연락처를 입력하세요."
            asterisk={true}
            onValueChange={handleSetGroomContact}
            validate={isValidateContact}
            onValidationPassed={() => setIsGroomContactValid(true)}
          />
        </div>
        <div>
          <InputBox
            inputBoxHeader="신부 연락처"
            value={brideContact}
            placeholder="신부 연락처를 입력하세요."
            asterisk={true}
            onValueChange={handleSetBrideContact}
            validate={isValidateContact}
            onValidationPassed={() => setIsBrideContactValid(true)}
          />
        </div>
        <div>
          <InvitationMessage
            onGreetingChange={handleSetGreeting}
            onValidationPassed={setIsGreetingValid}
          />
        </div>
        <div>
          <InputBox
            inputBoxHeader="이메일 주소"
            value={email}
            placeholder="이메일 주소를 입력하세요."
            asterisk={true}
            onValueChange={handleSetEmail}
            validate={isValidateEmail}
            onValidationPassed={() => setIsEmailValid(true)}
            button={{
              text: '인증',
              // 추후에 인증 메일 보내는 함수 작성
              onClick: () => {
              },
              type: 'button',
              size: 'small',
            }}
          />
        </div>
        <div>
          {/*TODO: 인증번호가 일치하면 safeGreen 색깔로 안내 문구 뜨게 만들기*/}
          <InputBox
            inputBoxHeader="인증 번호 입력"
            value={emailVerification}
            placeholder="인증 번호를 입력해주세요."
            asterisk={true}
            onValueChange={handleSetEmailVerification}
            validate={isValidateEmailVerification}
            onValidationPassed={() => setIsEmailVerificationValid(true)}
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
            inputBoxHeader="결혼식 장소 선택"
            value={weddingLocation}
            placeholder="결혼식 장소를 입력해주세요."
            asterisk={true}
            readonly={true}
            onClick={openKakaoMapSearch}
            onValueChange={handleSetWeddingLocation}
            validate={isValidateWeddingLocation}
            onValidationPassed={() => {
              setIsWeddingLocationValid(true);
            }}
            button={{
              text: '검색',
              onClick: openKakaoMapSearch,
              type: 'button',
              size: 'small',
            }}
          />
        </div>
        <div>
          {/*<WeddingImageUpload />*/}
        </div>
        <div>
          <Button
            onClick={handleSubmit}
            type="button"
            disabled={!checkValidation}
          >회원 가입 완료</Button>
        </div>
        <Modal>
          <>
            <KakaoMap
              setWeddingLocation={setWeddingLocation}
              closeModal={closeModal}
              onValidationPassed={() => setIsWeddingLocationValid(true)}
            />
          </>
        </Modal>
      </main>
    </>
  );
};

export default Signup;