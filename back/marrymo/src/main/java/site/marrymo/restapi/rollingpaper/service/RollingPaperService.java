package site.marrymo.restapi.rollingpaper.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.marrymo.restapi.rollingpaper.repository.RollingPaperRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class RollingPaperService {
    private final RollingPaperRepository rollingPaperRepository;

}
