package com.f2f.backend.utilities;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerMapping;

import com.f2f.backend.SignalingService;

@Aspect
@Component
public class AuthorizationValidAspect {

	@Autowired
	SignalingService signalingServ;
	@Autowired
	PeerDetails peerDetails;

	@Around("@annotation(AuthorizationValid)")
	public Object trace(ProceedingJoinPoint joinPoint) throws Throwable {
		Object[] args = joinPoint.getArgs();
		String authorization = (String) args[0];
		String encryptedChannelId = (String) args[1];
		Long channelId = this.signalingServ.decryptChannelId(encryptedChannelId);

		if (authorization != null && authorization.toLowerCase().startsWith("basic")) {
			// Authorization: Basic base64credentials
			String base64Credentials = authorization.substring("Basic".length()).trim();
			byte[] credDecoded = Base64.getDecoder().decode(base64Credentials);
			String credentials = new String(credDecoded, StandardCharsets.UTF_8);
			// credentials = username:password
			final String[] values = credentials.split(":", 2);
			String peerId = values[0];
			String accessKey = values[1];
			boolean peerValid = this.signalingServ.validatePeer(Long.valueOf(peerId));
			boolean channelValid = this.signalingServ.validateChannel(channelId, accessKey);
			if (peerValid && channelValid) {
				this.peerDetails.setChannelId(channelId);
				this.peerDetails.setPeerId(Long.valueOf(peerId));
			} else {
				return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		}
		Object result = joinPoint.proceed();
		return result;

	}

}