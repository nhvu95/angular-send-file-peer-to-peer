package com.f2f.backend.repo;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.f2f.backend.ds.SignalingChannel;

@Repository
public interface SignalingChannelRepository extends JpaRepository<SignalingChannel, Long> {

}
