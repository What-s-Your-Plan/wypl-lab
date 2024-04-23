package com.butter.wypl.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.butter.wypl.file.exception.FileErrorCode;
import com.butter.wypl.file.exception.FileException;
import com.butter.wypl.global.exception.CustomException;
import com.butter.wypl.global.exception.GlobalErrorCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class S3ImageService {

	private final AmazonS3Client amazonS3Client;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	public String uploadImage(MultipartFile multipartFile) {
		String fileName = makeFileName(multipartFile);
		File file = convertToFile(multipartFile);
		return uploadFileToS3(file, fileName);
	}

	private String uploadFileToS3(
			final File uploadFile,
			final String fileName
	) {
		PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, fileName, uploadFile)
				.withCannedAcl(CannedAccessControlList.PublicRead);

		amazonS3Client.putObject(putObjectRequest);
		uploadFile.delete()

		return amazonS3Client.getUrl(bucket, fileName).toString();
	}

	private File convertToFile(final MultipartFile multipartFile) {
		File convertFile = new File(getOriginalFilename(multipartFile));

		try (FileOutputStream fos = new FileOutputStream(convertFile)) {
			fos.write(multipartFile.getBytes());
		} catch (IOException e) {
			throw new FileException(FileErrorCode.CONVERT_FILE_ERROR);
		}

		return convertFile;
	}

	private String makeFileName(final MultipartFile multipartFile) {
		String originalName = getOriginalFilename(multipartFile);
		String ext = originalName.substring(originalName.lastIndexOf("."));
		checkFileExtension(ext);
		return UUID.randomUUID() + ext;
	}

	private String getOriginalFilename(MultipartFile multipartFile) {
		Optional<String> optional = Optional.ofNullable(multipartFile.getOriginalFilename());
		return optional.orElseThrow(
				() -> new FileException(FileErrorCode.HAVE_NOT_FILENAME)
		);
	}

	private void checkFileExtension(final String ext) {
		List<String> allowedExtensions = Arrays.asList(".jpg", ".JPG", ".jpeg", ".JPEG", ".png", ".PNG");
		if (!allowedExtensions.contains(ext)) {
			throw new CustomException(GlobalErrorCode.NOT_ALLOWED_EXTENSION);
		}
	}
}
