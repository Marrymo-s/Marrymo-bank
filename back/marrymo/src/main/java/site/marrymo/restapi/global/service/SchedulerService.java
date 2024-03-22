package site.marrymo.restapi.global.service;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.marrymo.restapi.user.service.UserService;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class SchedulerService {

	private final UserService userService;
}
