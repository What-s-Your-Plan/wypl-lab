package com.butter.wypl.global.config;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.util.StringUtils;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import redis.embedded.RedisServer;

@Slf4j
@Profile({"test"})
@Configuration
public class EmbeddedRedisConfig {

	@Value("${spring.data.redis.port}")
	private int redisPort;

	private RedisServer redisServer;

	@PostConstruct
	private void start() throws IOException {
		int port = isRedisRunning() ? findAvailablePort() : redisPort;
		log.info("Embedded Redis Running Port : [{}]", port);
		redisServer = new RedisServer(port);
		redisServer.start();
	}

	@PreDestroy
	private void stop() throws IOException {
		if (redisServer != null) {
			redisServer.stop();
		}
	}

	private boolean isRedisRunning() throws IOException {
		return isRunning(executeGrepProcessCommand(redisPort));
	}

	public int findAvailablePort() throws IOException {
		for (int port = 10000; port <= 65535; port++) {
			Process process = executeGrepProcessCommand(port);
			if (!isRunning(process)) {
				return port;
			}
		}
		throw new IllegalArgumentException("Not Found Available port: 10000 ~ 65535");
	}

	private Process executeGrepProcessCommand(
			final int port
	) throws IOException {
		String command = getCommandByOS(port);
		String[] shell = getShell(command);
		return Runtime.getRuntime().exec(shell);
	}

	private String getCommandByOS(
			final int port
	) {
		String osName = System.getProperty("os.name");
		if (osName.contains(OS.MAC.getValue()) || osName.contains(OS.LINUX.getValue())) {
			return String.format("netstat -nat | grep LISTEN | grep %d", port);
		}
		if (osName.contains(OS.WINDOWS.getValue())) {
			return String.format("netstat -nat | findstr \"LISTEN\" | findstr \"%d\"", port);
		}
		throw new IllegalArgumentException("Unsupported OS: " + osName);
	}

	private String[] getShell(
			final String command
	) {
		String osName = System.getProperty("os.name");
		if (osName.contains(OS.MAC.getValue()) || osName.contains(OS.LINUX.getValue())) {
			return new String[] {"/bin/sh", "-c", command};
		}
		if (osName.contains(OS.WINDOWS.getValue())) {
			return new String[] {command};
		}
		throw new IllegalArgumentException("Unsupported OS: " + osName);
	}

	private boolean isRunning(Process process) {
		String line;
		StringBuilder pidInfo = new StringBuilder();
		try (BufferedReader input = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
			while ((line = input.readLine()) != null) {
				pidInfo.append(line);
			}
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return StringUtils.hasText(pidInfo.toString());
	}
}
