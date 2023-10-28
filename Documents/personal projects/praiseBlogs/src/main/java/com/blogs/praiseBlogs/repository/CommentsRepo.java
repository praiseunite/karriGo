package com.blogs.praiseBlogs.repository;

import com.blogs.praiseBlogs.model.engagements.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepo extends JpaRepository<Comments, Long> {
}
