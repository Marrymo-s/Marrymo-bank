'use client';

import React, {useState, useEffect} from 'react';
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

import WeddingImageUpload from '@/containers/signup/WeddingImageUpload';
import {userInfoStore} from '@/store/useUserInfo';
import {fetchNoJson} from '@/services';

const today = new Date();
const weekDay: string[] = ['일', '월', '화', '수', '목', '금', '토'];
const fullDayName: string = weekDay[today.getDay()];
const initialDayName = fullDayName.substring(0, 1);

const Edit = () => {
  const [groomName, setGroomName] = useState<string>('');
  const [brideName, setBrideName] = useState<string>('');
  const [groomContact, setGroomContact] = useState<string>('');
  const [brideContact, setBrideContact] = useState<string>('');
  const [weddingDate, setWeddingDate] = useState<Date>(addDays(new Date(), 1));
  const [weddingDay, setWeddingDay] = useState<string>(initialDayName);
  const [weddingTime, setWeddingTime] = useState({hour: '12', minute: '00'});
  const [location, setLocation] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [groomFather, setGroomFather] = useState<string>('');
  const [groomMother, setGroomMother] = useState<string>('');
  const [brideFather, setBrideFather] = useState<string>('');
  const [brideMother, setBrideMother] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const router = useRouter();
  const userCode = userInfoStore((state) => state.userCode);
  const {Modal, openModal, closeModal} = useModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://spring.marrymo.site/users/${userCode}`);
        if (!response.ok) {
          throw new Error('유저 데이터를 불러오는 것을 실패했습니다.');
        }
        const data = await response.json();

        setGroomName(data.groomName);
        setBrideName(data.brideName);
        setGroomContact(data.groomContact);
        setBrideContact(data.brideContact);
        setWeddingDate(data.weddingDate);
        setWeddingDay(data.weddingDay);
        setWeddingTime(data.weddingTime);
        setLocation(data.location);
        setEmail(data.email);
        setGreeting(data.greeting);
        setGroomFather(data.groomFather);
        setGroomMother(data.groomMother);
        setBrideFather(data.brideFather);
        setBrideMother(data.brideMother);
        setImages(data.imgUrl);

      } catch (error) {
        console.error('유저 정보를 조회하지 못했어요.', error);
      }
    };

    fetchData();
  }, [userCode]);

  const handleSubmit = async () => {
    const formattedDate: string = format(weddingDate, 'yyyy-MM-dd');
    const formattedTime: string = `${weddingTime.hour}:${weddingTime.minute}:00`;
    const formData = new FormData();

    formData.append('groomName', groomName);
    formData.append('brideName', brideName);
    formData.append('groomContact', groomContact);
    formData.append('brideContact', brideContact);
    formData.append('weddingDate', formattedDate);
    formData.append('weddingDay', weddingDay);
    formData.append('weddingTime', formattedTime);
    formData.append('location', location);
    formData.append('email', email);
    formData.append('greeting', greeting);
    formData.append('groomFather', groomFather);
    formData.append('groomMother', groomMother);
    formData.append('brideFather', brideFather);
    formData.append('brideMother', brideMother);
    images.forEach((file) => {
      formData.append('imgUrl', file);
    });

    try {
      const options: RequestInit = {
        method: 'PUT',
        body: formData,
      };

      const response = await fetchNoJson(`/users/${userCode}`, options);
      console.log(formData);

      if (response.ok) {
        console.log('유저 정보 업데이트 성공');
        router.push(`/home/${userCode}`);
      } else {
        const errorResponse = await response.text();
        throw new Error(errorResponse);
      }
    } catch (error) {
      // 에러 처리
      console.error('유저 정보 업데이트 실패', error);
    }
  };

  const handleFinalSubmit = async () => {
    const formattedDate: string = format(weddingDate, 'yyyy-MM-dd');
    const formattedTime: string = `${weddingTime.hour}:${weddingTime.minute}:00`;
    const formData = new FormData();

    formData.append('groomName', groomName);
    formData.append('brideName', brideName);
    formData.append('groomContact', groomContact);
    formData.append('brideContact', brideContact);
    formData.append('weddingDate', formattedDate);
    formData.append('weddingDay', weddingDay);
    formData.append('weddingTime', formattedTime);
    formData.append('location', location);
    formData.append('email', email);
    formData.append('greeting', greeting);
    formData.append('groomFather', groomFather);
    formData.append('groomMother', groomMother);
    formData.append('brideFather', brideFather);
    formData.append('brideMother', brideMother);
    images.forEach((file) => {
      formData.append('imgUrl', file);
    });

    try {
      const putOptions: RequestInit = {
        method: 'PUT',
        body: formData,
      };

      const putResponse = await fetch('https://spring.marrymo.site/users', putOptions);

      if (!putResponse.ok) {
        const errorPutResponse = await putResponse.text();
        throw new Error(errorPutResponse);
      }

      console.log('유저 정보 업데이트 성공'!);

      const patchOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({isIssued: true}),
      };

      const patchResponse = await fetch('https://spring/marrymo.site/users/invitations', patchOptions);

      if (!patchResponse.ok) {
        const errorPatchResponse = await patchResponse.text();
        throw new Error(errorPatchResponse);
      }

      console.log('청첩장 최종 발급 성공!');
      router.push(`/home/${userCode}`);
    } catch (error) {
      console.error('청첩장 발급 과정 중의 에러', error);
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
  const handleSetWeddingDay = (selectedDay: string) => {
    setWeddingDay(selectedDay);
  };
  const handleSetWeddingTime = (selectedTime: {hour: string, minute: string}) => {
    setWeddingTime(selectedTime);
  };
  const handleSetWeddingLocation = (weddingLocation: string) => {
    setLocation(weddingLocation);
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

  const handleSetImages = (newImages: File[]) => {
    setImages((currentImages) => [...currentImages, ...newImages]);
  };

  const openKakaoMapSearch = () => {
    openModal();
  };

  const handleInvitationClick = () => {
    if (canIssueInvitation()) {
      handleFinalSubmit();
    } else {
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
    }
  };

  const [isGroomNameValid, setIsGroomNameValid] = useState(false);
  const [isBrideNameValid, setIsBrideNameValid] = useState(false);
  const [isGroomContactValid, setIsGroomContactValid] = useState(false);
  const [isBrideContactValid, setIsBrideContactValid] = useState(false);
  const [isGreetingValid, setIsGreetingValid] = useState(true);
  const [isWeddingLocationValid, setIsWeddingLocationValid] = useState(false);
  const [checkValidation, setCheckValidation] = useState<boolean>(false);
  const [isAccountRegistered, setIsAccountRegistered] = useState<boolean>(false);

  const isValidateName = (value: string) => {
    // 유효성 검사: 한국어 2 ~ 19자, 영어 4 ~ 38자
    const isValid = /^[\uac00-\ud7a3 ]{2,19}$|^[A-Za-z ]{4,38}$/.test(value);
    return isValid ? undefined : '이름은 한글 2~19자, 영문 4~38자(공백 포함)까지 가능해요.';
  };

  const isValidateContact = (value: string) => {
    const isValid = /^\d{10,11}$/.test(value);
    return isValid ? undefined : '유효한 연락처를 입력해주세요. (10-11자리 숫자)';
  };

  const isValidateWeddingLocation = (value: string) => {
    return value.trim() !== '' ? undefined : ' ';
  };

  useEffect(() => {
    // 유효성 검사 함수 호출
    const groomNameValid = isValidateName(groomName) === undefined;
    const brideNameValid = isValidateName(brideName) === undefined;
    const groomContactValid = isValidateContact(groomContact) === undefined;
    const brideContactValid = isValidateContact(brideContact) === undefined;
    const weddingLocationValid = isValidateWeddingLocation(location) === undefined;

    // 모든 입력 필드의 유효성 검사 결과 업데이트
    setIsGroomNameValid(groomNameValid);
    setIsBrideNameValid(brideNameValid);
    setIsGroomContactValid(groomContactValid);
    setIsBrideContactValid(brideContactValid);
    setIsWeddingLocationValid(weddingLocationValid);

    // 모든 검사를 통과했는지 종합하여 checkValidation 상태 업데이트
    const allValid = groomNameValid && brideNameValid && groomContactValid && brideContactValid && weddingLocationValid;
    setCheckValidation(allValid);
  }, [groomName, brideName, groomContact, brideContact, location]);

  const fetchAccountStatus = async () => {
    try {
      const response = await fetch(`/users/account`);
      if (!response.ok) {
        throw new Error('Failed to fetch account status');
      }
      const data = await response.json();
      return data.isRegistered;
    } catch (error) {
      console.error('Error fetching account status:', error);
      return false;
    }
  };

  const updateAccountStatus = async () => {
    const status = await fetchAccountStatus();
    setIsAccountRegistered(status);
  };

  const canIssueInvitation = () => {
    return isAccountRegistered && checkValidation;

  };

  useEffect(() => {
    updateAccountStatus();
  }, []);

  return (
    <>
      <Header title={'청첩장 정보 수정'} hasPrevious />
      <main className={styles.editWrapper}>
        <div className={styles.inputBoxStyle}>
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
        <div className={styles.inputBoxStyle}>
          <InputBox
            inputBoxHeader="신랑 아버지 이름"
            value={groomFather}
            placeholder="신랑 아버지 이름을 입력하세요."
            onValueChange={handleSetGroomFather}
            validate={isValidateName}
          />
        </div>
        <div className={styles.inputBoxStyle}>
          <InputBox
            inputBoxHeader="신랑 어머니 이름"
            value={groomMother}
            placeholder="신랑 어머니 이름을 입력하세요."
            onValueChange={handleSetGroomMother}
            validate={isValidateName}
          />
        </div>
        <div className={styles.inputBoxStyle}>
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
        <div className={styles.inputBoxStyle}>
          <InputBox
            inputBoxHeader="신부 아버지 이름"
            value={brideFather}
            placeholder="신부 아버지 이름을 입력하세요."
            onValueChange={handleSetBrideFather}
            validate={isValidateName}
          />
        </div>
        <div className={styles.inputBoxStyle}>
          <InputBox
            inputBoxHeader="신부 어머니 이름"
            value={brideMother}
            placeholder="신부 어머니 이름을 입력하세요."
            onValueChange={handleSetBrideMother}
            validate={isValidateName}
          />
        </div>
        <div className={styles.inputBoxStyle}>
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
        <div className={styles.inputBoxStyle}>
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
        <div className={styles.inputBoxStyle}>
          <InvitationMessage
            onGreetingChange={handleSetGreeting}
            onValidationPassed={setIsGreetingValid}
          />
        </div>
        <div className={styles.inputBoxStyle}>
          <InputBox
            inputBoxHeader="이메일 주소"
            value={email}
            placeholder="이메일 주소를 입력하세요."
            asterisk={true}
            onValueChange={handleSetEmail}
            readonly={true}
          />
        </div>
        <div>
          <WeddingDatepicker
            onDateChange={handleSetWeddingDate}
            onTimeChange={handleSetWeddingTime}
            onDayChange={handleSetWeddingDay}
          />
        </div>
        <div className={styles.inputBoxStyle}>
          <InputBox
            inputBoxHeader="결혼식 장소 선택"
            value={location}
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
          <WeddingImageUpload updateImages={handleSetImages} />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            onClick={handleSubmit}
            type="button"
            colorStyle="roseGold"
            filled={true}
            size="large"
            disabled={!checkValidation}
          >
            수정 사항 저장
          </Button>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            onClick={handleInvitationClick}
            type="button"
            colorStyle="roseGold"
            filled={true}
            size="large"
            disabled={!canIssueInvitation()}
          >
            청첩장 최종 발행하기
          </Button>
          {showErrorMessage && (
            <div className={styles.errorMessage}>
              필수 입력 정보, 계좌 등록을 완료해야 청첩장 발급이 가능해요
            </div>
          )}
        </div>
        <Modal>
          <>
            <KakaoMap
              setWeddingLocation={setLocation}
              closeModal={closeModal}
              onValidationPassed={() => setIsWeddingLocationValid(true)}
            />
          </>
        </Modal>
      </main>
    </>
  );
};

export default Edit;