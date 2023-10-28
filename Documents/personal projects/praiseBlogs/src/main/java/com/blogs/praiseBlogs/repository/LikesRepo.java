package com.blogs.praiseBlogs.repository;

import com.blogs.praiseBlogs.model.engagements.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepo extends JpaRepository<Likes, Long> {
}
