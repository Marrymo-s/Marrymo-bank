package site.marrymo.restapi.user.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.marrymo.restapi.global.util.UserCodeGenerator;
import site.marrymo.restapi.user.repository.UserRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public String makeUniqueUserCode(){
        UserCodeGenerator userCodeGenerator = new UserCodeGenerator();

        String uniqueUserCode = "";
        while(true){
            String userCode = userCodeGenerator.makeUserCode();

            //userCode가 유니크 한지 확인
            if(userRepository.findByUserCode(userCode).isEmpty()){
                uniqueUserCode = userCode;
                break;
            }
        }

        return uniqueUserCode;
    }
}
