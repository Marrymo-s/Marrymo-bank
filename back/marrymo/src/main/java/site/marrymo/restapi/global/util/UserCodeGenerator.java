package site.marrymo.restapi.global.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class UserCodeGenerator {
    private static StringBuilder sb;

    //랜덤으로 영문 4자리 만들어주기
    private void randomAlphabets(){
        for(int cnt = 0; cnt < 4; cnt++){
            char random = (char)((int)(Math.random() * 26) + 97);
            sb.append(String.valueOf(random));
        }
    }

    //랜덤으로 숫자 4자리 만들어주기
    private void randomNumbers(){
        for(int cnt = 0; cnt < 4; cnt++){
            char random = (char)((int)(Math.random() * 10) + 48);
            sb.append(String.valueOf(random));
        }
    }

    //최종적인 UserCode 만들어주기
    public String makeUserCode(){
        sb = new StringBuilder();

        randomAlphabets();
        randomNumbers();

        return sb.toString();
    }
}
