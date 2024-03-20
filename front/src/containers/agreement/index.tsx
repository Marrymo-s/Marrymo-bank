import Header from '@/components/Header'
import Button from '@/components/Button'
import {agreementContainer} from "@/containers/agreement/index.css";
import Checkbox from "@/components/Checkbox";

const Agreement = () => {
  return (
    <div>
      <Header title='개인 정보 수집 동의' hasPrevious/>
      {/*약관 p 태그 안의 내용을 다른 곳으로 옮길 수 있으면 옮기기*/}
      <p className={agreementContainer}>
        <br/>
        [제1조] (총칙)
        <br/>
        1. 개인정보란 생존하는 개인에 관한 정보로서 당해 정보에 포함되어 있는 성명, 생년월일 등의 사항에 의하여 당해 개인을 식별할 수 있는 정보(당해 정보만으로는 특정 개인을 식별할 수 없더라도 다른
        정보와 용이하게 결합하여 식별할 수 있는 것을 포함합니다)를 말합니다.
        <br/>
        <br/>
        2. 메리모가 운영하는 메리모(www.marrymo.site) (이하 회사)는 귀하의 개인정보보호를 매우 중요시하며, 『정보통신망 이용촉진 및 정보보호 등에 관한 법률』 상의 개인 정보보호규정 및
        정보통신부가 제정한 『개인정보 보호법』을 준수하고 있습니다. 회사는 개인정보보호정책을 통하여 귀하께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가
        취해지고 있는지 알려드립니다.
        <br/>
        <br/>
        3. 회사는 개인정보보호정책을 홈페이지 첫 화면에 공개함으로써 귀하께서 언제나 용이하게 보실 수 있도록 조치하고 있습니다.
        <br/>
        <br/>
        4. 회사는 개인정보보호정책의 지속적인 개선을 위하여 개인정보보호정책을 개정하는데 필요한 절차를 정하고 있습니다. 그리고 개인정보보호 정책을 개정하는 경우 개정날짜를 부여하여 개정된 사항을 귀하께서
        쉽게 알아볼 수 있도록 하고 있습니다.
        <br/>
        <br/>
        <br/>
        [제2조] 개인정보 수집 항목 및 수집방법
        <br/>
        1. 수집하는 개인정보의 항목
        <br/>
        회사는 별도의 회원가입 절차 없이 일부 콘텐츠에 자유롭게 접근할 수 있습니다. 회사의 회원제 서비스를 이용하시고자 할 경우 다음의 정보를 입력해주셔야 합니다.
        <br/>
        1) 개인정보 수집항목
        <br/>
        (1) 회원 가입시 수집되는 개인정보의 범위
        <br/>
        - 필수항목 : 카카오 이메일, 카카오 이름, 신랑 이름, 신부 이름, 이메일 주소, 신랑 휴대폰 번호, 신부 휴대폰 번호, 예식일자 및 장소
        <br/>
        (2) 모바일 청첩장 작성시 수집하는 개인정보의 범위
        <br/>
        - 선택항목 : 양가 부모 이름, 웨딩 화보 이미지
        <br/>
        (3) 서비스 이용과정 및 사업 처리과정에서 수집될 수 있는 개인정보의 범위
        <br/>
        - 서비스 이용 및 중지기록, 접속로그, 쿠키, 접속IP정보 - 은행 계좌정보, 휴대전화 번호 등
        <br/>
        2) 개인정보의 수집방법
        <br/>
        - 카카오 소셜 로그인을 통한 카카오 계정 정보(이메일, 이름)
        <br/>
        - 홈페이지
        <br/>
        - 공식 연락처를 통한 문의사항
        <br/>
        <br/>
        2. 개인정보 수집방법
        <br/>
        회사는 개인정보를 사이트 회원가입 절차, 상담절차 등의 방법으로 개인정보를 수집합니다.
        <br/>
        <br/>
        3. 회원이 자발적으로 공개한 개인정보로 인해 회원 개인에게 발생하는 손실이나 문제는 전적으로 개인의 책임이며, 공개적인 공간에 게재되는 개인정보는 다른 사람이 수집하여 무단으로 사용할 수 있음을
        인지하시어, 이로 인해 원하지 않는 피해를 입을 수 있음을 유념하시기 바랍니다.
        <br/>
        <br/>
        4. 개인정보 수집에 대한 동의
        <br/>
        회사는 귀하께서 메리모의 개인정보처리방침 및 이용약관의 내용에 대해 「동의합니다」버튼 또는 「동의하지 않습니다」버튼을 클릭할 수 있는 절차를 마련하여, 「동의합니다」버튼을 클릭하면 개인정보 수집에 대해
        동의한 것으로 봅니다. 「동의하지 않습니다」를 선택하실 경우, 회사가 제공하는 기본서비스 제공이 제한됩니다.
        <br/>
        <br/>
        5. 비회원의 개인정보보호
        <br/>
        1) 회사는 비회원 송금의 경우에 송금 확인을 위하여 필요한 개인정보만을 요청하고 있으며, 이 경우 그 정보는 송금에 관련된 용도 이외에는 다른 어떠한 용도로도 사용되지 않습니다.
        <br/>
        2) 회사는 비회원의 개인정보도 회원과 동등한 수준으로 보호합니다.
        <br/>
        <br/>
        <br/>
        [제3조] 개인정보 수집 목적 및 이용 목적
        <br/>
        1. 회원제 서비스 이용에 따른 본인 식별 절차에 이용
        <br/>
        <br/>
        2. 고지사항 전달, 본인 의사 확인, 불만 처리 등 원활한 의사소통 경로의 확보, 새로운 서비스 등 안내
        <br/>
        <br/>
        3. 세무신고를 위한 별도의 개인정보 요청
        <br/>
        <br/>
        <br/>
        [제4조] 수집한 개인정보 공유 및 제공 / 취급 위탁
        <br/>
        1. 회사는 고객의 개인정보를 가입신청서, 서비스이용약관, 「개인정보처리방침」의「개인정보의 수집 및 이용목적」에서 알린 범위 내에서 사용하며,이 범위를 초과하여 이용하거나 타인 또는 다른 기업·기관에
        제공하지 않습니다.
        <br/>
        <br/>
        <br/>
        [제5조] 개인정보의 보유 및 이용기간
        <br/>
        1. 회사는 고객의 개인정보를 고지 및 동의받은 기간 동안 보유 및 이용합니다. 개인정보의 수집 및 이용목적 달성, 보유기간 만료, 회원의 수집 및 이용 동의 철회시 수집된 개인정보는 열람하거나 이용할
        수 없도록 파기 처리합니다.
        <br/>
        <br/>
        2. 회사는 상법 및 ‘전자상거래등에서 소비자보호에 관한 법률’, 전자금융거래법, 여신전문금융업법 국세기본법, 법인세법, 부가가치세법 등 관련 법령의 규정에 따라 다음과 같이 거래 관련 권리 의무
        관계를 확인하기 위하여 개인정보를 일정기간 보유할 수 있으며, 이 때 보유하는 개인정보의 열람 및 이용은 해당 사유로 한정하며, 미리 보유목적, 기간 및 보유하는 개인정보 항목을 분명히 밝혀야 합니다.
        <br/>
        * 계약 또는 청약철회 등에 관한 기록 : 5년
        <br/>
        * 대금결제 및 재화 등의 공급에 관한 기록 : 5년
        <br/>
        * 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년
        <br/>
        3. 고객님의 동의를 얻어 보유하고 있는 거래정보를 고객님께서 열람하고자 요구할 때에는 바로 열람할 수 있도록 조치합니다.
        <br/>
        <br/>
        <br/>
        [제6조] 개인정보의 파기 절차 및 방법
        <br/>
        회사는 원칙적으로 개인정보 수집 및 이용목적이 달성되면 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.
        <br/>
        1. 파기절차
        <br/>
        1) 귀하가 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(제5조 개인정보의 보유, 이용기간 참조) 일정 기간 저장된 후
        파기되어집니다.
        <br/>
        2) 동 개인정보는 법률에 의한 경우가 아니고서는 보유되어지는 이외의 다른 목적으로 이용되지 않습니다.
        <br/>
        <br/>
        2. 파기방법
        <br/>
        1) 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
        <br/>
        2) 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
        <br/>
        <br/>
        <br/>
        [제7조] 개인정보 제3자 제공 및 공유
        <br/>
        1. 회사는 귀하의 개인정보를 「개인정보의 수집목적 및 이용목적」에서 고지한 범위내에서 사용하며, 동 범위를 초과하여 이용하거나 타인 또는 타기업, 기관에 제공하지 않습니다.
        <br/>
        <br/>
        2. 단, 다음은 예외로 합니다.
        <br/>
        1) 관계법령에 의하여 수사상의 목적으로 관계기관으로부터의 요구가 있을 경우
        <br/>
        2) 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우
        <br/>
        3) 이용자들이 사전에 동의한 경우
        <br/>
        <br/>
        3. 그러나 예외사항에서도 관계법령에 의하거나 수사기관의 요청에 의해 정보를 제공한 경우에는 이를 당사자에게 고지하는 것을 원칙으로 운영하고 있습니다. 법률상의 근거에 의해 부득이하게 고지를 하지 못할
        수도 있습니다. 본래의 수집목적 및 이용목적에 반하여 무분별하게 정보가 제공되지 않도록 최대한 노력하겠습니다.
        <br/>
        <br/>
        <br/>
        [제8조] 이용자 및 법정 대리인의 권리와 그 행사방법
        <br/>
        1. 귀하는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.
        <br/>
        <br/>
        2. 귀하의 개인정보 조회, 수정 또는 가입해지를 위해서는 「정보수정」버튼을 클릭하여 로그인후 직접 열람, 수정 또는 탈퇴가 가능합니다. 혹은 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면
        지체 없이 조치하겠습니다.
        <br/>
        <br/>
        3. 회사는 귀하의 요청에 의해 해지 또는 삭제된 개인정보는 “제 5조 개인정보의 보유, 이용기간”에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.
        <br/>
        <br/>
        4. 회사는 법정 대리인의 동의가 필요한 만 14세 미만 아동의 회원 가입은 받고 있지 않습니다.
        <br/>
        <br/>
        <br/>
        [제9조] 개인정보 자동 수집 장치의 설치, 운영및 거부
        <br/>
        1. 회사는 제공하는 인터넷서비스를 통하여 고객의 정보를 저장하고 수시로 찾아내는 쿠키(cookie)를 설치·운용할 수도 있습니다. 쿠키란 웹 서버가 웹 브라우저에 보내어 저장했다가 서버의 부가적인
        요청이 있을 때 다시 서버로 보내주는 문자열 정보를 말합니다. 고객이 회사의 웹사이트에 접속하면 회사는 고객의 브라우저에 있는 쿠키의 내용을 읽고, 추가정보를 찾아 접속에 따른 성명 등의 추가 입력
        없이 고객에게 서비스를 제공할 수 있습니다.
        <br/>
        <br/>
        2. 회사가 쿠키(cookie)를 통해 수집한 고객의 정보는 다음의 목적을 위해 사용될 수 있습니다.
        <br/>
        - 개인의 관심 분야에 따라 차별화된 정보를 제공
        <br/>
        - 관심 있게 둘러본 내용의 자취를 추적하여 다음 번 접속 때 개인맞춤서비스를 제공
        <br/>
        - 유료서비스를 이용 할 때 이용기간 안내
        <br/>
        - 고객들의 습관을 분석하여 서비스 개편 등의 척도로 활용
        <br/>
        <br/>
        3. 고객은 쿠키(Cookie) 설치에 대한 선택권을 가지고 있습니다.
        <br/>
        웹 브라우저 상단의 “도구 > 인터넷옵션 > 개인정보 > 고급”에서 모든 쿠키를 다 받아들이거나, 쿠키가 설치될 때 통지를 보내도록 하거나, 아니면 모든 쿠키를 거부할 수 있습니다. 단, 고객이 쿠키
        설치를 거부하면 서비스 이용에 불편이 있거나, 서비스 제공에 어려움이 있을 수 있습니다.
        <br/>
        <br/>
        4. 쿠키(Cookie)는 브라우저를 종료할 때나 로그 아웃할 때 만료됩니다.
        <br/>
        <br/>
        <br/>
        [제10조] 개인정보 보호를 위한 기술적 / 제도적 관리
        <br/>
        1. 기술적 대책
        <br/>
        회사는 회원의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변도 또는 훼손되지 않도록 안정성 확보를 위하여 다음과 같은 기술적 대책을 강구하고 있습니다.
        <br/>
        - 회원의 개인정보는 비밀번호에 의해 보호되며, 파일 및 전송 데이터를 암호화하거나 파일 잠금기능(Lock)을 사용하여 중요한 데이터는 별도의 보안기능을 통해 보호되고 있습니다.
        <br/>
        - 회사는 백신프로그램을 이용하여 컴퓨터 바이러스에 의해 피해를 방지하기 위한 조치를 취하고 있습니다. 백신프로그램은 주기적으로 업데이트되며 갑작스런 바이러스가 출현할 경우 백신이 나는 즉시 이를
        제공함으로써 개인정보가 침해되는 것을 방지하고 있습니다. 회당사는 암호알고리즘을 이용하여 네트워크 상의 개인정보를 안전하게 전송할 수 있는 보안장치(SSL 또는 SET)를 채택하고 있습니다.
        <br/>
        - 해킹 등 외부 침입에 대비하여 각 서버마다 침입차단시스템 및 취약점 분석 시스템 등을 이용하여 보안에 만전을 기하고 있습니다.
        <br/>
        <br/>
        2. 관리적 대책
        <br/>
        회사는 회원의 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있습니다. 그 최소한의 인원에 해당하는 자는 다음과 같습니다.
        <br/>
        - 이용자를 직접 상대로 하여 마케팅 업무를 수행하는 자
        <br/>
        - 개인정보보호책임자 및 담당자 등 개인정보관리업무를 수행하는 자
        <br/>
        - 기타 업무상 개인정보의 취급이 불가피한 자
        <br/>
        - 개인정보를 취급하는 직원을 대상으로 새로운 보안 기술 습득 및 개인정보 보호 의무 등에 관해 정기적인 사내 교육 및 외부 위탁교육을 실시하고 있습니다.
        <br/>
        - 입사 시 개인정보 관련 취급자의 보안서약서를 통하여 사람에 의한 정보유출을 사전에 방지하고 개인정보보호 정책에 대한 이행사항 및 직원의 준수여부를 감시하기 위한 내부 절차를 마련하고 있습니다.
        <br/>
        - 개인정보 관련 취급자의 업무 인수인계는 보안이 유지된 상태에서 철저하게 이뤄지고 있으며 입사 및 퇴사 후 개인정보 사고에 대한 책임을 명확화하고 있습니다.
        <br/>
        - 개인정보와 일반 데이터를 혼합하여 보관하지 않고 별도로 분리하여 보관하고 있습니다.
        <br/>
        <br/>
        <br/>
        [제11조] 개인정보관리책임자 및 담당자
        <br/>
        회사는 고객의 개인정보보호를 매우 소중하게 생각하며, 고객의 개인정보가 훼손, 침해, 누설되지 않도록 최선을 다하고 있습니다. 그러나 기술적인 보완조치를 했음에도 불구하고, 해킹 등 기본적인
        네트워크상의 위험성 때문에 예기치 못한 사고가 발생하여 정보가 훼손되거나 방문자가 작성한 게시물에 의해 각종 분쟁이 발생하는 것에 대해서는 책임을 지지 않습니다.
        <br/>
        회사 고객센터에서는 고객의 개인정보보호 관련 문의에 신속하고 성실하게 답변을 드리도록 하고 있습니다. 회사의 개인정보보호 담당자와 연락하기를 원하시면 아래의 연락처나 이메일로 문의해 주시기 바랍니다.
        개인정보 관련 문의사항에 대해 신속하고 성실하게 답변해 드리겠습니다.
        <br/>
        개인정보보호책임자
        <br/>
        메일 : officialMarrymo@gmail.com
        <br/>
        <br/>
        <br/>
        [제12조] 개인정보 보호 문의처
        <br/>
        정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.
        <br/>
        아래의 기관은 회사와는 별개의 기관으로서, 회사의 자체적인 개인정보 불만처리, 피해구제 결과에 만족하지 못하시거나 보다 자세한 도움이 필요하시면 문의하여 주시기 바랍니다.
        <br/>
        * 개인정보 침해신고센터 (한국인터넷진흥원 운영)
        <br/>
        소관업무 : 개인정보 침해사실 신고, 상담 신청
        <br/>
        홈페이지 : privacy.kisa.or.kr
        <br/>
        전화 : (국번없이) 118
        <br/>
        주소 : (05717 서울시 송파구 중대로 135 한국인터넷진흥원 개인정보침해신고센터
        <br/>
        * 개인정보 분쟁조정위원회 (한국인터넷진흥원 운영)
        <br/>
        소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)
        <br/>
        홈페이지 : privacy.kisa.or.kr
        <br/>
        전화 : (국번없이) 118
        <br/>
        주소 : (05717) 서울시 송파구 중대로 135 한국인터넷진흥원 개인정보침해신고센터
        <br/>
        <br/>
        * 대검찰청 사이버범죄수사단 : 02-3480-3573 (www.spo.go.kr)
        <br/>
        * 경찰청 사이버테러대응센터 : 1566-0112 (www.netan.go.kr)
        <br/>
        <br/>
        <br/>
        [제13조] 고지의 의무
        <br/>
        현 개인정보처리방침은 2024년 3월 25일부터 적용됩니다. 내용의 추가, 삭제 및 수정이 필요하면 개정 최소 7일 전부터 홈페이지의 ’공지’란을 통해 고지할 것입니다.
        <br/>
        - 개인정보처리방침 공고일자 : 2024년 3월 25일
        <br/>
        - 개인정보처리방침 시행일자 : 2024년 3월 25일
        <br/>
      </p>
      <div>
        <Button type='button' link={'https://www.google.com'} colorStyle={'roseGold'} filled={true} size='large'
        >
          버튼
        </Button>
        <Checkbox>위 이용 약관에 동의합니다.</Checkbox>
      </div>

    </div>
  )
}

export default Agreement;