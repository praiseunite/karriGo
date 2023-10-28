package com.blogs.praiseBlogs.model;

import com.blogs.praiseBlogs.model.engagements.Comments;
import com.blogs.praiseBlogs.model.engagements.Likes;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table
public class Admin {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)

    private Long adminId;
    private String first_name;
    private String last_name;
    private int age;
    private String sex;
    private String phone_number;
    private String email;

    @Transient
    private String confirmEmail;

    private String password;

    @Transient
    private String confirmPassword;
    private String role;
    private String address;

    @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BlogPost> blogBlogPosts;

    @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Comments> comments;

    @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Likes> likes;


}
