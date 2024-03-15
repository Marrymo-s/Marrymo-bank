package site.marrymo.restapi.global.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@Getter
public abstract class BaseTimeEntity {

	@CreationTimestamp
	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdDate;

	@LastModifiedDate
	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;

	@Column(name = "deleted_at")
	private LocalDateTime deletedAt;

}
