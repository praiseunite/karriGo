package com.blogs.praiseBlogs.model;

import com.blogs.praiseBlogs.model.engagements.Comments;
import com.blogs.praiseBlogs.model.engagements.Likes;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class BlogPost {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)

    private Long postId;
    private String title;
    private String bodyContent;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdOn;

    @CreationTimestamp
    private LocalDateTime updatedOn;

    @OneToMany(mappedBy = "blogPost", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Comments> comments;

    @OneToMany(mappedBy = "blogPost", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Likes> likes;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.PERSIST, CascadeType.REFRESH})

    @JoinColumn(name = "user_id")
    private User user;


    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.PERSIST, CascadeType.REFRESH})

    @JoinColumn(name = "admin_id")
    private Admin admin;


}
