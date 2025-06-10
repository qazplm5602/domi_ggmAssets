package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.dto.FavoriteTagActionDTO;
import com.domi.ggmassetbackend.data.entity.FavoriteTag;
import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.exceptions.FavoriteTagException;
import com.domi.ggmassetbackend.repositories.FavoriteTagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class FavoriteTagService {
    private final FavoriteTagRepository favoriteTagRepository;
    private final UserService userService;

    public List<FavoriteTag> getFavoriteTagsByOwner(User owner) {
        return favoriteTagRepository.findByOwner(owner);
    }

    public FavoriteTag getTag(String id) {
        return favoriteTagRepository.findById(id)
                .orElseThrow(() -> new FavoriteTagException(FavoriteTagException.Type.NOT_FOUND));
    }

    @Transactional
    public List<String> applyFavoriteTags(List<FavoriteTagActionDTO> actions) {
        User user = userService.getCurrentUser();
        List<String> newItemIds = new ArrayList<>();

        for (FavoriteTagActionDTO action : actions) {
            FavoriteTag tag = null;
            boolean addAction = Objects.equals(action.getAction(), "add");

            if (action.getId() != null && !addAction) {
                tag = getTag(action.getId());

                // 권한 확인
                if (tag.getOwner().getId() != user.getId())
                    throw new FavoriteTagException(FavoriteTagException.Type.OTHER_USER_TAG);
            }

            // 왜 tag가 없엉
            if (!addAction && tag == null)
                throw new FavoriteTagException(FavoriteTagException.Type.INVALID_EDIT);

            String name = action.getName();
            String color = action.getColor();

            boolean nameValid = name != null && !name.isBlank();
            boolean colorValid = color != null && !color.isBlank();

            switch (action.getAction()) {
                case "add":
                    if (!nameValid || !colorValid)
                        throw new FavoriteTagException(FavoriteTagException.Type.INVALID_EDIT);

                    tag = new FavoriteTag();
                    tag.setOwner(user);
                    tag.setName(action.getName());
                    tag.setColor(action.getColor());

                    newItemIds.add(favoriteTagRepository.save(tag).getId());
                    break;
                case "remove":
                    favoriteTagRepository.delete(tag);
                    break;
                case "edit":
                    if (nameValid)
                        tag.setName(name);

                    if (colorValid)
                        tag.setColor(color);

                    favoriteTagRepository.save(tag);
                    break;
                default:
                    throw new FavoriteTagException(FavoriteTagException.Type.INVALID_EDIT);
            }
        }

        return newItemIds;
    }
}
