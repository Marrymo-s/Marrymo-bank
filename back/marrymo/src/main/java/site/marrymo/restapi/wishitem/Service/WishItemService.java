package site.marrymo.restapi.wishitem.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.marrymo.restapi.wishitem.Repository.WishItemRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class WishItemService {
    private final WishItemRepository wishItemRepository;
}
