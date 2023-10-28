package com.blogs.praiseBlogs.repository;

import com.blogs.praiseBlogs.model.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogPostRepo extends JpaRepository<BlogPost, Long> {
}
