import Header from '@/components/Header'
import Button from '@/components/Button'

const Agreement = () => {
  return (
    <div>
      {/*<Header title='개인 정보 수집 동의' hasPrevious/>*/}
      <div>
        <Button type='button' link={'https://www.google.com'} colorStyle={'roseGold'} filled={true}
                size='large' disabled={true}>버튼</Button>
      </div>

    </div>
  )
}

export default Agreement;