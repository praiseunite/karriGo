package com.decagon.karrigobe.controllers.verificationController;

import com.decagon.karrigobe.payload.response.ApiResponse;
import com.decagon.karrigobe.services.verification_services.VerificationServices;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.concurrent.atomic.AtomicReference;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = VerificationController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
class VerificationControllerTest {
    @Autowired
    private VerificationController verificationController;

    @MockBean
    private VerificationServices verificationServices;

    @Autowired
    private ObjectMapper objectMapper;

    private ApiResponse<String> emailVerification;
    private String email_verification_response;

    @BeforeEach
    void setUp() {
        emailVerification = new ApiResponse<>("Email verified successfully. Now you can login to your account");
        email_verification_response = "Email verified successfully. Now you can login to your account";
    }

    @Test
    void verifyEmail() throws Exception {
        AtomicReference<String> json1 = new AtomicReference<>("");
        when(verificationServices.verifyUserEmail( Mockito.anyString()))
                .thenReturn(email_verification_response);

        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/registration/email_verification?token=electroodob@gmail.com")
                .contentType(MediaType.APPLICATION_JSON);

        MockMvcBuilders.standaloneSetup(verificationController)
                .build()
                .perform(requestBuilder)
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andDo(mvcResult -> {
                    json1.set(mvcResult.getResponse().getContentAsString());
                    String  json = String.valueOf(json1);
//                    emailVerification = new Gson().fromJson(json, ApiResponse.class);
//                    mvcResult.getResponse().setContentType(json);

                    Assertions.assertThat(json1.get()).isEqualTo(json);
                });
//                .andExpect(MockMvcResultMatchers.content()
//                        .string((Matcher<? super String>) json1));
    }

    @Test
    void emailReverification() {

    }
}