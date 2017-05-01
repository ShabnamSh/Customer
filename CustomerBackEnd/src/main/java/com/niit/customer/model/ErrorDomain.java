package com.niit.customer.model;



import javax.persistence.Transient;

import org.springframework.stereotype.Component;

@Component
public class ErrorDomain {
	@Transient
	public String errorcode;
	@Transient
	public String errorMessage;
	public String getErrorcode() {
		return errorcode;
	}
	public void setErrorcode(String errorcode) {
		this.errorcode = errorcode;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

}
